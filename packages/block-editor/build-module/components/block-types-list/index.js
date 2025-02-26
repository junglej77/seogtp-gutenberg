/**
 * WordPress dependencies
 */
import { getBlockMenuDefaultClassName } from '@wordpress/blocks';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import InserterListItem from '../inserter-list-item';
import { InserterListboxGroup, InserterListboxRow } from '../inserter-listbox';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function chunk(array, size) {
  const chunks = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
function BlockTypesList({
  items = [],
  onSelect,
  onHover = () => {},
  children,
  label,
  isDraggable = true
}) {
  const className = 'block-editor-block-types-list';
  const listId = useInstanceId(BlockTypesList, className);
  return /*#__PURE__*/_jsxs(InserterListboxGroup, {
    className: className,
    "aria-label": label,
    children: [chunk(items, 3).map((row, i) => /*#__PURE__*/_jsx(InserterListboxRow, {
      children: row.map((item, j) => /*#__PURE__*/_jsx(InserterListItem, {
        item: item,
        className: getBlockMenuDefaultClassName(item.id),
        onSelect: onSelect,
        onHover: onHover,
        isDraggable: isDraggable && !item.isDisabled,
        isFirst: i === 0 && j === 0,
        rowId: `${listId}-${i}`
      }, item.id))
    }, i)), children]
  });
}
export default BlockTypesList;
//# sourceMappingURL=index.js.map