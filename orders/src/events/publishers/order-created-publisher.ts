import { OrderCreatedEvent, Publisher, Subjects } from "@udtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
