import { Nexbounce } from 'nexbounce';

export type NexstateOptions = { logger?: boolean };
export type SyncAction<T> = (state: T) => T;
export type AsyncAction<T> = (state: T) => Promise<T>;
export type Subscription<T> = (state: T) => void;
export type SubscribeOptions = { signal?: AbortSignal };

export class Nexstate<T> {
  #state: T;
  #options?: NexstateOptions;
  #publishDebouncer = new Nexbounce();
  #subscriptions = new Set<Subscription<T>>();

  constructor(defaultState: T, options?: NexstateOptions) {
    this.#state = defaultState;
    this.#options = options;
  }

  get state(): T {
    return JSON.parse(JSON.stringify(this.#state));
  }

  #publish() {
    this.#publishDebouncer.enqueue(() =>
      this.#subscriptions.forEach((subscription) => subscription(this.state)),
    );
  }

  #unsubscribe(subscription: Subscription<T>) {
    this.#subscriptions.delete(subscription);
  }

  #log(prevState: T) {
    console.groupCollapsed('Nexstate Logger');
    console.log('%c Previous State:', '', prevState);
    console.log('%c Current State:', '', this.state);
    console.groupEnd();
  }

  setState(action: SyncAction<T>): void;
  setState(action: AsyncAction<T>): Promise<void>;
  setState(action: any): any {
    const prevState = this.state;

    const output = action(prevState);

    if (output instanceof Promise)
      return new Promise<void>(async (resolve) => {
        this.#state = await output;

        if (this.#options?.logger) this.#log(prevState);

        this.#publish();

        resolve();
      });
    else {
      this.#state = output;

      if (this.#options?.logger) this.#log(prevState);

      this.#publish();
    }
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
