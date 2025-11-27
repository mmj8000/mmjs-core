/**
 * 通用事件发射器类，支持 on/off/emit 事件机制
 */
export declare class EventEmitter<EventType extends string = string> {
    private _events;
    /**
     * 绑定事件
     * @param type 事件类型
     * @param handler 回调函数
     * @returns 自身实例（支持链式调用）
     */
    on(type: EventType, handler: (...args: any[]) => void): this;
    /**
     * 解绑事件
     * @param type 事件类型（不传则解绑所有事件）
     * @param handler 回调函数（不传则解绑该类型下所有事件）
     * @returns 自身实例（支持链式调用）
     */
    off(type?: EventType, handler?: (...args: any[]) => void): this;
    /**
     * 触发事件
     * @param type 事件类型
     * @param args 传递给回调的参数（可多个）
     * @returns 自身实例（支持链式调用）
     */
    emit(type: EventType, ...args: any[]): this;
    /**
     * 检查是否有指定类型的事件绑定
     * @param type 事件类型
     * @returns 是否存在绑定
     */
    hasEvent(type: EventType): boolean;
    /**
     * 获取指定类型的所有事件回调
     * @param type 事件类型
     * @returns 回调函数数组（只读副本）
     */
    getHandlers(type: EventType): ((...args: any[]) => void)[];
}
