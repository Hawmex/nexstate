import { Debouncer } from 'nexbounce/nexbounce.js';

type Subscriber = () => void;

type Subscription = {
  readonly store: Store;
  readonly subscriber: Subscriber;
  cancel(): void;
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

  subscribe(subscriber: Subscriber) {
    this.#subscribers.add(subscriber);

    return {
      store: this,
      subscriber: subscriber,
      cancel: () => this.#subscribers.delete(subscriber),
    } as Subscription;
  }

  runAndSubscribe(subscriber: Subscriber) {
    subscriber();
    return this.subscribe(subscriber);
  }
}
