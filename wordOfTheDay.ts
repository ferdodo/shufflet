import { frenchWordList } from "./frenchWordList";
import { Observable, share } from "rxjs";

console.log({ frenchWordList });

function getTimeToTomorrow(): number {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  const totalSecondsInADay = 86400;
  const margin = 1;
  return (totalSecondsInADay - totalSecondsToday + margin) * 1000;
}

function getTodaysWord(): string {
	const timestamp: number = Date.now();
	const dateAsNumber: number = Math.floor(timestamp / (1000 * 3600 * 24));
	//return frenchWordList[Math.floor(Math.random()*frenchWordList.length)];
	return frenchWordList[dateAsNumber % frenchWordList.length];
}

export const wordOfTheDay$ = new Observable<string>(function(subscriber) {
	let todaysWord: string = getTodaysWord();
	subscriber.next(todaysWord);

	async function handleFutureDays() {
		while (true) {
			const timeUntilTomorrow: number = getTimeToTomorrow();
			await new Promise(r => setTimeout(r, timeUntilTomorrow));
			todaysWord = getTodaysWord();
			subscriber.next(todaysWord);
		}
	}

	handleFutureDays().catch(console.error);
})
	.pipe(share());
