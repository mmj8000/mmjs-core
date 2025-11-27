import { EventEmitter } from "../event/emitter";

export interface WebIdbSchema {
    table?: {
        name?: string;
        options?: WebIdbObjectStoreParameters;
        transaction?: {
            mode?: IDBTransactionMode;
            options?: IDBTransactionOptions;
        };
    };
    index?: {
        list?: WebIdbIndexRecord[];
    };
}

export interface WebIdbOptions extends WebIdbSchema {
    database?: {
        name?: string;
        version?: number;
    };
}

export interface WebIdbDatabaseImpl { }
export interface WebIdbObjectStoreParameters extends IDBObjectStoreParameters { }
export interface WebIdbIndexRecord {
    name: string;
    keyPath: string | string[];
    options: IDBIndexParameters;
}

// IndexedDB 支持的事件类型（限制事件名，更类型安全）
export type WebIdbEventType =
    | "upgradeneeded"
    | "success"
    | "error"
    | "close"
    | "abort";

// 各事件的参数类型（类型提示更精准）
export interface WebIdbUpgradeEvent {
    db: IDBDatabase;
    oldVersion: number;
    newVersion: number | null;
    originalEvent: IDBVersionChangeEvent;
}

export interface WebIdbSuccessEvent {
    db: IDBDatabase;
    originalEvent: Event;
}

export interface WebIdbErrorEvent {
    error: DOMException | Error;
    originalEvent?: Event;
}

export interface WebIdbCloseEvent {
    originalEvent: Event;
}

export interface WebIdbAbortEvent {
    originalEvent: Event;
}

export class WebIdbDatabase extends EventEmitter<WebIdbEventType> {
    private _options: WebIdbOptions;
    private _idb: Promise<IDBDatabase>;
    private _table: Promise<IDBObjectStore>;
    private _tableOptions: WebIdbOptions["table"];

    constructor(options: WebIdbOptions) {
        super();
        this._options = options;
        this._tableOptions = {
            name: options?.table?.name ?? this.constructor.name,
            options: options?.table?.options,
            transaction: options.table?.transaction,
        };
        if (!this._tableOptions.name) {
            throw new TypeError("表名不能为空");
        }
        this._idb = this._createDatabase();
        this._table = this._createTable();
    }

    // Getter 方法
    get options() {
        return this._options;
    }

    get idb() {
        return this._idb;
    }

    get table() {
        return this._table;
    }

    private _createDatabase() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            if (!window.indexedDB) {
                const error = new Error("浏览器不支持 IndexedDB");
                this.emit("error", { error } as WebIdbErrorEvent); // 触发 error 事件
                return reject(error);
            }

            const DB_NAME = this._options?.database?.name ?? "base";
            const DB_VERSION = this._options?.database?.version ?? 1;
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            // 版本升级事件
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                // @ts-ignore
                const db = event.target.result as IDBDatabase;
                const { name: tableName, options: tableOptions } =
                    this._tableOptions ?? {};

                if (!tableName) {
                    const error = new Error("表名未定义");
                    this.emit("error", {
                        error,
                        originalEvent: event,
                    } as WebIdbErrorEvent);
                    reject(error);
                    return;
                }

                // 1. 创建或获取对象存储（表）
                let objectStore: IDBObjectStore;
                if (!db.objectStoreNames.contains(tableName)) {
                    objectStore = db.createObjectStore(tableName, tableOptions);
                    console.log(`[IndexedDB] 创建新表：${tableName}`);
                } else {
                    // @ts-ignore
                    const transaction = event.target.transaction as IDBTransaction;
                    objectStore = transaction.objectStore(tableName);
                    console.log(`[IndexedDB] 复用已有表：${tableName}`);
                }

                // 2. 索引双向校验：删除废弃索引 + 新增索引
                const currentIndexList = this.options.index?.list ?? [];
                const currentIndexNames = new Set(currentIndexList.map((i) => i.name));
                const existingIndexNames = Array.from(objectStore.indexNames);

                // 删除废弃索引（数据库有但当前配置没有）
                existingIndexNames.forEach((name) => {
                    if (!currentIndexNames.has(name)) {
                        objectStore.deleteIndex(name);
                        console.log(`[IndexedDB] 删除废弃索引：${name}`);
                    }
                });

                // 新增索引（当前配置有但数据库没有）
                currentIndexList.forEach((index) => {
                    if (!objectStore.indexNames.contains(index.name)) {
                        objectStore.createIndex(index.name, index.keyPath, index.options);
                        console.log(`[IndexedDB] 创建新索引：${index.name}`);
                    }
                });

