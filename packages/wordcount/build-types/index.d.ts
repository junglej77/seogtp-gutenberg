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
export function count(text: string, type: WPWordCountStrategy, userSettings: WPWordCountUserSettings): number;
export type WPWordCountSettings = import("./defaultSettings").WPWordCountDefaultSettings;
export type WPWordCountUserSettings = import("./defaultSettings").WPWordCountUserSettings;
/**
 * Possible ways of counting.
 */
export type WPWordCountStrategy = "words" | "characters_excluding_spaces" | "characters_including_spaces";
//# sourceMappingURL=index.d.ts.map