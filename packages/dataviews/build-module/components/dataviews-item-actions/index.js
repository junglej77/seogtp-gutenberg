/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { Button, Modal, __experimentalHStack as HStack, privateApis as componentsPrivateApis } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { moreVertical } from '@wordpress/icons';
import { useRegistry } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  DropdownMenuV2,
  kebabCase
} = unlock(componentsPrivateApis);
function ButtonTrigger({
  action,
  onClick,
  items
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/_jsx(Button, {
    label: label,
    icon: action.icon,
    isDestructive: action.isDestructive,
    size: "compact",
    onClick: onClick
  });
}
function DropdownMenuItemTrigger({
  action,
  onClick,
  items
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
    onClick: onClick,
    hideOnClick: !('RenderModal' in action),
    children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
      children: label
    })
  });
}
export function ActionModal({
  action,
  items,
  closeModal
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/_jsx(Modal, {
    title: action.modalHeader || label,
    __experimentalHideHeader: !!action.hideModalHeader,
    onRequestClose: closeModal !== null && closeModal !== void 0 ? closeModal : () => {},
    focusOnMount: "firstContentElement",
    size: "small",
    overlayClassName: `dataviews-action-modal dataviews-action-modal__${kebabCase(action.id)}`,
    children: /*#__PURE__*/_jsx(action.RenderModal, {
      items: items,
      closeModal: closeModal
    })
  });
}
export function ActionWithModal({
  action,
  items,
  ActionTrigger,
  isBusy
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const actionTriggerProps = {
    action,
    onClick: () => {
      setIsModalOpen(true);
    },
    items,
    isBusy
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ActionTrigger, {
      ...actionTriggerProps
    }), isModalOpen && /*#__PURE__*/_jsx(ActionModal, {
      action: action,
      items: items,
      closeModal: () => setIsModalOpen(false)
    })]
  });
}
export function ActionsDropdownMenuGroup({
  actions,
  item
}) {
  const registry = useRegistry();
  return /*#__PURE__*/_jsx(DropdownMenuV2.Group, {
    children: actions.map(action => {
      if ('RenderModal' in action) {
        return /*#__PURE__*/_jsx(ActionWithModal, {
          action: action,
          items: [item],
          ActionTrigger: DropdownMenuItemTrigger
        }, action.id);
      }
      return /*#__PURE__*/_jsx(DropdownMenuItemTrigger, {
        action: action,
        onClick: () => {
          action.callback([item], {
            registry
          });
        },
        items: [item]
      }, action.id);
    })
  });
}
export default function ItemActions({
  item,
  actions,
  isCompact
}) {
  const registry = useRegistry();
  const {
    primaryActions,
    eligibleActions
  } = useMemo(() => {
    // If an action is eligible for all items, doesn't need
    // to provide the `isEligible` function.
    const _eligibleActions = actions.filter(action => !action.isEligible || action.isEligible(item));
    const _primaryActions = _eligibleActions.filter(action => action.isPrimary && !!action.icon);
    return {
      primaryActions: _primaryActions,
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  if (isCompact) {
    return /*#__PURE__*/_jsx(CompactItemActions, {
      item: item,
      actions: eligibleActions
    });
  }
  return /*#__PURE__*/_jsxs(HStack, {
    spacing: 1,
    justify: "flex-end",
    className: "dataviews-item-actions",
    style: {
      flexShrink: '0',
      width: 'auto'
    },
    children: [!!primaryActions.length && primaryActions.map(action => {
      if ('RenderModal' in action) {
        return /*#__PURE__*/_jsx(ActionWithModal, {
          action: action,
          items: [item],
          ActionTrigger: ButtonTrigger
        }, action.id);
      }
      return /*#__PURE__*/_jsx(ButtonTrigger, {
        action: action,
        onClick: () => {
          action.callback([item], {
            registry
          });
        },
        items: [item]
      }, action.id);
    }), /*#__PURE__*/_jsx(CompactItemActions, {
      item: item,
      actions: eligibleActions
    })]
  });
}
function CompactItemActions({
  item,
  actions
}) {
  return /*#__PURE__*/_jsx(DropdownMenuV2, {
    trigger: /*#__PURE__*/_jsx(Button, {
      size: "compact",
      icon: moreVertical,
      label: __('Actions'),
      accessibleWhenDisabled: true,
      disabled: !actions.length,
      className: "dataviews-all-actions-button"
    }),
    placement: "bottom-end",
    children: /*#__PURE__*/_jsx(ActionsDropdownMenuGroup, {
      actions: actions,
      item: item
    })
  });
}
//# sourceMappingURL=index.js.map