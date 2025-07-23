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
    onClose(this: WebSocket, ev: CloseEvent): any;
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
export declare class WebSocketClient implements WebSocketClientStateImpl {
    constructor(url: string, options?: WebSocketClientOptions);
    socket: WebSocket | null;
    url: string;
    heartbeatInterval: number;
    heartbeatTimer: NodeJS.Timeout | null;
    maxReconnectAttempts: number;
    reconnectDelay: number;
    reconnectAttempts: number;
    connect(): void;
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView | object): void;
    startHeartbeat(): void;
    resetHeartbeat(): void;
    stopHeartbeat(): void;
    close(): void;
    onOpen(event: any): void;
    onMessage(data: any): void;
    onClose(event: any): void;
    onError(error: any): void;
}
