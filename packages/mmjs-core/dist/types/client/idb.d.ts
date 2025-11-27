import { EventEmitter } from '../event/emitter';
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
export interface WebIdbDatabaseImpl {
}
export interface WebIdbObjectStoreParameters extends IDBObjectStoreParameters {
}
export interface WebIdbIndexRecord {
    name: string;
    keyPath: string | string[];
    options: IDBIndexParameters;
}
export type WebIdbEventType = "upgradeneeded" | "success" | "error" | "close" | "abort";
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
export declare abstract class WebIdbDatabase extends EventEmitter<WebIdbEventType> {
    private _options;
    private _idb;
    private _table;
    private _tableOptions;
    constructor(options: WebIdbOptions);
    get options(): WebIdbOptions;
    get idb(): Promise<IDBDatabase>;
    get table(): Promise<IDBObjectStore>;
    private _createDatabase;
    private _createTable;
    $getObjectStore(mode?: IDBTransactionMode): Promise<IDBObjectStore>;
    $wait<T extends IDBRequest<any>>(request: T | Promise<T>): Promise<T>;
    $add(value: any, key?: IDBValidKey): Promise<IDBRequest<IDBValidKey>>;
    $delete(query: IDBValidKey | IDBKeyRange): Promise<IDBRequest<undefined>>;
    $deleteIndex(name: string): Promise<void>;
    $put(value: any, key?: IDBValidKey): Promise<IDBRequest<IDBValidKey>>;
    $get<T extends any>(query: IDBValidKey | IDBKeyRange): Promise<T>;
    $count(query?: IDBValidKey | IDBKeyRange): Promise<number>;
    $openCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): Promise<IDBRequest<IDBCursorWithValue | null>>;
    $getAll<T extends any>(query?: IDBValidKey | IDBKeyRange | null, count?: number): Promise<T[]>;
    $getAllKeys<T extends IDBValidKey>(query?: T | IDBKeyRange | null, count?: number): Promise<IDBValidKey[]>;
    $clear(): Promise<IDBRequest<undefined>>;
    $idbIndex(name: string): Promise<IDBIndex>;
    $close(): Promise<void>;
}