                // 触发 upgradeneeded 事件（传递结构化参数）
                this.emit("upgradeneeded", {
                    db,
                    oldVersion: event.oldVersion,
                    newVersion: event.newVersion,
                    originalEvent: event,
                } as WebIdbUpgradeEvent);
            };

            // 错误事件
            request.onerror = (event: Event) => {
                const error = (event.target as IDBRequest).error as DOMException;
                console.error("[IndexedDB] 初始化错误:", error);
                this.emit("error", { error, originalEvent: event } as WebIdbErrorEvent);
                reject(error);
            };

            // 成功事件
            request.onsuccess = (event: Event) => {
                // @ts-ignore
                const db = event.target.result as IDBDatabase;
                console.log(`[IndexedDB] 打开成功，版本：${db.version}`);

                // 监听数据库关闭事件
                db.onclose = (closeEvent: Event) => {
                    console.log("[IndexedDB] 数据库已关闭");
                    this.emit("close", { originalEvent: closeEvent } as WebIdbCloseEvent);
                };

                // 监听事务中断事件
                db.onabort = (abortEvent: Event) => {
                    console.log("[IndexedDB] 事务已中断");
                    this.emit("abort", { originalEvent: abortEvent } as WebIdbAbortEvent);
                };

                // 触发 success 事件
                this.emit("success", {
                    db,
                    originalEvent: event,
                } as WebIdbSuccessEvent);
                resolve(db);
            };
        });
    }

    private async _createTable() {
        if (!this._tableOptions) {
            const error = new Error("表配置参数错误");
            this.emit("error", { error } as WebIdbErrorEvent);
            return Promise.reject(error);
        }
        const idb = await this._idb;
        const { name } = this._tableOptions;
        return idb.transaction(name!, "readonly").objectStore(name!);
    }

    async $getObjectStore(mode: IDBTransactionMode = "readonly") {
        const db = await this._idb;
        const { name } = this._tableOptions ?? {};
        const transaction = db.transaction([name!], mode);
        // 监听事务错误和中断
        transaction.onerror = (event) => {
            const error = (event.target as IDBTransaction).error as DOMException;
            this.emit("error", { error, originalEvent: event } as WebIdbErrorEvent);
        };
        transaction.onabort = (event) => {
            this.emit("abort", { originalEvent: event } as WebIdbAbortEvent);
        };
        return transaction.objectStore(name!);
    }

    $wait<T extends IDBRequest<any>>(request: T | Promise<T>) {
        return new Promise<T>((resolve, reject) => {
            try {
                const processRequest = (re: T) => {
                    re.onsuccess = () => resolve(re);
                    re.onerror = (e) => {
                        const error = (e.target as IDBRequest).error as DOMException;
                        this.emit("error", { error, originalEvent: e } as WebIdbErrorEvent);
                        reject(error);
                    };
                };

                if (request instanceof Promise) {
                    request.then(processRequest).catch(reject);
                } else {
                    processRequest(request);
                }
            } catch (error) {
                this.emit("error", { error: error as Error } as WebIdbErrorEvent);
                reject(error);
            }
        });
    }

    async $add(value: any, key?: IDBValidKey) {
        const objectStore = await this.$getObjectStore("readwrite");
        return this.$wait(objectStore.add(value, key));
    }

    async $delete(query: IDBValidKey | IDBKeyRange) {
        const objectStore = await this.$getObjectStore("readwrite");
        return this.$wait(objectStore.delete(query));
    }

    async $deleteIndex(name: string) {
        const objectStore = await this.$getObjectStore("readwrite");
        return objectStore.deleteIndex(name);
    }

    async $put(value: any, key?: IDBValidKey) {
        const objectStore = await this.$getObjectStore("readwrite");
        return this.$wait(objectStore.put(value, key));
    }

    async $get<T extends any>(query: IDBValidKey | IDBKeyRange) {
        const objectStore = await this.$getObjectStore("readonly");
        const request = await this.$wait<IDBRequest<T>>(objectStore.get(query));
        return request.result;
    }

    async $count(query?: IDBValidKey | IDBKeyRange) {
        const objectStore = await this.$getObjectStore("readonly");
        const request = await this.$wait(objectStore.count(query));
        return request.result;
    }

    async $openCursor(
        query?: IDBValidKey | IDBKeyRange | null,
        direction?: IDBCursorDirection
    ) {
        const objectStore = await this.$getObjectStore("readonly");
        return this.$wait(objectStore.openCursor(query, direction));
    }

    async $getAll<T extends any>(
        query?: IDBValidKey | IDBKeyRange | null,
        count?: number
    ) {
        const objectStore = await this.$getObjectStore("readonly");
        const request = await this.$wait<IDBRequest<T[]>>(
            objectStore.getAll(query, count)
        );
        return request.result;
    }

    async $getAllKeys<T extends IDBValidKey>(
        query?: T | IDBKeyRange | null,
        count?: number
    ) {
        const objectStore = await this.$getObjectStore("readonly");
        const request = await this.$wait<IDBRequest<IDBValidKey[]>>(
            objectStore.getAllKeys(query, count)
        );
        return request.result;
    }

    async $clear() {
        const objectStore = await this.$getObjectStore("readwrite");
        return this.$wait(objectStore.clear());
    }

    async $idbIndex(name: string) {
        const objectStore = await this.$getObjectStore("readonly");
        return objectStore.index(name);
    }

    async $close() {
        const db = await this.idb;
        db.close();
    }
}
