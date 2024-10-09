/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { arrowLeft, arrowRight, unseen, funnel } from '@wordpress/icons';
import { Button, Icon, privateApis as componentsPrivateApis } from '@wordpress/components';
import { forwardRef, Children, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { sanitizeOperators } from '../../utils';
import { SORTING_DIRECTIONS, sortArrows, sortLabels } from '../../constants';
import { getVisibleFieldIds } from '../index';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  DropdownMenuV2
} = unlock(componentsPrivateApis);
function WithDropDownMenuSeparators({
  children
}) {
  return Children.toArray(children).filter(Boolean).map((child, i) => /*#__PURE__*/_jsxs(Fragment, {
    children: [i > 0 && /*#__PURE__*/_jsx(DropdownMenuV2.Separator, {}), child]
  }, i));
}
const _HeaderMenu = forwardRef(function HeaderMenu({
  fieldId,
  view,
  fields,
  onChangeView,
  onHide,
  setOpenedFilter
}, ref) {
  const visibleFieldIds = getVisibleFieldIds(view, fields);
  const index = visibleFieldIds?.indexOf(fieldId);
  const isSorted = view.sort?.field === fieldId;
  let isHidable = false;
  let isSortable = false;
  let canAddFilter = false;
  let header;
  let operators = [];
  const combinedField = view.layout?.combinedFields?.find(f => f.id === fieldId);
  const field = fields.find(f => f.id === fieldId);
  if (!combinedField) {
    if (!field) {
      // No combined or regular field found.
      return null;
    }
    isHidable = field.enableHiding !== false;
    isSortable = field.enableSorting !== false;
    header = field.header;
    operators = sanitizeOperators(field);
    // Filter can be added:
    // 1. If the field is not already part of a view's filters.
    // 2. If the field meets the type and operator requirements.
    // 3. If it's not primary. If it is, it should be already visible.
    canAddFilter = !view.filters?.some(_filter => fieldId === _filter.field) && !!field.elements?.length && !!operators.length && !field.filterBy?.isPrimary;
  } else {
    header = combinedField.header || combinedField.label;
  }
  return /*#__PURE__*/_jsx(DropdownMenuV2, {
    align: "start",
    trigger: /*#__PURE__*/_jsxs(Button, {
      size: "compact",
      className: "dataviews-view-table-header-button",
      ref: ref,
      variant: "tertiary",
      children: [header, view.sort && isSorted && /*#__PURE__*/_jsx("span", {
        "aria-hidden": "true",
        children: sortArrows[view.sort.direction]
      })]
    }),
    style: {
      minWidth: '240px'
    },
    children: /*#__PURE__*/_jsxs(WithDropDownMenuSeparators, {
      children: [isSortable && /*#__PURE__*/_jsx(DropdownMenuV2.Group, {
        children: SORTING_DIRECTIONS.map(direction => {
          const isChecked = view.sort && isSorted && view.sort.direction === direction;
          const value = `${fieldId}-${direction}`;
          return /*#__PURE__*/_jsx(DropdownMenuV2.RadioItem, {
            // All sorting radio items share the same name, so that
            // selecting a sorting option automatically deselects the
            // previously selected one, even if it is displayed in
            // another submenu. The field and direction are passed via
            // the `value` prop.
            name: "view-table-sorting",
            value: value,
            checked: isChecked,
            onChange: () => {
              onChangeView({
                ...view,
                sort: {
                  field: fieldId,
                  direction
                }
              });
            },
            children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
              children: sortLabels[direction]
            })
          }, value);
        })
      }), canAddFilter && /*#__PURE__*/_jsx(DropdownMenuV2.Group, {
        children: /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
          prefix: /*#__PURE__*/_jsx(Icon, {
            icon: funnel
          }),
          onClick: () => {
            setOpenedFilter(fieldId);
            onChangeView({
              ...view,
              page: 1,
              filters: [...(view.filters || []), {
                field: fieldId,
                value: undefined,
                operator: operators[0]
              }]
            });
          },
          children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
            children: __('Add filter')
          })
        })
      }), /*#__PURE__*/_jsxs(DropdownMenuV2.Group, {
        children: [/*#__PURE__*/_jsx(DropdownMenuV2.Item, {
          prefix: /*#__PURE__*/_jsx(Icon, {
            icon: arrowLeft
          }),
          disabled: index < 1,
          onClick: () => {
            var _visibleFieldIds$slic;
            onChangeView({
              ...view,
              fields: [...((_visibleFieldIds$slic = visibleFieldIds.slice(0, index - 1)) !== null && _visibleFieldIds$slic !== void 0 ? _visibleFieldIds$slic : []), fieldId, visibleFieldIds[index - 1], ...visibleFieldIds.slice(index + 1)]
            });
          },
          children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
            children: __('Move left')
          })
        }), /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
          prefix: /*#__PURE__*/_jsx(Icon, {
            icon: arrowRight
          }),
          disabled: index >= visibleFieldIds.length - 1,
          onClick: () => {
            var _visibleFieldIds$slic2;
            onChangeView({
              ...view,
              fields: [...((_visibleFieldIds$slic2 = visibleFieldIds.slice(0, index)) !== null && _visibleFieldIds$slic2 !== void 0 ? _visibleFieldIds$slic2 : []), visibleFieldIds[index + 1], fieldId, ...visibleFieldIds.slice(index + 2)]
            });
          },
          children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
            children: __('Move right')
          })
        }), isHidable && field && /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
          prefix: /*#__PURE__*/_jsx(Icon, {
            icon: unseen
          }),
          onClick: () => {
            onHide(field);
            onChangeView({
              ...view,
              fields: visibleFieldIds.filter(id => id !== fieldId)
            });
          },
          children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
            children: __('Hide column')
          })
        })]
      })]
    })
  });
});

// @ts-expect-error Lift the `Item` type argument through the forwardRef.
const ColumnHeaderMenu = _HeaderMenu;
export default ColumnHeaderMenu;
//# sourceMappingURL=column-header-menu.js.map