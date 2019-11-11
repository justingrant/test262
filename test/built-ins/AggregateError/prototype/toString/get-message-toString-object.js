// Copyright (C) 2019 Leo Balter. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-aggregate-error.prototype.toString
description: >
  ToString on the message object value
info: |
  AggregateError.prototype.toString ( )

  1. Let O be the this value.
  2. If Type(O) is not Object, throw a TypeError exception.
  3. Let name be ? Get(O, "name").
  4. If name is undefined, set name to "AggregateError"; otherwise set name to ? ToString(name).
  5. Let msg be ? Get(O, "message").
  6. If msg is undefined, set msg to the empty String; otherwise set msg to ? ToString(msg).
  7. If name is the empty String, return msg.
  8. If msg is the empty String, return name.
  9. Return the string-concatenation of name, the code unit 0x003A (COLON), the code unit 0x0020 (SPACE) and msg.
features: [AggregateError, Symbol.toPrimitive]
---*/

var method = AggregateError.prototype.toString;

var called = 0;
var obj = {
  message: {
    [Symbol.toPrimitive]() {
      called += 1;
      return 'from @@toPrimitive';
    },
    toString() {
      throw new Test262Error();
    },
    valueOf() {
      throw new Test262Error();
    },
  },
  name: '',
};

var result = method.call(obj);

assert.sameValue(called, 1);
assert.sameValue(result, 'from @@toPrimitive');

called = 0;
obj = {
  message: {
    [Symbol.toPrimitive]: undefined,
    toString() {
      called += 1;
      return 'from the toString method';
    },
    valueOf() {
      throw new Test262Error();
    },
  },
  name: '',
};
result = false;

result = method.call(obj);
assert.sameValue(called, 1);
assert.sameValue(result, 'from the toString method');

called = 0;
obj = {
  message: {
    [Symbol.toPrimitive]: undefined,
    toString: undefined,
    valueOf() {
      called += 1;
      return 'from the valueOf method';
    },
  },
  name: '',
};
result = false;

result = method.call(obj);
assert.sameValue(called, 1);
assert.sameValue(result, 'from the valueOf method');