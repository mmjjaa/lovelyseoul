export const checkKorean = (name) => {
  if (typeof name !== "string" || name.length === 0) {
    return "";
  }

  const lastChar = name.charCodeAt(name.length - 1);
  const isThereLastChar = (lastChar - 0xac00) % 28 !== 0;
  return isThereLastChar ? "은" : "는";
};
