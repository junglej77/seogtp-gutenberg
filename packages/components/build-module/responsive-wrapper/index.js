/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { cloneElement, Children } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * A wrapper component that maintains its aspect ratio when resized.
 *
 * ```jsx
 * import { ResponsiveWrapper } from '@wordpress/components';
 *
 * const MyResponsiveWrapper = () => (
 * 	<ResponsiveWrapper naturalWidth={ 2000 } naturalHeight={ 680 }>
 * 		<img
 * 			src="https://s.w.org/style/images/about/WordPress-logotype-standard.png"
 * 			alt="WordPress"
 * 		/>
 * 	</ResponsiveWrapper>
 * );
 * ```
 */
function ResponsiveWrapper({
  naturalWidth,
  naturalHeight,
  children,
  isInline = false
}) {
  if (Children.count(children) !== 1) {
    return null;
  }
  const TagName = isInline ? 'span' : 'div';
  let aspectRatio;
  if (naturalWidth && naturalHeight) {
    aspectRatio = `${naturalWidth} / ${naturalHeight}`;
  }
  return /*#__PURE__*/_jsx(TagName, {
    className: "components-responsive-wrapper",
    children: /*#__PURE__*/_jsx("div", {
      children: cloneElement(children, {
        className: clsx('components-responsive-wrapper__content', children.props.className),
        style: {
          ...children.props.style,
          aspectRatio
        }
      })
    })
  });
}
export default ResponsiveWrapper;
//# sourceMappingURL=index.js.map