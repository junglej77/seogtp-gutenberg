/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Efficiently updates all the formats from `start` (including) until `end`
 * (excluding) with the active formats. Mutates `value`.
 *
 * @param {Object}        $1         Named paramentes.
 * @param {RichTextValue} $1.value   Value te update.
 * @param {number}        $1.start   Index to update from.
 * @param {number}        $1.end     Index to update until.
 * @param {Array}         $1.formats Replacement formats.
 *
 * @return {RichTextValue} Mutated value.
 */
export function updateFormats({ value, start, end, formats }: {
    value: RichTextValue;
    start: number;
    end: number;
    formats: any[];
}): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=update-formats.d.ts.map