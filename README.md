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
