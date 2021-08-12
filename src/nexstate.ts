import { Nexbounce } from 'nexbounce';

export type NexstateOptions = { logger?: boolean };
export type Action<T> = (state: T) => T;
export type Subscription<T> = (state: T) => void;
export type SubscribeOptions = { signal?: AbortSignal };

export class Nexstate<T> {
  static #log(oldState: unknown, newState: unknown) {
    console.groupCollapsed('Nexstate Logger');
    console.log('%c Old State:', '', oldState);
    console.log('%c New State:', '', newState);
    console.groupEnd();
  }

  #state: T;
  #options?: NexstateOptions;
  #publishDebouncer = new Nexbounce();
  #subscriptions = new Set<Subscription<T>>();

  constructor(defaultState: T, options?: NexstateOptions) {
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
    } else if (typeof oldState === 'object' && typeof newState === 'object')
      throw new RangeError(
        `oldState and newState seem to be identical. Your store uses an object type (date, map, set, array, etc.), check your action for returning a new instance of that object type.`,
      );

    if (this.#options?.logger) Nexstate.#log(oldState, this.#state);
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
