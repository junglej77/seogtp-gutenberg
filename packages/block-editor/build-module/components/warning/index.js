/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Warning({
  className,
  actions,
  children,
  secondaryActions
}) {
  return /*#__PURE__*/_jsx("div", {
    style: {
      display: 'contents',
      all: 'initial'
    },
    children: /*#__PURE__*/_jsx("div", {
      className: clsx(className, 'block-editor-warning'),
      children: /*#__PURE__*/_jsxs("div", {
        className: "block-editor-warning__contents",
        children: [/*#__PURE__*/_jsx("p", {
          className: "block-editor-warning__message",
          children: children
        }), (Children.count(actions) > 0 || secondaryActions) && /*#__PURE__*/_jsxs("div", {
          className: "block-editor-warning__actions",
          children: [Children.count(actions) > 0 && Children.map(actions, (action, i) => /*#__PURE__*/_jsx("span", {
            className: "block-editor-warning__action",
            children: action
          }, i)), secondaryActions && /*#__PURE__*/_jsx(DropdownMenu, {
            className: "block-editor-warning__secondary",
            icon: moreVertical,
            label: __('More options'),
            popoverProps: {
              position: 'bottom left',
              className: 'block-editor-warning__dropdown'
            },
            noIcons: true,
            children: () => /*#__PURE__*/_jsx(MenuGroup, {
              children: secondaryActions.map((item, pos) => /*#__PURE__*/_jsx(MenuItem, {
                onClick: item.onClick,
                children: item.title
              }, pos))
            })
          })]
        })]
      })
    })
  });
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/warning/README.md
 */
export default Warning;
//# sourceMappingURL=index.js.map