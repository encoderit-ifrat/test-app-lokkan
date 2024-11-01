// utils/stripHtmlTags.js
import { convert } from "html-to-text";

export function stripHtmlTags(htmlString) {
  const TextString = convert(htmlString, {
    wordwrap: 130,
    selectors: [{ selector: "a", format: "inline" }],
  });
  let plainText = TextString.replace(/<[^>]+>/g, "");
  // Remove unnecessary whitespace characters
  plainText = plainText.replace(/\s+/g, " ").trim();
  return plainText;
}
