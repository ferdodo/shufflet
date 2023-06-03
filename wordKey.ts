export function wordKey(word: string): string {
	// Use this to ignore accents .replace(/[\u0300-\u036f]/g, "")
	return word.split('').sort().join('');
}
