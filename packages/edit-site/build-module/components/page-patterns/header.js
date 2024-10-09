/**
 * WordPress dependencies
 */
import { DropdownMenu, MenuGroup, __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalText as Text, __experimentalVStack as VStack } from '@wordpress/components';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import AddNewPattern from '../add-new-pattern';
import RenameCategoryMenuItem from './rename-category-menu-item';
import DeleteCategoryMenuItem from './delete-category-menu-item';
import usePatternCategories from '../sidebar-navigation-screen-patterns/use-pattern-categories';
import { TEMPLATE_PART_POST_TYPE, PATTERN_TYPES } from '../../utils/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PatternsHeader({
  categoryId,
  type,
  titleId,
  descriptionId
}) {
  const {
    patternCategories
  } = usePatternCategories();
  const templatePartAreas = useSelect(select => select(editorStore).__experimentalGetDefaultTemplatePartAreas(), []);
  let title, description, patternCategory;
  if (type === TEMPLATE_PART_POST_TYPE) {
    const templatePartArea = templatePartAreas.find(area => area.area === categoryId);
    title = templatePartArea?.label || __('All Template Parts');
    description = templatePartArea?.description || __('Includes every template part defined for any area.');
  } else if (type === PATTERN_TYPES.user && !!categoryId) {
    patternCategory = patternCategories.find(category => category.name === categoryId);
    title = patternCategory?.label;
    description = patternCategory?.description;
  }
  if (!title) {
    return null;
  }
  return /*#__PURE__*/_jsxs(VStack, {
    className: "edit-site-patterns__section-header",
    spacing: 1,
    children: [/*#__PURE__*/_jsxs(HStack, {
      justify: "space-between",
      className: "edit-site-patterns__title",
      children: [/*#__PURE__*/_jsx(Heading, {
        as: "h2",
        level: 3,
        id: titleId,
        weight: 500,
        truncate: true,
        children: title
      }), /*#__PURE__*/_jsxs(HStack, {
        expanded: false,
        children: [/*#__PURE__*/_jsx(AddNewPattern, {}), !!patternCategory?.id && /*#__PURE__*/_jsx(DropdownMenu, {
          icon: moreVertical,
          label: __('Actions'),
          toggleProps: {
            className: 'edit-site-patterns__button',
            description: sprintf( /* translators: %s: pattern category name */
            __('Action menu for %s pattern category'), title),
            size: 'compact'
          },
          children: ({
            onClose
          }) => /*#__PURE__*/_jsxs(MenuGroup, {
            children: [/*#__PURE__*/_jsx(RenameCategoryMenuItem, {
              category: patternCategory,
              onClose: onClose
            }), /*#__PURE__*/_jsx(DeleteCategoryMenuItem, {
              category: patternCategory,
              onClose: onClose
            })]
          })
        })]
      })]
    }), description ? /*#__PURE__*/_jsx(Text, {
      variant: "muted",
      as: "p",
      id: descriptionId,
      className: "edit-site-patterns__sub-title",
      children: description
    }) : null]
  });
}
//# sourceMappingURL=header.js.map