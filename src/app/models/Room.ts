
export type RoomStatus = 'OPEN' | 'ASSIGNED' | 'CLOSED';
export interface Room {
    id: string;
    subject: string;
    createdBy: string;
    assignedExpert?: string;
    status: RoomStatus;
    aiEnabled: boolean;
    createdAt: string;
    lastActivityAt: string;
}
