/**
 * WordPress dependencies
 */
import { SVG, Path, DropdownMenu, MenuGroup, MenuItemsChoice, ExternalLink } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { useMemo, createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { myPatternsCategory, INSERTER_SYNC_TYPES, INSERTER_PATTERN_TYPES } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const getShouldDisableSyncFilter = sourceFilter => sourceFilter !== 'all' && sourceFilter !== 'user';
const getShouldHideSourcesFilter = category => {
  return category.name === myPatternsCategory.name;
};
const PATTERN_SOURCE_MENU_OPTIONS = [{
  value: 'all',
  label: _x('All', 'patterns')
}, {
  value: INSERTER_PATTERN_TYPES.directory,
  label: __('Pattern Directory')
}, {
  value: INSERTER_PATTERN_TYPES.theme,
  label: __('Theme & Plugins')
}, {
  value: INSERTER_PATTERN_TYPES.user,
  label: __('User')
}];
export function PatternsFilter({
  setPatternSyncFilter,
  setPatternSourceFilter,
  patternSyncFilter,
  patternSourceFilter,
  scrollContainerRef,
  category
}) {
  // If the category is `myPatterns` then we need to set the source filter to `user`, but
  // we do this by deriving from props rather than calling setPatternSourceFilter otherwise
  // the user may be confused when switching to another category if the haven't explicity set
  // this filter themselves.
  const currentPatternSourceFilter = category.name === myPatternsCategory.name ? INSERTER_PATTERN_TYPES.user : patternSourceFilter;

  // We need to disable the sync filter option if the source filter is not 'all' or 'user'
  // otherwise applying them will just result in no patterns being shown.
  const shouldDisableSyncFilter = getShouldDisableSyncFilter(currentPatternSourceFilter);

  // We also hide the directory and theme source filter if the category is `myPatterns`
  // otherwise there will only be one option available.
  const shouldHideSourcesFilter = getShouldHideSourcesFilter(category);
  const patternSyncMenuOptions = useMemo(() => [{
    value: 'all',
    label: _x('All', 'patterns')
  }, {
    value: INSERTER_SYNC_TYPES.full,
    label: _x('Synced', 'patterns'),
    disabled: shouldDisableSyncFilter
  }, {
    value: INSERTER_SYNC_TYPES.unsynced,
    label: _x('Not synced', 'patterns'),
    disabled: shouldDisableSyncFilter
  }], [shouldDisableSyncFilter]);
  function handleSetSourceFilterChange(newSourceFilter) {
    setPatternSourceFilter(newSourceFilter);
    if (getShouldDisableSyncFilter(newSourceFilter)) {
      setPatternSyncFilter('all');
    }
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(DropdownMenu, {
      popoverProps: {
        placement: 'right-end'
      },
      label: __('Filter patterns'),
      toggleProps: {
        size: 'compact'
      },
      icon: /*#__PURE__*/_jsx(Icon, {
        icon: /*#__PURE__*/_jsx(SVG, {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/_jsx(Path, {
            d: "M10 17.5H14V16H10V17.5ZM6 6V7.5H18V6H6ZM8 12.5H16V11H8V12.5Z",
            fill: "currentColor"
          })
        })
      }),
      children: () => /*#__PURE__*/_jsxs(_Fragment, {
        children: [!shouldHideSourcesFilter && /*#__PURE__*/_jsx(MenuGroup, {
          label: __('Source'),
          children: /*#__PURE__*/_jsx(MenuItemsChoice, {
            choices: PATTERN_SOURCE_MENU_OPTIONS,
            onSelect: value => {
              handleSetSourceFilterChange(value);
              scrollContainerRef.current?.scrollTo(0, 0);
            },
            value: currentPatternSourceFilter
          })
        }), /*#__PURE__*/_jsx(MenuGroup, {
          label: __('Type'),
          children: /*#__PURE__*/_jsx(MenuItemsChoice, {
            choices: patternSyncMenuOptions,
            onSelect: value => {
              setPatternSyncFilter(value);
              scrollContainerRef.current?.scrollTo(0, 0);
            },
            value: patternSyncFilter
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "block-editor-tool-selector__help",
          children: createInterpolateElement(__('Patterns are available from the <Link>WordPress.org Pattern Directory</Link>, bundled in the active theme, or created by users on this site. Only patterns created on this site can be synced.'), {
            Link: /*#__PURE__*/_jsx(ExternalLink, {
              href: __('https://wordpress.org/patterns/')
            })
          })
        })]
      })
    })
  });
}
//# sourceMappingURL=patterns-filter.js.map