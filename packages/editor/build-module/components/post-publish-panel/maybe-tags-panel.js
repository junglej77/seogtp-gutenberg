/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import FlatTermSelector from '../post-taxonomies/flat-term-selector';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TagsPanel = () => {
  const panelBodyTitle = [__('Suggestion:'), /*#__PURE__*/_jsx("span", {
    className: "editor-post-publish-panel__link",
    children: __('Add tags')
  }, "label")];
  return /*#__PURE__*/_jsxs(PanelBody, {
    initialOpen: false,
    title: panelBodyTitle,
    children: [/*#__PURE__*/_jsx("p", {
      children: __('Tags help users and search engines navigate your site and find your content. Add a few keywords to describe your post.')
    }), /*#__PURE__*/_jsx(FlatTermSelector, {
      slug: "post_tag",
      __nextHasNoMarginBottom: true
    })]
  });
};
const MaybeTagsPanel = () => {
  const {
    hasTags,
    isPostTypeSupported
  } = useSelect(select => {
    const postType = select(editorStore).getCurrentPostType();
    const tagsTaxonomy = select(coreStore).getTaxonomy('post_tag');
    const _isPostTypeSupported = tagsTaxonomy?.types?.includes(postType);
    const areTagsFetched = tagsTaxonomy !== undefined;
    const tags = tagsTaxonomy && select(editorStore).getEditedPostAttribute(tagsTaxonomy.rest_base);
    return {
      hasTags: !!tags?.length,
      isPostTypeSupported: areTagsFetched && _isPostTypeSupported
    };
  }, []);
  const [hadTagsWhenOpeningThePanel] = useState(hasTags);
  if (!isPostTypeSupported) {
    return null;
  }

  /*
   * We only want to show the tag panel if the post didn't have
   * any tags when the user hit the Publish button.
   *
   * We can't use the prop.hasTags because it'll change to true
   * if the user adds a new tag within the pre-publish panel.
   * This would force a re-render and a new prop.hasTags check,
   * hiding this panel and keeping the user from adding
   * more than one tag.
   */
  if (!hadTagsWhenOpeningThePanel) {
    return /*#__PURE__*/_jsx(TagsPanel, {});
  }
  return null;
};
export default MaybeTagsPanel;
//# sourceMappingURL=maybe-tags-panel.js.map