export const stringTrimmer = (data) => {
  let text = data;
  if (text.length <= 40) return text;
  return text.slice(0, 40) + "...";
};
/**
 *
 * Hàm render sao :)
 * Nhận vào số điểm rating, <Component/> tương ứng 1*, 1/2* và 0*
 * Render ra số sao tương ứng với rating
 */
export const showRating = (rating, one, half, none) => {
  const maxRate = rating / 2;
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
    output.push(half);
  }
  noStar = 5 - oneStar - halfStar;
  for (let i = 1; i <= noStar; i++) {
    output.push(none);
  }
  return output.map((item, index) => <span key={index}>{item}</span>);
};
/**
 * Render nhận diện rạp, truyền vào mã rạp và sẽ nhận được giá trị viết tắt
 */
export const getStandFor = (fullName) => {
  const cinemaStyles = {
    BHD: {
      color: "green-600",
    },
    CGV: {
      color: "red-500",
    },
    CNS: {
      color: "yellow-400",
    },
    GLX: {
      color: "orange-500",
    },
    Lotte: {
      color: "red-500",
    },
    MegaGS: {
      color: "orange-500",
    },
  };
  const shortName = fullName.trim().split(" ")[0];
  const cinemaStyle = cinemaStyles[shortName];

  if (!cinemaStyle) {
    return fullName;
  }

  const { color } = cinemaStyle;
  const special = (
    <span className={`text-${color} font-bold`} key="x">
      {shortName}
    </span>
  );

  return [special, fullName.replace(shortName, "")]
};
