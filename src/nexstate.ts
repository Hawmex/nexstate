import { Debouncer } from 'nexbounce/nexbounce.js';

export type Subscriber = () => void;

export type SubscriptionOptions = {
  signal: AbortSignal;
};

export abstract class Store {
  readonly #subscribers = new Set<Subscriber>();
  readonly #debouncer = new Debouncer();

  #publish() {
    this.#debouncer.enqueue(() =>
      this.#subscribers.forEach((subscriber) => subscriber()),
    );
  }

  setState(callback: () => void) {
    callback();
    this.#publish();
  }

  subscribe(subscriber: Subscriber, options?: SubscriptionOptions) {
    if (!options?.signal.aborted) {
      this.#subscribers.add(subscriber);

      options?.signal.addEventListener(
        'abort',
        () => this.#subscribers.delete(subscriber),
        { once: true },
      );
    }
  }

  runAndSubscribe(subscriber: Subscriber, options?: SubscriptionOptions) {
    subscriber();
    this.subscribe(subscriber, options);
  }
}
