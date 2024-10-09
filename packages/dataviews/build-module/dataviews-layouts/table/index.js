/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { useEffect, useId, useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SingleSelectionCheckbox from '../../components/dataviews-selection-checkbox';
import ItemActions from '../../components/dataviews-item-actions';
import { sortValues } from '../../constants';
import { useSomeItemHasAPossibleBulkAction, useHasAPossibleBulkAction, BulkSelectionCheckbox } from '../../components/dataviews-bulk-actions';
import ColumnHeaderMenu from './column-header-menu';
import { getVisibleFieldIds } from '../index';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function TableColumn({
  column,
  fields,
  view,
  ...props
}) {
  const field = fields.find(f => f.id === column);
  if (!!field) {
    return /*#__PURE__*/_jsx(TableColumnField, {
      ...props,
      field: field
    });
  }
  const combinedField = view.layout?.combinedFields?.find(f => f.id === column);
  if (!!combinedField) {
    return /*#__PURE__*/_jsx(TableColumnCombined, {
      ...props,
      fields: fields,
      view: view,
      field: combinedField
    });
  }
  return null;
}
function TableColumnField({
  primaryField,
  item,
  field
}) {
  return /*#__PURE__*/_jsx("div", {
    className: clsx('dataviews-view-table__cell-content-wrapper', {
      'dataviews-view-table__primary-field': primaryField?.id === field.id
    }),
    children: /*#__PURE__*/_jsx(field.render, {
      item
    })
  });
}
function TableColumnCombined({
  field,
  ...props
}) {
  const children = field.children.map(child => /*#__PURE__*/_jsx(TableColumn, {
    ...props,
    column: child
  }, child));
  if (field.direction === 'horizontal') {
    return /*#__PURE__*/_jsx(HStack, {
      spacing: 3,
      children: children
    });
  }
  return /*#__PURE__*/_jsx(VStack, {
    spacing: 0,
    children: children
  });
}
function TableRow({
  hasBulkActions,
  item,
  actions,
  fields,
  id,
  view,
  primaryField,
  selection,
  getItemId,
  onChangeSelection
}) {
  const hasPossibleBulkAction = useHasAPossibleBulkAction(actions, item);
  const isSelected = hasPossibleBulkAction && selection.includes(id);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Will be set to true if `onTouchStart` fires. This happens before
  // `onClick` and can be used to exclude touchscreen devices from certain
  // behaviours.
  const isTouchDeviceRef = useRef(false);
  const columns = getVisibleFieldIds(view, fields);
  return /*#__PURE__*/_jsxs("tr", {
    className: clsx('dataviews-view-table__row', {
      'is-selected': hasPossibleBulkAction && isSelected,
      'is-hovered': isHovered,
      'has-bulk-actions': hasPossibleBulkAction
    }),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: () => {
      isTouchDeviceRef.current = true;
    },
    onClick: () => {
      if (!hasPossibleBulkAction) {
        return;
      }
      if (!isTouchDeviceRef.current && document.getSelection()?.type !== 'Range') {
        onChangeSelection(selection.includes(id) ? selection.filter(itemId => id !== itemId) : [id]);
      }
    },
    children: [hasBulkActions && /*#__PURE__*/_jsx("td", {
      className: "dataviews-view-table__checkbox-column",
      style: {
        width: '1%'
      },
      children: /*#__PURE__*/_jsx("div", {
        className: "dataviews-view-table__cell-content-wrapper",
        children: /*#__PURE__*/_jsx(SingleSelectionCheckbox, {
          item: item,
          selection: selection,
          onChangeSelection: onChangeSelection,
          getItemId: getItemId,
          primaryField: primaryField,
          disabled: !hasPossibleBulkAction
        })
      })
    }), columns.map(column => {
      var _view$layout$styles$c;
      // Explicits picks the supported styles.
      const {
        width,
        maxWidth,
        minWidth
      } = (_view$layout$styles$c = view.layout?.styles?.[column]) !== null && _view$layout$styles$c !== void 0 ? _view$layout$styles$c : {};
      return /*#__PURE__*/_jsx("td", {
        style: {
          width,
          maxWidth,
          minWidth
        },
        children: /*#__PURE__*/_jsx(TableColumn, {
          primaryField: primaryField,
          fields: fields,
          item: item,
          column: column,
          view: view
        })
      }, column);
    }), !!actions?.length &&
    /*#__PURE__*/
    // Disable reason: we are not making the element interactive,
    // but preventing any click events from bubbling up to the
    // table row. This allows us to add a click handler to the row
    // itself (to toggle row selection) without erroneously
    // intercepting click events from ItemActions.
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    _jsx("td", {
      className: "dataviews-view-table__actions-column",
      onClick: e => e.stopPropagation(),
      children: /*#__PURE__*/_jsx(ItemActions, {
        item: item,
        actions: actions
      })
    })
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */]
  });
}
function ViewTable({
  actions,
  data,
  fields,
  getItemId,
  isLoading = false,
  onChangeView,
  onChangeSelection,
  selection,
  setOpenedFilter,
  view
}) {
  const headerMenuRefs = useRef(new Map());
  const headerMenuToFocusRef = useRef();
  const [nextHeaderMenuToFocus, setNextHeaderMenuToFocus] = useState();
  const hasBulkActions = useSomeItemHasAPossibleBulkAction(actions, data);
  useEffect(() => {
    if (headerMenuToFocusRef.current) {
      headerMenuToFocusRef.current.focus();
      headerMenuToFocusRef.current = undefined;
    }
  });
  const tableNoticeId = useId();
  if (nextHeaderMenuToFocus) {
    // If we need to force focus, we short-circuit rendering here
    // to prevent any additional work while we handle that.
    // Clearing out the focus directive is necessary to make sure
    // future renders don't cause unexpected focus jumps.
    headerMenuToFocusRef.current = nextHeaderMenuToFocus;
    setNextHeaderMenuToFocus(undefined);
    return;
  }
  const onHide = field => {
    const hidden = headerMenuRefs.current.get(field.id);
    const fallback = hidden ? headerMenuRefs.current.get(hidden.fallback) : undefined;
    setNextHeaderMenuToFocus(fallback?.node);
  };
  const columns = getVisibleFieldIds(view, fields);
  const hasData = !!data?.length;
  const primaryField = fields.find(field => field.id === view.layout?.primaryField);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("table", {
      className: "dataviews-view-table",
      "aria-busy": isLoading,
      "aria-describedby": tableNoticeId,
      children: [/*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs("tr", {
          className: "dataviews-view-table__row",
          children: [hasBulkActions && /*#__PURE__*/_jsx("th", {
            className: "dataviews-view-table__checkbox-column",
            style: {
              width: '1%'
            },
            scope: "col",
            children: /*#__PURE__*/_jsx(BulkSelectionCheckbox, {
              selection: selection,
              onChangeSelection: onChangeSelection,
              data: data,
              actions: actions,
              getItemId: getItemId
            })
          }), columns.map((column, index) => {
            var _view$layout$styles$c2;
            // Explicits picks the supported styles.
            const {
              width,
              maxWidth,
              minWidth
            } = (_view$layout$styles$c2 = view.layout?.styles?.[column]) !== null && _view$layout$styles$c2 !== void 0 ? _view$layout$styles$c2 : {};
            return /*#__PURE__*/_jsx("th", {
              style: {
                width,
                maxWidth,
                minWidth
              },
              "aria-sort": view.sort?.field === column ? sortValues[view.sort.direction] : undefined,
              scope: "col",
              children: /*#__PURE__*/_jsx(ColumnHeaderMenu, {
                ref: node => {
                  if (node) {
                    headerMenuRefs.current.set(column, {
                      node,
                      fallback: columns[index > 0 ? index - 1 : 1]
                    });
                  } else {
                    headerMenuRefs.current.delete(column);
                  }
                },
                fieldId: column,
                view: view,
                fields: fields,
                onChangeView: onChangeView,
                onHide: onHide,
                setOpenedFilter: setOpenedFilter
              })
            }, column);
          }), !!actions?.length && /*#__PURE__*/_jsx("th", {
            className: "dataviews-view-table__actions-column",
            children: /*#__PURE__*/_jsx("span", {
              className: "dataviews-view-table-header",
              children: __('Actions')
            })
          })]
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: hasData && data.map((item, index) => /*#__PURE__*/_jsx(TableRow, {
          item: item,
          hasBulkActions: hasBulkActions,
          actions: actions,
          fields: fields,
          id: getItemId(item) || index.toString(),
          view: view,
          primaryField: primaryField,
          selection: selection,
          getItemId: getItemId,
          onChangeSelection: onChangeSelection
        }, getItemId(item)))
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: clsx({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !hasData && !isLoading
      }),
      id: tableNoticeId,
      children: !hasData && /*#__PURE__*/_jsx("p", {
        children: isLoading ? /*#__PURE__*/_jsx(Spinner, {}) : __('No results')
      })
    })]
  });
}
export default ViewTable;
//# sourceMappingURL=index.js.map