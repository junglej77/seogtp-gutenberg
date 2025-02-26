/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { blockTable, category, formatListBullets, formatListBulletsRTL } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import ViewTable from './table';
import ViewGrid from './grid';
import ViewList from './list';
import { LAYOUT_GRID, LAYOUT_LIST, LAYOUT_TABLE } from '../constants';
export const VIEW_LAYOUTS = [{
  type: LAYOUT_TABLE,
  label: __('Table'),
  component: ViewTable,
  icon: blockTable
}, {
  type: LAYOUT_GRID,
  label: __('Grid'),
  component: ViewGrid,
  icon: category
}, {
  type: LAYOUT_LIST,
  label: __('List'),
  component: ViewList,
  icon: isRTL() ? formatListBulletsRTL : formatListBullets
}];
export function getNotHidableFieldIds(view) {
  if (view.type === 'table') {
    var _view$layout$combined;
    return [view.layout?.primaryField].concat((_view$layout$combined = view.layout?.combinedFields?.flatMap(field => field.children)) !== null && _view$layout$combined !== void 0 ? _view$layout$combined : []).filter(item => !!item);
  }
  if (view.type === 'grid') {
    return [view.layout?.primaryField, view.layout?.mediaField].filter(item => !!item);
  }
  if (view.type === 'list') {
    return [view.layout?.primaryField, view.layout?.mediaField].filter(item => !!item);
  }
  return [];
}
function getCombinedFieldIds(view) {
  const combinedFields = [];
  if (view.type === LAYOUT_TABLE && view.layout?.combinedFields) {
    view.layout.combinedFields.forEach(combination => {
      combinedFields.push(...combination.children);
    });
  }
  return combinedFields;
}
export function getVisibleFieldIds(view, fields) {
  const fieldsToExclude = getCombinedFieldIds(view);
  if (view.fields) {
    return view.fields.filter(id => !fieldsToExclude.includes(id));
  }
  const visibleFields = [];
  if (view.type === LAYOUT_TABLE && view.layout?.combinedFields) {
    visibleFields.push(...view.layout.combinedFields.map(({
      id
    }) => id));
  }
  visibleFields.push(...fields.filter(({
    id
  }) => !fieldsToExclude.includes(id)).map(({
    id
  }) => id));
  return visibleFields;
}
export function getHiddenFieldIds(view, fields) {
  const fieldsToExclude = [...getCombinedFieldIds(view), ...getVisibleFieldIds(view, fields)];

  // The media field does not need to be in the view.fields to be displayed.
  if (view.type === LAYOUT_GRID && view.layout?.mediaField) {
    fieldsToExclude.push(view.layout?.mediaField);
  }
  if (view.type === LAYOUT_LIST && view.layout?.mediaField) {
    fieldsToExclude.push(view.layout?.mediaField);
  }
  return fields.filter(({
    id,
    enableHiding
  }) => !fieldsToExclude.includes(id) && enableHiding).map(({
    id
  }) => id);
}
//# sourceMappingURL=index.js.map