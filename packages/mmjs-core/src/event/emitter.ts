/**
 * 通用事件发射器类，支持 on/off/emit 事件机制
 */
export class EventEmitter<EventType extends string = string> {
  // 事件存储：key=事件类型，value=回调函数数组
  private _events: Record<EventType, ((...args: any[]) => void)[]> =
    {} as Record<EventType, ((...args: any[]) => void)[]>;

  /**
   * 绑定事件
   * @param type 事件类型
   * @param handler 回调函数
   * @returns 自身实例（支持链式调用）
   */
  on(type: EventType, handler: (...args: any[]) => void): this {
    if (typeof handler !== "function") {
      throw new TypeError("事件回调必须是函数");
    }
    // 初始化事件数组（若不存在）
    if (!this._events[type]) {
      this._events[type] = [];
    }
    // 避免重复绑定同一函数
    if (!this._events[type].includes(handler)) {
      this._events[type].push(handler);
    }
    return this;
  }

  /**
   * 解绑事件
   * @param type 事件类型（不传则解绑所有事件）
   * @param handler 回调函数（不传则解绑该类型下所有事件）
   * @returns 自身实例（支持链式调用）
   */
  off(type?: EventType, handler?: (...args: any[]) => void): this {
    if (!type) {
      // 解绑所有事件
      this._events = {} as Record<EventType, ((...args: any[]) => void)[]>;
      return this;
    }

    const handlers = this._events[type];
    if (!handlers) return this;

    if (!handler) {
      // 解绑该类型下所有事件
      handlers.length = 0;
      return this;
    }

    // 解绑指定函数
    const index = handlers.findIndex((h) => h === handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
    return this;
  }

  /**
   * 触发事件
   * @param type 事件类型
   * @param args 传递给回调的参数（可多个）
   * @returns 自身实例（支持链式调用）
   */
  emit(type: EventType, ...args: any[]): this {
    const handlers = this._events[type]?.slice() || []; // 浅拷贝，避免触发时解绑导致数组塌陷
    handlers.forEach((handler) => {
      try {
        handler(...args); // 传递所有参数给回调
      } catch (error) {
        console.error(`[EventEmitter 错误] 事件类型: ${String(type)}`, error);
      }
    });
    return this;
  }

  /**
   * 检查是否有指定类型的事件绑定
   * @param type 事件类型
   * @returns 是否存在绑定
   */
  hasEvent(type: EventType): boolean {
    return !!this._events[type]?.length;
  }

  /**
   * 获取指定类型的所有事件回调
   * @param type 事件类型
   * @returns 回调函数数组（只读副本）
   */
  getHandlers(type: EventType): ((...args: any[]) => void)[] {
    return this._events[type]?.slice() || [];
  }
}
