/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarDropdownMenu, ToolbarGroup, MenuGroup, MenuItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import useAvailableAlignments from './use-available-alignments';
import { BLOCK_ALIGNMENTS_CONTROLS, DEFAULT_CONTROL } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function BlockAlignmentUI({
  value,
  onChange,
  controls,
  isToolbar,
  isCollapsed = true
}) {
  const enabledControls = useAvailableAlignments(controls);
  const hasEnabledControls = !!enabledControls.length;
  if (!hasEnabledControls) {
    return null;
  }
  function onChangeAlignment(align) {
    onChange([value, 'none'].includes(align) ? undefined : align);
  }
  const activeAlignmentControl = BLOCK_ALIGNMENTS_CONTROLS[value];
  const defaultAlignmentControl = BLOCK_ALIGNMENTS_CONTROLS[DEFAULT_CONTROL];
  const UIComponent = isToolbar ? ToolbarGroup : ToolbarDropdownMenu;
  const commonProps = {
    icon: activeAlignmentControl ? activeAlignmentControl.icon : defaultAlignmentControl.icon,
    label: __('Align')
  };
  const extraProps = isToolbar ? {
    isCollapsed,
    controls: enabledControls.map(({
      name: controlName
    }) => {
      return {
        ...BLOCK_ALIGNMENTS_CONTROLS[controlName],
        isActive: value === controlName || !value && controlName === 'none',
        role: isCollapsed ? 'menuitemradio' : undefined,
        onClick: () => onChangeAlignment(controlName)
      };
    })
  } : {
    toggleProps: {
      description: __('Change alignment')
    },
    children: ({
      onClose
    }) => {
      return /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsx(MenuGroup, {
          className: "block-editor-block-alignment-control__menu-group",
          children: enabledControls.map(({
            name: controlName,
            info
          }) => {
            const {
              icon,
              title
            } = BLOCK_ALIGNMENTS_CONTROLS[controlName];
            // If no value is provided, mark as selected the `none` option.
            const isSelected = controlName === value || !value && controlName === 'none';
            return /*#__PURE__*/_jsx(MenuItem, {
              icon: icon,
              iconPosition: "left",
              className: clsx('components-dropdown-menu__menu-item', {
                'is-active': isSelected
              }),
              isSelected: isSelected,
              onClick: () => {
                onChangeAlignment(controlName);
                onClose();
              },
              role: "menuitemradio",
              info: info,
              children: title
            }, controlName);
          })
        })
      });
    }
  };
  return /*#__PURE__*/_jsx(UIComponent, {
    ...commonProps,
    ...extraProps
  });
}
export default BlockAlignmentUI;
//# sourceMappingURL=ui.js.map