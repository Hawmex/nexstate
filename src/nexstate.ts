import { Nexbounce } from 'nexbounce';

export type Subscription<T> = (state: T) => void;
export type SubscribeOptions = { signal?: AbortSignal };

export class Nexstate<T> {
  #state: T;
  #publishDebouncer = new Nexbounce();
  #subscriptions = new Set<Subscription<T>>();

  constructor(defaultState: T) {
    this.#state = defaultState;
  }

  get state(): T {
    return this.#state;
  }

  set state(value: T) {
    if (value !== this.state) {
      this.#state = value;
      this.#publish();
    }
  }

  #publish() {
    this.#publishDebouncer.enqueue(() =>
      this.#subscriptions.forEach((subscription) => subscription(this.state)),
    );
  }

  #unsubscribe(subscription: Subscription<T>) {
    this.#subscriptions.delete(subscription);
  }

  subscribe(subscription: Subscription<T>, options?: SubscribeOptions) {
    if (!options?.signal?.aborted) {
      this.#subscriptions.add(subscription);

      options?.signal?.addEventListener?.('abort', () => this.#unsubscribe(subscription), {
        once: true,
      });
    }
  }

  runAndSubscribe(subscription: Subscription<T>, options?: SubscribeOptions) {
    if (!options?.signal?.aborted) subscription(this.state);
    this.subscribe(subscription, options);
  }
}
