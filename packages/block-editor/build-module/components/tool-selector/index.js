/**
 * WordPress dependencies
 */
import { Dropdown, Button, MenuItemsChoice, SVG, Path, NavigableMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { forwardRef } from '@wordpress/element';
import { Icon, edit as editIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const selectIcon = /*#__PURE__*/_jsx(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/_jsx(Path, {
    d: "M9.4 20.5L5.2 3.8l14.6 9-2 .3c-.2 0-.4.1-.7.1-.9.2-1.6.3-2.2.5-.8.3-1.4.5-1.8.8-.4.3-.8.8-1.3 1.5-.4.5-.8 1.2-1.2 2l-.3.6-.9 1.9zM7.6 7.1l2.4 9.3c.2-.4.5-.8.7-1.1.6-.8 1.1-1.4 1.6-1.8.5-.4 1.3-.8 2.2-1.1l1.2-.3-8.1-5z"
  })
});
function ToolSelector(props, ref) {
  const mode = useSelect(select => select(blockEditorStore).__unstableGetEditorMode(), []);
  const {
    __unstableSetEditorMode
  } = useDispatch(blockEditorStore);
  return /*#__PURE__*/_jsx(Dropdown, {
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      ...props,
      ref: ref,
      icon: mode === 'navigation' ? selectIcon : editIcon,
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      onClick: onToggle
      /* translators: button label text should, if possible, be under 16 characters. */,
      label: __('Tools')
    }),
    popoverProps: {
      placement: 'bottom-start'
    },
    renderContent: () => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(NavigableMenu, {
        role: "menu",
        "aria-label": __('Tools'),
        children: /*#__PURE__*/_jsx(MenuItemsChoice, {
          value: mode === 'navigation' ? 'navigation' : 'edit',
          onSelect: __unstableSetEditorMode,
          choices: [{
            value: 'edit',
            label: /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(Icon, {
                icon: editIcon
              }), __('Edit')]
            })
          }, {
            value: 'navigation',
            label: /*#__PURE__*/_jsxs(_Fragment, {
              children: [selectIcon, __('Select')]
            })
          }]
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "block-editor-tool-selector__help",
        children: __('Tools provide different interactions for selecting, navigating, and editing blocks. Toggle between select and edit by pressing Escape and Enter.')
      })]
    })
  });
}
export default forwardRef(ToolSelector);
//# sourceMappingURL=index.js.map