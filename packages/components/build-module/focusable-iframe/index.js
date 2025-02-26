/**
 * WordPress dependencies
 */
import { useMergeRefs, useFocusableIframe } from '@wordpress/compose';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
export default function FocusableIframe({
  iframeRef,
  ...props
}) {
  const ref = useMergeRefs([iframeRef, useFocusableIframe()]);
  deprecated('wp.components.FocusableIframe', {
    since: '5.9',
    alternative: 'wp.compose.useFocusableIframe'
  });
  // Disable reason: The rendered iframe is a pass-through component,
  // assigning props inherited from the rendering parent. It's the
  // responsibility of the parent to assign a title.
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return /*#__PURE__*/_jsx("iframe", {
    ref: ref,
    ...props
  });
}
//# sourceMappingURL=index.js.map