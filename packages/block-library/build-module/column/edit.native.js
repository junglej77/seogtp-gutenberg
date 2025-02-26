/**
 * External dependencies
 */
import { View, Dimensions } from 'react-native';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { useEffect, useState, useCallback } from '@wordpress/element';
import { InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar, InspectorControls, store as blockEditorStore, useSettings } from '@wordpress/block-editor';
import { PanelBody, FooterMessageControl, UnitControl, getValueAndUnit, __experimentalUseCustomUnits as useCustomUnits } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import styles from './editor.scss';
import ColumnsPreview from './column-preview';
import { getWidths, getWidthWithUnit, isPercentageUnit } from '../columns/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ColumnEdit({
  attributes,
  setAttributes,
  hasChildren,
  isSelected,
  getStylesFromColorScheme,
  contentStyle,
  columns,
  selectedColumnIndex,
  parentAlignment,
  clientId,
  blockWidth
}) {
  if (!contentStyle) {
    contentStyle = {
      [clientId]: {}
    };
  }
  const {
    verticalAlignment,
    width
  } = attributes;
  const {
    valueUnit = '%'
  } = getValueAndUnit(width) || {};
  const screenWidth = Math.floor(Dimensions.get('window').width);
  const [widthUnit, setWidthUnit] = useState(valueUnit || '%');
  const [availableUnits] = useSettings('spacing.units');
  const units = useCustomUnits({
    availableUnits: availableUnits || ['%', 'px', 'em', 'rem', 'vw']
  });
  const updateAlignment = alignment => {
    setAttributes({
      verticalAlignment: alignment
    });
  };
  useEffect(() => {
    setWidthUnit(valueUnit);
  }, [valueUnit]);
  useEffect(() => {
    if (!verticalAlignment && parentAlignment) {
      updateAlignment(parentAlignment);
    }
  }, []);
  const onChangeWidth = nextWidth => {
    const widthWithUnit = getWidthWithUnit(nextWidth, widthUnit);
    setAttributes({
      width: widthWithUnit
    });
  };
  const onChangeUnit = nextUnit => {
    setWidthUnit(nextUnit);
    const widthWithoutUnit = parseFloat(width || getWidths(columns)[selectedColumnIndex]);
    setAttributes({
      width: getWidthWithUnit(widthWithoutUnit, nextUnit)
    });
  };
  const onChange = nextWidth => {
    if (isPercentageUnit(widthUnit) || !widthUnit) {
      return;
    }
    onChangeWidth(nextWidth);
  };
  const renderAppender = useCallback(() => {
    if (isSelected) {
      const {
        width: columnWidth
      } = contentStyle[clientId] || {};
      const isFullWidth = columnWidth === screenWidth;
      return /*#__PURE__*/_jsx(View, {
        style: [styles.columnAppender, isFullWidth && styles.fullwidthColumnAppender, isFullWidth && hasChildren && styles.fullwidthHasInnerColumnAppender, !isFullWidth && hasChildren && styles.hasInnerColumnAppender],
        children: /*#__PURE__*/_jsx(InnerBlocks.ButtonBlockAppender, {})
      });
    }
    return null;
  }, [contentStyle, clientId, screenWidth, isSelected, hasChildren]);
  if (!isSelected && !hasChildren) {
    return /*#__PURE__*/_jsx(View, {
      style: [getStylesFromColorScheme(styles.columnPlaceholder, styles.columnPlaceholderDark), contentStyle[clientId]]
    });
  }
  const parentWidth = contentStyle && contentStyle[clientId] && contentStyle[clientId].width;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isSelected && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockControls, {
        children: /*#__PURE__*/_jsx(BlockVerticalAlignmentToolbar, {
          onChange: updateAlignment,
          value: verticalAlignment
        })
      }), /*#__PURE__*/_jsxs(InspectorControls, {
        children: [/*#__PURE__*/_jsx(PanelBody, {
          title: __('Settings'),
          children: /*#__PURE__*/_jsx(UnitControl, {
            label: __('Width'),
            min: 1,
            max: isPercentageUnit(widthUnit) ? 100 : undefined,
            onChange: onChange,
            onComplete: onChangeWidth,
            onUnitChange: onChangeUnit,
            value: getWidths(columns)[selectedColumnIndex],
            unit: widthUnit,
            units: units,
            preview: /*#__PURE__*/_jsx(ColumnsPreview, {
              columnWidths: getWidths(columns, false),
              selectedColumnIndex: selectedColumnIndex
            })
          })
        }), /*#__PURE__*/_jsx(PanelBody, {
          children: /*#__PURE__*/_jsx(FooterMessageControl, {
            label: __('Note: Column layout may vary between themes and screen sizes')
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: [isSelected && hasChildren && styles.innerBlocksBottomSpace, contentStyle[clientId]],
      children: /*#__PURE__*/_jsx(InnerBlocks, {
        renderAppender: renderAppender,
        parentWidth: parentWidth,
        blockWidth: blockWidth
      })
    })]
  });
}
function ColumnEditWrapper(props) {
  const {
    verticalAlignment
  } = props.attributes;
  const getVerticalAlignmentRemap = alignment => {
    if (!alignment) {
      return styles.flexBase;
    }
    return {
      ...styles.flexBase,
      ...styles[`is-vertically-aligned-${alignment}`]
    };
  };
  return /*#__PURE__*/_jsx(View, {
    style: getVerticalAlignmentRemap(verticalAlignment),
    children: /*#__PURE__*/_jsx(ColumnEdit, {
      ...props
    })
  });
}
export default compose([withSelect((select, {
  clientId
}) => {
  const {
    getBlockCount,
    getBlockRootClientId,
    getSelectedBlockClientId,
    getBlocks,
    getBlockOrder,
    getBlockAttributes
  } = select(blockEditorStore);
  const selectedBlockClientId = getSelectedBlockClientId();
  const isSelected = selectedBlockClientId === clientId;
  const parentId = getBlockRootClientId(clientId);
  const hasChildren = !!getBlockCount(clientId);
  const blockOrder = getBlockOrder(parentId);
  const selectedColumnIndex = blockOrder.indexOf(clientId);
  const columns = getBlocks(parentId);
  const parentAlignment = getBlockAttributes(parentId)?.verticalAlignment;
  return {
    hasChildren,
    isSelected,
    selectedColumnIndex,
    columns,
    parentAlignment
  };
}), withPreferredColorScheme])(ColumnEditWrapper);
//# sourceMappingURL=edit.native.js.map