import { findAnagrams } from "./findAnagrams";

const anagrams = findAnagrams("volés");

if (!anagrams.includes("vélos")) {
	throw new Error("Anagram 'vélos' not found !");
}

if (anagrams.includes("volés")) {
	throw new Error("Word is included in anagrams !");
}

