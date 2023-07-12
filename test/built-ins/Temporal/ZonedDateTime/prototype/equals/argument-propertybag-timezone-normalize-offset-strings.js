// Copyright (C) 2023 Justin Grant. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.zoneddatetime.prototype.equals
description: Offset time zone identifiers are compared using their normal form, ignoring syntax differences like trailing zeroes
features: [Temporal, time-zone-canonicalization]
---*/

const instance = new Temporal.ZonedDateTime(0n, "+00:00");

const trailingZeroesId = "+00:00:00.000000000";
const bag1 = { year: 1970, monthCode: "M01", day: 1, timeZone: trailingZeroesId };
assert.sameValue(instance.equals(bag1), true, "Offset time zones are equal despite trailing zeroes in property bag argument");

const str = "1970-01-01[+00:00:00.000000000]";
assert.sameValue(instance.equals(str), true, "Offset time zones are equal despite trailing zeroes in ISO string argument");

const getPossibleInstantsFor = (pdt) => [Temporal.Instant.from(`${pdt.toString()}Z`)]
const plainObj = { id: trailingZeroesId, getPossibleInstantsFor, getOffsetNanosecondsFor: () => 0 };
const bag2 = { year: 1970, monthCode: "M01", day: 1, timeZone: plainObj };
assert.sameValue(instance.equals(bag2), true, "Offset time zones are equal despite trailing zeroes in plain object time zone ID");

class CustomTimeZone extends Temporal.TimeZone {
  constructor() {
    super(trailingZeroesId);
  }
  get id() { return trailingZeroesId; }
}
const customTimeZoneInstance = new CustomTimeZone();
assert.sameValue(customTimeZoneInstance.id, trailingZeroesId);
const bag3 = { year: 1970, monthCode: "M01", day: 1, timeZone: customTimeZoneInstance };
assert.sameValue(instance.equals(bag3), true, "Offset time zones are equal despite trailing zeroes in custom object time zone ID");
