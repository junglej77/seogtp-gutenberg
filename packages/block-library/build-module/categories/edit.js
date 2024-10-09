/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { PanelBody, Placeholder, Spinner, ToggleControl, VisuallyHidden } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { pin } from '@wordpress/icons';
import { useEntityRecords } from '@wordpress/core-data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function CategoriesEdit({
  attributes: {
    displayAsDropdown,
    showHierarchy,
    showPostCounts,
    showOnlyTopLevel,
    showEmpty,
    label,
    showLabel
  },
  setAttributes,
  className
}) {
  const selectId = useInstanceId(CategoriesEdit, 'blocks-category-select');
  const query = {
    per_page: -1,
    hide_empty: !showEmpty,
    context: 'view'
  };
  if (showOnlyTopLevel) {
    query.parent = 0;
  }
  const {
    records: categories,
    isResolving
  } = useEntityRecords('taxonomy', 'category', query);
  const getCategoriesList = parentId => {
    if (!categories?.length) {
      return [];
    }
    if (parentId === null) {
      return categories;
    }
    return categories.filter(({
      parent
    }) => parent === parentId);
  };
  const toggleAttribute = attributeName => newValue => setAttributes({
    [attributeName]: newValue
  });
  const renderCategoryName = name => !name ? __('(Untitled)') : decodeEntities(name).trim();
  const renderCategoryList = () => {
    const parentId = showHierarchy ? 0 : null;
    const categoriesList = getCategoriesList(parentId);
    return categoriesList.map(category => renderCategoryListItem(category));
  };
  const renderCategoryListItem = category => {
    const childCategories = getCategoriesList(category.id);
    const {
      id,
      link,
      count,
      name
    } = category;
    return /*#__PURE__*/_jsxs("li", {
      className: `cat-item cat-item-${id}`,
      children: [/*#__PURE__*/_jsx("a", {
        href: link,
        target: "_blank",
        rel: "noreferrer noopener",
        children: renderCategoryName(name)
      }), showPostCounts && ` (${count})`, showHierarchy && !!childCategories.length && /*#__PURE__*/_jsx("ul", {
        className: "children",
        children: childCategories.map(childCategory => renderCategoryListItem(childCategory))
      })]
    }, id);
  };
  const renderCategoryDropdown = () => {
    const parentId = showHierarchy ? 0 : null;
    const categoriesList = getCategoriesList(parentId);
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [showLabel ? /*#__PURE__*/_jsx(RichText, {
        className: "wp-block-categories__label",
        "aria-label": __('Label text'),
        placeholder: __('Categories'),
        withoutInteractiveFormatting: true,
        value: label,
        onChange: html => setAttributes({
          label: html
        })
      }) : /*#__PURE__*/_jsx(VisuallyHidden, {
        as: "label",
        htmlFor: selectId,
        children: label ? label : __('Categories')
      }), /*#__PURE__*/_jsxs("select", {
        id: selectId,
        children: [/*#__PURE__*/_jsx("option", {
          children: __('Select Category')
        }), categoriesList.map(category => renderCategoryDropdownItem(category, 0))]
      })]
    });
  };
  const renderCategoryDropdownItem = (category, level) => {
    const {
      id,
      count,
      name
    } = category;
    const childCategories = getCategoriesList(id);
    return [/*#__PURE__*/_jsxs("option", {
      className: `level-${level}`,
      children: [Array.from({
        length: level * 3
      }).map(() => '\xa0'), renderCategoryName(name), showPostCounts && ` (${count})`]
    }, id), showHierarchy && !!childCategories.length && childCategories.map(childCategory => renderCategoryDropdownItem(childCategory, level + 1))];
  };
  const TagName = !!categories?.length && !displayAsDropdown && !isResolving ? 'ul' : 'div';
  const classes = clsx(className, {
    'wp-block-categories-list': !!categories?.length && !displayAsDropdown && !isResolving,
    'wp-block-categories-dropdown': !!categories?.length && displayAsDropdown && !isResolving
  });
  const blockProps = useBlockProps({
    className: classes
  });
  return /*#__PURE__*/_jsxs(TagName, {
    ...blockProps,
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display as dropdown'),
          checked: displayAsDropdown,
          onChange: toggleAttribute('displayAsDropdown')
        }), displayAsDropdown && /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          className: "wp-block-categories__indentation",
          label: __('Show label'),
          checked: showLabel,
          onChange: toggleAttribute('showLabel')
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show post counts'),
          checked: showPostCounts,
          onChange: toggleAttribute('showPostCounts')
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show only top level categories'),
          checked: showOnlyTopLevel,
          onChange: toggleAttribute('showOnlyTopLevel')
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show empty categories'),
          checked: showEmpty,
          onChange: toggleAttribute('showEmpty')
        }), !showOnlyTopLevel && /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show hierarchy'),
          checked: showHierarchy,
          onChange: toggleAttribute('showHierarchy')
        })]
      })
    }), isResolving && /*#__PURE__*/_jsx(Placeholder, {
      icon: pin,
      label: __('Categories'),
      children: /*#__PURE__*/_jsx(Spinner, {})
    }), !isResolving && categories?.length === 0 && /*#__PURE__*/_jsx("p", {
      children: __('Your site does not have any posts, so there is nothing to display here at the moment.')
    }), !isResolving && categories?.length > 0 && (displayAsDropdown ? renderCategoryDropdown() : renderCategoryList())]
  });
}
//# sourceMappingURL=edit.js.map