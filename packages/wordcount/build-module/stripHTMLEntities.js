/**
 * Removes items matched in the regex.
 *
 * @param {import('./index').WPWordCountSettings} settings The main settings object containing regular expressions
 * @param {string}                                text     The string being counted.
 *
 * @return {string} The manipulated text.
 */
export default function stripHTMLEntities(settings, text) {
  return text.replace(settings.HTMLEntityRegExp, '');
}
//# sourceMappingURL=stripHTMLEntities.js.map