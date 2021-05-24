export const WithStore = (Base) =>
  class WithStore extends WithDependencyConsumer(Base) {
    #store;

    get store() {
      return this.#store;
    }

    stateChangedCallback(_state) {}

    addedCallback() {
      super.addedCallback();
      this.#store = this.requestDependency('store');
    }

    willMountCallback() {
      super.willMountCallback();
      this.stateChangedCallback(this.#store.state);
    }

    mountedCallback() {
      super.mountedCallback();
      this.#store.subscribe(this.stateChangedCallback.bind(this), { signal: this.unmountedSignal });
    }
  };
