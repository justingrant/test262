// Copyright (C) 2023 Justin Grant. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.timezone.prototype.equals
description: Tests that objects can be compared for equality
features: [Temporal, time-zone-canonicalization]
---*/

class CustomTimeZone extends Temporal.TimeZone {}

const objectsEqualUTC = [
  new Temporal.TimeZone("UTC"),
  new CustomTimeZone("UTC"),
  { id: "UTC", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null },
  new Temporal.ZonedDateTime(0n, "UTC")
];

const tzUTC = new Temporal.TimeZone("UTC");

for (const object of objectsEqualUTC) {
  const result = tzUTC.equals(object);
  assert.sameValue(result, true);
}

const objectsEqual0000 = [
  new Temporal.TimeZone("+00:00"),
  new Temporal.TimeZone("+0000"),
  new Temporal.TimeZone("+00"),
  new CustomTimeZone("+00:00"),
  new CustomTimeZone("+0000"),
  new CustomTimeZone("+00"),
  { id: "+00:00", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null },
  { id: "+0000", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null },
  { id: "+00", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null },
  new Temporal.ZonedDateTime(0n, "+00:00"),
  new Temporal.ZonedDateTime(0n, "+0000"),
  new Temporal.ZonedDateTime(0n, "+00")
];

const tz0000 = new Temporal.TimeZone("+00:00");

for (const object of objectsEqual0000) {
  const result = tz0000.equals(object);
  assert.sameValue(result, true);
}

const objectsNotEqual = [
  new Temporal.TimeZone("+00:00"),
  new CustomTimeZone("+00:00"),
  { id: "+00:00", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null },
  { id: "Etc/Custom", getPossibleInstantsFor: null, getOffsetNanosecondsFor: null },
  new Temporal.ZonedDateTime(0n, "+00:00")
];

for (const object of objectsNotEqual) {
  const result = tzUTC.equals(object);
  assert.sameValue(result, false);
}
