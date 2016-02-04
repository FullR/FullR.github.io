export default function noBubble(handler) {
  return function noBubbleEventHandler(event) {
    event.stopPropagation();
    if(handler) {
      handler(event);
    }
  };
}
