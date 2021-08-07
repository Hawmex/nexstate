window.searchData = {
  kinds: {
    128: 'Class',
    512: 'Constructor',
    1024: 'Property',
    2048: 'Method',
    65536: 'Type literal',
    262144: 'Accessor',
    4194304: 'Type alias',
  },
  rows: [
    {
      id: 0,
      kind: 4194304,
      name: 'Subscription',
      url: 'modules.html#Subscription',
      classes: 'tsd-kind-type-alias tsd-has-type-parameter',
    },
    {
      id: 1,
      kind: 65536,
      name: '__type',
      url: 'modules.html#Subscription.__type',
      classes: 'tsd-kind-type-literal tsd-parent-kind-type-alias',
      parent: 'Subscription',
    },
    {
      id: 2,
      kind: 4194304,
      name: 'SubscribeOptions',
      url: 'modules.html#SubscribeOptions',
      classes: 'tsd-kind-type-alias',
    },
    {
      id: 3,
      kind: 65536,
      name: '__type',
      url: 'modules.html#SubscribeOptions.__type',
      classes: 'tsd-kind-type-literal tsd-parent-kind-type-alias',
      parent: 'SubscribeOptions',
    },
    {
      id: 4,
      kind: 1024,
      name: 'signal',
      url: 'modules.html#SubscribeOptions.__type.signal',
      classes: 'tsd-kind-property tsd-parent-kind-type-literal',
      parent: 'SubscribeOptions.__type',
    },
    {
      id: 5,
      kind: 128,
      name: 'Nexstate',
      url: 'classes/Nexstate.html',
      classes: 'tsd-kind-class tsd-has-type-parameter',
    },
    {
      id: 6,
      kind: 512,
      name: 'constructor',
      url: 'classes/Nexstate.html#constructor',
      classes: 'tsd-kind-constructor tsd-parent-kind-class tsd-has-type-parameter',
      parent: 'Nexstate',
    },
    {
      id: 7,
      kind: 262144,
      name: 'state',
      url: 'classes/Nexstate.html#state',
      classes: 'tsd-kind-accessor tsd-parent-kind-class',
      parent: 'Nexstate',
    },
    {
      id: 8,
      kind: 2048,
      name: 'subscribe',
      url: 'classes/Nexstate.html#subscribe',
      classes: 'tsd-kind-method tsd-parent-kind-class',
      parent: 'Nexstate',
    },
    {
      id: 9,
      kind: 2048,
      name: 'runAndSubscribe',
      url: 'classes/Nexstate.html#runAndSubscribe',
      classes: 'tsd-kind-method tsd-parent-kind-class',
      parent: 'Nexstate',
    },
  ],
  index: {
    version: '2.3.9',
    fields: ['name', 'parent'],
    fieldVectors: [
      ['name/0', [0, 14.816]],
      ['parent/0', []],
      ['name/1', [1, 14.816]],
      ['parent/1', [0, 1.261]],
      ['name/2', [2, 14.816]],
      ['parent/2', []],
      ['name/3', [1, 14.816]],
      ['parent/3', [2, 1.261]],
      ['name/4', [3, 19.924]],
      ['parent/4', [4, 1.695]],
      ['name/5', [5, 6.931]],
      ['parent/5', []],
      ['name/6', [6, 19.924]],
      ['parent/6', [5, 0.59]],
      ['name/7', [7, 19.924]],
      ['parent/7', [5, 0.59]],
      ['name/8', [8, 19.924]],
      ['parent/8', [5, 0.59]],
      ['name/9', [9, 19.924]],
      ['parent/9', [5, 0.59]],
    ],
    invertedIndex: [
      ['__type', { _index: 1, name: { 1: {}, 3: {} }, parent: {} }],
      ['constructor', { _index: 6, name: { 6: {} }, parent: {} }],
      ['nexstate', { _index: 5, name: { 5: {} }, parent: { 6: {}, 7: {}, 8: {}, 9: {} } }],
      ['runandsubscribe', { _index: 9, name: { 9: {} }, parent: {} }],
      ['signal', { _index: 3, name: { 4: {} }, parent: {} }],
      ['state', { _index: 7, name: { 7: {} }, parent: {} }],
      ['subscribe', { _index: 8, name: { 8: {} }, parent: {} }],
      ['subscribeoptions', { _index: 2, name: { 2: {} }, parent: { 3: {} } }],
      ['subscribeoptions.__type', { _index: 4, name: {}, parent: { 4: {} } }],
      ['subscription', { _index: 0, name: { 0: {} }, parent: { 1: {} } }],
    ],
    pipeline: [],
  },
};
