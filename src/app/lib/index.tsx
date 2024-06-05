export const primary_color = "#32572f";
export const secondary_color = "#7e9e7b";
export const font_color = "#7e9e7b";
export const formatMillis = (millis: number) => {
  const minutes = Math.floor(millis / (1000 * 60));
  const seconds = Math.floor((millis % (1000 * 60)) / 1000);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
