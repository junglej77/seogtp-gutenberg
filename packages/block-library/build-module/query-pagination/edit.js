/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, useInnerBlocksProps, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { QueryPaginationArrowControls } from './query-pagination-arrow-controls';
import { QueryPaginationLabelControl } from './query-pagination-label-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const TEMPLATE = [['core/query-pagination-previous'], ['core/query-pagination-numbers'], ['core/query-pagination-next']];
export default function QueryPaginationEdit({
  attributes: {
    paginationArrow,
    showLabel
  },
  setAttributes,
  clientId
}) {
  const hasNextPreviousBlocks = useSelect(select => {
    const {
      getBlocks
    } = select(blockEditorStore);
    const innerBlocks = getBlocks(clientId);
    /**
     * Show the `paginationArrow` and `showLabel` controls only if a
     * `QueryPaginationNext/Previous` block exists.
     */
    return innerBlocks?.find(innerBlock => {
      return ['core/query-pagination-next', 'core/query-pagination-previous'].includes(innerBlock.name);
    });
  }, [clientId]);
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE
  });
  // Always show label text if paginationArrow is set to 'none'.
  useEffect(() => {
    if (paginationArrow === 'none' && !showLabel) {
      setAttributes({
        showLabel: true
      });
    }
  }, [paginationArrow, setAttributes, showLabel]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [hasNextPreviousBlocks && /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(QueryPaginationArrowControls, {
          value: paginationArrow,
          onChange: value => {
            setAttributes({
              paginationArrow: value
            });
          }
        }), paginationArrow !== 'none' && /*#__PURE__*/_jsx(QueryPaginationLabelControl, {
          value: showLabel,
          onChange: value => {
            setAttributes({
              showLabel: value
            });
          }
        })]
      })
    }), /*#__PURE__*/_jsx("nav", {
      ...innerBlocksProps
    })]
  });
}
//# sourceMappingURL=edit.js.map