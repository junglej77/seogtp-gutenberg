/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../../store';

/**
 * Internal dependencies
 */
import InserterSidebar from './inserter-sidebar';
import ListViewSidebar from './list-view-sidebar';
import { jsx as _jsx } from "react/jsx-runtime";
export default function SecondarySidebar() {
  const {
    isInserterOpen,
    isListViewOpen
  } = useSelect(select => {
    const {
      isInserterOpened,
      isListViewOpened
    } = select(editWidgetsStore);
    return {
      isInserterOpen: isInserterOpened(),
      isListViewOpen: isListViewOpened()
    };
  }, []);
  if (isInserterOpen) {
    return /*#__PURE__*/_jsx(InserterSidebar, {});
  }
  if (isListViewOpen) {
    return /*#__PURE__*/_jsx(ListViewSidebar, {});
  }
  return null;
}
//# sourceMappingURL=index.js.map