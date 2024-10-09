/**
 * WordPress dependencies
 */
import { __experimentalNavigatorProvider as NavigatorProvider, __experimentalNavigatorScreen as NavigatorScreen, __experimentalUseNavigator as useNavigator, createSlotFill, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { getBlockTypes, store as blocksStore } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { privateApis as blockEditorPrivateApis, store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { store as preferencesStore } from '@wordpress/preferences';
import { moreVertical } from '@wordpress/icons';
import { store as coreStore } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ScreenRoot from './screen-root';
import { useBlockHasGlobalStyles, default as ScreenBlockList } from './screen-block-list';
import ScreenBlock from './screen-block';
import ScreenTypography from './screen-typography';
import ScreenTypeset from './screen-typeset';
import ScreenTypographyElement from './screen-typography-element';
import FontSize from './font-sizes/font-size';
import FontSizes from './font-sizes/font-sizes';
import ScreenColors from './screen-colors';
import ScreenColorPalette from './screen-color-palette';
import { ScreenShadows, ScreenShadowsEdit } from './screen-shadows';
import ScreenLayout from './screen-layout';
import ScreenStyleVariations from './screen-style-variations';
import StyleBook from '../style-book';
import ScreenCSS from './screen-css';
import ScreenRevisions from './screen-revisions';
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const SLOT_FILL_NAME = 'GlobalStylesMenu';
const {
  useGlobalStylesReset
} = unlock(blockEditorPrivateApis);
const {
  Slot: GlobalStylesMenuSlot,
  Fill: GlobalStylesMenuFill
} = createSlotFill(SLOT_FILL_NAME);
function GlobalStylesActionMenu() {
  const [canReset, onReset] = useGlobalStylesReset();
  const {
    toggle
  } = useDispatch(preferencesStore);
  const {
    canEditCSS
  } = useSelect(select => {
    const {
      getEntityRecord,
      __experimentalGetCurrentGlobalStylesId
    } = select(coreStore);
    const globalStylesId = __experimentalGetCurrentGlobalStylesId();
    const globalStyles = globalStylesId ? getEntityRecord('root', 'globalStyles', globalStylesId) : undefined;
    return {
      canEditCSS: !!globalStyles?._links?.['wp:action-edit-css']
    };
  }, []);
  const {
    setEditorCanvasContainerView
  } = unlock(useDispatch(editSiteStore));
  const {
    goTo
  } = useNavigator();
  const loadCustomCSS = () => {
    setEditorCanvasContainerView('global-styles-css');
    goTo('/css');
  };
  return /*#__PURE__*/_jsx(GlobalStylesMenuFill, {
    children: /*#__PURE__*/_jsx(DropdownMenu, {
      icon: moreVertical,
      label: __('More'),
      toggleProps: {
        size: 'compact'
      },
      children: ({
        onClose
      }) => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(MenuGroup, {
          children: [canEditCSS && /*#__PURE__*/_jsx(MenuItem, {
            onClick: loadCustomCSS,
            children: __('Additional CSS')
          }), /*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              toggle('core/edit-site', 'welcomeGuideStyles');
              onClose();
            },
            children: __('Welcome Guide')
          })]
        }), /*#__PURE__*/_jsx(MenuGroup, {
          children: /*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              onReset();
              onClose();
            },
            disabled: !canReset,
            children: __('Reset styles')
          })
        })]
      })
    })
  });
}
function GlobalStylesNavigationScreen({
  className,
  ...props
}) {
  return /*#__PURE__*/_jsx(NavigatorScreen, {
    className: ['edit-site-global-styles-sidebar__navigator-screen', className].filter(Boolean).join(' '),
    ...props
  });
}
function BlockStylesNavigationScreens({
  parentMenu,
  blockStyles,
  blockName
}) {
  return blockStyles.map((style, index) => /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
    path: parentMenu + '/variations/' + style.name,
    children: /*#__PURE__*/_jsx(ScreenBlock, {
      name: blockName,
      variation: style.name
    })
  }, index));
}
function ContextScreens({
  name,
  parentMenu = ''
}) {
  const blockStyleVariations = useSelect(select => {
    const {
      getBlockStyles
    } = select(blocksStore);
    return getBlockStyles(name);
  }, [name]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: parentMenu + '/colors/palette',
      children: /*#__PURE__*/_jsx(ScreenColorPalette, {
        name: name
      })
    }), !!blockStyleVariations?.length && /*#__PURE__*/_jsx(BlockStylesNavigationScreens, {
      parentMenu: parentMenu,
      blockStyles: blockStyleVariations,
      blockName: name
    })]
  });
}
function GlobalStylesStyleBook() {
  const navigator = useNavigator();
  const {
    path
  } = navigator.location;
  return /*#__PURE__*/_jsx(StyleBook, {
    isSelected: blockName =>
    // Match '/blocks/core%2Fbutton' and
    // '/blocks/core%2Fbutton/typography', but not
    // '/blocks/core%2Fbuttons'.
    path === `/blocks/${encodeURIComponent(blockName)}` || path.startsWith(`/blocks/${encodeURIComponent(blockName)}/`),
    onSelect: blockName => {
      // Now go to the selected block.
      navigator.goTo('/blocks/' + encodeURIComponent(blockName));
    }
  });
}
function GlobalStylesBlockLink() {
  const navigator = useNavigator();
  const {
    selectedBlockName,
    selectedBlockClientId
  } = useSelect(select => {
    const {
      getSelectedBlockClientId,
      getBlockName
    } = select(blockEditorStore);
    const clientId = getSelectedBlockClientId();
    return {
      selectedBlockName: getBlockName(clientId),
      selectedBlockClientId: clientId
    };
  }, []);
  const blockHasGlobalStyles = useBlockHasGlobalStyles(selectedBlockName);
  // When we're in the `Blocks` screen enable deep linking to the selected block.
  useEffect(() => {
    if (!selectedBlockClientId || !blockHasGlobalStyles) {
      return;
    }
    const currentPath = navigator.location.path;
    if (currentPath !== '/blocks' && !currentPath.startsWith('/blocks/')) {
      return;
    }
    const newPath = '/blocks/' + encodeURIComponent(selectedBlockName);
    // Avoid navigating to the same path. This can happen when selecting
    // a new block of the same type.
    if (newPath !== currentPath) {
      navigator.goTo(newPath, {
        skipFocus: true
      });
    }
  }, [selectedBlockClientId, selectedBlockName, blockHasGlobalStyles]);
}
function GlobalStylesEditorCanvasContainerLink() {
  const {
    goTo,
    location
  } = useNavigator();
  const editorCanvasContainerView = useSelect(select => unlock(select(editSiteStore)).getEditorCanvasContainerView(), []);
  const path = location?.path;
  const isRevisionsOpen = path === '/revisions';

  // If the user switches the editor canvas container view, redirect
  // to the appropriate screen. This effectively allows deep linking to the
  // desired screens from outside the global styles navigation provider.
  useEffect(() => {
    switch (editorCanvasContainerView) {
      case 'global-styles-revisions':
      case 'global-styles-revisions:style-book':
        goTo('/revisions');
        break;
      case 'global-styles-css':
        goTo('/css');
        break;
      case 'style-book':
        /*
         * The stand-alone style book is open
         * and the revisions panel is open,
         * close the revisions panel.
         * Otherwise keep the style book open while
         * browsing global styles panel.
         */
        if (isRevisionsOpen) {
          goTo('/');
        }
        break;
      default:
        /*
         * Example: the user has navigated to "Browse styles" or elsewhere
         * and changes the editorCanvasContainerView, e.g., closes the style book.
         * The panel should not be affected.
         * Exclude revisions panel from this behavior,
         * as it should close when the editorCanvasContainerView doesn't correspond.
         */
        if (path !== '/' && !isRevisionsOpen) {
          return;
        }
        goTo('/');
        break;
    }
  }, [editorCanvasContainerView, isRevisionsOpen, goTo]);
}
function GlobalStylesUI() {
  const blocks = getBlockTypes();
  const editorCanvasContainerView = useSelect(select => unlock(select(editSiteStore)).getEditorCanvasContainerView(), []);
  return /*#__PURE__*/_jsxs(NavigatorProvider, {
    className: "edit-site-global-styles-sidebar__navigator-provider",
    initialPath: "/",
    children: [/*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/",
      children: /*#__PURE__*/_jsx(ScreenRoot, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/variations",
      children: /*#__PURE__*/_jsx(ScreenStyleVariations, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/blocks",
      children: /*#__PURE__*/_jsx(ScreenBlockList, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography",
      children: /*#__PURE__*/_jsx(ScreenTypography, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/font-sizes/",
      children: /*#__PURE__*/_jsx(FontSizes, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/font-sizes/:origin/:slug",
      children: /*#__PURE__*/_jsx(FontSize, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/typeset",
      children: /*#__PURE__*/_jsx(ScreenTypeset, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/text",
      children: /*#__PURE__*/_jsx(ScreenTypographyElement, {
        element: "text"
      })
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/link",
      children: /*#__PURE__*/_jsx(ScreenTypographyElement, {
        element: "link"
      })
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/heading",
      children: /*#__PURE__*/_jsx(ScreenTypographyElement, {
        element: "heading"
      })
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/caption",
      children: /*#__PURE__*/_jsx(ScreenTypographyElement, {
        element: "caption"
      })
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/typography/button",
      children: /*#__PURE__*/_jsx(ScreenTypographyElement, {
        element: "button"
      })
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/colors",
      children: /*#__PURE__*/_jsx(ScreenColors, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/shadows",
      children: /*#__PURE__*/_jsx(ScreenShadows, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/shadows/edit/:category/:slug",
      children: /*#__PURE__*/_jsx(ScreenShadowsEdit, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/layout",
      children: /*#__PURE__*/_jsx(ScreenLayout, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/css",
      children: /*#__PURE__*/_jsx(ScreenCSS, {})
    }), /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: "/revisions",
      children: /*#__PURE__*/_jsx(ScreenRevisions, {})
    }), blocks.map(block => /*#__PURE__*/_jsx(GlobalStylesNavigationScreen, {
      path: '/blocks/' + encodeURIComponent(block.name),
      children: /*#__PURE__*/_jsx(ScreenBlock, {
        name: block.name
      })
    }, 'menu-block-' + block.name)), /*#__PURE__*/_jsx(ContextScreens, {}), blocks.map(block => /*#__PURE__*/_jsx(ContextScreens, {
      name: block.name,
      parentMenu: '/blocks/' + encodeURIComponent(block.name)
    }, 'screens-block-' + block.name)), 'style-book' === editorCanvasContainerView && /*#__PURE__*/_jsx(GlobalStylesStyleBook, {}), /*#__PURE__*/_jsx(GlobalStylesActionMenu, {}), /*#__PURE__*/_jsx(GlobalStylesBlockLink, {}), /*#__PURE__*/_jsx(GlobalStylesEditorCanvasContainerLink, {})]
  });
}
export { GlobalStylesMenuSlot };
export default GlobalStylesUI;
//# sourceMappingURL=ui.js.map