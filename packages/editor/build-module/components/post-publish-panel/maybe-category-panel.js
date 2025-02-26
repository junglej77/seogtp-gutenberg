/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import HierarchicalTermSelector from '../post-taxonomies/hierarchical-term-selector';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function MaybeCategoryPanel() {
  const hasNoCategory = useSelect(select => {
    const postType = select(editorStore).getCurrentPostType();
    const {
      canUser,
      getEntityRecord,
      getTaxonomy
    } = select(coreStore);
    const categoriesTaxonomy = getTaxonomy('category');
    const defaultCategoryId = canUser('read', {
      kind: 'root',
      name: 'site'
    }) ? getEntityRecord('root', 'site')?.default_category : undefined;
    const defaultCategory = defaultCategoryId ? getEntityRecord('taxonomy', 'category', defaultCategoryId) : undefined;
    const postTypeSupportsCategories = categoriesTaxonomy && categoriesTaxonomy.types.some(type => type === postType);
    const categories = categoriesTaxonomy && select(editorStore).getEditedPostAttribute(categoriesTaxonomy.rest_base);

    // This boolean should return true if everything is loaded
    // ( categoriesTaxonomy, defaultCategory )
    // and the post has not been assigned a category different than "uncategorized".
    return !!categoriesTaxonomy && !!defaultCategory && postTypeSupportsCategories && (categories?.length === 0 || categories?.length === 1 && defaultCategory?.id === categories[0]);
  }, []);
  const [shouldShowPanel, setShouldShowPanel] = useState(false);
  useEffect(() => {
    // We use state to avoid hiding the panel if the user edits the categories
    // and adds one within the panel itself (while visible).
    if (hasNoCategory) {
      setShouldShowPanel(true);
    }
  }, [hasNoCategory]);
  if (!shouldShowPanel) {
    return null;
  }
  const panelBodyTitle = [__('Suggestion:'), /*#__PURE__*/_jsx("span", {
    className: "editor-post-publish-panel__link",
    children: __('Assign a category')
  }, "label")];
  return /*#__PURE__*/_jsxs(PanelBody, {
    initialOpen: false,
    title: panelBodyTitle,
    children: [/*#__PURE__*/_jsx("p", {
      children: __('Categories provide a helpful way to group related posts together and to quickly tell readers what a post is about.')
    }), /*#__PURE__*/_jsx(HierarchicalTermSelector, {
      slug: "category"
    })]
  });
}
export default MaybeCategoryPanel;
//# sourceMappingURL=maybe-category-panel.js.map