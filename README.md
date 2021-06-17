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

const increment1 = () => action('counter1/increment');
const counter1 = new Reducer('counter1', 0, { increment: ({ state }) => (state += 1) });

const store = new Store([counter1], { logger: true });

store.subscribe((state) => console.log(state));

setInterval(() => store.dispatch(increment1()), 5000);

const decrement2 = () => action('counter2/decrement');
const counter2 = new Reducer('counter2', 0, { decrement: ({ state }) => (state -= 1) });

const deleteCounter2Controller = new AbortController();

store.addReducer(counter2, { signal: deleteCounter2Controller.signal });

setInterval(() => store.dispatch(decrement2()), 10000);

setTimeout(() => deleteCounter2Controller.abort(), 30000);
```
