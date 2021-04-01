export function chunk(arr: any[], len: number) {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}

export const range = (start: number, end: number) => Array.from(Array(end + 1).keys()).slice(start);
