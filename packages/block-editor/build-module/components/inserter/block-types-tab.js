/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useMemo, useEffect, forwardRef } from '@wordpress/element';
import { useAsyncList } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockTypesList from '../block-types-list';
import InserterPanel from './panel';
import useBlockTypesState from './hooks/use-block-types-state';
import InserterListbox from '../inserter-listbox';
import { orderBy } from '../../utils/sorting';
import InserterNoResults from './no-results';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const getBlockNamespace = item => item.name.split('/')[0];
const MAX_SUGGESTED_ITEMS = 6;

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation and rerendering the component.
 *
 * @type {Array}
 */
const EMPTY_ARRAY = [];
export function BlockTypesTabPanel({
  items,
  collections,
  categories,
  onSelectItem,
  onHover,
  showMostUsedBlocks,
  className
}) {
  const suggestedItems = useMemo(() => {
    return orderBy(items, 'frecency', 'desc').slice(0, MAX_SUGGESTED_ITEMS);
  }, [items]);
  const uncategorizedItems = useMemo(() => {
    return items.filter(item => !item.category);
  }, [items]);
  const itemsPerCollection = useMemo(() => {
    // Create a new Object to avoid mutating collection.
    const result = {
      ...collections
    };
    Object.keys(collections).forEach(namespace => {
      result[namespace] = items.filter(item => getBlockNamespace(item) === namespace);
      if (result[namespace].length === 0) {
        delete result[namespace];
      }
    });
    return result;
  }, [items, collections]);

  // Hide block preview on unmount.
  useEffect(() => () => onHover(null), []);

  /**
   * The inserter contains a big number of blocks and opening it is a costful operation.
   * The rendering is the most costful part of it, in order to improve the responsiveness
   * of the "opening" action, these lazy lists allow us to render the inserter category per category,
   * once all the categories are rendered, we start rendering the collections and the uncategorized block types.
   */
  const currentlyRenderedCategories = useAsyncList(categories);
  const didRenderAllCategories = categories.length === currentlyRenderedCategories.length;

  // Async List requires an array.
  const collectionEntries = useMemo(() => {
    return Object.entries(collections);
  }, [collections]);
  const currentlyRenderedCollections = useAsyncList(didRenderAllCategories ? collectionEntries : EMPTY_ARRAY);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [showMostUsedBlocks &&
    // Only show the most used blocks if the total amount of block
    // is larger than 1 row, otherwise it is not so useful.
    items.length > 3 && !!suggestedItems.length && /*#__PURE__*/_jsx(InserterPanel, {
      title: _x('Most used', 'blocks'),
      children: /*#__PURE__*/_jsx(BlockTypesList, {
        items: suggestedItems,
        onSelect: onSelectItem,
        onHover: onHover,
        label: _x('Most used', 'blocks')
      })
    }), currentlyRenderedCategories.map(category => {
      const categoryItems = items.filter(item => item.category === category.slug);
      if (!categoryItems || !categoryItems.length) {
        return null;
      }
      return /*#__PURE__*/_jsx(InserterPanel, {
        title: category.title,
        icon: category.icon,
        children: /*#__PURE__*/_jsx(BlockTypesList, {
          items: categoryItems,
          onSelect: onSelectItem,
          onHover: onHover,
          label: category.title
        })
      }, category.slug);
    }), didRenderAllCategories && uncategorizedItems.length > 0 && /*#__PURE__*/_jsx(InserterPanel, {
      className: "block-editor-inserter__uncategorized-blocks-panel",
      title: __('Uncategorized'),
      children: /*#__PURE__*/_jsx(BlockTypesList, {
        items: uncategorizedItems,
        onSelect: onSelectItem,
        onHover: onHover,
        label: __('Uncategorized')
      })
    }), currentlyRenderedCollections.map(([namespace, collection]) => {
      const collectionItems = itemsPerCollection[namespace];
      if (!collectionItems || !collectionItems.length) {
        return null;
      }
      return /*#__PURE__*/_jsx(InserterPanel, {
        title: collection.title,
        icon: collection.icon,
        children: /*#__PURE__*/_jsx(BlockTypesList, {
          items: collectionItems,
          onSelect: onSelectItem,
          onHover: onHover,
          label: collection.title
        })
      }, namespace);
    })]
  });
}
export function BlockTypesTab({
  rootClientId,
  onInsert,
  onHover,
  showMostUsedBlocks
}, ref) {
  const [items, categories, collections, onSelectItem] = useBlockTypesState(rootClientId, onInsert);
  if (!items.length) {
    return /*#__PURE__*/_jsx(InserterNoResults, {});
  }
  const itemsForCurrentRoot = [];
  const itemsRemaining = [];
  for (const item of items) {
    // Skip reusable blocks, they moved to the patterns tab.
    if (item.category === 'reusable') {
      continue;
    }
    if (rootClientId && item.rootClientId === rootClientId) {
      itemsForCurrentRoot.push(item);
    } else {
      itemsRemaining.push(item);
    }
  }
  return /*#__PURE__*/_jsx(InserterListbox, {
    children: /*#__PURE__*/_jsxs("div", {
      ref: ref,
      children: [!!itemsForCurrentRoot.length && /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsx(BlockTypesTabPanel, {
          items: itemsForCurrentRoot,
          categories: categories,
          collections: collections,
          onSelectItem: onSelectItem,
          onHover: onHover,
          showMostUsedBlocks: showMostUsedBlocks,
          className: "block-editor-inserter__insertable-blocks-at-selection"
        })
      }), /*#__PURE__*/_jsx(BlockTypesTabPanel, {
        items: itemsRemaining,
        categories: categories,
        collections: collections,
        onSelectItem: onSelectItem,
        onHover: onHover,
        showMostUsedBlocks: showMostUsedBlocks,
        className: "block-editor-inserter__all-blocks"
      })]
    })
  });
}
export default forwardRef(BlockTypesTab);
//# sourceMappingURL=block-types-tab.js.map