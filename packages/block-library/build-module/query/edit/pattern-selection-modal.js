/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { Modal, SearchControl } from '@wordpress/components';
import { useAsyncList } from '@wordpress/compose';
import { BlockContextProvider, store as blockEditorStore, __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useBlockNameForPatterns, getTransformedBlocksFromPattern, usePatterns } from '../utils';
import { searchPatterns } from '../../utils/search-patterns';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PatternSelectionModal({
  clientId,
  attributes,
  setIsPatternSelectionModalOpen
}) {
  const [searchValue, setSearchValue] = useState('');
  const {
    replaceBlock,
    selectBlock
  } = useDispatch(blockEditorStore);
  const onBlockPatternSelect = (pattern, blocks) => {
    const {
      newBlocks,
      queryClientIds
    } = getTransformedBlocksFromPattern(blocks, attributes);
    replaceBlock(clientId, newBlocks);
    if (queryClientIds[0]) {
      selectBlock(queryClientIds[0]);
    }
  };
  // When we preview Query Loop blocks we should prefer the current
  // block's postType, which is passed through block context.
  const blockPreviewContext = useMemo(() => ({
    previewPostType: attributes.query.postType
  }), [attributes.query.postType]);
  const blockNameForPatterns = useBlockNameForPatterns(clientId, attributes);
  const blockPatterns = usePatterns(clientId, blockNameForPatterns);
  const filteredBlockPatterns = useMemo(() => {
    return searchPatterns(blockPatterns, searchValue);
  }, [blockPatterns, searchValue]);
  const shownBlockPatterns = useAsyncList(filteredBlockPatterns);
  return /*#__PURE__*/_jsx(Modal, {
    overlayClassName: "block-library-query-pattern__selection-modal",
    title: __('Choose a pattern'),
    onRequestClose: () => setIsPatternSelectionModalOpen(false),
    isFullScreen: true,
    children: /*#__PURE__*/_jsxs("div", {
      className: "block-library-query-pattern__selection-content",
      children: [/*#__PURE__*/_jsx("div", {
        className: "block-library-query-pattern__selection-search",
        children: /*#__PURE__*/_jsx(SearchControl, {
          __nextHasNoMarginBottom: true,
          onChange: setSearchValue,
          value: searchValue,
          label: __('Search for patterns'),
          placeholder: __('Search')
        })
      }), /*#__PURE__*/_jsx(BlockContextProvider, {
        value: blockPreviewContext,
        children: /*#__PURE__*/_jsx(BlockPatternsList, {
          blockPatterns: filteredBlockPatterns,
          shownPatterns: shownBlockPatterns,
          onClickPattern: onBlockPatternSelect
        })
      })]
    })
  });
}
//# sourceMappingURL=pattern-selection-modal.js.map