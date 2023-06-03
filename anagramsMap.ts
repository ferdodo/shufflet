import { frenchWordList } from "./frenchWordList";
import { wordKey } from "./wordKey";

export const anagramsMap = createAnagramsMap();

function createAnagramsMap(): Map<string, string[]> {
	const anagramsMap = new Map<string, string[]>();

	for (const w of frenchWordList) {
		const key = wordKey(w);
		const anagrams = anagramsMap.get(key) || [];
		anagramsMap.set(key, [...new Set([...anagrams, w])]);
	}

	return anagramsMap;
}
