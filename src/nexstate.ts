import { Nexbounce } from 'nexbounce';

export type NexstateOptions = { logger?: boolean };
export type Action<StateType> = (state: StateType) => StateType;
export type Subscription<StateType> = (state: StateType) => void;
export type SubscribeOptions = { signal?: AbortSignal };

export class Nexstate<StateType> {
  #state: StateType;
  #options?: NexstateOptions;
  #publishDebouncer = new Nexbounce();
  #subscriptions: Set<Subscription<StateType>> = new Set();

  constructor(defaultState: StateType, options?: NexstateOptions) {
    this.#state = defaultState;
    this.#options = options;
  }

  get state(): StateType {
    return JSON.parse(JSON.stringify(this.#state));
  }

  #publish() {
    this.#publishDebouncer.enqueue(() =>
      this.#subscriptions.forEach((subscription) => subscription(this.state)),
    );
  }

  #unsubscribe(subscription: Subscription<StateType>) {
    this.#subscriptions.delete(subscription);
  }

  #log(prevState: StateType) {
    console.groupCollapsed('Lithiux Logger');
    console.log('%c Previous State:', '', prevState);
    console.log('%c Current State:', '', this.state);
    console.groupEnd();
  }

  async setState(action: (state: StateType) => StateType | Promise<StateType>) {
    const prevState = this.state;

    this.#state = await action(prevState);

    if (this.#options?.logger) this.#log(prevState);

    this.#publish();
  }

  subscribe(subscription: Subscription<StateType>, options?: SubscribeOptions) {
    if (!options?.signal?.aborted) {
      this.#subscriptions.add(subscription);

      options?.signal?.addEventListener?.('abort', () => this.#unsubscribe(subscription), {
        once: true,
      });
    }
  }
}
