/**
 * Mapper function used for mapping a record value to a different value
 */
export type RecordMapper<K extends string | number | symbol, V, R> = (key: K, value: V, index: number) => R

/**
 * Filter function used for determining if the record value should be filtered out
 */
export type RecordFilter<K extends string | number | symbol, V> = (key: K, value: V, index: number) => boolean

/**
 * Reduce function used for reducing a record into a single value
 */
export type RecordReducer<K extends string | number | symbol, V, R> = (
	key: K,
	previousValue: R,
	currentValue: V,
	index: number,
) => R

/**
 * Used for working with nested records
 */
export type NestedRecord<V> = { [key: string]: NestedRecordField<V> }

/**
 * Used for working with nested records
 */
export type NestedRecordField<V> = V | NestedRecord<V>
