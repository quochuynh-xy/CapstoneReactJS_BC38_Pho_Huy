export const stringTrimmer = (data) => {
  let text = data;
  if (text.length <= 40) return text;
  return text.slice(0, 40) + "...";
};
export const showRating = (rating, one, half, none) => {
  const maxRate = rating/2;
  let halfStar = +maxRate.toFixed(2).split(".")[1];
  let oneStar = Math.floor(maxRate);
  let output = [];
  let noStar = 0;
  for (let i = 1; i <= oneStar; i++) {
    output.push(one);
  }
  if (halfStar < 0.5) {
    halfStar = 0;
  } else {
    halfStar = 1;
    output.push(half)
  }
  noStar = 5 - oneStar - halfStar;
  for(let i = 1; i<=noStar; i++) {
    output.push(none)
  }
  return output.map( (item, index) => <span key={index}>{item}</span>)
};
