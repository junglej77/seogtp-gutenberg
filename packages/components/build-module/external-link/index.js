/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedExternalLink(props, ref) {
  const {
    href,
    children,
    className,
    rel = '',
    ...additionalProps
  } = props;
  const optimizedRel = [...new Set([...rel.split(' '), 'external', 'noreferrer', 'noopener'].filter(Boolean))].join(' ');
  const classes = clsx('components-external-link', className);
  /* Anchor links are perceived as external links.
  This constant helps check for on page anchor links,
  to prevent them from being opened in the editor. */
  const isInternalAnchor = !!href?.startsWith('#');
  const onClickHandler = event => {
    if (isInternalAnchor) {
      event.preventDefault();
    }
    if (props.onClick) {
      props.onClick(event);
    }
  };
  return (
    /*#__PURE__*/
    /* eslint-disable react/jsx-no-target-blank */
    _jsxs("a", {
      ...additionalProps,
      className: classes,
      href: href,
      onClick: onClickHandler,
      target: "_blank",
      rel: optimizedRel,
      ref: ref,
      children: [/*#__PURE__*/_jsx("span", {
        className: "components-external-link__contents",
        children: children
      }), /*#__PURE__*/_jsx("span", {
        className: "components-external-link__icon",
        "aria-label": /* translators: accessibility text */
        __('(opens in a new tab)'),
        children: "\u2197"
      })]
    })
    /* eslint-enable react/jsx-no-target-blank */
  );
}

/**
 * Link to an external resource.
 *
 * ```jsx
 * import { ExternalLink } from '@wordpress/components';
 *
 * const MyExternalLink = () => (
 *   <ExternalLink href="https://wordpress.org">WordPress.org</ExternalLink>
 * );
 * ```
 */
export const ExternalLink = forwardRef(UnforwardedExternalLink);
export default ExternalLink;
//# sourceMappingURL=index.js.map