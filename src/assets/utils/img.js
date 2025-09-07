export function imgUrl(thumbnail) {
  if (!thumbnail) return "";
  return `${thumbnail.path}.${thumbnail.extension}`;
}
