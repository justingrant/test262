// Copyright (C) 2023 Justin Grant. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.timezone.from
description: Time zone strings with UTC offset fractional part are not confused with time fractional part
features: [Temporal, time-zone-canonicalization]
---*/

const timeZone = "2021-08-19T17:30:45.123456789+01:46[+01:45:30.987654321]";

const result = Temporal.TimeZone.from(timeZone);
assert.sameValue(result.equals("+01:45:30.987654321"), true, "Time zone string determined from bracket name");
assert.sameValue(result.equals(timeZone), true, "Time zone string determined from ISO string with bracket name");
