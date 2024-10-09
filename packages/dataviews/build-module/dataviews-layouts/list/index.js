/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInstanceId, usePrevious } from '@wordpress/compose';
import { __experimentalHStack as HStack, __experimentalVStack as VStack, Button, privateApis as componentsPrivateApis, Spinner, VisuallyHidden, Composite } from '@wordpress/components';
import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';
import { useRegistry } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { ActionsDropdownMenuGroup, ActionModal } from '../../components/dataviews-item-actions';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  DropdownMenuV2: DropdownMenu
} = unlock(componentsPrivateApis);
function generateItemWrapperCompositeId(idPrefix) {
  return `${idPrefix}-item-wrapper`;
}
function generatePrimaryActionCompositeId(idPrefix, primaryActionId) {
  return `${idPrefix}-primary-action-${primaryActionId}`;
}
function generateDropdownTriggerCompositeId(idPrefix) {
  return `${idPrefix}-dropdown`;
}
function PrimaryActionGridCell({
  idPrefix,
  primaryAction,
  item
}) {
  const registry = useRegistry();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const compositeItemId = generatePrimaryActionCompositeId(idPrefix, primaryAction.id);
  const label = typeof primaryAction.label === 'string' ? primaryAction.label : primaryAction.label([item]);
  return 'RenderModal' in primaryAction ? /*#__PURE__*/_jsx("div", {
    role: "gridcell",
    children: /*#__PURE__*/_jsx(Composite.Item, {
      id: compositeItemId,
      render: /*#__PURE__*/_jsx(Button, {
        label: label,
        icon: primaryAction.icon,
        isDestructive: primaryAction.isDestructive,
        size: "small",
        onClick: () => setIsModalOpen(true)
      }),
      children: isModalOpen && /*#__PURE__*/_jsx(ActionModal, {
        action: primaryAction,
        items: [item],
        closeModal: () => setIsModalOpen(false)
      })
    })
  }, primaryAction.id) : /*#__PURE__*/_jsx("div", {
    role: "gridcell",
    children: /*#__PURE__*/_jsx(Composite.Item, {
      id: compositeItemId,
      render: /*#__PURE__*/_jsx(Button, {
        label: label,
        icon: primaryAction.icon,
        isDestructive: primaryAction.isDestructive,
        size: "small",
        onClick: () => {
          primaryAction.callback([item], {
            registry
          });
        }
      })
    })
  }, primaryAction.id);
}
function ListItem({
  actions,
  idPrefix,
  isSelected,
  item,
  mediaField,
  onSelect,
  primaryField,
  visibleFields,
  onDropdownTriggerKeyDown
}) {
  const itemRef = useRef(null);
  const labelId = `${idPrefix}-label`;
  const descriptionId = `${idPrefix}-description`;
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    if (isSelected) {
      itemRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [isSelected]);
  const {
    primaryAction,
    eligibleActions
  } = useMemo(() => {
    // If an action is eligible for all items, doesn't need
    // to provide the `isEligible` function.
    const _eligibleActions = actions.filter(action => !action.isEligible || action.isEligible(item));
    const _primaryActions = _eligibleActions.filter(action => action.isPrimary && !!action.icon);
    return {
      primaryAction: _primaryActions?.[0],
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  const renderedMediaField = mediaField?.render ? /*#__PURE__*/_jsx(mediaField.render, {
    item: item
  }) : /*#__PURE__*/_jsx("div", {
    className: "dataviews-view-list__media-placeholder"
  });
  const renderedPrimaryField = primaryField?.render ? /*#__PURE__*/_jsx(primaryField.render, {
    item: item
  }) : null;
  return /*#__PURE__*/_jsx(Composite.Row, {
    ref: itemRef,
    render: /*#__PURE__*/_jsx("li", {}),
    role: "row",
    className: clsx({
      'is-selected': isSelected,
      'is-hovered': isHovered
    }),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    children: /*#__PURE__*/_jsxs(HStack, {
      className: "dataviews-view-list__item-wrapper",
      alignment: "center",
      spacing: 0,
      children: [/*#__PURE__*/_jsx("div", {
        role: "gridcell",
        children: /*#__PURE__*/_jsx(Composite.Item, {
          render: /*#__PURE__*/_jsx("div", {}),
          role: "button",
          id: generateItemWrapperCompositeId(idPrefix),
          "aria-pressed": isSelected,
          "aria-labelledby": labelId,
          "aria-describedby": descriptionId,
          className: "dataviews-view-list__item",
          onClick: () => onSelect(item),
          children: /*#__PURE__*/_jsxs(HStack, {
            spacing: 3,
            justify: "start",
            alignment: "flex-start",
            children: [/*#__PURE__*/_jsx("div", {
              className: "dataviews-view-list__media-wrapper",
              children: renderedMediaField
            }), /*#__PURE__*/_jsxs(VStack, {
              spacing: 1,
              className: "dataviews-view-list__field-wrapper",
              children: [/*#__PURE__*/_jsx("span", {
                className: "dataviews-view-list__primary-field",
                id: labelId,
                children: renderedPrimaryField
              }), /*#__PURE__*/_jsx("div", {
                className: "dataviews-view-list__fields",
                id: descriptionId,
                children: visibleFields.map(field => /*#__PURE__*/_jsxs("div", {
                  className: "dataviews-view-list__field",
                  children: [/*#__PURE__*/_jsx(VisuallyHidden, {
                    as: "span",
                    className: "dataviews-view-list__field-label",
                    children: field.label
                  }), /*#__PURE__*/_jsx("span", {
                    className: "dataviews-view-list__field-value",
                    children: /*#__PURE__*/_jsx(field.render, {
                      item: item
                    })
                  })]
                }, field.id))
              })]
            })]
          })
        })
      }), eligibleActions?.length > 0 && /*#__PURE__*/_jsxs(HStack, {
        spacing: 3,
        justify: "flex-end",
        className: "dataviews-view-list__item-actions",
        style: {
          flexShrink: '0',
          width: 'auto'
        },
        children: [primaryAction && /*#__PURE__*/_jsx(PrimaryActionGridCell, {
          idPrefix: idPrefix,
          primaryAction: primaryAction,
          item: item
        }), /*#__PURE__*/_jsx("div", {
          role: "gridcell",
          children: /*#__PURE__*/_jsx(DropdownMenu, {
            trigger: /*#__PURE__*/_jsx(Composite.Item, {
              id: generateDropdownTriggerCompositeId(idPrefix),
              render: /*#__PURE__*/_jsx(Button, {
                size: "small",
                icon: moreVertical,
                label: __('Actions'),
                accessibleWhenDisabled: true,
                disabled: !actions.length,
                onKeyDown: onDropdownTriggerKeyDown
              })
            }),
            placement: "bottom-end",
            children: /*#__PURE__*/_jsx(ActionsDropdownMenuGroup, {
              actions: eligibleActions,
              item: item
            })
          })
        })]
      })]
    })
  });
}
export default function ViewList(props) {
  const {
    actions,
    data,
    fields,
    getItemId,
    isLoading,
    onChangeSelection,
    selection,
    view
  } = props;
  const baseId = useInstanceId(ViewList, 'view-list');
  const selectedItem = data?.findLast(item => selection.includes(getItemId(item)));
  const mediaField = fields.find(field => field.id === view.layout?.mediaField);
  const primaryField = fields.find(field => field.id === view.layout?.primaryField);
  const viewFields = view.fields || fields.map(field => field.id);
  const visibleFields = fields.filter(field => viewFields.includes(field.id) && ![view.layout?.primaryField, view.layout?.mediaField].includes(field.id));
  const onSelect = item => onChangeSelection([getItemId(item)]);
  const generateCompositeItemIdPrefix = useCallback(item => `${baseId}-${getItemId(item)}`, [baseId, getItemId]);
  const isActiveCompositeItem = useCallback((item, idToCheck) => {
    // All composite items use the same prefix in their IDs.
    return idToCheck.startsWith(generateCompositeItemIdPrefix(item));
  }, [generateCompositeItemIdPrefix]);

  // Controlled state for the active composite item.
  const [activeCompositeId, setActiveCompositeId] = useState(undefined);

  // Update the active composite item when the selected item changes.
  useEffect(() => {
    if (selectedItem) {
      setActiveCompositeId(generateItemWrapperCompositeId(generateCompositeItemIdPrefix(selectedItem)));
    }
  }, [selectedItem, generateCompositeItemIdPrefix]);
  const activeItemIndex = data.findIndex(item => isActiveCompositeItem(item, activeCompositeId !== null && activeCompositeId !== void 0 ? activeCompositeId : ''));
  const previousActiveItemIndex = usePrevious(activeItemIndex);
  const isActiveIdInList = activeItemIndex !== -1;
  const selectCompositeItem = useCallback((targetIndex, generateCompositeId) => {
    // Clamping between 0 and data.length - 1 to avoid out of bounds.
    const clampedIndex = Math.min(data.length - 1, Math.max(0, targetIndex));
    const itemIdPrefix = generateCompositeItemIdPrefix(data[clampedIndex]);
    const targetCompositeItemId = generateCompositeId(itemIdPrefix);
    setActiveCompositeId(targetCompositeItemId);
    document.getElementById(targetCompositeItemId)?.focus();
  }, [data, generateCompositeItemIdPrefix]);

  // Select a new active composite item when the current active item
  // is removed from the list.
  useEffect(() => {
    const wasActiveIdInList = previousActiveItemIndex !== undefined && previousActiveItemIndex !== -1;
    if (!isActiveIdInList && wasActiveIdInList) {
      // By picking `previousActiveItemIndex` as the next item index, we are
      // basically picking the item that would have been after the deleted one.
      // If the previously active (and removed) item was the last of the list,
      // we will select the item before it — which is the new last item.
      selectCompositeItem(previousActiveItemIndex, generateItemWrapperCompositeId);
    }
  }, [isActiveIdInList, selectCompositeItem, previousActiveItemIndex]);

  // Prevent the default behavior (open dropdown menu) and instead select the
  // dropdown menu trigger on the previous/next row.
  // https://github.com/ariakit/ariakit/issues/3768
  const onDropdownTriggerKeyDown = useCallback(event => {
    if (event.key === 'ArrowDown') {
      // Select the dropdown menu trigger item in the next row.
      event.preventDefault();
      selectCompositeItem(activeItemIndex + 1, generateDropdownTriggerCompositeId);
    }
    if (event.key === 'ArrowUp') {
      // Select the dropdown menu trigger item in the previous row.
      event.preventDefault();
      selectCompositeItem(activeItemIndex - 1, generateDropdownTriggerCompositeId);
    }
  }, [selectCompositeItem, activeItemIndex]);
  const hasData = data?.length;
  if (!hasData) {
    return /*#__PURE__*/_jsx("div", {
      className: clsx({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !hasData && !isLoading
      }),
      children: !hasData && /*#__PURE__*/_jsx("p", {
        children: isLoading ? /*#__PURE__*/_jsx(Spinner, {}) : __('No results')
      })
    });
  }
  return /*#__PURE__*/_jsx(Composite, {
    id: baseId,
    render: /*#__PURE__*/_jsx("ul", {}),
    className: "dataviews-view-list",
    role: "grid",
    activeId: activeCompositeId,
    setActiveId: setActiveCompositeId,
    children: data.map(item => {
      const id = generateCompositeItemIdPrefix(item);
      return /*#__PURE__*/_jsx(ListItem, {
        idPrefix: id,
        actions: actions,
        item: item,
        isSelected: item === selectedItem,
        onSelect: onSelect,
        mediaField: mediaField,
        primaryField: primaryField,
        visibleFields: visibleFields,
        onDropdownTriggerKeyDown: onDropdownTriggerKeyDown
      }, id);
    })
  });
}
//# sourceMappingURL=index.js.map