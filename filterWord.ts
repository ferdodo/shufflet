import { findAnagrams } from "./findAnagrams";
import { commonFrenchWords } from "./commonFrenchWords";
import { levenshteinDifference } from "./levenshteinDifference";

export function filterWord(word: string, index: number, list: string[]): boolean {
   // filter duplicate values
   if (list.indexOf(word) !== index) {
     return false;
   }

	// filter small words
	if (word.length < 5) {
		return false;
	}

	let matchingCommonFrenchWords = commonFrenchWords

	for	(let i = 2; matchingCommonFrenchWords.length > 100; i++) {
		matchingCommonFrenchWords = commonFrenchWords.filter(w => w.startsWith(word.substring(0,i)))
	}

	if (matchingCommonFrenchWords.every((commonWord, i, list) => levenshteinDifference(word, commonWord) > 3)) {
		return false;
	}

	// filter word without anagrams
	const anagrams = findAnagrams(word);
	return anagrams.length > 2;
}
