export function levenshteinDifference(a: string, b: string): number {
    if (a.length == 0) {
    	return b.length;
    }

    if (b.length == 0) {
    	return a.length;
    }

    if (a[0] == b[0]) {
    	return levenshteinDifference(a.substring(1), b.substring(1));
    }

    return 1 + Math.min(
        levenshteinDifference(a, b.substring(1)),
        levenshteinDifference(a.substring(1), b),
        levenshteinDifference(a.substring(1), b.substring(1))
    );
}
