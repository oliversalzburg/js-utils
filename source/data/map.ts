export class CountMap<T> extends Map<T, number> {
	override get(key: T): number {
		return super.get(key) ?? 0;
	}
}
