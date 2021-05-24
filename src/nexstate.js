import { Nexbounce } from 'nexbounce';

export * from './lib/mixin.js';

const actionToken = Symbol('action-token');

export const action = (name, payload = null) => ({ name, payload, token: actionToken });

export class Reducer {
  #cases;
  #defaultState;
  #key;

  constructor(key, defaultState, cases) {
    this.#defaultState = defaultState;
    this.#cases = cases;
    this.#key = key;
  }

  get key() {
    return this.#key;
  }

  get cases() {
    return Reflect.ownKeys(this.#cases);
  }

  get defaultState() {
    return this.#defaultState;
  }

  reduce({ name, payload }, state = this.#defaultState) {
    return this.#cases[name]({ payload, state });
  }
}

/**
 * @classdesc A class to make a store for state management.
 * @example
 * import { Store, Reducer, action } from 'nexstate';
 *
 * const increment = () => action('counter/increment');
 * const counter = new Reducer('counter', 0, { increment: ({ state }) => (state += 1) });
 * const store = new Store([counter], { logger: true });
 *
 * store.subscribe((state) => console.log(state));
 *
 * setInterval(() => store.dispatch(increment()), 1000);
 */

export class Store {
  static #initSymbol = Symbol('@init');
  static #addReducerSymbol = Symbol('@add-reducer');
  static #deleteReducerSymbol = Symbol('@delete-symbol');

  #isInitialized = false;
  #publishDebouncer = new Nexbounce();
  #subscriptions = new Set();
  #reducers = new Map();
  #state = {};
  #logger;

  constructor(reducers, { logger = false } = { logger: false }) {
    this.#logger = logger;

    reducers.forEach(this.addReducer.bind(this));

    this.dispatch(action(Store.#initSymbol));
    this.#isInitialized = true;
  }

  static #log(action, prevState, currentState) {
    console.groupCollapsed('Lithiux Logger');
    console.log('%c Action:', '', action);
    console.log('%c Previous State:', '', prevState);
    console.log('%c Current State:', '', currentState);
    console.groupEnd();
  }

  get state() {
    return { ...this.#state };
  }

  #publish() {
    this.#publishDebouncer.enqueue(() =>
      this.#subscriptions.forEach((subscription) => subscription(this.state)),
    );
  }

  async dispatch(action) {
    if (typeof action === 'function') await action(this.dispatch.bind(this), this.state);
    else if (action.token === actionToken) {
      const prev = this.state;

      switch (action.name) {
        case Store.#initSymbol:
          this.#reducers.forEach(({ defaultState }, key) => (this.#state[key] = defaultState));
          if (this.#logger) Store.#log(action, prev, this.state);
          break;

        case Store.#deleteReducerSymbol:
          delete this.#state[action.payload.key];
          if (this.#logger) Store.#log(action, prev, this.state);
          break;
        case Store.#addReducerSymbol:
          this.#state[action.payload.key] = action.payload.defaultState;
          if (this.#logger) Store.#log(action, prev, this.state);
          break;

        default:
          const [reducerKey, actionName] = action.name.split('/');

          if (this.#reducers.has(reducerKey)) {
            const reducer = this.#reducers.get(reducerKey);

            if (reducer.cases.includes(actionName)) {
              this.#state[reducerKey] = reducer.reduce(
                { name: actionName, payload: action.payload },
                this.#state[reducerKey],
              );
              if (this.#logger) Store.#log(action, prev[reducerKey], this.state[reducerKey]);
            } else throw new Error(`${reducerKey} does not have any action named ${actionName}`);
          } else throw new Error(`No reducer named ${reducerKey} in store.`);
          break;
      }

      this.#publish();
    } else throw new Error(`"action" must be created by "action" factory function.`);
  }

  addReducer(reducer, { signal = null } = { signal: null }) {
    if (reducer instanceof Reducer) {
      if (!signal?.aborted) {
        this.#reducers.set(reducer.key, {
          reduce: reducer.reduce.bind(reducer),
          cases: reducer.cases,
          defaultState: reducer.defaultState,
        });

        if (this.#isInitialized) this.dispatch(action(Store.#addReducerSymbol, reducer));

        signal?.addEventListener?.('abort', () => this.#deleteReducer(reducer), { once: true });
      }
    } else throw new Error(`"reducer" must be instance of "Reducer".`);
  }

  #deleteReducer(reducer) {
    this.#reducers.delete(reducer.key);
    this.dispatch(action(Store.#deleteReducerSymbol, reducer));
  }

  subscribe(subscription, { signal = null } = { signal: null }) {
    if (!signal?.aborted) {
      this.#subscriptions.add(subscription);
      signal?.addEventListener?.('abort', () => this.#unsubscribe(subscription), { once: true });
    }
  }

  #unsubscribe(subscription) {
    this.#subscriptions.delete(subscription);
  }
}
