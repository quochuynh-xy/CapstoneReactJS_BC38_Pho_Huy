export const stringTrimmer = (data, length) => {
    let text = data;
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };