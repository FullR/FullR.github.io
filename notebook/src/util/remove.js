
export default function remove(arr, v) {
  const index = typeof v === "function" ? arr.findIndex(v) : arr.indexOf(v);
  if(index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
