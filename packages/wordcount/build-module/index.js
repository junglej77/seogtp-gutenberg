/**
 * Internal dependencies
 */
import { defaultSettings } from './defaultSettings';
import stripTags from './stripTags';
import transposeAstralsToCountableChar from './transposeAstralsToCountableChar';
import stripHTMLEntities from './stripHTMLEntities';
import stripConnectors from './stripConnectors';
import stripRemovables from './stripRemovables';
import stripHTMLComments from './stripHTMLComments';
import stripShortcodes from './stripShortcodes';
import stripSpaces from './stripSpaces';
import transposeHTMLEntitiesToCountableChars from './transposeHTMLEntitiesToCountableChars';

/**
 * @typedef {import('./defaultSettings').WPWordCountDefaultSettings}  WPWordCountSettings
 * @typedef {import('./defaultSettings').WPWordCountUserSettings}     WPWordCountUserSettings
 */

/**
 * Possible ways of counting.
 *
 * @typedef {'words'|'characters_excluding_spaces'|'characters_including_spaces'} WPWordCountStrategy
 */

/**
 * Private function to manage the settings.
 *
 * @param {WPWordCountStrategy}     type         The type of count to be done.
 * @param {WPWordCountUserSettings} userSettings Custom settings for the count.
 *
 * @return {WPWordCountSettings} The combined settings object to be used.
 */
function loadSettings(type, userSettings) {
  var _settings$l10n$shortc;
  const settings = Object.assign({}, defaultSettings, userSettings);
  settings.shortcodes = (_settings$l10n$shortc = settings.l10n?.shortcodes) !== null && _settings$l10n$shortc !== void 0 ? _settings$l10n$shortc : [];
  if (settings.shortcodes && settings.shortcodes.length) {
    settings.shortcodesRegExp = new RegExp('\\[\\/?(?:' + settings.shortcodes.join('|') + ')[^\\]]*?\\]', 'g');
  }
  settings.type = type;
  if (settings.type !== 'characters_excluding_spaces' && settings.type !== 'characters_including_spaces') {
    settings.type = 'words';
  }
  return settings;
}

/**
 * Count the words in text
 *
 * @param {string}              text     The text being processed
 * @param {RegExp}              regex    The regular expression pattern being matched
 * @param {WPWordCountSettings} settings Settings object containing regular expressions for each strip function
 *
 * @return {number} Count of words.
 */
function countWords(text, regex, settings) {
  var _text$match$length;
  text = [stripTags.bind(null, settings), stripHTMLComments.bind(null, settings), stripShortcodes.bind(null, settings), stripSpaces.bind(null, settings), stripHTMLEntities.bind(null, settings), stripConnectors.bind(null, settings), stripRemovables.bind(null, settings)].reduce((result, fn) => fn(result), text);
  text = text + '\n';
  return (_text$match$length = text.match(regex)?.length) !== null && _text$match$length !== void 0 ? _text$match$length : 0;
}

/**
 * Count the characters in text
 *
 * @param {string}              text     The text being processed
 * @param {RegExp}              regex    The regular expression pattern being matched
 * @param {WPWordCountSettings} settings Settings object containing regular expressions for each strip function
 *
 * @return {number} Count of characters.
 */
function countCharacters(text, regex, settings) {
  var _text$match$length2;
  text = [stripTags.bind(null, settings), stripHTMLComments.bind(null, settings), stripShortcodes.bind(null, settings), transposeAstralsToCountableChar.bind(null, settings), stripSpaces.bind(null, settings), transposeHTMLEntitiesToCountableChars.bind(null, settings)].reduce((result, fn) => fn(result), text);
  text = text + '\n';
  return (_text$match$length2 = text.match(regex)?.length) !== null && _text$match$length2 !== void 0 ? _text$match$length2 : 0;
}

/**
 * Count some words.
 *
 * @param {string}                  text         The text being processed
 * @param {WPWordCountStrategy}     type         The type of count. Accepts 'words', 'characters_excluding_spaces', or 'characters_including_spaces'.
 * @param {WPWordCountUserSettings} userSettings Custom settings object.
 *
 * @example
 * ```js
 * import { count } from '@wordpress/wordcount';
 * const numberOfWords = count( 'Words to count', 'words', {} )
 * ```
 *
 * @return {number} The word or character count.
 */
export function count(text, type, userSettings) {
  const settings = loadSettings(type, userSettings);
  let matchRegExp;
  switch (settings.type) {
    case 'words':
      matchRegExp = settings.wordsRegExp;
      return countWords(text, matchRegExp, settings);
    case 'characters_including_spaces':
      matchRegExp = settings.characters_including_spacesRegExp;
      return countCharacters(text, matchRegExp, settings);
    case 'characters_excluding_spaces':
      matchRegExp = settings.characters_excluding_spacesRegExp;
      return countCharacters(text, matchRegExp, settings);
    default:
      return 0;
  }
}
//# sourceMappingURL=index.js.map