/**
 * External dependencies
 */
import { Dimensions, FlatList, SectionList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { BottomSheet, Gradient } from '@wordpress/components';
import { usePreferredColorScheme, usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import InserterButton from '../inserter-button';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MIN_COL_NUM = 3;
export default function BlockTypesList({
  name,
  sections,
  onSelect,
  label,
  listProps,
  initialNumToRender = 3
}) {
  const [numberOfColumns, setNumberOfColumns] = useState(MIN_COL_NUM);
  const [itemWidth, setItemWidth] = useState();
  const [maxWidth, setMaxWidth] = useState();
  useEffect(() => {
    const dimensionsChangeSubscription = Dimensions.addEventListener('change', onLayout);
    onLayout();
    return () => {
      dimensionsChangeSubscription.remove();
    };
  }, []);
  function calculateItemWidth() {
    const {
      paddingLeft: itemPaddingLeft,
      paddingRight: itemPaddingRight
    } = InserterButton.Styles.modalItem;
    const {
      width
    } = InserterButton.Styles.modalIconWrapper;
    return width + itemPaddingLeft + itemPaddingRight;
  }
  function onLayout() {
    const columnStyle = styles['block-types-list__column'];
    const sumLeftRightPadding = columnStyle.paddingLeft + columnStyle.paddingRight;
    const bottomSheetWidth = BottomSheet.getWidth();
    const containerTotalWidth = bottomSheetWidth - sumLeftRightPadding;
    const itemTotalWidth = calculateItemWidth();
    const columnsFitToWidth = Math.floor(containerTotalWidth / itemTotalWidth);
    const numColumns = Math.max(MIN_COL_NUM, columnsFitToWidth);
    setNumberOfColumns(numColumns);
    setMaxWidth(containerTotalWidth / numColumns);
    if (columnsFitToWidth < MIN_COL_NUM) {
      const updatedItemWidth = (bottomSheetWidth - 2 * sumLeftRightPadding) / MIN_COL_NUM;
      setItemWidth(updatedItemWidth);
    }
  }
  const contentContainerStyle = StyleSheet.flatten(listProps.contentContainerStyle);
  const renderSection = ({
    item
  }) => {
    return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      accessible: false,
      children: /*#__PURE__*/_jsx(FlatList, {
        data: item.list,
        // Re-render when numberOfColumns changes.
        numColumns: numberOfColumns,
        ItemSeparatorComponent: () => /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
          accessible: false,
          children: /*#__PURE__*/_jsx(View, {
            style: styles['block-types-list__row-separator']
          })
        }),
        scrollEnabled: false,
        renderItem: renderListItem
      }, `InserterUI-${name}-${numberOfColumns}`)
    });
  };
  const renderListItem = ({
    item
  }) => {
    return /*#__PURE__*/_jsx(InserterButton, {
      item: item,
      itemWidth: itemWidth,
      maxWidth: maxWidth,
      onSelect: onSelect
    });
  };
  const colorScheme = usePreferredColorScheme();
  const sectionHeaderGradientValue = colorScheme === 'light' ? 'linear-gradient(#fff 70%, rgba(255, 255, 255, 0))' : 'linear-gradient(#2e2e2e 70%, rgba(46, 46, 46, 0))';
  const sectionHeaderTitleStyles = usePreferredColorSchemeStyle(styles['block-types-list__section-header-title'], styles['block-types-list__section-header-title--dark']);
  const renderSectionHeader = ({
    section: {
      metadata
    }
  }) => {
    if (!metadata?.icon || !metadata?.title) {
      return null;
    }
    return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      accessible: false,
      children: /*#__PURE__*/_jsxs(Gradient, {
        gradientValue: sectionHeaderGradientValue,
        style: styles['block-types-list__section-header'],
        children: [metadata?.icon, /*#__PURE__*/_jsx(Text, {
          style: sectionHeaderTitleStyles,
          children: metadata?.title
        })]
      })
    });
  };
  return /*#__PURE__*/_jsx(SectionList, {
    onLayout: onLayout,
    testID: `InserterUI-${name}`,
    accessibilityLabel: label,
    keyboardShouldPersistTaps: "always",
    sections: sections,
    initialNumToRender: initialNumToRender,
    renderItem: renderSection,
    renderSectionHeader: renderSectionHeader,
    ...listProps,
    contentContainerStyle: {
      ...contentContainerStyle,
      paddingBottom: Math.max(listProps.safeAreaBottomInset, contentContainerStyle.paddingBottom)
    }
  });
}
//# sourceMappingURL=index.native.js.map