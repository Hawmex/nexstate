# nexstate

An ESNext state management library inspired by Redux.

![npm](https://img.shields.io/npm/v/nexstate)
![npm](https://img.shields.io/npm/dw/nexstate)
![NPM](https://img.shields.io/npm/l/nexstate)

## Demo

You can try the demo [here](https://codepen.io/Hawmed/pen/PopmeOp).

## Installation

```
npm i nexstate
```

## Definition (TypeScript)

```ts
declare type NexstateOptions = {
  logger?: boolean;
};

declare type Action<StateType> = (state: StateType) => StateType;
declare type Subscription<StateType> = (state: StateType) => void;

declare type SubscribeOptions = {
  signal?: AbortSignal;
};

declare class Nexstate<StateType> {
  constructor(defaultState: StateType, options?: NexstateOptions);

  get state(): StateType;

  setState(action: (state: StateType) => StateType | Promise<StateType>): Promise<void>;
  subscribe(subscription: Subscription<StateType>, options?: SubscribeOptions): void;
}
```

## Example

```js
import { Nexstate } from 'nexstate';

const store = new Nexstate(0, { logger: true });

const subscription = new AbortController();

store.subscribe(
  (state) => {
    console.log(state);
  },
  { signal: subscription.signal },
);

const increment = () => store.setState((state) => state + 1);
const decrement = () => store.setState((state) => state - 1);

await increment();

// Nexstate Logger
//    Previous State: 0
//    Current State: 1

await decrement();

// Nexstate Logger
//    Previous State: 1
//    Current State: 0

setTimeout(() => subscription.abort());
```
