/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { __experimentalNavigatorProvider as NavigatorProvider, __experimentalNavigatorScreen as NavigatorScreen, __experimentalNavigatorButton as NavigatorButton, __experimentalNavigatorBackButton as NavigatorBackButton, __experimentalItemGroup as ItemGroup, __experimentalItem as Item, __experimentalHStack as HStack, __experimentalText as Text, __experimentalTruncate as Truncate, FlexItem, Card, CardHeader, CardBody, privateApis as componentsPrivateApis } from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { chevronLeft, chevronRight, Icon } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
const PREFERENCES_MENU = 'preferences-menu';
export default function PreferencesModalTabs({
  sections
}) {
  const isLargeViewport = useViewportMatch('medium');

  // This is also used to sync the two different rendered components
  // between small and large viewports.
  const [activeMenu, setActiveMenu] = useState(PREFERENCES_MENU);
  /**
   * Create helper objects from `sections` for easier data handling.
   * `tabs` is used for creating the `Tabs` and `sectionsContentMap`
   * is used for easier access to active tab's content.
   */
  const {
    tabs,
    sectionsContentMap
  } = useMemo(() => {
    let mappedTabs = {
      tabs: [],
      sectionsContentMap: {}
    };
    if (sections.length) {
      mappedTabs = sections.reduce((accumulator, {
        name,
        tabLabel: title,
        content
      }) => {
        accumulator.tabs.push({
          name,
          title
        });
        accumulator.sectionsContentMap[name] = content;
        return accumulator;
      }, {
        tabs: [],
        sectionsContentMap: {}
      });
    }
    return mappedTabs;
  }, [sections]);
  let modalContent;
  // We render different components based on the viewport size.
  if (isLargeViewport) {
    modalContent = /*#__PURE__*/_jsx("div", {
      className: "preferences__tabs",
      children: /*#__PURE__*/_jsxs(Tabs, {
        defaultTabId: activeMenu !== PREFERENCES_MENU ? activeMenu : undefined,
        onSelect: setActiveMenu,
        orientation: "vertical",
        children: [/*#__PURE__*/_jsx(Tabs.TabList, {
          className: "preferences__tabs-tablist",
          children: tabs.map(tab => /*#__PURE__*/_jsx(Tabs.Tab, {
            tabId: tab.name,
            className: "preferences__tabs-tab",
            children: tab.title
          }, tab.name))
        }), tabs.map(tab => /*#__PURE__*/_jsx(Tabs.TabPanel, {
          tabId: tab.name,
          className: "preferences__tabs-tabpanel",
          focusable: false,
          children: sectionsContentMap[tab.name] || null
        }, tab.name))]
      })
    });
  } else {
    modalContent = /*#__PURE__*/_jsxs(NavigatorProvider, {
      initialPath: "/",
      className: "preferences__provider",
      children: [/*#__PURE__*/_jsx(NavigatorScreen, {
        path: "/",
        children: /*#__PURE__*/_jsx(Card, {
          isBorderless: true,
          size: "small",
          children: /*#__PURE__*/_jsx(CardBody, {
            children: /*#__PURE__*/_jsx(ItemGroup, {
              children: tabs.map(tab => {
                return /*#__PURE__*/_jsx(NavigatorButton, {
                  path: `/${tab.name}`,
                  as: Item,
                  isAction: true,
                  children: /*#__PURE__*/_jsxs(HStack, {
                    justify: "space-between",
                    children: [/*#__PURE__*/_jsx(FlexItem, {
                      children: /*#__PURE__*/_jsx(Truncate, {
                        children: tab.title
                      })
                    }), /*#__PURE__*/_jsx(FlexItem, {
                      children: /*#__PURE__*/_jsx(Icon, {
                        icon: isRTL() ? chevronLeft : chevronRight
                      })
                    })]
                  })
                }, tab.name);
              })
            })
          })
        })
      }), sections.length && sections.map(section => {
        return /*#__PURE__*/_jsx(NavigatorScreen, {
          path: `/${section.name}`,
          children: /*#__PURE__*/_jsxs(Card, {
            isBorderless: true,
            size: "large",
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              isBorderless: false,
              justify: "left",
              size: "small",
              gap: "6",
              children: [/*#__PURE__*/_jsx(NavigatorBackButton, {
                icon: isRTL() ? chevronRight : chevronLeft,
                label: __('Back')
              }), /*#__PURE__*/_jsx(Text, {
                size: "16",
                children: section.tabLabel
              })]
            }), /*#__PURE__*/_jsx(CardBody, {
              children: section.content
            })]
          })
        }, `${section.name}-menu`);
      })]
    });
  }
  return modalContent;
}
//# sourceMappingURL=index.js.map