// Copyright (C) 2023 Justin Grant. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.timezone.from
description: An object is returned unchanged
features: [Temporal, time-zone-canonicalization]
---*/

class CustomTimeZone extends Temporal.TimeZone {}

const objects = [
  new Temporal.TimeZone("Asia/Calcutta"),
  new CustomTimeZone("Asia/Calcutta"),
  new Temporal.TimeZone("Asia/Kolkata"),
  new CustomTimeZone("Asia/Kolkata"),
];

const plainObj1 = { id: "Asia/Calcutta", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null };
const plainObj2 = { id: "Asia/Kolkata", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null };

for (const object1 of objects) {
  for (const object2 of objects) {
    assert.sameValue(object1.equals(object2), true);
  }
  assert.sameValue(object1.equals(plainObj1), true);
  assert.sameValue(object1.equals(plainObj2), true);
}
