globalThis.wordListMock = ["volés", "vélos"];

// @ts-ignore
import("./findAnagrams.test")
	.catch(function(error) {
		console.error(error);
		process.exit(-1)
	});
