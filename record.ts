export type RecordMapper<K extends string | number | symbol, V, R> = (key: K, value: V, index: number) => R
export type RecordFilter<K extends string | number | symbol, V> = (key: K, value: V, index: number) => boolean
export type RecordReducer<K extends string | number | symbol, V, R> = (
	key: K,
	previousValue: R,
	currentValue: V,
	index: number,
) => R
export type NestedRecord<V> = { [key: string]: NestedRecordField<V> }
export type NestedRecordField<V> = V | NestedRecord<V>

/**
 * Gets the keys of a record
 * @param r Record
 */
const keys = <K extends string | number | symbol, V>(r: Record<K, V>): K[] => Object.keys(r) as K[]

/**
 * Gets the values of a record
 * @param r Record
 */
const values = <K extends string | number | symbol, V>(r: Record<K, V>): V[] => Object.values(r) as V[]

/**
 * Creates a new record with the transformed values
 * @param r Record
 * @param f Transform function
 */
const map = <K extends string | number | symbol, V, R>(r: Record<K, V>, f: RecordMapper<K, V, R>): Record<K, R> =>
	keys(r).reduce((res, k, i) => ({ ...res, [k]: f(k, r[k], i) }), {} as Record<K, R>)

/**
 * Creates an array with the transformed values
 * @param r Record
 * @param f Transform function
 */
const mapToArray = <K extends string | number | symbol, V, R>(r: Record<K, V>, f: RecordMapper<K, V, R>): R[] =>
	values(map(r, f))

/**
 * Creates a new record that only includes the key-values matching the condition
 * @param r Record
 * @param f Condition
 */
const filter = <K extends string | number | symbol, V>(r: Record<K, V>, f: RecordFilter<K, V>): Record<K, V> =>
	keys(r).reduce((res, k, i) => (f(k, r[k], i) ? { ...res, [k]: r[k] } : { ...res }), {} as Record<K, V>)

/**
 * Creates a new record that only includes the key-values matching the condition
 * @param r Record
 * @param f Condition
 */
const reduce = <K extends string | number | symbol, V, R>(
	r: Record<K, V>,
	f: RecordReducer<K, V, R>,
	initialValue: R,
): R => keys(r).reduce((p, k, i) => f(k, p, r[k], i), initialValue)

/**
 * Checks if a give object is a record
 * @param obj Object to test
 */
export const isRecord = (obj: unknown): obj is Record<string | number | symbol, unknown> =>
	!!obj && Object.getPrototypeOf(obj) === Object.prototype

/**
 * Flattens a nested record into a flat record, where each key represents the path to the original value
 * @param r Record
 */
export const flatten = <V>(r: NestedRecord<V>): Record<string, V> => {
	const res: Record<string, V> = {}
	for (const [key, value] of Object.entries(r)) {
		if (value && typeof value === "object") {
			const flatObject = flatten(value as NestedRecord<V>)
			for (const x in flatObject) {
				res[`${key}.${x}`] = flatObject[x]
			}
		} else {
			res[key] = value as V
		}
	}
	return res
}

export const Record = { keys, values, map, mapToArray, filter, reduce, isRecord, flatten }
