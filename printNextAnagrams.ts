import { frenchWordList } from "./frenchWordList";
import { findAnagrams } from "./findAnagrams";

export function printNextAnagrams() {
	const timestamp: number = Date.now();
	const dateAsNumber: number = Math.floor(timestamp / (1000 * 3600 * 24));

	for (let i = 0; i < 15; i++) {
		const word = frenchWordList[(dateAsNumber + i) % frenchWordList.length];
		const anagrams = findAnagrams(word);
		console.log(`${ word }`);

		for (const anagram of anagrams) {
			console.log(`-> ${ anagram }`);
		}
	}
}
