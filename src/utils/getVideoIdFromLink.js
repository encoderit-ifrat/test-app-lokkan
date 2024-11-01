export function getVideoIdFromLink(link) {
  if (!link) {
    return;
  }
  const regex = /(?:\?|&)v=([^&]+)/;
  const match = link.match(regex);
  return match ? match[1] : null;
}
