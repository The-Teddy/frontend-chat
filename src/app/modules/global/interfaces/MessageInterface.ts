export interface MessageInterface {
  sender: string;
  message: string;
  sentAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  status: string;
  key?: number;
}
