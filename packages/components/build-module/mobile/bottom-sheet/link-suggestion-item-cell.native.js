/**
 * External dependencies
 */
import { Text, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { globe } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Cell from './cell';
import cellStyles from './styles.scss';
import suggestionStyles from './link-suggestion-styles.scss';
import { posts, pages, empty, clipboard } from '../gridicons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const icons = {
  URL: globe,
  clipboard,
  post: posts,
  page: pages
};
const getSummaryForType = type => {
  switch (type) {
    case 'clipboard':
      return __('From clipboard');
    case 'mailto':
      return __('Add this email link');
    case 'tel':
      return __('Add this telephone link');
    default:
      return __('Add this link');
  }
};

// We use some Cell styles here with a column flex-direction.
function LinkSuggestionItemCell({
  suggestion,
  onLinkPicked,
  ...props
}) {
  const {
    title: contentTitle,
    url,
    type,
    isDirectEntry
  } = suggestion;
  const title = isDirectEntry ? url : contentTitle;
  const summary = isDirectEntry ? getSummaryForType(type) : url;
  const pickLink = () => onLinkPicked(suggestion);
  const cellTitleStyle = usePreferredColorSchemeStyle(cellStyles.cellLabel, cellStyles.cellTextDark);
  const cellSummaryStyle = usePreferredColorSchemeStyle(cellStyles.cellValue, cellStyles.cellTextDark);
  const titleStyle = [cellTitleStyle, suggestionStyles.titleStyle];
  const summaryStyle = [cellSummaryStyle, suggestionStyles.summaryStyle];
  return /*#__PURE__*/_jsx(Cell, {
    ...props,
    icon: icons[type] || empty,
    onPress: pickLink,
    separatorType: "none",
    cellContainerStyle: suggestionStyles.itemContainerStyle,
    labelStyle: suggestionStyles.hidden,
    valueStyle: suggestionStyles.hidden,
    children: /*#__PURE__*/_jsxs(View, {
      style: suggestionStyles.containerStyle,
      children: [/*#__PURE__*/_jsx(Text, {
        style: titleStyle,
        numberOfLines: 1,
        ellipsizeMode: "middle",
        children: title
      }), /*#__PURE__*/_jsx(Text, {
        style: summaryStyle,
        numberOfLines: 1,
        ellipsizeMode: "middle",
        children: summary
      })]
    })
  });
}
export default LinkSuggestionItemCell;
//# sourceMappingURL=link-suggestion-item-cell.native.js.map