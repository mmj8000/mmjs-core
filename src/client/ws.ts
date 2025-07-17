
export interface WebSocketClientStateImpl {
    socket: WebSocket | null;
    url: string;
    heartbeatInterval: number;
    heartbeatTimer: null | NodeJS.Timeout;
    maxReconnectAttempts: number;
    reconnectDelay: number;
    reconnectAttempts: number;
}
export interface WebSocketClientOptions {
    heartbeatInterval?: number;
    reconnectDelay?: number;
    maxReconnectAttempts?: number;
    connect(): void;
    send(data: any): void;
    close(): void;
    onOpen(this: WebSocket, event: Event): any;
    onMessage(this: WebSocket, ev: MessageEvent): any;
    onClose(this: WebSocket, ev: CloseEvent): any
    onError(this: WebSocket, error: Event): any;
}

/**
 * @example
 *  const wsClient = new WebSocketClient(wsBaseURL);
    wsClient.onOpen = () => {
    console.log('连接已建立，发送欢迎消息');
    wsClient.send({ message: 'xx', });
    wsClient.close();
    };
    wsClient.onMessage = () => {
    };
 */
export class WebSocketClient implements WebSocketClientStateImpl {
    constructor(url: string, options?: WebSocketClientOptions) {
        this.url = url;
        this.socket = null;
        this.heartbeatInterval = options?.heartbeatInterval ?? 30000; // 30秒心跳
        this.heartbeatTimer = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = options?.maxReconnectAttempts ?? 5;
        this.reconnectDelay = options?.reconnectDelay ?? 5000; // 5秒重连间隔

        this.connect();
    }
    socket: WebSocket | null;
    url: string;
    heartbeatInterval: number;
    heartbeatTimer: NodeJS.Timeout | null;
    maxReconnectAttempts: number;
    reconnectDelay: number;
    reconnectAttempts: number;

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = (event) => {
            console.log('WebSocket连接已建立');
            this.reconnectAttempts = 0;
            this.startHeartbeat();
            this.onOpen && this.onOpen(event);
        };

        this.socket.onmessage = (event) => {
            // 收到消息时重置心跳
            this.resetHeartbeat();

            // 处理服务器消息
            try {
                const data = JSON.parse(event.data ?? '{}');
                if (data.type === 'pong') {
                    console.log('收到心跳响应');
                    return;
                }
                this.onMessage && this.onMessage(data);
            } catch (error) {
                console.error('消息解析错误:', {
                    error,
                    event,
                });
            }
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket连接关闭');
            this.stopHeartbeat();
            this.onClose?.(event);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket错误:', error);
            // 尝试重新连接
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++;
                console.log(`尝试重新连接 (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
                setTimeout(() => this.connect(), this.reconnectDelay);
            }
            this.onError && this.onError(error);
        };
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView | object) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            if (typeof data === 'string') {
                this.socket.send(data);
            } else if (data instanceof Blob) {
                this.socket.send(data);
            } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
                this.socket.send(data);
            } else {
                // 对于其他对象类型，使用JSON序列化
                this.socket.send(JSON.stringify(data));
            }
        } else {
            console.error('WebSocket未连接，无法发送消息');
        }
    }

    startHeartbeat() {
        this.stopHeartbeat();
        this.heartbeatTimer = setInterval(() => {
            if (this.socket?.readyState === WebSocket.OPEN) {
                console.log('发送心跳');
                this.send({ type: 'ping', timestamp: Date.now() });
            }
        }, this.heartbeatInterval);
    }

    resetHeartbeat() {
        // 收到消息时重置心跳计时器
        this.stopHeartbeat();
        this.startHeartbeat();
    }

    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    close() {
        this.stopHeartbeat();
        if (this.socket) {
            this.socket.close();
        }
    }

    // 回调函数
    onOpen(event) { }
    onMessage(data) { }
    onClose(event) { }
    onError(error) { }
}
