/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, useInnerBlocksProps, store as blockEditorStore, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const TEMPLATE = [['core/paragraph', {
  placeholder: __('Type / to add a hidden block')
}]];
function DetailsEdit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    showContent,
    summary
  } = attributes;
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE,
    __experimentalCaptureToolbars: true
  });

  // Check if either the block or the inner blocks are selected.
  const hasSelection = useSelect(select => {
    const {
      isBlockSelected,
      hasSelectedInnerBlock
    } = select(blockEditorStore);
    /* Sets deep to true to also find blocks inside the details content block. */
    return hasSelectedInnerBlock(clientId, true) || isBlockSelected(clientId);
  }, [clientId]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Open by default'),
          checked: showContent,
          onChange: () => setAttributes({
            showContent: !showContent
          })
        })
      })
    }), /*#__PURE__*/_jsxs("details", {
      ...innerBlocksProps,
      open: hasSelection || showContent,
      children: [/*#__PURE__*/_jsx("summary", {
        onClick: event => event.preventDefault(),
        children: /*#__PURE__*/_jsx(RichText, {
          identifier: "summary",
          "aria-label": __('Write summary'),
          placeholder: __('Write summary…'),
          allowedFormats: [],
          withoutInteractiveFormatting: true,
          value: summary,
          onChange: newSummary => setAttributes({
            summary: newSummary
          })
        })
      }), innerBlocksProps.children]
    })]
  });
}
export default DetailsEdit;
//# sourceMappingURL=edit.js.map