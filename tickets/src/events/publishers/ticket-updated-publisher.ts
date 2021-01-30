import { Publisher, Subjects, TicketUpdatedEvent } from "@udtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
