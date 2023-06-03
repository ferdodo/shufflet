import { createApp, ref, Ref, onUnmounted/*, computed*/ } from "vue";
import { render } from "./template";
import { wordOfTheDay$ } from "./wordOfTheDay";
import { findAnagrams } from "./findAnagrams";
import { printNextAnagrams } from "./printNextAnagrams";
import { printWordList } from "./printWordList";
import { wordHint } from "./wordHint";
import "cookies-ds";

globalThis.shufflet_printNextAnagrams = printNextAnagrams;
globalThis.shufflet_printWordList = printWordList;
globalThis.shufflet_findAnagrams = findAnagrams;

export const app = createApp({
	setup() {
		const wordOfTheDay: Ref<string | null> = ref(null);
		const anagrams: Ref<string[]> = ref([]);
		const found: Ref<Record<string, boolean>> = ref({});

		const wordOfTheDaySub = wordOfTheDay$.subscribe(function(value) {
			wordOfTheDay.value = value;
			anagrams.value = findAnagrams(value);
		});

		function tryWord(word: string, i: number) {
			if (anagrams.value.includes(word)) {
				const previousPosition: number = anagrams.value.findIndex(w => w === word);

				if (previousPosition === -1) {
					throw new Error("Position of word not found !");
				}
				
				const newAnagramsOrder: string[] = [...anagrams.value];
				newAnagramsOrder.splice(previousPosition, 1);
				newAnagramsOrder.splice(i, 0, word);
				anagrams.value = newAnagramsOrder;
			
				found.value = {
					...found.value,
					[word]: true
				};
			}
		}

		function share() {
			const date = new Date();
			const year = date.getFullYear();
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const day = ('0' + date.getDate()).slice(-2);
			const formattedDate = `${year}/${month}/${day}`;
			let text = `Shufflet ${formattedDate} - ${ wordOfTheDay.value }`;

			for (const anagram of anagrams.value) {
				text += `\n${ wordHint(anagram) }`
			}

			text += `\n\nhttps://ferdodo.github.io/shufflet`;
			navigator.clipboard.writeText(text);
		}

		onUnmounted(wordOfTheDaySub.unsubscribe);

		return { 
			wordOfTheDay,
			anagrams,
			tryWord,
			found,
			wordHint,
			share
		};
	},
	render
});

app.mount("body");
