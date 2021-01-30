import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@udtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
