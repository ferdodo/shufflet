import { frenchWordList } from "./frenchWordList";
import { normalizeWord } from "./normalizeWord";
import { filterWord } from "./filterWord";

export function printWordList() {
	const printableList = frenchWordList.map(normalizeWord)
		.filter(filterWord);

	console.log(printableList);
}
