/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { memo } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InspectorControls from '../components/inspector-controls';
import { useHasTypographyPanel } from '../components/global-styles/typography-panel';
import { store as blockEditorStore } from '../store';
import { LINE_HEIGHT_SUPPORT_KEY, LineHeightEdit } from './line-height';
import { FONT_SIZE_SUPPORT_KEY, FontSizeEdit } from './font-size';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const TYPOGRAPHY_SUPPORT_KEY = 'typography';
export const TYPOGRAPHY_SUPPORT_KEYS = [LINE_HEIGHT_SUPPORT_KEY, FONT_SIZE_SUPPORT_KEY];
function TypographyPanelPure({
  clientId,
  setAttributes,
  settings
}) {
  function selector(select) {
    const {
      style,
      fontFamily,
      fontSize
    } = select(blockEditorStore).getBlockAttributes(clientId) || {};
    return {
      style,
      fontFamily,
      fontSize
    };
  }
  const {
    style,
    fontSize
  } = useSelect(selector, [clientId]);
  const isEnabled = useHasTypographyPanel(settings);
  if (!isEnabled) {
    return null;
  }
  const props = {
    attributes: {
      fontSize,
      style
    },
    setAttributes
  };
  return /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Typography'),
      children: [/*#__PURE__*/_jsx(FontSizeEdit, {
        ...props
      }), /*#__PURE__*/_jsx(LineHeightEdit, {
        ...props
      })]
    })
  });
}

// We don't want block controls to re-render when typing inside a block. `pure`
// will prevent re-renders unless props change, so only pass the needed props
// and not the whole attributes object.
export const TypographyPanel = memo(TypographyPanelPure);
//# sourceMappingURL=typography.native.js.map