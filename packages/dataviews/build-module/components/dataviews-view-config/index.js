/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { Button, Popover, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, SelectControl, __experimentalItemGroup as ItemGroup, __experimentalItem as Item, __experimentalGrid as Grid, __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalText as Text, privateApis as componentsPrivateApis, BaseControl } from '@wordpress/components';
import { __, _x, sprintf } from '@wordpress/i18n';
import { memo, useContext, useState, useMemo } from '@wordpress/element';
import { chevronDown, chevronUp, cog, seen, unseen } from '@wordpress/icons';
import warning from '@wordpress/warning';

/**
 * Internal dependencies
 */
import { SORTING_DIRECTIONS, LAYOUT_GRID, LAYOUT_TABLE, sortIcons, sortLabels } from '../../constants';
import { VIEW_LAYOUTS, getNotHidableFieldIds, getVisibleFieldIds, getHiddenFieldIds } from '../../dataviews-layouts';
import DataViewsContext from '../dataviews-context';
import { unlock } from '../../lock-unlock';
import DensityPicker from '../../dataviews-layouts/grid/density-picker';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  DropdownMenuV2
} = unlock(componentsPrivateApis);
function ViewTypeMenu({
  defaultLayouts = {
    list: {},
    grid: {},
    table: {}
  }
}) {
  const {
    view,
    onChangeView
  } = useContext(DataViewsContext);
  const availableLayouts = Object.keys(defaultLayouts);
  if (availableLayouts.length <= 1) {
    return null;
  }
  const activeView = VIEW_LAYOUTS.find(v => view.type === v.type);
  return /*#__PURE__*/_jsx(DropdownMenuV2, {
    trigger: /*#__PURE__*/_jsx(Button, {
      size: "compact",
      icon: activeView?.icon,
      label: __('Layout')
    }),
    children: availableLayouts.map(layout => {
      const config = VIEW_LAYOUTS.find(v => v.type === layout);
      if (!config) {
        return null;
      }
      return /*#__PURE__*/_jsx(DropdownMenuV2.RadioItem, {
        value: layout,
        name: "view-actions-available-view",
        checked: layout === view.type,
        hideOnClick: true,
        onChange: e => {
          switch (e.target.value) {
            case 'list':
            case 'grid':
            case 'table':
              return onChangeView({
                ...view,
                type: e.target.value,
                ...defaultLayouts[e.target.value]
              });
          }
          globalThis.SCRIPT_DEBUG === true ? warning('Invalid dataview') : void 0;
        },
        children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
          children: config.label
        })
      }, layout);
    })
  });
}
function SortFieldControl() {
  const {
    view,
    fields,
    onChangeView
  } = useContext(DataViewsContext);
  const orderOptions = useMemo(() => {
    const sortableFields = fields.filter(field => field.enableSorting !== false);
    return sortableFields.map(field => {
      return {
        label: field.label,
        value: field.id
      };
    });
  }, [fields]);
  return /*#__PURE__*/_jsx(SelectControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: __('Sort by'),
    value: view.sort?.field,
    options: orderOptions,
    onChange: value => {
      onChangeView({
        ...view,
        sort: {
          direction: view?.sort?.direction || 'desc',
          field: value
        }
      });
    }
  });
}
function SortDirectionControl() {
  const {
    view,
    fields,
    onChangeView
  } = useContext(DataViewsContext);
  const sortableFields = fields.filter(field => field.enableSorting !== false);
  if (sortableFields.length === 0) {
    return null;
  }
  let value = view.sort?.direction;
  if (!value && view.sort?.field) {
    value = 'desc';
  }
  return /*#__PURE__*/_jsx(ToggleGroupControl, {
    className: "dataviews-view-config__sort-direction",
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    isBlock: true,
    label: __('Order'),
    value: value,
    onChange: newDirection => {
      if (newDirection === 'asc' || newDirection === 'desc') {
        onChangeView({
          ...view,
          sort: {
            direction: newDirection,
            field: view.sort?.field ||
            // If there is no field assigned as the sorting field assign the first sortable field.
            fields.find(field => field.enableSorting !== false)?.id || ''
          }
        });
        return;
      }
      globalThis.SCRIPT_DEBUG === true ? warning('Invalid direction') : void 0;
    },
    children: SORTING_DIRECTIONS.map(direction => {
      return /*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
        value: direction,
        icon: sortIcons[direction],
        label: sortLabels[direction]
      }, direction);
    })
  });
}
const PAGE_SIZE_VALUES = [10, 20, 50, 100];
function ItemsPerPageControl() {
  const {
    view,
    onChangeView
  } = useContext(DataViewsContext);
  return /*#__PURE__*/_jsx(ToggleGroupControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    isBlock: true,
    label: __('Items per page'),
    value: view.perPage || 10,
    disabled: !view?.sort?.field,
    onChange: newItemsPerPage => {
      const newItemsPerPageNumber = typeof newItemsPerPage === 'number' || newItemsPerPage === undefined ? newItemsPerPage : parseInt(newItemsPerPage, 10);
      onChangeView({
        ...view,
        perPage: newItemsPerPageNumber,
        page: 1
      });
    },
    children: PAGE_SIZE_VALUES.map(value => {
      return /*#__PURE__*/_jsx(ToggleGroupControlOption, {
        value: value,
        label: value.toString()
      }, value);
    })
  });
}
function FieldItem({
  field: {
    id,
    label,
    index,
    isVisible,
    isHidable
  },
  fields,
  view,
  onChangeView
}) {
  const visibleFieldIds = getVisibleFieldIds(view, fields);
  return /*#__PURE__*/_jsx(Item, {
    children: /*#__PURE__*/_jsxs(HStack, {
      expanded: true,
      className: `dataviews-field-control__field dataviews-field-control__field-${id}`,
      children: [/*#__PURE__*/_jsx("span", {
        children: label
      }), /*#__PURE__*/_jsxs(HStack, {
        justify: "flex-end",
        expanded: false,
        className: "dataviews-field-control__actions",
        children: [view.type === LAYOUT_TABLE && isVisible && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Button, {
            disabled: index < 1,
            accessibleWhenDisabled: true,
            size: "compact",
            onClick: () => {
              var _visibleFieldIds$slic;
              onChangeView({
                ...view,
                fields: [...((_visibleFieldIds$slic = visibleFieldIds.slice(0, index - 1)) !== null && _visibleFieldIds$slic !== void 0 ? _visibleFieldIds$slic : []), id, visibleFieldIds[index - 1], ...visibleFieldIds.slice(index + 1)]
              });
            },
            icon: chevronUp,
            label: sprintf( /* translators: %s: field label */
            __('Move %s up'), label)
          }), /*#__PURE__*/_jsx(Button, {
            disabled: index >= visibleFieldIds.length - 1,
            accessibleWhenDisabled: true,
            size: "compact",
            onClick: () => {
              var _visibleFieldIds$slic2;
              onChangeView({
                ...view,
                fields: [...((_visibleFieldIds$slic2 = visibleFieldIds.slice(0, index)) !== null && _visibleFieldIds$slic2 !== void 0 ? _visibleFieldIds$slic2 : []), visibleFieldIds[index + 1], id, ...visibleFieldIds.slice(index + 2)]
              });
            },
            icon: chevronDown,
            label: sprintf( /* translators: %s: field label */
            __('Move %s down'), label)
          }), ' ']
        }), /*#__PURE__*/_jsx(Button, {
          className: "dataviews-field-control__field-visibility-button",
          disabled: !isHidable,
          accessibleWhenDisabled: true,
          size: "compact",
          onClick: () => {
            onChangeView({
              ...view,
              fields: isVisible ? visibleFieldIds.filter(fieldId => fieldId !== id) : [...visibleFieldIds, id]
            });
            // Focus the visibility button to avoid focus loss.
            // Our code is safe against the component being unmounted, so we don't need to worry about cleaning the timeout.
            // eslint-disable-next-line @wordpress/react-no-unsafe-timeout
            setTimeout(() => {
              const element = document.querySelector(`.dataviews-field-control__field-${id} .dataviews-field-control__field-visibility-button`);
              if (element instanceof HTMLElement) {
                element.focus();
              }
            }, 50);
          },
          icon: isVisible ? seen : unseen,
          label: isVisible ? sprintf( /* translators: %s: field label */
          __('Hide %s'), label) : sprintf( /* translators: %s: field label */
          __('Show %s'), label)
        })]
      })]
    })
  }, id);
}
function FieldControl() {
  const {
    view,
    fields,
    onChangeView
  } = useContext(DataViewsContext);
  const visibleFieldIds = useMemo(() => getVisibleFieldIds(view, fields), [view, fields]);
  const hiddenFieldIds = useMemo(() => getHiddenFieldIds(view, fields), [view, fields]);
  const notHidableFieldIds = useMemo(() => getNotHidableFieldIds(view), [view]);
  const visibleFields = fields.filter(({
    id
  }) => visibleFieldIds.includes(id)).map(({
    id,
    label,
    enableHiding
  }) => {
    return {
      id,
      label,
      index: visibleFieldIds.indexOf(id),
      isVisible: true,
      isHidable: notHidableFieldIds.includes(id) ? false : enableHiding
    };
  });
  if (view.type === LAYOUT_TABLE && view.layout?.combinedFields) {
    view.layout.combinedFields.forEach(({
      id,
      label
    }) => {
      visibleFields.push({
        id,
        label,
        index: visibleFieldIds.indexOf(id),
        isVisible: true,
        isHidable: notHidableFieldIds.includes(id)
      });
    });
  }
  visibleFields.sort((a, b) => a.index - b.index);
  const hiddenFields = fields.filter(({
    id
  }) => hiddenFieldIds.includes(id)).map(({
    id,
    label,
    enableHiding
  }, index) => {
    return {
      id,
      label,
      index,
      isVisible: false,
      isHidable: enableHiding
    };
  });
  if (!visibleFields?.length && !hiddenFields?.length) {
    return null;
  }
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 6,
    className: "dataviews-field-control",
    children: [!!visibleFields?.length && /*#__PURE__*/_jsx(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: visibleFields.map(field => /*#__PURE__*/_jsx(FieldItem, {
        field: field,
        fields: fields,
        view: view,
        onChangeView: onChangeView
      }, field.id))
    }), !!hiddenFields?.length && /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 4,
        children: [/*#__PURE__*/_jsx(BaseControl.VisualLabel, {
          style: {
            margin: 0
          },
          children: __('Hidden')
        }), /*#__PURE__*/_jsx(ItemGroup, {
          isBordered: true,
          isSeparated: true,
          children: hiddenFields.map(field => /*#__PURE__*/_jsx(FieldItem, {
            field: field,
            fields: fields,
            view: view,
            onChangeView: onChangeView
          }, field.id))
        })]
      })
    })]
  });
}
function SettingsSection({
  title,
  description,
  children
}) {
  return /*#__PURE__*/_jsxs(Grid, {
    columns: 12,
    className: "dataviews-settings-section",
    gap: 4,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "dataviews-settings-section__sidebar",
      children: [/*#__PURE__*/_jsx(Heading, {
        level: 2,
        className: "dataviews-settings-section__title",
        children: title
      }), description && /*#__PURE__*/_jsx(Text, {
        variant: "muted",
        className: "dataviews-settings-section__description",
        children: description
      })]
    }), /*#__PURE__*/_jsx(Grid, {
      columns: 8,
      gap: 4,
      className: "dataviews-settings-section__content",
      children: children
    })]
  });
}
function DataviewsViewConfigContent({
  density,
  setDensity
}) {
  const {
    view
  } = useContext(DataViewsContext);
  return /*#__PURE__*/_jsxs(VStack, {
    className: "dataviews-view-config",
    spacing: 6,
    children: [/*#__PURE__*/_jsxs(SettingsSection, {
      title: __('Appearance'),
      children: [/*#__PURE__*/_jsxs(HStack, {
        expanded: true,
        className: "is-divided-in-two",
        children: [/*#__PURE__*/_jsx(SortFieldControl, {}), /*#__PURE__*/_jsx(SortDirectionControl, {})]
      }), view.type === LAYOUT_GRID && /*#__PURE__*/_jsx(DensityPicker, {
        density: density,
        setDensity: setDensity
      }), /*#__PURE__*/_jsx(ItemsPerPageControl, {})]
    }), /*#__PURE__*/_jsx(SettingsSection, {
      title: __('Properties'),
      children: /*#__PURE__*/_jsx(FieldControl, {})
    })]
  });
}
function _DataViewsViewConfig({
  density,
  setDensity,
  defaultLayouts = {
    list: {},
    grid: {},
    table: {}
  }
}) {
  const [isShowingViewPopover, setIsShowingViewPopover] = useState(false);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ViewTypeMenu, {
      defaultLayouts: defaultLayouts
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(Button, {
        size: "compact",
        icon: cog,
        label: _x('View options', 'View is used as a noun'),
        onClick: () => setIsShowingViewPopover(true)
      }), isShowingViewPopover && /*#__PURE__*/_jsx(Popover, {
        placement: "bottom-end",
        onClose: () => {
          setIsShowingViewPopover(false);
        },
        focusOnMount: true,
        children: /*#__PURE__*/_jsx(DataviewsViewConfigContent, {
          density: density,
          setDensity: setDensity
        })
      })]
    })]
  });
}
const DataViewsViewConfig = memo(_DataViewsViewConfig);
export default DataViewsViewConfig;
//# sourceMappingURL=index.js.map