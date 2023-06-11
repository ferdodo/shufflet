export function wordHint(str: string, percentage: number = 0.15): string {
  if (str.length <= 2) {
    return str;
  }

  const firstCharsCount = Math.ceil(str.length * percentage);
  const lastCharsCount = Math.ceil(str.length * percentage);

  const firstChars = str.substring(0, firstCharsCount);
  const lastChars = str.substring(str.length - lastCharsCount);
  const middleChars = 'ˍ'.repeat(str.length - firstCharsCount - lastCharsCount);

  return `${firstChars}${middleChars}${lastChars}`;
}
