# Record
Helper functions for interacting with plain object records.

## Usage Example
``` ts
import Record from "@nihility-io/record"

const r: Record<string, number> = { a: 1, b: 2, c: 3 }
r = Record.map(r, (k, v) => v * 2)      // => { a: 2, b: 4, c: 6 }
r = Record.filter(r, (k, v) => v > 3)   // => { b: 4, c: 6 }
```
