/**
 * External dependencies
 */
import { ScrollView } from 'react-native';

/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getActiveStyle, replaceActiveStyle } from './utils';
import StylePreview from './preview';
import containerStyles from './style.scss';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
function BlockStyles({
  clientId,
  url
}) {
  const selector = select => {
    const {
      getBlock
    } = select(blockEditorStore);
    const {
      getBlockStyles
    } = select(blocksStore);
    const block = getBlock(clientId);
    return {
      styles: getBlockStyles(block?.name) || EMPTY_ARRAY,
      className: block?.attributes?.className || ''
    };
  };
  const {
    styles,
    className
  } = useSelect(selector, [clientId]);
  const {
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  const renderedStyles = styles?.find(style => style.isDefault) ? styles : [{
    name: 'default',
    label: _x('Default', 'block style'),
    isDefault: true
  }, ...styles];
  const mappedRenderedStyles = useMemo(() => {
    const activeStyle = getActiveStyle(renderedStyles, className);
    return renderedStyles.map(style => {
      const styleClassName = replaceActiveStyle(className, activeStyle, style);
      const isActive = activeStyle === style;
      const onStylePress = () => {
        updateBlockAttributes(clientId, {
          className: styleClassName
        });
      };
      return /*#__PURE__*/_jsx(StylePreview, {
        onPress: onStylePress,
        isActive: isActive,
        style: style,
        url: url
      }, style.name);
    });
  }, [renderedStyles, className, clientId]);
  if (!styles || styles.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(ScrollView, {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: containerStyles.content,
    children: mappedRenderedStyles
  });
}
export default BlockStyles;
//# sourceMappingURL=index.native.js.map