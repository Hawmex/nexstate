import { Nexbounce } from 'nexbounce/nexbounce.js';

export type StoreOptions = { logger?: boolean };
export type Action<T> = (state: T) => T;
export type Subscription<T> = (state: T) => void;
export type SubscriptionOptions = { signal?: AbortSignal };

export class Nexstate<T> {
  static #log<T>(oldState: T, newState: T) {
    console.groupCollapsed('Nexstate Logger');
    console.log('%c Old State:', '', oldState);
    console.log('%c New State:', '', newState);
    console.groupEnd();
  }

  #state: T;
  #options?: StoreOptions;
  #publishDebouncer = new Nexbounce();
  #subscriptions = new Set<Subscription<T>>();

  constructor(defaultState: T, options?: StoreOptions) {
    this.#state = defaultState;
    this.#options = options;
  }

  get state(): T {
    return this.#state;
  }

  #publish() {
    this.#publishDebouncer.enqueue(() =>
      this.#subscriptions.forEach((subscription) => subscription(this.state)),
    );
  }

  #unsubscribe(subscription: Subscription<T>) {
    this.#subscriptions.delete(subscription);
  }

  setState(action: Action<T>) {
    const oldState = this.state;

    const newState = action(oldState);

    if (newState !== oldState) {
      this.#state = newState;
      this.#publish();
    } else if (typeof newState === 'object' && newState !== null)
      throw new RangeError(
        `oldState and newState seem to be identical. Your store uses an object type (date, map, set, array, etc.), check your action for returning a new instance of that object type.`,
      );

    if (this.#options?.logger) Nexstate.#log(oldState, this.#state);
  }

  subscribe(subscription: Subscription<T>, options?: SubscriptionOptions) {
    if (!options?.signal?.aborted) {
      this.#subscriptions.add(subscription);

      options?.signal?.addEventListener('abort', () => this.#unsubscribe(subscription), {
        once: true,
      });
    }
  }

  runAndSubscribe(subscription: Subscription<T>, options?: SubscriptionOptions) {
    if (!options?.signal?.aborted) subscription(this.state);

    this.subscribe(subscription, options);
  }
}
