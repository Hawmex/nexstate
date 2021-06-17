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
