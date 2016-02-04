export default function caller(fn, ...args) {
  return (...results) => {
    if(fn) {
      fn(...args, ...results);
    }
  };
}
