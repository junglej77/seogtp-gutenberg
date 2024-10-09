/**
 * WordPress dependencies
 */
import { Button, __experimentalConfirmDialog as ConfirmDialog, __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalNavigatorProvider as NavigatorProvider, __experimentalNavigatorScreen as NavigatorScreen, __experimentalNavigatorBackButton as NavigatorBackButton, __experimentalUseNavigator as useNavigator, __experimentalSpacer as Spacer, __experimentalText as Text, __experimentalVStack as VStack, Flex, Notice, ProgressBar, CheckboxControl } from '@wordpress/components';
import { useEntityRecord, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useContext, useEffect, useState } from '@wordpress/element';
import { __, _x, sprintf, isRTL } from '@wordpress/i18n';
import { chevronLeft, chevronRight } from '@wordpress/icons';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { FontLibraryContext } from './context';
import FontCard from './font-card';
import LibraryFontVariant from './library-font-variant';
import { sortFontFaces } from './utils/sort-font-faces';
import { setUIValuesNeeded, loadFontFaceInBrowser, unloadFontFaceInBrowser, getDisplaySrcFromFontFace } from './utils';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
function InstalledFonts() {
  var _libraryFontSelected$;
  const {
    baseCustomFonts,
    libraryFontSelected,
    handleSetLibraryFontSelected,
    refreshLibrary,
    uninstallFontFamily,
    isResolvingLibrary,
    isInstalling,
    saveFontFamilies,
    getFontFacesActivated
  } = useContext(FontLibraryContext);
  const [fontFamilies, setFontFamilies] = useGlobalSetting('typography.fontFamilies');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const [baseFontFamilies] = useGlobalSetting('typography.fontFamilies', undefined, 'base');
  const globalStylesId = useSelect(select => {
    const {
      __experimentalGetCurrentGlobalStylesId
    } = select(coreStore);
    return __experimentalGetCurrentGlobalStylesId();
  });
  const globalStyles = useEntityRecord('root', 'globalStyles', globalStylesId);
  const fontFamiliesHasChanges = !!globalStyles?.edits?.settings?.typography?.fontFamilies;
  const themeFonts = fontFamilies?.theme ? fontFamilies.theme.map(f => setUIValuesNeeded(f, {
    source: 'theme'
  })).sort((a, b) => a.name.localeCompare(b.name)) : [];
  const themeFontsSlugs = new Set(themeFonts.map(f => f.slug));
  const baseThemeFonts = baseFontFamilies?.theme ? themeFonts.concat(baseFontFamilies.theme.filter(f => !themeFontsSlugs.has(f.slug)).map(f => setUIValuesNeeded(f, {
    source: 'theme'
  })).sort((a, b) => a.name.localeCompare(b.name))) : [];
  const customFontFamilyId = libraryFontSelected?.source === 'custom' && libraryFontSelected?.id;
  const canUserDelete = useSelect(select => {
    const {
      canUser
    } = select(coreStore);
    return customFontFamilyId && canUser('delete', {
      kind: 'postType',
      name: 'wp_font_family',
      id: customFontFamilyId
    });
  }, [customFontFamilyId]);
  const shouldDisplayDeleteButton = !!libraryFontSelected && libraryFontSelected?.source !== 'theme' && canUserDelete;
  const handleUninstallClick = () => {
    setIsConfirmDeleteOpen(true);
  };
  const handleUpdate = async () => {
    setNotice(null);
    try {
      await saveFontFamilies(fontFamilies);
      setNotice({
        type: 'success',
        message: __('Font family updated successfully.')
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: sprintf( /* translators: %s: error message */
        __('There was an error updating the font family. %s'), error.message)
      });
    }
  };
  const getFontFacesToDisplay = font => {
    if (!font) {
      return [];
    }
    if (!font.fontFace || !font.fontFace.length) {
      return [{
        fontFamily: font.fontFamily,
        fontStyle: 'normal',
        fontWeight: '400'
      }];
    }
    return sortFontFaces(font.fontFace);
  };
  const getFontCardVariantsText = font => {
    const variantsInstalled = font?.fontFace?.length > 0 ? font.fontFace.length : 1;
    const variantsActive = getFontFacesActivated(font.slug, font.source).length;
    return sprintf( /* translators: 1: Active font variants, 2: Total font variants. */
    __('%1$s/%2$s variants active'), variantsActive, variantsInstalled);
  };
  useEffect(() => {
    handleSetLibraryFontSelected(libraryFontSelected);
    refreshLibrary();
  }, []);

  // Get activated fonts count.
  const activeFontsCount = libraryFontSelected ? getFontFacesActivated(libraryFontSelected.slug, libraryFontSelected.source).length : 0;
  const selectedFontsCount = (_libraryFontSelected$ = libraryFontSelected?.fontFace?.length) !== null && _libraryFontSelected$ !== void 0 ? _libraryFontSelected$ : libraryFontSelected?.fontFamily ? 1 : 0;

  // Check if any fonts are selected.
  const isIndeterminate = activeFontsCount > 0 && activeFontsCount !== selectedFontsCount;

  // Check if all fonts are selected.
  const isSelectAllChecked = activeFontsCount === selectedFontsCount;

  // Toggle select all fonts.
  const toggleSelectAll = () => {
    var _fontFamilies$library;
    const initialFonts = (_fontFamilies$library = fontFamilies?.[libraryFontSelected.source]?.filter(f => f.slug !== libraryFontSelected.slug)) !== null && _fontFamilies$library !== void 0 ? _fontFamilies$library : [];
    const newFonts = isSelectAllChecked ? initialFonts : [...initialFonts, libraryFontSelected];
    setFontFamilies({
      ...fontFamilies,
      [libraryFontSelected.source]: newFonts
    });
    if (libraryFontSelected.fontFace) {
      libraryFontSelected.fontFace.forEach(face => {
        if (isSelectAllChecked) {
          unloadFontFaceInBrowser(face, 'all');
        } else {
          loadFontFaceInBrowser(face, getDisplaySrcFromFontFace(face?.src), 'all');
        }
      });
    }
  };
  const hasFonts = baseThemeFonts.length > 0 || baseCustomFonts.length > 0;
  return /*#__PURE__*/_jsxs("div", {
    className: "font-library-modal__tabpanel-layout",
    children: [isResolvingLibrary && /*#__PURE__*/_jsx("div", {
      className: "font-library-modal__loading",
      children: /*#__PURE__*/_jsx(ProgressBar, {})
    }), !isResolvingLibrary && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(NavigatorProvider, {
        initialPath: libraryFontSelected ? '/fontFamily' : '/',
        children: [/*#__PURE__*/_jsx(NavigatorScreen, {
          path: "/",
          children: /*#__PURE__*/_jsxs(VStack, {
            spacing: "8",
            children: [notice && /*#__PURE__*/_jsx(Notice, {
              status: notice.type,
              onRemove: () => setNotice(null),
              children: notice.message
            }), !hasFonts && /*#__PURE__*/_jsx(Text, {
              as: "p",
              children: __('No fonts installed.')
            }), baseThemeFonts.length > 0 && /*#__PURE__*/_jsxs(VStack, {
              children: [/*#__PURE__*/_jsx("h2", {
                className: "font-library-modal__fonts-title",
                children: /* translators: Heading for a list of fonts provided by the theme. */
                _x('Theme', 'font source')
              }), /*#__PURE__*/_jsx("ul", {
                role: "list",
                className: "font-library-modal__fonts-list",
                children: baseThemeFonts.map(font => /*#__PURE__*/_jsx("li", {
                  className: "font-library-modal__fonts-list-item",
                  children: /*#__PURE__*/_jsx(FontCard, {
                    font: font,
                    navigatorPath: "/fontFamily",
                    variantsText: getFontCardVariantsText(font),
                    onClick: () => {
                      setNotice(null);
                      handleSetLibraryFontSelected(font);
                    }
                  })
                }, font.slug))
              })]
            }), baseCustomFonts.length > 0 && /*#__PURE__*/_jsxs(VStack, {
              children: [/*#__PURE__*/_jsx("h2", {
                className: "font-library-modal__fonts-title",
                children: /* translators: Heading for a list of fonts installed by the user. */
                _x('Custom', 'font source')
              }), /*#__PURE__*/_jsx("ul", {
                role: "list",
                className: "font-library-modal__fonts-list",
                children: baseCustomFonts.map(font => /*#__PURE__*/_jsx("li", {
                  className: "font-library-modal__fonts-list-item",
                  children: /*#__PURE__*/_jsx(FontCard, {
                    font: font,
                    navigatorPath: "/fontFamily",
                    variantsText: getFontCardVariantsText(font),
                    onClick: () => {
                      setNotice(null);
                      handleSetLibraryFontSelected(font);
                    }
                  })
                }, font.slug))
              })]
            })]
          })
        }), /*#__PURE__*/_jsxs(NavigatorScreen, {
          path: "/fontFamily",
          children: [/*#__PURE__*/_jsx(ConfirmDeleteDialog, {
            font: libraryFontSelected,
            isOpen: isConfirmDeleteOpen,
            setIsOpen: setIsConfirmDeleteOpen,
            setNotice: setNotice,
            uninstallFontFamily: uninstallFontFamily,
            handleSetLibraryFontSelected: handleSetLibraryFontSelected
          }), /*#__PURE__*/_jsxs(Flex, {
            justify: "flex-start",
            children: [/*#__PURE__*/_jsx(NavigatorBackButton, {
              icon: isRTL() ? chevronRight : chevronLeft,
              size: "small",
              onClick: () => {
                handleSetLibraryFontSelected(null);
                setNotice(null);
              },
              label: __('Back')
            }), /*#__PURE__*/_jsx(Heading, {
              level: 2,
              size: 13,
              className: "edit-site-global-styles-header",
              children: libraryFontSelected?.name
            })]
          }), notice && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(Spacer, {
              margin: 1
            }), /*#__PURE__*/_jsx(Notice, {
              status: notice.type,
              onRemove: () => setNotice(null),
              children: notice.message
            }), /*#__PURE__*/_jsx(Spacer, {
              margin: 1
            })]
          }), /*#__PURE__*/_jsx(Spacer, {
            margin: 4
          }), /*#__PURE__*/_jsx(Text, {
            children: __('选择字体变体。请记住，太多的变体可能会使您的站点变慢。')
          }), /*#__PURE__*/_jsx(Spacer, {
            margin: 4
          }), /*#__PURE__*/_jsxs(VStack, {
            spacing: 0,
            children: [/*#__PURE__*/_jsx(CheckboxControl, {
              className: "font-library-modal__select-all",
              label: __('Select all'),
              checked: isSelectAllChecked,
              onChange: toggleSelectAll,
              indeterminate: isIndeterminate,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/_jsx(Spacer, {
              margin: 8
            }), /*#__PURE__*/_jsx("ul", {
              role: "list",
              className: "font-library-modal__fonts-list",
              children: getFontFacesToDisplay(libraryFontSelected).map((face, i) => /*#__PURE__*/_jsx("li", {
                className: "font-library-modal__fonts-list-item",
                children: /*#__PURE__*/_jsx(LibraryFontVariant, {
                  font: libraryFontSelected,
                  face: face
                }, `face${i}`)
              }, `face${i}`))
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(HStack, {
        justify: "flex-end",
        className: "font-library-modal__footer",
        children: [isInstalling && /*#__PURE__*/_jsx(ProgressBar, {}), shouldDisplayDeleteButton && /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          isDestructive: true,
          variant: "tertiary",
          onClick: handleUninstallClick,
          children: __('Delete')
        }), /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "primary",
          onClick: handleUpdate,
          disabled: !fontFamiliesHasChanges,
          accessibleWhenDisabled: true,
          children: __('Update')
        })]
      })]
    })]
  });
}
function ConfirmDeleteDialog({
  font,
  isOpen,
  setIsOpen,
  setNotice,
  uninstallFontFamily,
  handleSetLibraryFontSelected
}) {
  const navigator = useNavigator();
  const handleConfirmUninstall = async () => {
    setNotice(null);
    setIsOpen(false);
    try {
      await uninstallFontFamily(font);
      navigator.goBack();
      handleSetLibraryFontSelected(null);
      setNotice({
        type: 'success',
        message: __('Font family uninstalled successfully.')
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: __('There was an error uninstalling the font family.') + error.message
      });
    }
  };
  const handleCancelUninstall = () => {
    setIsOpen(false);
  };
  return /*#__PURE__*/_jsx(ConfirmDialog, {
    isOpen: isOpen,
    cancelButtonText: __('Cancel'),
    confirmButtonText: __('Delete'),
    onCancel: handleCancelUninstall,
    onConfirm: handleConfirmUninstall,
    size: "medium",
    children: font && sprintf( /* translators: %s: Name of the font. */
    __('Are you sure you want to delete "%s" font and all its variants and assets?'), font.name)
  });
}
export default InstalledFonts;
//# sourceMappingURL=installed-fonts.js.map