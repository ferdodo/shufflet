export function findAnagrams(word: string, list: string[]): string[] {
  const sortedWord: string = word.toLowerCase().split('').sort().join('');
  const sameLengthWords: string[] = list.filter(w => w.length === word.length);

  const anagrams = sameLengthWords.filter(w => {
      const sortedW = w.toLowerCase().split('').sort().join('');
      return sortedW === sortedWord && w.toLowerCase() !== word.toLowerCase();
  });

	function onlyUnique(value, index, array) {
	  return array.indexOf(value) === index;
	}

  return anagrams.filter(onlyUnique);
}
