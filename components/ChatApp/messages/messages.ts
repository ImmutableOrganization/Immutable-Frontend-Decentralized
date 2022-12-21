export namespace Messages {
  export interface MessageCallback {
    getMessageListener: (message: Message, roomId: string) => void;
  }

  export interface Message {
    message: string;
    timestamp: number;
    peerId: string;
  }

  export interface MessageList {
    [roomId: string]: Message[];
  }
}
