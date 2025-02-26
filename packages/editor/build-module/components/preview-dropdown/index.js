/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { DropdownMenu, MenuGroup, MenuItem, MenuItemsChoice, VisuallyHidden, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { desktop, mobile, tablet, external } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useEffect, useRef } from '@wordpress/element';
import { store as preferencesStore } from '@wordpress/preferences';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { ActionItem } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostPreviewButton from '../post-preview-button';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function PreviewDropdown({
  forceIsAutosaveable,
  disabled
}) {
  const {
    deviceType,
    editorMode,
    homeUrl,
    isTemplate,
    isViewable,
    showIconLabels
  } = useSelect(select => {
    var _getPostType$viewable;
    const {
      getDeviceType,
      getCurrentPostType
    } = select(editorStore);
    const {
      getEntityRecord,
      getPostType
    } = select(coreStore);
    const {
      get
    } = select(preferencesStore);
    const {
      __unstableGetEditorMode
    } = select(blockEditorStore);
    const _currentPostType = getCurrentPostType();
    return {
      deviceType: getDeviceType(),
      editorMode: __unstableGetEditorMode(),
      homeUrl: getEntityRecord('root', '__unstableBase')?.home,
      isTemplate: _currentPostType === 'wp_template',
      isViewable: (_getPostType$viewable = getPostType(_currentPostType)?.viewable) !== null && _getPostType$viewable !== void 0 ? _getPostType$viewable : false,
      showIconLabels: get('core', 'showIconLabels')
    };
  }, []);
  const {
    setDeviceType
  } = useDispatch(editorStore);
  const {
    __unstableSetEditorMode
  } = useDispatch(blockEditorStore);

  /**
   * Save the original editing mode in a ref to restore it when we exit zoom out.
   */
  const originalEditingModeRef = useRef(editorMode);
  useEffect(() => {
    if (editorMode !== 'zoom-out') {
      originalEditingModeRef.current = editorMode;
    }
    return () => {
      if (editorMode === 'zoom-out' && editorMode !== originalEditingModeRef.current) {
        __unstableSetEditorMode(originalEditingModeRef.current);
      }
    };
  }, [editorMode, __unstableSetEditorMode]);
  const isMobile = useViewportMatch('medium', '<');
  if (isMobile) {
    return null;
  }
  const popoverProps = {
    placement: 'bottom-end'
  };
  const toggleProps = {
    className: 'editor-preview-dropdown__toggle',
    iconPosition: 'right',
    size: 'compact',
    showTooltip: !showIconLabels,
    disabled,
    accessibleWhenDisabled: disabled
  };
  const menuProps = {
    'aria-label': __('View options')
  };
  const deviceIcons = {
    desktop,
    mobile,
    tablet
  };

  /**
   * The choices for the device type.
   *
   * @type {Array}
   */
  const choices = [{
    value: 'Desktop',
    label: __('Desktop'),
    icon: desktop
  }];
  if (window.__experimentalEnableZoomOutExperiment) {
    choices.push({
      value: 'ZoomOut',
      label: __('Desktop (50%)'),
      icon: desktop
    });
  }
  choices.push({
    value: 'Tablet',
    label: __('Tablet'),
    icon: tablet
  });
  choices.push({
    value: 'Mobile',
    label: __('Mobile'),
    icon: mobile
  });
  const previewValue = editorMode === 'zoom-out' ? 'ZoomOut' : deviceType;

  /**
   * Handles the selection of a device type.
   *
   * @param {string} value The device type.
   */
  const onSelect = value => {
    let newEditorMode = originalEditingModeRef.current;
    if (value === 'ZoomOut') {
      newEditorMode = 'zoom-out';
      setDeviceType('Desktop');
    } else {
      setDeviceType(value);
    }
    __unstableSetEditorMode(newEditorMode);
  };
  return /*#__PURE__*/_jsx(DropdownMenu, {
    className: clsx('editor-preview-dropdown', `editor-preview-dropdown--${deviceType.toLowerCase()}`),
    popoverProps: popoverProps,
    toggleProps: toggleProps,
    menuProps: menuProps,
    icon: deviceIcons[deviceType.toLowerCase()],
    text: editorMode === 'zoom-out' ? __('50%') : undefined,
    label: __('View'),
    disableOpenOnArrowDown: disabled,
    children: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsx(MenuItemsChoice, {
          choices: choices,
          value: previewValue,
          onSelect: onSelect
        })
      }), isTemplate && /*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsxs(MenuItem, {
          href: homeUrl,
          target: "_blank",
          icon: external,
          onClick: onClose,
          children: [__('View site'), /*#__PURE__*/_jsx(VisuallyHidden, {
            as: "span",
            children: /* translators: accessibility text */
            __('(opens in a new tab)')
          })]
        })
      }), isViewable && /*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsx(PostPreviewButton, {
          className: "editor-preview-dropdown__button-external",
          role: "menuitem",
          forceIsAutosaveable: forceIsAutosaveable,
          "aria-label": __('Preview in new tab'),
          textContent: /*#__PURE__*/_jsxs(_Fragment, {
            children: [__('Preview in new tab'), /*#__PURE__*/_jsx(Icon, {
              icon: external
            })]
          }),
          onPreview: onClose
        })
      }), /*#__PURE__*/_jsx(ActionItem.Slot, {
        name: "core/plugin-preview-menu",
        as: MenuGroup,
        fillProps: {
          onClick: onClose
        }
      })]
    })
  });
}
//# sourceMappingURL=index.js.map