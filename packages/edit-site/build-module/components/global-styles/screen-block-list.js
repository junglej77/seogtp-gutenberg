/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { __, sprintf, _n } from '@wordpress/i18n';
import { FlexItem, SearchControl, __experimentalHStack as HStack } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, useEffect, useRef, useDeferredValue, memo } from '@wordpress/element';
import { BlockIcon, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { useDebounce } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import { useBlockVariations } from './variations/variations-panel';
import ScreenHeader from './header';
import { NavigationButtonAsItem } from './navigation-button';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHasDimensionsPanel,
  useHasTypographyPanel,
  useHasBorderPanel,
  useGlobalSetting,
  useSettingsForBlockElement,
  useHasColorPanel
} = unlock(blockEditorPrivateApis);
function useSortedBlockTypes() {
  const blockItems = useSelect(select => select(blocksStore).getBlockTypes(), []);
  // Ensure core blocks are prioritized in the returned results,
  // because third party blocks can be registered earlier than
  // the core blocks (usually by using the `init` action),
  // thus affecting the display order.
  // We don't sort reusable blocks as they are handled differently.
  const groupByType = (blocks, block) => {
    const {
      core,
      noncore
    } = blocks;
    const type = block.name.startsWith('core/') ? core : noncore;
    type.push(block);
    return blocks;
  };
  const {
    core: coreItems,
    noncore: nonCoreItems
  } = blockItems.reduce(groupByType, {
    core: [],
    noncore: []
  });
  return [...coreItems, ...nonCoreItems];
}
export function useBlockHasGlobalStyles(blockName) {
  const [rawSettings] = useGlobalSetting('', blockName);
  const settings = useSettingsForBlockElement(rawSettings, blockName);
  const hasTypographyPanel = useHasTypographyPanel(settings);
  const hasColorPanel = useHasColorPanel(settings);
  const hasBorderPanel = useHasBorderPanel(settings);
  const hasDimensionsPanel = useHasDimensionsPanel(settings);
  const hasLayoutPanel = hasBorderPanel || hasDimensionsPanel;
  const hasVariationsPanel = !!useBlockVariations(blockName)?.length;
  const hasGlobalStyles = hasTypographyPanel || hasColorPanel || hasLayoutPanel || hasVariationsPanel;
  return hasGlobalStyles;
}
function BlockMenuItem({
  block
}) {
  const hasBlockMenuItem = useBlockHasGlobalStyles(block.name);
  if (!hasBlockMenuItem) {
    return null;
  }
  const navigationButtonLabel = sprintf(
  // translators: %s: is the name of a block e.g., 'Image' or 'Table'.
  __('%s block styles'), block.title);
  return /*#__PURE__*/_jsx(NavigationButtonAsItem, {
    path: '/blocks/' + encodeURIComponent(block.name),
    "aria-label": navigationButtonLabel,
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      children: [/*#__PURE__*/_jsx(BlockIcon, {
        icon: block.icon
      }), /*#__PURE__*/_jsx(FlexItem, {
        children: block.title
      })]
    })
  });
}
function BlockList({
  filterValue
}) {
  const sortedBlockTypes = useSortedBlockTypes();
  const debouncedSpeak = useDebounce(speak, 500);
  const {
    isMatchingSearchTerm
  } = useSelect(blocksStore);
  const filteredBlockTypes = !filterValue ? sortedBlockTypes : sortedBlockTypes.filter(blockType => isMatchingSearchTerm(blockType, filterValue));
  const blockTypesListRef = useRef();

  // Announce search results on change
  useEffect(() => {
    if (!filterValue) {
      return;
    }
    // We extract the results from the wrapper div's `ref` because
    // filtered items can contain items that will eventually not
    // render and there is no reliable way to detect when a child
    // will return `null`.
    // TODO: We should find a better way of handling this as it's
    // fragile and depends on the number of rendered elements of `BlockMenuItem`,
    // which is now one.
    // @see https://github.com/WordPress/gutenberg/pull/39117#discussion_r816022116
    const count = blockTypesListRef.current.childElementCount;
    const resultsFoundMessage = sprintf( /* translators: %d: number of results. */
    _n('%d result found.', '%d results found.', count), count);
    debouncedSpeak(resultsFoundMessage, count);
  }, [filterValue, debouncedSpeak]);
  return /*#__PURE__*/_jsx("div", {
    ref: blockTypesListRef,
    className: "edit-site-block-types-item-list",
    children: filteredBlockTypes.map(block => /*#__PURE__*/_jsx(BlockMenuItem, {
      block: block
    }, 'menu-itemblock-' + block.name))
  });
}
const MemoizedBlockList = memo(BlockList);
function ScreenBlockList() {
  const [filterValue, setFilterValue] = useState('');
  const deferredFilterValue = useDeferredValue(filterValue);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Blocks'),
      description: __('Customize the appearance of specific blocks and for the whole site.')
    }), /*#__PURE__*/_jsx(SearchControl, {
      __nextHasNoMarginBottom: true,
      className: "edit-site-block-types-search",
      onChange: setFilterValue,
      value: filterValue,
      label: __('Search for blocks'),
      placeholder: __('Search')
    }), /*#__PURE__*/_jsx(MemoizedBlockList, {
      filterValue: deferredFilterValue
    })]
  });
}
export default ScreenBlockList;
//# sourceMappingURL=screen-block-list.js.map