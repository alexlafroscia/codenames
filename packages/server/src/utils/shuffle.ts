/**
 * The Fisher-Yates (Knuth) shuffle
 *
 * https://stackoverflow.com/a/2450976/2250435
 *
 * @param inputArray the array to randomize
 */
export default function shuffle<T>(inputArray: Array<T>): Array<T> {
  let outputArray = [...inputArray];
  let currentIndex = inputArray.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = outputArray[currentIndex];
    outputArray[currentIndex] = outputArray[randomIndex];
    outputArray[randomIndex] = temporaryValue;
  }

  return outputArray;
}
