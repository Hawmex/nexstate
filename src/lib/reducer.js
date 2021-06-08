'use strict';

/**
 * @classdesc A class to make a reducer for state management.
 * @example
 * import { Store, Reducer, action } from 'nexstate';
 *
 * const increment = () => action('counter/increment');
 * const counter = new Reducer('counter', 0, { increment: ({ state }) => (state += 1) });
 * const store = new Store([counter], { logger: true });
 */

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
