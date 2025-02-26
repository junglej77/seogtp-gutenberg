/**
 * Create a RichText value from an `Element` tree (DOM), an HTML string or a
 * plain text string, with optionally a `Range` object to set the selection. If
 * called without any input, an empty value will be created. The optional
 * functions can be used to filter out content.
 *
 * A value will have the following shape, which you are strongly encouraged not
 * to modify without the use of helper functions:
 *
 * ```js
 * {
 *   text: string,
 *   formats: Array,
 *   replacements: Array,
 *   ?start: number,
 *   ?end: number,
 * }
 * ```
 *
 * As you can see, text and formatting are separated. `text` holds the text,
 * including any replacement characters for objects and lines. `formats`,
 * `objects` and `lines` are all sparse arrays of the same length as `text`. It
 * holds information about the formatting at the relevant text indices. Finally
 * `start` and `end` state which text indices are selected. They are only
 * provided if a `Range` was given.
 *
 * @param {Object}  [$1]                          Optional named arguments.
 * @param {Element} [$1.element]                  Element to create value from.
 * @param {string}  [$1.text]                     Text to create value from.
 * @param {string}  [$1.html]                     HTML to create value from.
 * @param {Range}   [$1.range]                    Range to create value from.
 * @param {boolean} [$1.__unstableIsEditableTree]
 * @return {RichTextValue} A rich text value.
 */
export function create({ element, text, html, range, __unstableIsEditableTree: isEditableTree, }?: {
    element?: Element | undefined;
    text?: string | undefined;
    html?: string | undefined;
    range?: Range | undefined;
    __unstableIsEditableTree?: boolean | undefined;
} | undefined): RichTextValue;
/**
 * Removes reserved characters used by rich-text (zero width non breaking spaces
 * added by `toTree` and object replacement characters).
 *
 * @param {string} string
 */
export function removeReservedCharacters(string: string): string;
/**
 * The RichTextData class is used to instantiate a wrapper around rich text
 * values, with methods that can be used to transform or manipulate the data.
 *
 * - Create an empty instance: `new RichTextData()`.
 * - Create one from an HTML string: `RichTextData.fromHTMLString(
 *   '<em>hello</em>' )`.
 * - Create one from a wrapper HTMLElement: `RichTextData.fromHTMLElement(
 *   document.querySelector( 'p' ) )`.
 * - Create one from plain text: `RichTextData.fromPlainText( '1\n2' )`.
 * - Create one from a rich text value: `new RichTextData( { text: '...',
 *   formats: [ ... ] } )`.
 *
 * @todo Add methods to manipulate the data, such as applyFormat, slice etc.
 */
export class RichTextData {
    static empty(): RichTextData;
    static fromPlainText(text: any): RichTextData;
    static fromHTMLString(html: any): RichTextData;
    static fromHTMLElement(htmlElement: any, options?: {}): RichTextData;
    constructor(init?: {
        formats: never[];
        replacements: never[];
        text: string;
    });
    toPlainText(): string;
    toHTMLString({ preserveWhiteSpace }?: {
        preserveWhiteSpace: any;
    }): any;
    valueOf(): any;
    toString(): any;
    toJSON(): any;
    get length(): number;
    get formats(): never[];
    get replacements(): never[];
    get text(): string;
    #private;
}
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=create.d.ts.map