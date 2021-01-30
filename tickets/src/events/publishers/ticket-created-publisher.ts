import { Publisher, Subjects, TicketCreatedEvent } from "@udtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
