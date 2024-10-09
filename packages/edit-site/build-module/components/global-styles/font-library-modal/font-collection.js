/**
 * WordPress dependencies
 */
import { useContext, useEffect, useState, useMemo, createInterpolateElement } from '@wordpress/element';
import { __experimentalSpacer as Spacer, __experimentalText as Text, __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalNavigatorProvider as NavigatorProvider, __experimentalNavigatorScreen as NavigatorScreen, __experimentalNavigatorBackButton as NavigatorBackButton, __experimentalHeading as Heading, Notice, SelectControl, FlexItem, Flex, Button, DropdownMenu, SearchControl, ProgressBar, CheckboxControl } from '@wordpress/components';
import { debounce } from '@wordpress/compose';
import { sprintf, __, _x, isRTL } from '@wordpress/i18n';
import { moreVertical, chevronLeft, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { FontLibraryContext } from './context';
import FontCard from './font-card';
import filterFonts from './utils/filter-fonts';
import { toggleFont } from './utils/toggleFont';
import { getFontsOutline, isFontFontFaceInOutline } from './utils/fonts-outline';
import GoogleFontsConfirmDialog from './google-fonts-confirm-dialog';
import { downloadFontFaceAssets } from './utils';
import { sortFontFaces } from './utils/sort-font-faces';
import CollectionFontVariant from './collection-font-variant';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_CATEGORY = {
  slug: 'all',
  name: _x('All', 'font categories')
};
const LOCAL_STORAGE_ITEM = 'wp-font-library-google-fonts-permission';
const MIN_WINDOW_HEIGHT = 500;
function FontCollection({
  slug
}) {
  var _selectedCollection$c;
  const requiresPermission = slug === 'google-fonts';
  const getGoogleFontsPermissionFromStorage = () => {
    return window.localStorage.getItem(LOCAL_STORAGE_ITEM) === 'true';
  };
  const [selectedFont, setSelectedFont] = useState(null);
  const [notice, setNotice] = useState(false);
  const [fontsToInstall, setFontsToInstall] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [renderConfirmDialog, setRenderConfirmDialog] = useState(requiresPermission && !getGoogleFontsPermissionFromStorage());
  const {
    collections,
    getFontCollection,
    installFonts,
    isInstalling
  } = useContext(FontLibraryContext);
  const selectedCollection = collections.find(collection => collection.slug === slug);
  useEffect(() => {
    const handleStorage = () => {
      setRenderConfirmDialog(requiresPermission && !getGoogleFontsPermissionFromStorage());
    };
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [slug, requiresPermission]);
  const revokeAccess = () => {
    window.localStorage.setItem(LOCAL_STORAGE_ITEM, 'false');
    window.dispatchEvent(new Event('storage'));
  };
  useEffect(() => {
    const fetchFontCollection = async () => {
      try {
        await getFontCollection(slug);
        resetFilters();
      } catch (e) {
        if (!notice) {
          setNotice({
            type: 'error',
            message: e?.message
          });
        }
      }
    };
    fetchFontCollection();
  }, [slug, getFontCollection, setNotice, notice]);
  useEffect(() => {
    setSelectedFont(null);
  }, [slug]);
  useEffect(() => {
    // If the selected fonts change, reset the selected fonts to install
    setFontsToInstall([]);
  }, [selectedFont]);
  const collectionFonts = useMemo(() => {
    var _selectedCollection$f;
    return (_selectedCollection$f = selectedCollection?.font_families) !== null && _selectedCollection$f !== void 0 ? _selectedCollection$f : [];
  }, [selectedCollection]);
  const collectionCategories = (_selectedCollection$c = selectedCollection?.categories) !== null && _selectedCollection$c !== void 0 ? _selectedCollection$c : [];
  const categories = [DEFAULT_CATEGORY, ...collectionCategories];
  const fonts = useMemo(() => filterFonts(collectionFonts, filters), [collectionFonts, filters]);
  const isLoading = !selectedCollection?.font_families && !notice;

  // NOTE: The height of the font library modal unavailable to use for rendering font family items is roughly 417px
  // The height of each font family item is 61px.
  const windowHeight = Math.max(window.innerHeight, MIN_WINDOW_HEIGHT);
  const pageSize = Math.floor((windowHeight - 417) / 61);
  const totalPages = Math.ceil(fonts.length / pageSize);
  const itemsStart = (page - 1) * pageSize;
  const itemsLimit = page * pageSize;
  const items = fonts.slice(itemsStart, itemsLimit);
  const handleCategoryFilter = category => {
    setFilters({
      ...filters,
      category
    });
    setPage(1);
  };
  const handleUpdateSearchInput = value => {
    setFilters({
      ...filters,
      search: value
    });
    setPage(1);
  };
  const debouncedUpdateSearchInput = debounce(handleUpdateSearchInput, 300);
  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };
  const handleToggleVariant = (font, face) => {
    const newFontsToInstall = toggleFont(font, face, fontsToInstall);
    setFontsToInstall(newFontsToInstall);
  };
  const fontToInstallOutline = getFontsOutline(fontsToInstall);
  const resetFontsToInstall = () => {
    setFontsToInstall([]);
  };
  const selectFontCount = fontsToInstall.length > 0 ? fontsToInstall[0]?.fontFace?.length : 0;

  // Check if any fonts are selected.
  const isIndeterminate = selectFontCount > 0 && selectFontCount !== selectedFont?.fontFace?.length;

  // Check if all fonts are selected.
  const isSelectAllChecked = selectFontCount === selectedFont?.fontFace?.length;

  // Toggle select all fonts.
  const toggleSelectAll = () => {
    const newFonts = isSelectAllChecked ? [] : [selectedFont];
    setFontsToInstall(newFonts);
  };
  const handleInstall = async () => {
    setNotice(null);
    const fontFamily = fontsToInstall[0];
    try {
      if (fontFamily?.fontFace) {
        await Promise.all(fontFamily.fontFace.map(async fontFace => {
          if (fontFace.src) {
            fontFace.file = await downloadFontFaceAssets(fontFace.src);
          }
        }));
      }
    } catch (error) {
      // If any of the fonts fail to download,
      // show an error notice and stop the request from being sent.
      setNotice({
        type: 'error',
        message: __('Error installing the fonts, could not be downloaded.')
      });
      return;
    }
    try {
      await installFonts([fontFamily]);
      setNotice({
        type: 'success',
        message: __('Fonts were installed successfully.')
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: error.message
      });
    }
    resetFontsToInstall();
  };
  const getSortedFontFaces = fontFamily => {
    if (!fontFamily) {
      return [];
    }
    if (!fontFamily.fontFace || !fontFamily.fontFace.length) {
      return [{
        fontFamily: fontFamily.fontFamily,
        fontStyle: 'normal',
        fontWeight: '400'
      }];
    }
    return sortFontFaces(fontFamily.fontFace);
  };
  if (renderConfirmDialog) {
    return /*#__PURE__*/_jsx(GoogleFontsConfirmDialog, {});
  }
  const ActionsComponent = () => {
    if (slug !== 'google-fonts' || renderConfirmDialog || selectedFont) {
      return null;
    }
    return /*#__PURE__*/_jsx(DropdownMenu, {
      icon: moreVertical,
      label: __('Actions'),
      popoverProps: {
        position: 'bottom left'
      },
      controls: [{
        title: __('Revoke access to Google Fonts'),
        onClick: revokeAccess
      }]
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "font-library-modal__tabpanel-layout",
    children: [isLoading && /*#__PURE__*/_jsx("div", {
      className: "font-library-modal__loading",
      children: /*#__PURE__*/_jsx(ProgressBar, {})
    }), !isLoading && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(NavigatorProvider, {
        initialPath: "/",
        className: "font-library-modal__tabpanel-layout",
        children: [/*#__PURE__*/_jsxs(NavigatorScreen, {
          path: "/",
          children: [/*#__PURE__*/_jsxs(HStack, {
            justify: "space-between",
            children: [/*#__PURE__*/_jsxs(VStack, {
              children: [/*#__PURE__*/_jsx(Heading, {
                level: 2,
                size: 13,
                children: selectedCollection.name
              }), /*#__PURE__*/_jsx(Text, {
                children: selectedCollection.description
              })]
            }), /*#__PURE__*/_jsx(ActionsComponent, {})]
          }), /*#__PURE__*/_jsx(Spacer, {
            margin: 4
          }), /*#__PURE__*/_jsxs(Flex, {
            children: [/*#__PURE__*/_jsx(FlexItem, {
              children: /*#__PURE__*/_jsx(SearchControl, {
                className: "font-library-modal__search",
                value: filters.search,
                placeholder: __('Font name…'),
                label: __('Search'),
                onChange: debouncedUpdateSearchInput,
                __nextHasNoMarginBottom: true,
                hideLabelFromVision: false
              })
            }), /*#__PURE__*/_jsx(FlexItem, {
              children: /*#__PURE__*/_jsx(SelectControl, {
                __nextHasNoMarginBottom: true,
                __next40pxDefaultSize: true,
                label: __('Category'),
                value: filters.category,
                onChange: handleCategoryFilter,
                children: categories && categories.map(category => /*#__PURE__*/_jsx("option", {
                  value: category.slug,
                  children: category.name
                }, category.slug))
              })
            })]
          }), /*#__PURE__*/_jsx(Spacer, {
            margin: 4
          }), !!selectedCollection?.font_families?.length && !fonts.length && /*#__PURE__*/_jsx(Text, {
            children: __('No fonts found. Try with a different search term')
          }), /*#__PURE__*/_jsx("div", {
            className: "font-library-modal__fonts-grid__main",
            children: /*#__PURE__*/_jsx("ul", {
              role: "list",
              className: "font-library-modal__fonts-list",
              children: items.map(font => /*#__PURE__*/_jsx("li", {
                className: "font-library-modal__fonts-list-item",
                children: /*#__PURE__*/_jsx(FontCard, {
                  font: font.font_family_settings,
                  navigatorPath: "/fontFamily",
                  onClick: () => {
                    setSelectedFont(font.font_family_settings);
                  }
                })
              }, font.font_family_settings.slug))
            })
          })]
        }), /*#__PURE__*/_jsxs(NavigatorScreen, {
          path: "/fontFamily",
          children: [/*#__PURE__*/_jsxs(Flex, {
            justify: "flex-start",
            children: [/*#__PURE__*/_jsx(NavigatorBackButton, {
              icon: isRTL() ? chevronRight : chevronLeft,
              size: "small",
              onClick: () => {
                setSelectedFont(null);
                setNotice(null);
              },
              label: __('Back')
            }), /*#__PURE__*/_jsx(Heading, {
              level: 2,
              size: 13,
              className: "edit-site-global-styles-header",
              children: selectedFont?.name
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
            children: __('Select font variants to install.')
          }), /*#__PURE__*/_jsx(Spacer, {
            margin: 4
          }), /*#__PURE__*/_jsx(CheckboxControl, {
            className: "font-library-modal__select-all",
            label: __('Select all'),
            checked: isSelectAllChecked,
            onChange: toggleSelectAll,
            indeterminate: isIndeterminate,
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/_jsx(VStack, {
            spacing: 0,
            children: /*#__PURE__*/_jsx("ul", {
              role: "list",
              className: "font-library-modal__fonts-list",
              children: getSortedFontFaces(selectedFont).map((face, i) => /*#__PURE__*/_jsx("li", {
                className: "font-library-modal__fonts-list-item",
                children: /*#__PURE__*/_jsx(CollectionFontVariant, {
                  font: selectedFont,
                  face: face,
                  handleToggleVariant: handleToggleVariant,
                  selected: isFontFontFaceInOutline(selectedFont.slug, selectedFont.fontFace ? face : null,
                  // If the font has no fontFace, we want to check if the font is in the outline
                  fontToInstallOutline)
                })
              }, `face${i}`))
            })
          }), /*#__PURE__*/_jsx(Spacer, {
            margin: 16
          })]
        })]
      }), selectedFont && /*#__PURE__*/_jsx(Flex, {
        justify: "flex-end",
        className: "font-library-modal__footer",
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "primary",
          onClick: handleInstall,
          isBusy: isInstalling,
          disabled: fontsToInstall.length === 0 || isInstalling,
          accessibleWhenDisabled: true,
          children: __('Install')
        })
      }), !selectedFont && /*#__PURE__*/_jsxs(HStack, {
        spacing: 4,
        justify: "center",
        className: "font-library-modal__footer",
        children: [/*#__PURE__*/_jsx(Button, {
          label: __('Previous page'),
          size: "compact",
          onClick: () => setPage(page - 1),
          disabled: page === 1,
          showTooltip: true,
          accessibleWhenDisabled: true,
          icon: isRTL() ? chevronRight : chevronLeft,
          tooltipPosition: "top"
        }), /*#__PURE__*/_jsx(HStack, {
          justify: "flex-start",
          expanded: false,
          spacing: 2,
          className: "font-library-modal__page-selection",
          children: createInterpolateElement(sprintf(
          // translators: %s: Total number of pages.
          _x('Page <CurrentPageControl /> of %s', 'paging'), totalPages), {
            CurrentPageControl: /*#__PURE__*/_jsx(SelectControl, {
              "aria-label": __('Current page'),
              value: page,
              options: [...Array(totalPages)].map((e, i) => {
                return {
                  label: i + 1,
                  value: i + 1
                };
              }),
              onChange: newPage => setPage(parseInt(newPage)),
              size: "compact",
              __nextHasNoMarginBottom: true
            })
          })
        }), /*#__PURE__*/_jsx(Button, {
          label: __('Next page'),
          size: "compact",
          onClick: () => setPage(page + 1),
          disabled: page === totalPages,
          accessibleWhenDisabled: true,
          icon: isRTL() ? chevronLeft : chevronRight,
          tooltipPosition: "top"
        })]
      })]
    })]
  });
}
export default FontCollection;
//# sourceMappingURL=font-collection.js.map