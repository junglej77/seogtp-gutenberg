/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { transformStyles, store as blockEditorStore } from '@wordpress/block-editor';
import { SandBox } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

// Default styles used to unset some of the styles
// that might be inherited from the editor style.
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_STYLES = `
	html,body,:root {
		margin: 0 !important;
		padding: 0 !important;
		overflow: visible !important;
		min-height: auto !important;
	}
`;
export default function HTMLEditPreview({
  content,
  isSelected
}) {
  const settingStyles = useSelect(select => select(blockEditorStore).getSettings().styles);
  const styles = useMemo(() => [DEFAULT_STYLES, ...transformStyles(settingStyles.filter(style => style.css))], [settingStyles]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(SandBox, {
      html: content,
      styles: styles,
      title: __('Custom HTML Preview'),
      tabIndex: -1
    }), !isSelected && /*#__PURE__*/_jsx("div", {
      className: "block-library-html__preview-overlay"
    })]
  });
}
//# sourceMappingURL=preview.js.map