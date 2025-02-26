import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BlockStyles from '../block-styles';
import InspectorControls from '../inspector-controls';
import { useBorderPanelLabel } from '../../hooks/border';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const StyleTab = ({
  blockName,
  clientId,
  hasBlockStyles
}) => {
  const borderPanelLabel = useBorderPanelLabel({
    blockName
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [hasBlockStyles && /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Styles'),
        children: /*#__PURE__*/_jsx(BlockStyles, {
          clientId: clientId
        })
      })
    }), /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "color",
      label: __('Color'),
      className: "color-block-support-panel__inner-wrapper"
    }), /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "background",
      label: __('Background image')
    }), /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "filter"
    }), /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "typography",
      label: __('Typography')
    }), /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "border",
      label: borderPanelLabel
    }), /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "styles"
    })]
  });
};
export default StyleTab;
//# sourceMappingURL=seogtp-style-tab.js.map