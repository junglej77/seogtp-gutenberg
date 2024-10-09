/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup, __experimentalItem as Item } from '@wordpress/components';
import { getTemplatePartIcon } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { file } from '@wordpress/icons';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import CategoryItem from './category-item';
import { PATTERN_DEFAULT_CATEGORY, PATTERN_TYPES, TEMPLATE_PART_POST_TYPE, TEMPLATE_PART_ALL_AREAS_CATEGORY } from '../../utils/constants';
import usePatternCategories from './use-pattern-categories';
import useTemplatePartAreas from './use-template-part-areas';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useLocation
} = unlock(routerPrivateApis);
function CategoriesGroup({
  templatePartAreas,
  patternCategories,
  currentCategory,
  currentType
}) {
  const [allPatterns, ...otherPatterns] = patternCategories;
  return /*#__PURE__*/_jsxs(ItemGroup, {
    className: "edit-site-sidebar-navigation-screen-patterns__group",
    children: [/*#__PURE__*/_jsx(CategoryItem, {
      count: Object.values(templatePartAreas).map(({
        templateParts
      }) => templateParts?.length || 0).reduce((acc, val) => acc + val, 0),
      icon: getTemplatePartIcon() /* no name, so it provides the fallback icon */,
      label: __('All template parts'),
      id: TEMPLATE_PART_ALL_AREAS_CATEGORY,
      type: TEMPLATE_PART_POST_TYPE,
      isActive: currentCategory === TEMPLATE_PART_ALL_AREAS_CATEGORY && currentType === TEMPLATE_PART_POST_TYPE
    }, "all"), Object.entries(templatePartAreas).map(([area, {
      label,
      templateParts
    }]) => /*#__PURE__*/_jsx(CategoryItem, {
      count: templateParts?.length,
      icon: getTemplatePartIcon(area),
      label: label,
      id: area,
      type: TEMPLATE_PART_POST_TYPE,
      isActive: currentCategory === area && currentType === TEMPLATE_PART_POST_TYPE
    }, area)), /*#__PURE__*/_jsx("div", {
      className: "edit-site-sidebar-navigation-screen-patterns__divider"
    }), allPatterns && /*#__PURE__*/_jsx(CategoryItem, {
      count: allPatterns.count,
      label: allPatterns.label,
      icon: file,
      id: allPatterns.name,
      type: PATTERN_TYPES.user,
      isActive: currentCategory === `${allPatterns.name}` && currentType === PATTERN_TYPES.user
    }, allPatterns.name), otherPatterns.map(category => /*#__PURE__*/_jsx(CategoryItem, {
      count: category.count,
      label: category.label,
      icon: file,
      id: category.name,
      type: PATTERN_TYPES.user,
      isActive: currentCategory === `${category.name}` && currentType === PATTERN_TYPES.user
    }, category.name))]
  });
}
export default function SidebarNavigationScreenPatterns({
  backPath
}) {
  const {
    params: {
      postType,
      categoryId
    }
  } = useLocation();
  const currentType = postType || PATTERN_TYPES.user;
  const currentCategory = categoryId || (currentType === PATTERN_TYPES.user ? PATTERN_DEFAULT_CATEGORY : TEMPLATE_PART_ALL_AREAS_CATEGORY);
  const {
    templatePartAreas,
    hasTemplateParts,
    isLoading
  } = useTemplatePartAreas();
  const {
    patternCategories,
    hasPatterns
  } = usePatternCategories();
  const isBlockBasedTheme = useSelect(select => select(coreStore).getCurrentTheme()?.is_block_theme, []);
  return /*#__PURE__*/_jsx(SidebarNavigationScreen, {
    isRoot: !isBlockBasedTheme,
    title: __('Patterns'),
    description: __('Manage what patterns are available when editing the site.'),
    backPath: backPath,
    content: /*#__PURE__*/_jsxs(_Fragment, {
      children: [isLoading && __('Loading items…'), !isLoading && /*#__PURE__*/_jsxs(_Fragment, {
        children: [!hasTemplateParts && !hasPatterns && /*#__PURE__*/_jsx(ItemGroup, {
          className: "edit-site-sidebar-navigation-screen-patterns__group",
          children: /*#__PURE__*/_jsx(Item, {
            children: __('No items found')
          })
        }), /*#__PURE__*/_jsx(CategoriesGroup, {
          templatePartAreas: templatePartAreas,
          patternCategories: patternCategories,
          currentCategory: currentCategory,
          currentType: currentType
        })]
      })]
    })
  });
}
//# sourceMappingURL=index.js.map