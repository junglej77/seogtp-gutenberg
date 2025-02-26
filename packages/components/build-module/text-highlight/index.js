/**
 * WordPress dependencies
 */
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { escapeRegExp } from '../utils/strings';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
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
export const TextHighlight = props => {
  const {
    text = '',
    highlight = ''
  } = props;
  const trimmedHighlightText = highlight.trim();
  if (!trimmedHighlightText) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: text
    });
  }
  const regex = new RegExp(`(${escapeRegExp(trimmedHighlightText)})`, 'gi');
  return createInterpolateElement(text.replace(regex, '<mark>$&</mark>'), {
    mark: /*#__PURE__*/_jsx("mark", {})
  });
};
export default TextHighlight;
//# sourceMappingURL=index.js.map