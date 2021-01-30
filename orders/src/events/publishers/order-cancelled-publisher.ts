import { OrderCancelledEvent, Publisher, Subjects } from "@udtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
