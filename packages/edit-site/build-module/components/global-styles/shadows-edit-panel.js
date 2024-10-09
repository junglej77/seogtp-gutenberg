/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalSpacer as Spacer, __experimentalItemGroup as ItemGroup, __experimentalInputControl as InputControl, __experimentalUnitControl as UnitControl, __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue, __experimentalGrid as Grid, __experimentalDropdownContentWrapper as DropdownContentWrapper, __experimentalUseNavigator as useNavigator, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption, __experimentalConfirmDialog as ConfirmDialog, Dropdown, RangeControl, Button, Flex, FlexItem, ColorPalette, Modal, privateApis as componentsPrivateApis } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { plus, shadow as shadowIcon, reset, settings, moreVertical } from '@wordpress/icons';
import { useState, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import Subtitle from './subtitle';
import ScreenHeader from './header';
import { defaultShadow } from './shadows-panel';
import { getShadowParts, shadowStringToObject, shadowObjectToString, CUSTOM_VALUE_SETTINGS } from './shadow-utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
const {
  DropdownMenuV2
} = unlock(componentsPrivateApis);
const customShadowMenuItems = [{
  label: __('Rename'),
  action: 'rename'
}, {
  label: __('Delete'),
  action: 'delete'
}];
const presetShadowMenuItems = [{
  label: __('Reset'),
  action: 'reset'
}];
export default function ShadowsEditPanel() {
  const {
    params: {
      category,
      slug
    },
    goTo
  } = useNavigator();
  const [shadows, setShadows] = useGlobalSetting(`shadow.presets.${category}`);
  const [baseShadows] = useGlobalSetting(`shadow.presets.${category}`, undefined, 'base');
  const [selectedShadow, setSelectedShadow] = useState(() => (shadows || []).find(shadow => shadow.slug === slug));
  const baseSelectedShadow = useMemo(() => (baseShadows || []).find(b => b.slug === slug), [baseShadows, slug]);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [shadowName, setShadowName] = useState(selectedShadow.name);
  const onShadowChange = shadow => {
    setSelectedShadow({
      ...selectedShadow,
      shadow
    });
    const updatedShadows = shadows.map(s => s.slug === slug ? {
      ...selectedShadow,
      shadow
    } : s);
    setShadows(updatedShadows);
  };
  const onMenuClick = action => {
    if (action === 'reset') {
      const updatedShadows = shadows.map(s => s.slug === slug ? baseSelectedShadow : s);
      setSelectedShadow(baseSelectedShadow);
      setShadows(updatedShadows);
    } else if (action === 'delete') {
      setIsConfirmDialogVisible(true);
    } else if (action === 'rename') {
      setIsRenameModalVisible(true);
    }
  };
  const handleShadowDelete = () => {
    const updatedShadows = shadows.filter(s => s.slug !== slug);
    setShadows(updatedShadows);
    goTo(`/shadows`);
  };
  const handleShadowRename = newName => {
    if (!newName) {
      return;
    }
    const updatedShadows = shadows.map(s => s.slug === slug ? {
      ...selectedShadow,
      name: newName
    } : s);
    setSelectedShadow({
      ...selectedShadow,
      name: newName
    });
    setShadows(updatedShadows);
  };
  return !selectedShadow ? /*#__PURE__*/_jsx(ScreenHeader, {
    title: ""
  }) : /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(HStack, {
      justify: "space-between",
      children: [/*#__PURE__*/_jsx(ScreenHeader, {
        title: selectedShadow.name
      }), /*#__PURE__*/_jsx(FlexItem, {
        children: /*#__PURE__*/_jsx(Spacer, {
          marginTop: 2,
          marginBottom: 0,
          paddingX: 4,
          children: /*#__PURE__*/_jsx(DropdownMenuV2, {
            trigger: /*#__PURE__*/_jsx(Button, {
              size: "small",
              icon: moreVertical,
              label: __('Menu')
            }),
            children: (category === 'custom' ? customShadowMenuItems : presetShadowMenuItems).map(item => /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
              onClick: () => onMenuClick(item.action),
              disabled: item.action === 'reset' && selectedShadow.shadow === baseSelectedShadow.shadow,
              children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
                children: item.label
              })
            }, item.action))
          })
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "edit-site-global-styles-screen",
      children: [/*#__PURE__*/_jsx(ShadowsPreview, {
        shadow: selectedShadow.shadow
      }), /*#__PURE__*/_jsx(ShadowEditor, {
        shadow: selectedShadow.shadow,
        onChange: onShadowChange
      })]
    }), isConfirmDialogVisible && /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: true,
      onConfirm: () => {
        handleShadowDelete();
        setIsConfirmDialogVisible(false);
      },
      onCancel: () => {
        setIsConfirmDialogVisible(false);
      },
      confirmButtonText: __('Delete'),
      size: "medium",
      children: sprintf(
      // translators: %s: name of the shadow
      'Are you sure you want to delete "%s"?', selectedShadow.name)
    }), isRenameModalVisible && /*#__PURE__*/_jsx(Modal, {
      title: __('Rename'),
      onRequestClose: () => setIsRenameModalVisible(false),
      size: "small",
      children: /*#__PURE__*/_jsxs("form", {
        onSubmit: event => {
          event.preventDefault();
          handleShadowRename(shadowName);
          setIsRenameModalVisible(false);
        },
        children: [/*#__PURE__*/_jsx(InputControl, {
          __next40pxDefaultSize: true,
          autoComplete: "off",
          label: __('Name'),
          placeholder: __('Shadow name'),
          value: shadowName,
          onChange: value => setShadowName(value)
        }), /*#__PURE__*/_jsx(Spacer, {
          marginBottom: 6
        }), /*#__PURE__*/_jsxs(Flex, {
          className: "block-editor-shadow-edit-modal__actions",
          justify: "flex-end",
          expanded: false,
          children: [/*#__PURE__*/_jsx(FlexItem, {
            children: /*#__PURE__*/_jsx(Button
            // TODO: Switch to `true` (40px size) if possible
            , {
              __next40pxDefaultSize: false,
              variant: "tertiary",
              onClick: () => setIsRenameModalVisible(false),
              children: __('Cancel')
            })
          }), /*#__PURE__*/_jsx(FlexItem, {
            children: /*#__PURE__*/_jsx(Button
            // TODO: Switch to `true` (40px size) if possible
            , {
              __next40pxDefaultSize: false,
              variant: "primary",
              type: "submit",
              children: __('Save')
            })
          })]
        })]
      })
    })]
  });
}
function ShadowsPreview({
  shadow
}) {
  const shadowStyle = {
    boxShadow: shadow
  };
  return /*#__PURE__*/_jsx(Spacer, {
    marginBottom: 4,
    marginTop: -2,
    children: /*#__PURE__*/_jsx(HStack, {
      align: "center",
      justify: "center",
      className: "edit-site-global-styles__shadow-preview-panel",
      children: /*#__PURE__*/_jsx("div", {
        className: "edit-site-global-styles__shadow-preview-block",
        style: shadowStyle
      })
    })
  });
}
function ShadowEditor({
  shadow,
  onChange
}) {
  const shadowParts = useMemo(() => getShadowParts(shadow), [shadow]);
  const onChangeShadowPart = (index, part) => {
    shadowParts[index] = part;
    onChange(shadowParts.join(', '));
  };
  const onAddShadowPart = () => {
    shadowParts.push(defaultShadow);
    onChange(shadowParts.join(', '));
  };
  const onRemoveShadowPart = index => {
    shadowParts.splice(index, 1);
    onChange(shadowParts.join(', '));
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(VStack, {
      spacing: 2,
      children: /*#__PURE__*/_jsxs(HStack, {
        justify: "space-between",
        children: [/*#__PURE__*/_jsx(Flex, {
          align: "center",
          className: "edit-site-global-styles__shadows-panel__title",
          children: /*#__PURE__*/_jsx(Subtitle, {
            level: 3,
            children: __('Shadows')
          })
        }), /*#__PURE__*/_jsx(FlexItem, {
          className: "edit-site-global-styles__shadows-panel__options-container",
          children: /*#__PURE__*/_jsx(Button, {
            size: "small",
            icon: plus,
            label: __('Add shadow'),
            onClick: () => {
              onAddShadowPart();
            }
          })
        })]
      })
    }), /*#__PURE__*/_jsx(Spacer, {}), /*#__PURE__*/_jsx(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: shadowParts.map((part, index) => /*#__PURE__*/_jsx(ShadowItem, {
        shadow: part,
        onChange: value => onChangeShadowPart(index, value),
        canRemove: shadowParts.length > 1,
        onRemove: () => onRemoveShadowPart(index)
      }, index))
    })]
  });
}
function ShadowItem({
  shadow,
  onChange,
  canRemove,
  onRemove
}) {
  const popoverProps = {
    placement: 'left-start',
    offset: 36,
    shift: true
  };
  const shadowObj = useMemo(() => shadowStringToObject(shadow), [shadow]);
  const onShadowChange = newShadow => {
    onChange(shadowObjectToString(newShadow));
  };
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: popoverProps,
    className: "edit-site-global-styles__shadow-editor__dropdown",
    renderToggle: ({
      onToggle,
      isOpen
    }) => {
      const toggleProps = {
        onClick: onToggle,
        className: clsx('edit-site-global-styles__shadow-editor__dropdown-toggle', {
          'is-open': isOpen
        }),
        'aria-expanded': isOpen
      };
      const removeButtonProps = {
        onClick: onRemove,
        className: clsx('edit-site-global-styles__shadow-editor__remove-button', {
          'is-open': isOpen
        }),
        label: __('Remove shadow')
      };
      return /*#__PURE__*/_jsxs(HStack, {
        align: "center",
        justify: "flex-start",
        spacing: 0,
        children: [/*#__PURE__*/_jsx(FlexItem, {
          style: {
            flexGrow: 1
          },
          children: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            icon: shadowIcon,
            ...toggleProps,
            children: shadowObj.inset ? __('Inner shadow') : __('Drop shadow')
          })
        }), canRemove && /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            icon: reset,
            ...removeButtonProps
          })
        })]
      });
    },
    renderContent: () => /*#__PURE__*/_jsx(DropdownContentWrapper, {
      paddingSize: "medium",
      className: "edit-site-global-styles__shadow-editor__dropdown-content",
      children: /*#__PURE__*/_jsx(ShadowPopover, {
        shadowObj: shadowObj,
        onChange: onShadowChange
      })
    })
  });
}
function ShadowPopover({
  shadowObj,
  onChange
}) {
  const __experimentalIsRenderedInSidebar = true;
  const enableAlpha = true;
  const onShadowChange = (key, value) => {
    const newShadow = {
      ...shadowObj,
      [key]: value
    };
    onChange(newShadow);
  };
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 4,
    className: "edit-site-global-styles__shadow-editor-panel",
    children: [/*#__PURE__*/_jsx(ColorPalette, {
      clearable: false,
      enableAlpha: enableAlpha,
      __experimentalIsRenderedInSidebar: __experimentalIsRenderedInSidebar,
      value: shadowObj.color,
      onChange: value => onShadowChange('color', value)
    }), /*#__PURE__*/_jsxs(ToggleGroupControl, {
      __nextHasNoMarginBottom: true,
      value: shadowObj.inset ? 'inset' : 'outset',
      isBlock: true,
      onChange: value => onShadowChange('inset', value === 'inset'),
      hideLabelFromVision: true,
      __next40pxDefaultSize: true,
      children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
        value: "outset",
        label: __('Outset')
      }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
        value: "inset",
        label: __('Inset')
      })]
    }), /*#__PURE__*/_jsxs(Grid, {
      columns: 2,
      gap: 4,
      children: [/*#__PURE__*/_jsx(ShadowInputControl, {
        label: __('X Position'),
        value: shadowObj.x,
        hasNegativeRange: true,
        onChange: value => onShadowChange('x', value)
      }), /*#__PURE__*/_jsx(ShadowInputControl, {
        label: __('Y Position'),
        value: shadowObj.y,
        hasNegativeRange: true,
        onChange: value => onShadowChange('y', value)
      }), /*#__PURE__*/_jsx(ShadowInputControl, {
        label: __('Blur'),
        value: shadowObj.blur,
        onChange: value => onShadowChange('blur', value)
      }), /*#__PURE__*/_jsx(ShadowInputControl, {
        label: __('Spread'),
        value: shadowObj.spread,
        hasNegativeRange: true,
        onChange: value => onShadowChange('spread', value)
      })]
    })]
  });
}
function ShadowInputControl({
  label,
  value,
  onChange,
  hasNegativeRange
}) {
  var _CUSTOM_VALUE_SETTING, _CUSTOM_VALUE_SETTING2, _CUSTOM_VALUE_SETTING3;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(value);
  const sliderOnChange = next => {
    onChange(next !== undefined ? [next, parsedUnit || 'px'].join('') : '0px');
  };
  const onValueChange = next => {
    const isNumeric = next !== undefined && !isNaN(parseFloat(next));
    const nextValue = isNumeric ? next : '0px';
    onChange(nextValue);
  };
  return /*#__PURE__*/_jsxs(VStack, {
    justify: "flex-start",
    children: [/*#__PURE__*/_jsxs(HStack, {
      justify: "space-between",
      children: [/*#__PURE__*/_jsx(Subtitle, {
        children: label
      }), /*#__PURE__*/_jsx(Button, {
        label: __('Use custom size'),
        icon: settings,
        onClick: () => {
          setIsCustomInput(!isCustomInput);
        },
        isPressed: isCustomInput,
        size: "small"
      })]
    }), isCustomInput ? /*#__PURE__*/_jsx(UnitControl, {
      label: label,
      hideLabelFromVision: true,
      __next40pxDefaultSize: true,
      value: value,
      onChange: onValueChange
    }) : /*#__PURE__*/_jsx(RangeControl, {
      value: parsedQuantity !== null && parsedQuantity !== void 0 ? parsedQuantity : 0,
      onChange: sliderOnChange,
      withInputField: false,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      min: hasNegativeRange ? -((_CUSTOM_VALUE_SETTING = CUSTOM_VALUE_SETTINGS[parsedUnit !== null && parsedUnit !== void 0 ? parsedUnit : 'px']?.max) !== null && _CUSTOM_VALUE_SETTING !== void 0 ? _CUSTOM_VALUE_SETTING : 10) : 0,
      max: (_CUSTOM_VALUE_SETTING2 = CUSTOM_VALUE_SETTINGS[parsedUnit !== null && parsedUnit !== void 0 ? parsedUnit : 'px']?.max) !== null && _CUSTOM_VALUE_SETTING2 !== void 0 ? _CUSTOM_VALUE_SETTING2 : 10,
      step: (_CUSTOM_VALUE_SETTING3 = CUSTOM_VALUE_SETTINGS[parsedUnit !== null && parsedUnit !== void 0 ? parsedUnit : 'px']?.step) !== null && _CUSTOM_VALUE_SETTING3 !== void 0 ? _CUSTOM_VALUE_SETTING3 : 0.1
    })]
  });
}
//# sourceMappingURL=shadows-edit-panel.js.map