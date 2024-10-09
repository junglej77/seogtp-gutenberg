/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalGrid as Grid, __experimentalHStack as HStack, __experimentalVStack as VStack, Spinner, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ItemActions from '../../components/dataviews-item-actions';
import SingleSelectionCheckbox from '../../components/dataviews-selection-checkbox';
import { useHasAPossibleBulkAction } from '../../components/dataviews-bulk-actions';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function GridItem({
  selection,
  onChangeSelection,
  getItemId,
  item,
  actions,
  mediaField,
  primaryField,
  visibleFields,
  badgeFields,
  columnFields
}) {
  const hasBulkAction = useHasAPossibleBulkAction(actions, item);
  const id = getItemId(item);
  const isSelected = selection.includes(id);
  const renderedMediaField = mediaField?.render ? /*#__PURE__*/_jsx(mediaField.render, {
    item: item
  }) : null;
  const renderedPrimaryField = primaryField?.render ? /*#__PURE__*/_jsx(primaryField.render, {
    item: item
  }) : null;
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 0,
    className: clsx('dataviews-view-grid__card', {
      'is-selected': hasBulkAction && isSelected
    }),
    onClickCapture: event => {
      if (event.ctrlKey || event.metaKey) {
        event.stopPropagation();
        event.preventDefault();
        if (!hasBulkAction) {
          return;
        }
        onChangeSelection(selection.includes(id) ? selection.filter(itemId => id !== itemId) : [...selection, id]);
      }
    },
    children: [/*#__PURE__*/_jsx("div", {
      className: "dataviews-view-grid__media",
      children: renderedMediaField
    }), /*#__PURE__*/_jsx(SingleSelectionCheckbox, {
      item: item,
      selection: selection,
      onChangeSelection: onChangeSelection,
      getItemId: getItemId,
      primaryField: primaryField,
      disabled: !hasBulkAction
    }), /*#__PURE__*/_jsxs(HStack, {
      justify: "space-between",
      className: "dataviews-view-grid__title-actions",
      children: [/*#__PURE__*/_jsx(HStack, {
        className: "dataviews-view-grid__primary-field",
        children: renderedPrimaryField
      }), /*#__PURE__*/_jsx(ItemActions, {
        item: item,
        actions: actions,
        isCompact: true
      })]
    }), !!badgeFields?.length && /*#__PURE__*/_jsx(HStack, {
      className: "dataviews-view-grid__badge-fields",
      spacing: 2,
      wrap: true,
      alignment: "top",
      justify: "flex-start",
      children: badgeFields.map(field => {
        return /*#__PURE__*/_jsx(FlexItem, {
          className: "dataviews-view-grid__field-value",
          children: /*#__PURE__*/_jsx(field.render, {
            item: item
          })
        }, field.id);
      })
    }), !!visibleFields?.length && /*#__PURE__*/_jsx(VStack, {
      className: "dataviews-view-grid__fields",
      spacing: 1,
      children: visibleFields.map(field => {
        return /*#__PURE__*/_jsx(Flex, {
          className: clsx('dataviews-view-grid__field', columnFields?.includes(field.id) ? 'is-column' : 'is-row'),
          gap: 1,
          justify: "flex-start",
          expanded: true,
          style: {
            height: 'auto'
          },
          direction: columnFields?.includes(field.id) ? 'column' : 'row',
          children: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(FlexItem, {
              className: "dataviews-view-grid__field-name",
              children: field.header
            }), /*#__PURE__*/_jsx(FlexItem, {
              className: "dataviews-view-grid__field-value",
              style: {
                maxHeight: 'none'
              },
              children: /*#__PURE__*/_jsx(field.render, {
                item: item
              })
            })]
          })
        }, field.id);
      })
    })]
  }, id);
}
export default function ViewGrid({
  actions,
  data,
  fields,
  getItemId,
  isLoading,
  onChangeSelection,
  selection,
  view,
  density
}) {
  const mediaField = fields.find(field => field.id === view.layout?.mediaField);
  const primaryField = fields.find(field => field.id === view.layout?.primaryField);
  const viewFields = view.fields || fields.map(field => field.id);
  const {
    visibleFields,
    badgeFields
  } = fields.reduce((accumulator, field) => {
    if (!viewFields.includes(field.id) || [view.layout?.mediaField, view?.layout?.primaryField].includes(field.id)) {
      return accumulator;
    }
    // If the field is a badge field, add it to the badgeFields array
    // otherwise add it to the rest visibleFields array.
    const key = view.layout?.badgeFields?.includes(field.id) ? 'badgeFields' : 'visibleFields';
    accumulator[key].push(field);
    return accumulator;
  }, {
    visibleFields: [],
    badgeFields: []
  });
  const hasData = !!data?.length;
  const gridStyle = density ? {
    gridTemplateColumns: `repeat(${density}, minmax(0, 1fr))`
  } : {};
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [hasData && /*#__PURE__*/_jsx(Grid, {
      gap: 8,
      columns: 2,
      alignment: "top",
      className: "dataviews-view-grid",
      style: gridStyle,
      "aria-busy": isLoading,
      children: data.map(item => {
        return /*#__PURE__*/_jsx(GridItem, {
          selection: selection,
          onChangeSelection: onChangeSelection,
          getItemId: getItemId,
          item: item,
          actions: actions,
          mediaField: mediaField,
          primaryField: primaryField,
          visibleFields: visibleFields,
          badgeFields: badgeFields,
          columnFields: view.layout?.columnFields
        }, getItemId(item));
      })
    }), !hasData && /*#__PURE__*/_jsx("div", {
      className: clsx({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !isLoading
      }),
      children: /*#__PURE__*/_jsx("p", {
        children: isLoading ? /*#__PURE__*/_jsx(Spinner, {}) : __('No results')
      })
    })]
  });
}
//# sourceMappingURL=index.js.map