/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import HierarchicalTermSelector from './hierarchical-term-selector';
import FlatTermSelector from './flat-term-selector';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
const identity = x => x;
export function PostTaxonomies({
  taxonomyWrapper = identity
}) {
  const {
    postType,
    taxonomies
  } = useSelect(select => {
    return {
      postType: select(editorStore).getCurrentPostType(),
      taxonomies: select(coreStore).getTaxonomies({
        per_page: -1
      })
    };
  }, []);
  const visibleTaxonomies = (taxonomies !== null && taxonomies !== void 0 ? taxonomies : []).filter(taxonomy =>
  // In some circumstances .visibility can end up as undefined so optional chaining operator required.
  // https://github.com/WordPress/gutenberg/issues/40326
  taxonomy.types.includes(postType) && taxonomy.visibility?.show_ui);
  return visibleTaxonomies.map(taxonomy => {
    const TaxonomyComponent = taxonomy.hierarchical ? HierarchicalTermSelector : FlatTermSelector;
    const taxonomyComponentProps = {
      slug: taxonomy.slug,
      ...(taxonomy.hierarchical ? {} : {
        __nextHasNoMarginBottom: true
      })
    };
    return /*#__PURE__*/_jsx(Fragment, {
      children: taxonomyWrapper( /*#__PURE__*/_jsx(TaxonomyComponent, {
        ...taxonomyComponentProps
      }), taxonomy)
    }, `taxonomy-${taxonomy.slug}`);
  });
}

/**
 * Renders the taxonomies associated with a post.
 *
 * @param {Object}   props                 The component props.
 * @param {Function} props.taxonomyWrapper The wrapper function for each taxonomy component.
 *
 * @return {Array} An array of JSX elements representing the visible taxonomies.
 */
export default PostTaxonomies;
//# sourceMappingURL=index.js.map