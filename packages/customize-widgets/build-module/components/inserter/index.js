/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as customizeWidgetsStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Inserter({
  setIsOpened
}) {
  const inserterTitleId = useInstanceId(Inserter, 'customize-widget-layout__inserter-panel-title');
  const insertionPoint = useSelect(select => select(customizeWidgetsStore).__experimentalGetInsertionPoint(), []);
  return /*#__PURE__*/_jsxs("div", {
    className: "customize-widgets-layout__inserter-panel",
    "aria-labelledby": inserterTitleId,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "customize-widgets-layout__inserter-panel-header",
      children: [/*#__PURE__*/_jsx("h2", {
        id: inserterTitleId,
        className: "customize-widgets-layout__inserter-panel-header-title",
        children: __('Add a block')
      }), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "customize-widgets-layout__inserter-panel-header-close-button",
        icon: closeSmall,
        onClick: () => setIsOpened(false),
        "aria-label": __('Close inserter')
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "customize-widgets-layout__inserter-panel-content",
      children: /*#__PURE__*/_jsx(Library, {
        rootClientId: insertionPoint.rootClientId,
        __experimentalInsertionIndex: insertionPoint.insertionIndex,
        showInserterHelpPanel: true,
        onSelect: () => setIsOpened(false)
      })
    })]
  });
}
export default Inserter;
//# sourceMappingURL=index.js.map