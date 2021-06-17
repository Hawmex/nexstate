export const actionToken = Symbol('action-token');
export const action = (name, payload = null) => ({ name, payload, token: actionToken });
