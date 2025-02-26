/**
 * WordPress dependencies
 */
import { ColorIndicator, Dropdown, DuotonePicker, DuotoneSwatch, MenuGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { Icon, filter } from '@wordpress/icons';
import { useInstanceId } from '@wordpress/compose';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function DuotoneControl({
  id: idProp,
  colorPalette,
  duotonePalette,
  disableCustomColors,
  disableCustomDuotone,
  value,
  onChange
}) {
  let toolbarIcon;
  if (value === 'unset') {
    toolbarIcon = /*#__PURE__*/_jsx(ColorIndicator, {
      className: "block-editor-duotone-control__unset-indicator"
    });
  } else if (value) {
    toolbarIcon = /*#__PURE__*/_jsx(DuotoneSwatch, {
      values: value
    });
  } else {
    toolbarIcon = /*#__PURE__*/_jsx(Icon, {
      icon: filter
    });
  }
  const actionLabel = __('Apply duotone filter');
  const id = useInstanceId(DuotoneControl, 'duotone-control', idProp);
  const descriptionId = `${id}__description`;
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: {
      className: 'block-editor-duotone-control__popover',
      headerTitle: __('Duotone')
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => {
      const openOnArrowDown = event => {
        if (!isOpen && event.keyCode === DOWN) {
          event.preventDefault();
          onToggle();
        }
      };
      return /*#__PURE__*/_jsx(ToolbarButton, {
        showTooltip: true,
        onClick: onToggle,
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        onKeyDown: openOnArrowDown,
        label: actionLabel,
        icon: toolbarIcon
      });
    },
    renderContent: () => /*#__PURE__*/_jsxs(MenuGroup, {
      label: __('Duotone'),
      children: [/*#__PURE__*/_jsx("p", {
        children: __('Create a two-tone color effect without losing your original image.')
      }), /*#__PURE__*/_jsx(DuotonePicker, {
        "aria-label": actionLabel,
        "aria-describedby": descriptionId,
        colorPalette: colorPalette,
        duotonePalette: duotonePalette,
        disableCustomColors: disableCustomColors,
        disableCustomDuotone: disableCustomDuotone,
        value: value,
        onChange: onChange
      })]
    })
  });
}
export default DuotoneControl;
//# sourceMappingURL=index.js.map