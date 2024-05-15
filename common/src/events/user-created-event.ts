import { Subjects } from "./subjects";

/**
 * An interface for a user created event.
 * @interface
 */
export interface UserCreatedEvent {
  // The name of the exchange to publish the event to.
  exchange: string;

  // The routing key to use when publishing the event.
  routingKey: Subjects.UserCreated;

  // The data to publish with the event.
  data: {
    id: string;
    email: string;
    fullName: string;
    userName: string;
  };
}
