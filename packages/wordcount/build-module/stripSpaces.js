/**
 * Replaces items matched in the regex with spaces.
 *
 * @param {import('./index').WPWordCountSettings} settings The main settings object containing regular expressions
 * @param {string}                                text     The string being counted.
 *
 * @return {string} The manipulated text.
 */
export default function stripSpaces(settings, text) {
  return text.replace(settings.spaceRegExp, ' ');
}
//# sourceMappingURL=stripSpaces.js.map