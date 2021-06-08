'use strict';

export const actionToken = Symbol('action-token');

/**
 * @description A factory function to make an action for state management.
 * @example
 * import { Store, Reducer, action } from 'nexstate';
 *
 * const increment = () => action('counter/increment');
 * const counter = new Reducer('counter', 0, { increment: ({ state }) => (state += 1) });
 * const store = new Store([counter]);
 */

export const action = (name, payload = null) => ({ name, payload, token: actionToken });
