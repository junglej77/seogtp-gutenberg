/**
 * Adds a locale to moment, using the format supplied by `wp_localize_script()`.
 *
 * @param {DateSettings} dateSettings Settings, including locale data.
 */
export function setSettings(dateSettings: DateSettings): void;
/**
 * Returns the currently defined date settings.
 *
 * @return {DateSettings} Settings, including locale data.
 */
export function getSettings(): DateSettings;
/**
 * Returns the currently defined date settings.
 *
 * @deprecated
 * @return {DateSettings} Settings, including locale data.
 */
export function __experimentalGetSettings(): DateSettings;
/**
 * Formats a date. Does not alter the date's timezone.
 *
 * @param {string}                             dateFormat PHP-style formatting string.
 *                                                        See php.net/date.
 * @param {Moment | Date | string | undefined} dateValue  Date object or string,
 *                                                        parsable by moment.js.
 *
 * @return {string} Formatted date.
 */
export function format(dateFormat: string, dateValue?: Moment | Date | string | undefined): string;
/**
 * Formats a date (like `date()` in PHP).
 *
 * @param {string}                             dateFormat PHP-style formatting string.
 *                                                        See php.net/date.
 * @param {Moment | Date | string | undefined} dateValue  Date object or string, parsable
 *                                                        by moment.js.
 * @param {string | number | undefined}        timezone   Timezone to output result in or a
 *                                                        UTC offset. Defaults to timezone from
 *                                                        site.
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @see https://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC
 *
 * @return {string} Formatted date in English.
 */
export function date(dateFormat: string, dateValue: Moment | Date | string | undefined, timezone: string | number | undefined): string;
/**
 * Formats a date (like `date()` in PHP), in the UTC timezone.
 *
 * @param {string}                             dateFormat PHP-style formatting string.
 *                                                        See php.net/date.
 * @param {Moment | Date | string | undefined} dateValue  Date object or string,
 *                                                        parsable by moment.js.
 *
 * @return {string} Formatted date in English.
 */
export function gmdate(dateFormat: string, dateValue?: Moment | Date | string | undefined): string;
/**
 * Formats a date (like `wp_date()` in PHP), translating it into site's locale.
 *
 * Backward Compatibility Notice: if `timezone` is set to `true`, the function
 * behaves like `gmdateI18n`.
 *
 * @param {string}                                dateFormat PHP-style formatting string.
 *                                                           See php.net/date.
 * @param {Moment | Date | string | undefined}    dateValue  Date object or string, parsable by
 *                                                           moment.js.
 * @param {string | number | boolean | undefined} timezone   Timezone to output result in or a
 *                                                           UTC offset. Defaults to timezone from
 *                                                           site. Notice: `boolean` is effectively
 *                                                           deprecated, but still supported for
 *                                                           backward compatibility reasons.
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @see https://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC
 *
 * @return {string} Formatted date.
 */
export function dateI18n(dateFormat: string, dateValue: Moment | Date | string | undefined, timezone: string | number | boolean | undefined): string;
/**
 * Formats a date (like `wp_date()` in PHP), translating it into site's locale
 * and using the UTC timezone.
 *
 * @param {string}                             dateFormat PHP-style formatting string.
 *                                                        See php.net/date.
 * @param {Moment | Date | string | undefined} dateValue  Date object or string,
 *                                                        parsable by moment.js.
 *
 * @return {string} Formatted date.
 */
export function gmdateI18n(dateFormat: string, dateValue?: Moment | Date | string | undefined): string;
/**
 * Check whether a date is considered in the future according to the WordPress settings.
 *
 * @param {string} dateValue Date String or Date object in the Defined WP Timezone.
 *
 * @return {boolean} Is in the future.
 */
export function isInTheFuture(dateValue: string): boolean;
/**
 * Create and return a JavaScript Date Object from a date string in the WP timezone.
 *
 * @param {string?} dateString Date formatted in the WP timezone.
 *
 * @return {Date} Date
 */
export function getDate(dateString: string | null): Date;
/**
 * Returns a human-readable time difference between two dates, like human_time_diff() in PHP.
 *
 * @param {Moment | Date | string}             from From date, in the WP timezone.
 * @param {Moment | Date | string | undefined} to   To date, formatted in the WP timezone.
 *
 * @return {string} Human-readable time difference.
 */
export function humanTimeDiff(from: Moment | Date | string, to: Moment | Date | string | undefined): string;
export type Moment = import("moment").Moment;
export type MomentLocaleSpecification = import("moment").LocaleSpecification;
export type MeridiemConfig = {
    /**
     * Lowercase AM.
     */
    am: string;
    /**
     * Uppercase AM.
     */
    AM: string;
    /**
     * Lowercase PM.
     */
    pm: string;
    /**
     * Uppercase PM.
     */
    PM: string;
};
export type FormatsConfig = {
    /**
     * Time format.
     */
    time: string;
    /**
     * Date format.
     */
    date: string;
    /**
     * Datetime format.
     */
    datetime: string;
    /**
     * Abbreviated datetime format.
     */
    datetimeAbbreviated: string;
};
export type TimezoneConfig = {
    /**
     * Offset setting.
     */
    offset: string;
    /**
     * Offset setting with decimals formatted to minutes.
     */
    offsetFormatted: string;
    /**
     * The timezone as a string (e.g., `'America/Los_Angeles'`).
     */
    string: string;
    /**
     * Abbreviation for the timezone.
     */
    abbr: string;
};
export type L10nSettings = {
    /**
     * Moment locale.
     */
    locale: string;
    /**
     * Locale months.
     */
    months: MomentLocaleSpecification["months"];
    /**
     * Locale months short.
     */
    monthsShort: MomentLocaleSpecification["monthsShort"];
    /**
     * Locale weekdays.
     */
    weekdays: MomentLocaleSpecification["weekdays"];
    /**
     * Locale weekdays short.
     */
    weekdaysShort: MomentLocaleSpecification["weekdaysShort"];
    /**
     * Meridiem config.
     */
    meridiem: MeridiemConfig;
    /**
     * Relative time config.
     */
    relative: MomentLocaleSpecification["relativeTime"];
    /**
     * Day that the week starts on.
     */
    startOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
export type DateSettings = {
    /**
     * Localization settings.
     */
    l10n: L10nSettings;
    /**
     * Date/time formats config.
     */
    formats: FormatsConfig;
    /**
     * Timezone settings.
     */
    timezone: TimezoneConfig;
};
//# sourceMappingURL=index.d.ts.map