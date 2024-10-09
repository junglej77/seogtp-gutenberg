/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { __experimentalSpacer as Spacer, __experimentalUseNavigator as useNavigator, __experimentalView as View, __experimentalHStack as HStack, __experimentalVStack as VStack, privateApis as componentsPrivateApis, Button, FlexItem, ToggleControl } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../../lock-unlock';
import ScreenHeader from '../header';
import FontSizePreview from './font-size-preview';
import ConfirmDeleteFontSizeDialog from './confirm-delete-font-size-dialog';
import RenameFontSizeDialog from './rename-font-size-dialog';
import SizeControl from '../size-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  DropdownMenuV2
} = unlock(componentsPrivateApis);
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
function FontSize() {
  var _fontSizes$origin;
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const {
    params: {
      origin,
      slug
    },
    goBack,
    goTo
  } = useNavigator();
  const [fontSizes, setFontSizes] = useGlobalSetting('typography.fontSizes');
  const [globalFluid] = useGlobalSetting('typography.fluid');

  // Get the font sizes from the origin, default to empty array.
  const sizes = (_fontSizes$origin = fontSizes[origin]) !== null && _fontSizes$origin !== void 0 ? _fontSizes$origin : [];

  // Get the font size by slug.
  const fontSize = sizes.find(size => size.slug === slug);

  // Whether the font size is fluid. If not defined, use the global fluid value of the theme.
  const isFluid = fontSize.fluid !== undefined ? !!fontSize.fluid : !!globalFluid;

  // Whether custom fluid values are used.
  const isCustomFluid = typeof fontSize.fluid === 'object';
  const handleNameChange = value => {
    updateFontSize('name', value);
  };
  const handleFontSizeChange = value => {
    updateFontSize('size', value);
  };
  const handleFluidChange = value => {
    updateFontSize('fluid', value);
  };
  const handleCustomFluidValues = value => {
    if (value) {
      // If custom values are used, init the values with the current ones.
      updateFontSize('fluid', {
        min: fontSize.size,
        max: fontSize.size
      });
    } else {
      // If custom fluid values are disabled, set fluid to true.
      updateFontSize('fluid', true);
    }
  };
  const handleMinChange = value => {
    updateFontSize('fluid', {
      ...fontSize.fluid,
      min: value
    });
  };
  const handleMaxChange = value => {
    updateFontSize('fluid', {
      ...fontSize.fluid,
      max: value
    });
  };
  const updateFontSize = (key, value) => {
    const newFontSizes = sizes.map(size => {
      if (size.slug === slug) {
        return {
          ...size,
          [key]: value
        }; // Create a new object with updated key
      }
      return size;
    });
    setFontSizes({
      ...fontSizes,
      [origin]: newFontSizes
    });
  };
  const handleRemoveFontSize = () => {
    // Navigate to the font sizes list.
    goBack();
    const newFontSizes = sizes.filter(size => size.slug !== slug);
    setFontSizes({
      ...fontSizes,
      [origin]: newFontSizes
    });
  };
  const toggleDeleteConfirm = () => {
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };
  const toggleRenameDialog = () => {
    setIsRenameDialogOpen(!isRenameDialogOpen);
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ConfirmDeleteFontSizeDialog, {
      fontSize: fontSize,
      isOpen: isDeleteConfirmOpen,
      toggleOpen: toggleDeleteConfirm,
      handleRemoveFontSize: handleRemoveFontSize
    }), isRenameDialogOpen && /*#__PURE__*/_jsx(RenameFontSizeDialog, {
      fontSize: fontSize,
      toggleOpen: toggleRenameDialog,
      handleRename: handleNameChange
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 4,
      children: [/*#__PURE__*/_jsxs(HStack, {
        justify: "space-between",
        align: "flex-start",
        children: [/*#__PURE__*/_jsx(ScreenHeader, {
          title: fontSize.name,
          description: sprintf( /* translators: %s: font size preset name. */
          __('Manage the font size %s.'), fontSize.name),
          onBack: () => goTo('/typography/font-sizes/')
        }), origin === 'custom' && /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Spacer, {
            marginTop: 3,
            marginBottom: 0,
            paddingX: 4,
            children: /*#__PURE__*/_jsxs(DropdownMenuV2, {
              trigger: /*#__PURE__*/_jsx(Button, {
                size: "small",
                icon: moreVertical,
                label: __('Font size options')
              }),
              children: [/*#__PURE__*/_jsx(DropdownMenuV2.Item, {
                onClick: toggleRenameDialog,
                children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
                  children: __('Rename')
                })
              }), /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
                onClick: toggleDeleteConfirm,
                children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
                  children: __('Delete')
                })
              })]
            })
          })
        })]
      }), /*#__PURE__*/_jsx(View, {
        children: /*#__PURE__*/_jsx(Spacer, {
          paddingX: 4,
          children: /*#__PURE__*/_jsxs(VStack, {
            spacing: 4,
            children: [/*#__PURE__*/_jsx(FlexItem, {
              children: /*#__PURE__*/_jsx(FontSizePreview, {
                fontSize: fontSize
              })
            }), /*#__PURE__*/_jsx(SizeControl, {
              label: __('Size'),
              value: !isCustomFluid ? fontSize.size : '',
              onChange: handleFontSizeChange,
              disabled: isCustomFluid
            }), /*#__PURE__*/_jsx(ToggleControl, {
              label: __('Fluid typography'),
              help: __('Scale the font size dynamically to fit the screen or viewport.'),
              checked: isFluid,
              onChange: handleFluidChange,
              __nextHasNoMarginBottom: true
            }), isFluid && /*#__PURE__*/_jsx(ToggleControl, {
              label: __('Custom fluid values'),
              help: __('Set custom min and max values for the fluid font size.'),
              checked: isCustomFluid,
              onChange: handleCustomFluidValues,
              __nextHasNoMarginBottom: true
            }), isCustomFluid && /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(SizeControl, {
                label: __('Minimum'),
                value: fontSize.fluid?.min,
                onChange: handleMinChange
              }), /*#__PURE__*/_jsx(SizeControl, {
                label: __('Maximum'),
                value: fontSize.fluid?.max,
                onChange: handleMaxChange
              })]
            })]
          })
        })
      })]
    })]
  });
}
export default FontSize;
//# sourceMappingURL=font-size.js.map