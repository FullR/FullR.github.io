
/*
  Takes desired width or height and source width and height and
  fills in missing information to maintain correct ratios.
  If both width and height are passed, they are used as-is

  Example:
  maintainRatios({width: 500, height: 250}, {width: 100}); // output: {width: 100, height: 50}
*/
export default function maintainRatios({width:originalWidth, height:originalHeight}, {width, height}={}) {
  const wNum = typeof width === "number";
  const hNum = typeof height === "number";
  if(wNum && hNum) {
    return {width, height};
  } else if(wNum) {
    return {width, height: originalHeight * (width / originalWidth)};
  } else if(hNum) {
    return {width: originalWidth * (height / originalHeight), height};
  } else {
    return {width: originalWidth, height: originalHeight};
  }
}
