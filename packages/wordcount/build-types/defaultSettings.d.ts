export namespace defaultSettings {
    let HTMLRegExp: RegExp;
    let HTMLcommentRegExp: RegExp;
    let spaceRegExp: RegExp;
    let HTMLEntityRegExp: RegExp;
    let connectorRegExp: RegExp;
    let removeRegExp: RegExp;
    let astralRegExp: RegExp;
    let wordsRegExp: RegExp;
    let characters_excluding_spacesRegExp: RegExp;
    let characters_including_spacesRegExp: RegExp;
    namespace l10n {
        let type: string;
    }
}
export type WPWordCountStrategy = import("./index").WPWordCountStrategy;
export type WPWordCountL10n = Partial<{
    type: WPWordCountStrategy;
    shortcodes: string[];
}>;
export type WPWordCountSettingsFields = {
    /**
     * Regular expression that matches HTML tags
     */
    HTMLRegExp: RegExp;
    /**
     * Regular expression that matches HTML comments
     */
    HTMLcommentRegExp: RegExp;
    /**
     * Regular expression that matches spaces in HTML
     */
    spaceRegExp: RegExp;
    /**
     * Regular expression that matches HTML entities
     */
    HTMLEntityRegExp: RegExp;
    /**
     * Regular expression that matches word connectors, like em-dash
     */
    connectorRegExp: RegExp;
    /**
     * Regular expression that matches various characters to be removed when counting
     */
    removeRegExp: RegExp;
    /**
     * Regular expression that matches astral UTF-16 code points
     */
    astralRegExp: RegExp;
    /**
     * Regular expression that matches words
     */
    wordsRegExp: RegExp;
    /**
     * Regular expression that matches characters excluding spaces
     */
    characters_excluding_spacesRegExp: RegExp;
    /**
     * Regular expression that matches characters including spaces
     */
    characters_including_spacesRegExp: RegExp;
    /**
     * Regular expression that matches WordPress shortcodes
     */
    shortcodesRegExp: RegExp;
    /**
     * List of all shortcodes
     */
    shortcodes: string[];
    /**
     * Describes what and how are we counting
     */
    type: WPWordCountStrategy;
    /**
     * Object with human translations
     */
    l10n: WPWordCountL10n;
};
/**
 * Lower-level settings for word counting that can be overridden.
 */
export type WPWordCountUserSettings = Partial<WPWordCountSettingsFields>;
/**
 * Word counting settings that include non-optional values we set if missing
 */
export type WPWordCountDefaultSettings = WPWordCountUserSettings & typeof defaultSettings;
//# sourceMappingURL=defaultSettings.d.ts.map