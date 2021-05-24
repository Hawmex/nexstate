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
import { Store, Reducer, action } from 'nexstate';

const increment = () => action('counter/increment');
const counter = new Reducer('counter', 0, { increment: ({ state }) => (state += 1) });
const store = new Store([counter], { logger: true });

store.subscribe((state) => console.log(state));

setInterval(() => store.dispatch(increment()), 1000);
```
