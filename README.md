# nexstate

An ESNext state management library inspired by Redux.

[![npm version](https://img.shields.io/npm/v/nexstate?style=for-the-badge)](https://npmjs.com/packages/nexstate)
[![npm downloads](https://img.shields.io/npm/dw/nexstate?style=for-the-badge)](https://npmjs.com/packages/nexstate)
[![github issues](https://img.shields.io/github/issues/Hawmex/nexstate?style=for-the-badge)](https://github.com/Hawmex/nexstate/issues)
[![license](https://img.shields.io/npm/l/nexstate?style=for-the-badge)](https://github.com/Hawmex/nexstate)

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
    /* ... */
  },
  { signal: subscription.signal },
);

const asyncIncrement = () => store.setState(async (state) => state + 1);
const decrement = () => store.setState((state) => state - 1);

await asyncIncrement();

// Nexstate Logger
//    Previous State: 0
//    Current State: 1

decrement();

// Nexstate Logger
//    Previous State: 1
//    Current State: 0

setTimeout(() => subscription.abort());
```
