/**
 * WordPress dependencies
 */
import { chevronRightSmall, chevronLeftSmall, Icon } from '@wordpress/icons';
import { isRTL } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export default function ListViewExpander({
  onClick
}) {
  return (
    /*#__PURE__*/
    // Keyboard events are handled by TreeGrid see: components/src/tree-grid/index.js
    //
    // The expander component is implemented as a pseudo element in the w3 example
    // https://www.w3.org/TR/wai-aria-practices/examples/treegrid/treegrid-1.html
    //
    // We've mimicked this by adding an icon with aria-hidden set to true to hide this from the accessibility tree.
    // For the current tree grid implementation, please do not try to make this a button.
    //
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    _jsx("span", {
      className: "block-editor-list-view__expander",
      onClick: event => onClick(event, {
        forceToggle: true
      }),
      "aria-hidden": "true",
      "data-testid": "list-view-expander",
      children: /*#__PURE__*/_jsx(Icon, {
        icon: isRTL() ? chevronLeftSmall : chevronRightSmall
      })
    })
  );
}
//# sourceMappingURL=expander.js.map