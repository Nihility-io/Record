import { assertEquals } from "@std/assert"
import { NestedRecord, Record } from "./mod.ts"

Deno.test("Functions", async (t) => {
	const r: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
	const n: NestedRecord<number> = {
		a: 1,
		b: 2,
		c: 3,
		d: {
			a: 1,
			b: 2,
		},
		e: 5,
		f: 6,
	}

	await t.step("Keys", () => {
		assertEquals(Record.keys(r), ["a", "b", "c", "d", "e", "f"])
	})

	await t.step("Values", () => {
		assertEquals(Record.values(r), [1, 2, 3, 4, 5, 6])
	})

	await t.step("Map", () => {
		assertEquals(Record.map(r, (_k, v, i) => v * 2 + i), { a: 2, b: 5, c: 8, d: 11, e: 14, f: 17 })
	})

	await t.step("MapToArray", () => {
		assertEquals(Record.mapToArray(r, (_k, v, i) => v * 2 + i), [2, 5, 8, 11, 14, 17])
	})

	await t.step("Filter", () => {
		assertEquals(Record.filter(r, (_k, v, _i) => v % 2 === 0), { b: 2, d: 4, f: 6 })
	})

	await t.step("Reduce", () => {
		assertEquals(Record.reduce(r, (_k, p, v, _i) => p + v, 0), 21)
	})

	await t.step("IsRecord", () => {
		assertEquals(Record.isRecord(r), true)
		assertEquals(Record.isRecord({}), true)
		assertEquals(Record.isRecord(undefined), false)
		assertEquals(Record.isRecord(null), false)
		assertEquals(Record.isRecord(5), false)
		assertEquals(Record.isRecord(""), false)
		assertEquals(Record.isRecord(new class {}()), false)
	})

	await t.step("Flatten", () => {
		assertEquals(Record.flatten(n), { a: 1, b: 2, c: 3, "d.a": 1, "d.b": 2, e: 5, f: 6 })
	})
})
