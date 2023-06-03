import { wordKey } from "./wordKey";
import { anagramsMap } from "./anagramsMap";

export function findAnagrams(word: string): string[] {
	const key: string = wordKey(word);
	const anagrams = anagramsMap.get(key) || [];
	return anagrams.filter(w => w !== word);
}
