import type { TextHighlightProps } from './types';
/**
 * Highlights occurrences of a given string within another string of text. Wraps
 * each match with a `<mark>` tag which provides browser default styling.
 *
 * ```jsx
 * import { TextHighlight } from '@wordpress/components';
 *
 * const MyTextHighlight = () => (
 *   <TextHighlight
 *     text="Why do we like Gutenberg? Because Gutenberg is the best!"
 *     highlight="Gutenberg"
 *   />
 * );
 * ```
 */
export declare const TextHighlight: (props: TextHighlightProps) => import("react").JSX.Element;
export default TextHighlight;
//# sourceMappingURL=index.d.ts.map