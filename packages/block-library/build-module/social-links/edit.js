/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { BlockControls, useInnerBlocksProps, useBlockProps, InspectorControls, ContrastChecker, withColors, InnerBlocks, __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown, __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients, store as blockEditorStore } from '@wordpress/block-editor';
import { MenuGroup, MenuItem, PanelBody, ToggleControl, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const sizeOptions = [{
  name: __('Small'),
  value: 'has-small-icon-size'
}, {
  name: __('Normal'),
  value: 'has-normal-icon-size'
}, {
  name: __('Large'),
  value: 'has-large-icon-size'
}, {
  name: __('Huge'),
  value: 'has-huge-icon-size'
}];
export function SocialLinksEdit(props) {
  var _attributes$layout$or;
  const {
    clientId,
    attributes,
    iconBackgroundColor,
    iconColor,
    isSelected,
    setAttributes,
    setIconBackgroundColor,
    setIconColor
  } = props;
  const {
    iconBackgroundColorValue,
    customIconBackgroundColor,
    iconColorValue,
    openInNewTab,
    showLabels,
    size
  } = attributes;
  const hasSelectedChild = useSelect(select => select(blockEditorStore).hasSelectedInnerBlock(clientId), [clientId]);
  const hasAnySelected = isSelected || hasSelectedChild;
  const logosOnly = attributes.className?.includes('is-style-logos-only');

  // Remove icon background color when logos only style is selected or
  // restore it when any other style is selected.
  const backgroundBackupRef = useRef({});
  useEffect(() => {
    if (logosOnly) {
      backgroundBackupRef.current = {
        iconBackgroundColor,
        iconBackgroundColorValue,
        customIconBackgroundColor
      };
      setAttributes({
        iconBackgroundColor: undefined,
        customIconBackgroundColor: undefined,
        iconBackgroundColorValue: undefined
      });
    } else {
      setAttributes({
        ...backgroundBackupRef.current
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logosOnly]);
  const SocialPlaceholder = /*#__PURE__*/_jsx("li", {
    className: "wp-block-social-links__social-placeholder",
    children: /*#__PURE__*/_jsxs("div", {
      className: "wp-block-social-links__social-placeholder-icons",
      children: [/*#__PURE__*/_jsx("div", {
        className: "wp-social-link wp-social-link-twitter"
      }), /*#__PURE__*/_jsx("div", {
        className: "wp-social-link wp-social-link-facebook"
      }), /*#__PURE__*/_jsx("div", {
        className: "wp-social-link wp-social-link-instagram"
      })]
    })
  });

  // Fallback color values are used maintain selections in case switching
  // themes and named colors in palette do not match.
  const className = clsx(size, {
    'has-visible-labels': showLabels,
    'has-icon-color': iconColor.color || iconColorValue,
    'has-icon-background-color': iconBackgroundColor.color || iconBackgroundColorValue
  });
  const blockProps = useBlockProps({
    className
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    placeholder: !isSelected && SocialPlaceholder,
    templateLock: false,
    orientation: (_attributes$layout$or = attributes.layout?.orientation) !== null && _attributes$layout$or !== void 0 ? _attributes$layout$or : 'horizontal',
    __experimentalAppenderTagName: 'li',
    renderAppender: hasAnySelected && InnerBlocks.ButtonBlockAppender
  });
  const POPOVER_PROPS = {
    position: 'bottom right'
  };
  const colorSettings = [{
    // Use custom attribute as fallback to prevent loss of named color selection when
    // switching themes to a new theme that does not have a matching named color.
    value: iconColor.color || iconColorValue,
    onChange: colorValue => {
      setIconColor(colorValue);
      setAttributes({
        iconColorValue: colorValue
      });
    },
    label: __('Icon color'),
    resetAllFilter: () => {
      setIconColor(undefined);
      setAttributes({
        iconColorValue: undefined
      });
    }
  }];
  if (!logosOnly) {
    colorSettings.push({
      // Use custom attribute as fallback to prevent loss of named color selection when
      // switching themes to a new theme that does not have a matching named color.
      value: iconBackgroundColor.color || iconBackgroundColorValue,
      onChange: colorValue => {
        setIconBackgroundColor(colorValue);
        setAttributes({
          iconBackgroundColorValue: colorValue
        });
      },
      label: __('Icon background'),
      resetAllFilter: () => {
        setIconBackgroundColor(undefined);
        setAttributes({
          iconBackgroundColorValue: undefined
        });
      }
    });
  }
  const colorGradientSettings = useMultipleOriginColorsAndGradients();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      group: "other",
      children: /*#__PURE__*/_jsx(ToolbarDropdownMenu, {
        label: __('Size'),
        text: __('Size'),
        icon: null,
        popoverProps: POPOVER_PROPS,
        children: ({
          onClose
        }) => /*#__PURE__*/_jsx(MenuGroup, {
          children: sizeOptions.map(entry => {
            return /*#__PURE__*/_jsx(MenuItem, {
              icon: (size === entry.value || !size && entry.value === 'has-normal-icon-size') && check,
              isSelected: size === entry.value,
              onClick: () => {
                setAttributes({
                  size: entry.value
                });
              },
              onClose: onClose,
              role: "menuitemradio",
              children: entry.name
            }, entry.value);
          })
        })
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Open links in new tab'),
          checked: openInNewTab,
          onChange: () => setAttributes({
            openInNewTab: !openInNewTab
          })
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show text'),
          checked: showLabels,
          onChange: () => setAttributes({
            showLabels: !showLabels
          })
        })]
      })
    }), colorGradientSettings.hasColorsOrGradients && /*#__PURE__*/_jsxs(InspectorControls, {
      group: "color",
      children: [colorSettings.map(({
        onChange,
        label,
        value,
        resetAllFilter
      }) => /*#__PURE__*/_jsx(ColorGradientSettingsDropdown, {
        __experimentalIsRenderedInSidebar: true,
        settings: [{
          colorValue: value,
          label,
          onColorChange: onChange,
          isShownByDefault: true,
          resetAllFilter,
          enableAlpha: true
        }],
        panelId: clientId,
        ...colorGradientSettings
      }, `social-links-color-${label}`)), !logosOnly && /*#__PURE__*/_jsx(ContrastChecker, {
        textColor: iconColorValue,
        backgroundColor: iconBackgroundColorValue,
        isLargeText: false
      })]
    }), /*#__PURE__*/_jsx("ul", {
      ...innerBlocksProps
    })]
  });
}
const iconColorAttributes = {
  iconColor: 'icon-color',
  iconBackgroundColor: 'icon-background-color'
};
export default withColors(iconColorAttributes)(SocialLinksEdit);
//# sourceMappingURL=edit.js.map