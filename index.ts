import { createApp, ref, Ref, onUnmounted/*, computed*/ } from "vue";
import { render } from "./template";
import { wordOfTheDay$ } from "./wordOfTheDay";
import { findAnagrams } from "./findAnagrams";
import { frenchWordList } from "./frenchWordList";
import "cookies-ds";

export const app = createApp({
	setup() {
		const wordOfTheDay: Ref<string | null> = ref(null);
		const anagrams: Ref<any | null> = ref(null);
		const found: Ref<Record<string, boolean>> = ref({});

		const wordOfTheDaySub = wordOfTheDay$.subscribe(function(value) {
			wordOfTheDay.value = value;
			anagrams.value = findAnagrams(value, frenchWordList);
		});

		function tryWord(word, anagram) {
			if (word === anagram) {
				found.value = {
					...found.value,
					[word]: true
				};
			}
		}

		onUnmounted(wordOfTheDaySub.unsubscribe);

		return { 
			wordOfTheDay,
			anagrams,
			tryWord,
			found
		};
	},
	render
});

app.mount("body");
