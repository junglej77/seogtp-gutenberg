/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { SearchControl, Button } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useDebounce, compose } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editorStore } from '../../store';
import BlockManagerCategory from './category';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockManager({
  blockTypes,
  categories,
  hasBlockSupport,
  isMatchingSearchTerm,
  numberOfHiddenBlocks,
  enableAllBlockTypes
}) {
  const debouncedSpeak = useDebounce(speak, 500);
  const [search, setSearch] = useState('');

  // Filtering occurs here (as opposed to `withSelect`) to avoid
  // wasted renders by consequence of `Array#filter` producing
  // a new value reference on each call.
  blockTypes = blockTypes.filter(blockType => hasBlockSupport(blockType, 'inserter', true) && (!search || isMatchingSearchTerm(blockType, search)) && (!blockType.parent || blockType.parent.includes('core/post-content')));

  // Announce search results on change
  useEffect(() => {
    if (!search) {
      return;
    }
    const count = blockTypes.length;
    const resultsFoundMessage = sprintf( /* translators: %d: number of results. */
    _n('%d result found.', '%d results found.', count), count);
    debouncedSpeak(resultsFoundMessage);
  }, [blockTypes.length, search, debouncedSpeak]);
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-block-manager__content",
    children: [!!numberOfHiddenBlocks && /*#__PURE__*/_jsxs("div", {
      className: "editor-block-manager__disabled-blocks-count",
      children: [sprintf( /* translators: %d: number of blocks. */
      _n('%d block is hidden.', '%d blocks are hidden.', numberOfHiddenBlocks), numberOfHiddenBlocks), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "link",
        onClick: () => enableAllBlockTypes(blockTypes),
        children: __('Reset')
      })]
    }), /*#__PURE__*/_jsx(SearchControl, {
      __nextHasNoMarginBottom: true,
      label: __('Search for a block'),
      placeholder: __('Search for a block'),
      value: search,
      onChange: nextSearch => setSearch(nextSearch),
      className: "editor-block-manager__search"
    }), /*#__PURE__*/_jsxs("div", {
      tabIndex: "0",
      role: "region",
      "aria-label": __('Available block types'),
      className: "editor-block-manager__results",
      children: [blockTypes.length === 0 && /*#__PURE__*/_jsx("p", {
        className: "editor-block-manager__no-results",
        children: __('No blocks found.')
      }), categories.map(category => /*#__PURE__*/_jsx(BlockManagerCategory, {
        title: category.title,
        blockTypes: blockTypes.filter(blockType => blockType.category === category.slug)
      }, category.slug)), /*#__PURE__*/_jsx(BlockManagerCategory, {
        title: __('Uncategorized'),
        blockTypes: blockTypes.filter(({
          category
        }) => !category)
      })]
    })]
  });
}
export default compose([withSelect(select => {
  var _get;
  const {
    getBlockTypes,
    getCategories,
    hasBlockSupport,
    isMatchingSearchTerm
  } = select(blocksStore);
  const {
    get
  } = select(preferencesStore);

  // Some hidden blocks become unregistered
  // by removing for instance the plugin that registered them, yet
  // they're still remain as hidden by the user's action.
  // We consider "hidden", blocks which were hidden and
  // are still registered.
  const blockTypes = getBlockTypes();
  const hiddenBlockTypes = ((_get = get('core', 'hiddenBlockTypes')) !== null && _get !== void 0 ? _get : []).filter(hiddenBlock => {
    return blockTypes.some(registeredBlock => registeredBlock.name === hiddenBlock);
  });
  const numberOfHiddenBlocks = Array.isArray(hiddenBlockTypes) && hiddenBlockTypes.length;
  return {
    blockTypes,
    categories: getCategories(),
    hasBlockSupport,
    isMatchingSearchTerm,
    numberOfHiddenBlocks
  };
}), withDispatch(dispatch => {
  const {
    showBlockTypes
  } = unlock(dispatch(editorStore));
  return {
    enableAllBlockTypes: blockTypes => {
      const blockNames = blockTypes.map(({
        name
      }) => name);
      showBlockTypes(blockNames);
    }
  };
})])(BlockManager);
//# sourceMappingURL=index.js.map