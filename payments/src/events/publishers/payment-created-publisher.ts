import { PaymentCreatedEvent, Publisher, Subjects } from "@udtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
