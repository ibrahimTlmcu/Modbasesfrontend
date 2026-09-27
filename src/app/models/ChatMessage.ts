export interface ChatMessage {
    id?: number;                 // <- eklendi
    type: MessageType;
    sender: string;
    content: string;
    roomId: string;
    fileName?: string;
    contentType?: string;
    liked?: boolean | null;      // <- eklendi
}

export enum MessageType {
    CHAT = 'CHAT',
    JOIN = 'JOIN',
    LEAVE = 'LEAVE',
    SUPPORT_OFFER = 'SUPPORT_OFFER',
    SUPPORT_RESPONSE = 'SUPPORT_RESPONSE',
    IMAGE = 'IMAGE',
    FILE = 'FILE'
}
