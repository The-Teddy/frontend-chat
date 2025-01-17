export interface MessageInterface {
  id: number;
  sender: string;
  message: string;
  sentAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  status: string;
}
