/**
 * WordPress dependencies
 */
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { usePatterns } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function QueryToolbar({
  openPatternSelectionModal,
  name,
  clientId
}) {
  const hasPatterns = !!usePatterns(clientId, name).length;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: hasPatterns && /*#__PURE__*/_jsx(ToolbarGroup, {
      className: "wp-block-template-part__block-control-group",
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        onClick: openPatternSelectionModal,
        children: __('Replace')
      })
    })
  });
}
//# sourceMappingURL=query-toolbar.js.map