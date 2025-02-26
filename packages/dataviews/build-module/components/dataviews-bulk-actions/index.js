/**
 * WordPress dependencies
 */
import { Button, CheckboxControl, __experimentalHStack as HStack } from '@wordpress/components';
import { __, sprintf, _n } from '@wordpress/i18n';
import { useMemo, useState, useRef, useContext } from '@wordpress/element';
import { useRegistry } from '@wordpress/data';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';
import { ActionWithModal } from '../dataviews-item-actions';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function useHasAPossibleBulkAction(actions, item) {
  return useMemo(() => {
    return actions.some(action => {
      return action.supportsBulk && (!action.isEligible || action.isEligible(item));
    });
  }, [actions, item]);
}
export function useSomeItemHasAPossibleBulkAction(actions, data) {
  return useMemo(() => {
    return data.some(item => {
      return actions.some(action => {
        return action.supportsBulk && (!action.isEligible || action.isEligible(item));
      });
    });
  }, [actions, data]);
}
export function BulkSelectionCheckbox({
  selection,
  onChangeSelection,
  data,
  actions,
  getItemId
}) {
  const selectableItems = useMemo(() => {
    return data.filter(item => {
      return actions.some(action => action.supportsBulk && (!action.isEligible || action.isEligible(item)));
    });
  }, [data, actions]);
  const selectedItems = data.filter(item => selection.includes(getItemId(item)) && selectableItems.includes(item));
  const areAllSelected = selectedItems.length === selectableItems.length;
  return /*#__PURE__*/_jsx(CheckboxControl, {
    className: "dataviews-view-table-selection-checkbox",
    __nextHasNoMarginBottom: true,
    checked: areAllSelected,
    indeterminate: !areAllSelected && !!selectedItems.length,
    onChange: () => {
      if (areAllSelected) {
        onChangeSelection([]);
      } else {
        onChangeSelection(selectableItems.map(item => getItemId(item)));
      }
    },
    "aria-label": areAllSelected ? __('Deselect all') : __('Select all')
  });
}
function ActionTrigger({
  action,
  onClick,
  isBusy,
  items
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/_jsx(Button, {
    disabled: isBusy,
    accessibleWhenDisabled: true,
    label: label,
    icon: action.icon,
    isDestructive: action.isDestructive,
    size: "compact",
    onClick: onClick,
    isBusy: isBusy,
    tooltipPosition: "top"
  });
}
const EMPTY_ARRAY = [];
function ActionButton({
  action,
  selectedItems,
  actionInProgress,
  setActionInProgress
}) {
  const registry = useRegistry();
  const selectedEligibleItems = useMemo(() => {
    return selectedItems.filter(item => {
      return !action.isEligible || action.isEligible(item);
    });
  }, [action, selectedItems]);
  if ('RenderModal' in action) {
    return /*#__PURE__*/_jsx(ActionWithModal, {
      action: action,
      items: selectedEligibleItems,
      ActionTrigger: ActionTrigger
    }, action.id);
  }
  return /*#__PURE__*/_jsx(ActionTrigger, {
    action: action,
    onClick: async () => {
      setActionInProgress(action.id);
      await action.callback(selectedItems, {
        registry
      });
      setActionInProgress(null);
    },
    items: selectedEligibleItems,
    isBusy: actionInProgress === action.id
  }, action.id);
}
function renderFooterContent(data, actions, getItemId, selection, actionsToShow, selectedItems, actionInProgress, setActionInProgress, onChangeSelection) {
  const message = selectedItems.length > 0 ? sprintf( /* translators: %d: number of items. */
  _n('%d Item selected', '%d Items selected', selectedItems.length), selectedItems.length) : sprintf( /* translators: %d: number of items. */
  _n('%d Item', '%d Items', data.length), data.length);
  return /*#__PURE__*/_jsxs(HStack, {
    expanded: false,
    className: "dataviews-bulk-actions-footer__container",
    spacing: 3,
    children: [/*#__PURE__*/_jsx(BulkSelectionCheckbox, {
      selection: selection,
      onChangeSelection: onChangeSelection,
      data: data,
      actions: actions,
      getItemId: getItemId
    }), /*#__PURE__*/_jsx("span", {
      className: "dataviews-bulk-actions-footer__item-count",
      children: message
    }), /*#__PURE__*/_jsxs(HStack, {
      className: "dataviews-bulk-actions-footer__action-buttons",
      expanded: false,
      spacing: 1,
      children: [actionsToShow.map(action => {
        return /*#__PURE__*/_jsx(ActionButton, {
          action: action,
          selectedItems: selectedItems,
          actionInProgress: actionInProgress,
          setActionInProgress: setActionInProgress
        }, action.id);
      }), selectedItems.length > 0 && /*#__PURE__*/_jsx(Button, {
        icon: closeSmall,
        showTooltip: true,
        tooltipPosition: "top",
        size: "compact",
        label: __('Cancel'),
        disabled: !!actionInProgress,
        accessibleWhenDisabled: false,
        onClick: () => {
          onChangeSelection(EMPTY_ARRAY);
        }
      })]
    })]
  });
}
function FooterContent({
  selection,
  actions,
  onChangeSelection,
  data,
  getItemId
}) {
  const [actionInProgress, setActionInProgress] = useState(null);
  const footerContent = useRef(null);
  const bulkActions = useMemo(() => actions.filter(action => action.supportsBulk), [actions]);
  const selectableItems = useMemo(() => {
    return data.filter(item => {
      return bulkActions.some(action => !action.isEligible || action.isEligible(item));
    });
  }, [data, bulkActions]);
  const selectedItems = useMemo(() => {
    return data.filter(item => selection.includes(getItemId(item)) && selectableItems.includes(item));
  }, [selection, data, getItemId, selectableItems]);
  const actionsToShow = useMemo(() => actions.filter(action => {
    return action.supportsBulk && action.icon && selectedItems.some(item => !action.isEligible || action.isEligible(item));
  }), [actions, selectedItems]);
  if (!actionInProgress) {
    if (footerContent.current) {
      footerContent.current = null;
    }
    return renderFooterContent(data, actions, getItemId, selection, actionsToShow, selectedItems, actionInProgress, setActionInProgress, onChangeSelection);
  } else if (!footerContent.current) {
    footerContent.current = renderFooterContent(data, actions, getItemId, selection, actionsToShow, selectedItems, actionInProgress, setActionInProgress, onChangeSelection);
  }
  return footerContent.current;
}
export function BulkActionsFooter() {
  const {
    data,
    selection,
    actions = EMPTY_ARRAY,
    onChangeSelection,
    getItemId
  } = useContext(DataViewsContext);
  return /*#__PURE__*/_jsx(FooterContent, {
    selection: selection,
    onChangeSelection: onChangeSelection,
    data: data,
    actions: actions,
    getItemId: getItemId
  });
}
//# sourceMappingURL=index.js.map