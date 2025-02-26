/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useNavigationContext } from '../context';
import { ItemBaseUI, ItemUI } from '../styles/navigation-styles';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export default function NavigationSearchNoResultsFound({
  search
}) {
  const {
    navigationTree: {
      items
    }
  } = useNavigationContext();
  const resultsCount = Object.values(items).filter(item => item._isVisible).length;
  if (!search || !!resultsCount) {
    return null;
  }
  return /*#__PURE__*/_jsx(ItemBaseUI, {
    children: /*#__PURE__*/_jsxs(ItemUI, {
      children: [__('No results found.'), " "]
    })
  });
}
//# sourceMappingURL=search-no-results-found.js.map