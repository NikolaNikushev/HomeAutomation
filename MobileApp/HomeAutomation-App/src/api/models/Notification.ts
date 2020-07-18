import { NotificationContent } from "./NotificationContent";

export interface Notification {
  title: string;
  body?: string;
  sound: string;
  data: NotificationContent;
  id: string;
}
