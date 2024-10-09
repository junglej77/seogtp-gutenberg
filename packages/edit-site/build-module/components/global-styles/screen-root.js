/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup, __experimentalHStack as HStack, __experimentalSpacer as Spacer, __experimentalVStack as VStack, FlexItem, CardBody, Card, CardDivider, CardMedia } from '@wordpress/components';
import { isRTL, __ } from '@wordpress/i18n';
import { chevronLeft, chevronRight } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { IconWithCurrentColor } from './icon-with-current-color';
import { NavigationButtonAsItem } from './navigation-button';
import RootMenu from './root-menu';
import PreviewStyles from './preview-styles';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
function ScreenRoot() {
  const [customCSS] = useGlobalStyle('css');
  const {
    hasVariations,
    canEditCSS
  } = useSelect(select => {
    const {
      getEntityRecord,
      __experimentalGetCurrentGlobalStylesId,
      __experimentalGetCurrentThemeGlobalStylesVariations
    } = select(coreStore);
    const globalStylesId = __experimentalGetCurrentGlobalStylesId();
    const globalStyles = globalStylesId ? getEntityRecord('root', 'globalStyles', globalStylesId) : undefined;
    return {
      hasVariations: !!__experimentalGetCurrentThemeGlobalStylesVariations()?.length,
      canEditCSS: !!globalStyles?._links?.['wp:action-edit-css']
    };
  }, []);
  return /*#__PURE__*/_jsxs(Card, {
    size: "small",
    className: "edit-site-global-styles-screen-root",
    children: [/*#__PURE__*/_jsx(CardBody, {
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 4,
        children: [/*#__PURE__*/_jsx(Card, {
          children: /*#__PURE__*/_jsx(CardMedia, {
            children: /*#__PURE__*/_jsx(PreviewStyles, {})
          })
        }), hasVariations && /*#__PURE__*/_jsx(ItemGroup, {
          children: /*#__PURE__*/_jsx(NavigationButtonAsItem, {
            path: "/variations",
            "aria-label": __('Browse styles'),
            children: /*#__PURE__*/_jsxs(HStack, {
              justify: "space-between",
              children: [/*#__PURE__*/_jsx(FlexItem, {
                children: __('Browse styles')
              }), /*#__PURE__*/_jsx(IconWithCurrentColor, {
                icon: isRTL() ? chevronLeft : chevronRight
              })]
            })
          })
        }), /*#__PURE__*/_jsx(RootMenu, {})]
      })
    }), /*#__PURE__*/_jsx(CardDivider, {}), /*#__PURE__*/_jsxs(CardBody, {
      children: [/*#__PURE__*/_jsx(Spacer, {
        as: "p",
        paddingTop: 2
        /*
         * 13px matches the text inset of the NavigationButton (12px padding, plus the width of the button's border).
         * This is an ad hoc override for this instance and the Addtional CSS option below. Other options for matching the
         * the nav button inset should be looked at before reusing further.
         */,
        paddingX: "13px",
        marginBottom: 4,
        children: __('Customize the appearance of specific blocks for the whole site.')
      }), /*#__PURE__*/_jsx(ItemGroup, {
        children: /*#__PURE__*/_jsx(NavigationButtonAsItem, {
          path: "/blocks",
          "aria-label": __('Blocks styles'),
          children: /*#__PURE__*/_jsxs(HStack, {
            justify: "space-between",
            children: [/*#__PURE__*/_jsx(FlexItem, {
              children: __('Blocks')
            }), /*#__PURE__*/_jsx(IconWithCurrentColor, {
              icon: isRTL() ? chevronLeft : chevronRight
            })]
          })
        })
      })]
    }), canEditCSS && !!customCSS && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(CardDivider, {}), /*#__PURE__*/_jsxs(CardBody, {
        children: [/*#__PURE__*/_jsx(Spacer, {
          as: "p",
          paddingTop: 2,
          paddingX: "13px",
          marginBottom: 4,
          children: __('Add your own CSS to customize the appearance and layout of your site.')
        }), /*#__PURE__*/_jsx(ItemGroup, {
          children: /*#__PURE__*/_jsx(NavigationButtonAsItem, {
            path: "/css",
            "aria-label": __('Additional CSS'),
            children: /*#__PURE__*/_jsxs(HStack, {
              justify: "space-between",
              children: [/*#__PURE__*/_jsx(FlexItem, {
                children: __('Additional CSS')
              }), /*#__PURE__*/_jsx(IconWithCurrentColor, {
                icon: isRTL() ? chevronLeft : chevronRight
              })]
            })
          })
        })]
      })]
    })]
  });
}
export default ScreenRoot;
//# sourceMappingURL=screen-root.js.map