export interface IEvent {
  eventTitle: string;
  name: string;
  email: string;
  dateAndTime: Date;
  location: string;
  description: string;
  attendeeCount?: number;
}
