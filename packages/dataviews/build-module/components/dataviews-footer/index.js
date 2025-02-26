/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';
import DataViewsPagination from '../dataviews-pagination';
import { BulkActionsFooter, useSomeItemHasAPossibleBulkAction } from '../dataviews-bulk-actions';
import { LAYOUT_GRID, LAYOUT_TABLE } from '../../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
export default function DataViewsFooter() {
  const {
    view,
    paginationInfo: {
      totalItems = 0,
      totalPages
    },
    data,
    actions = EMPTY_ARRAY
  } = useContext(DataViewsContext);
  const hasBulkActions = useSomeItemHasAPossibleBulkAction(actions, data) && [LAYOUT_TABLE, LAYOUT_GRID].includes(view.type);
  if (!totalItems || !totalPages || totalPages <= 1 && !hasBulkActions) {
    return null;
  }
  return !!totalItems && /*#__PURE__*/_jsxs(HStack, {
    expanded: false,
    justify: "end",
    className: "dataviews-footer",
    children: [hasBulkActions && /*#__PURE__*/_jsx(BulkActionsFooter, {}), /*#__PURE__*/_jsx(DataViewsPagination, {})]
  });
}
//# sourceMappingURL=index.js.map