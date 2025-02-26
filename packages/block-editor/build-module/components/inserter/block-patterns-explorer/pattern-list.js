/**
 * WordPress dependencies
 */
import { useMemo, useEffect, useRef, useState } from '@wordpress/element';
import { _n, sprintf } from '@wordpress/i18n';
import { useDebounce } from '@wordpress/compose';
import { __experimentalHeading as Heading } from '@wordpress/components';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import BlockPatternsList from '../../block-patterns-list';
import useInsertionPoint from '../hooks/use-insertion-point';
import usePatternsState from '../hooks/use-patterns-state';
import InserterListbox from '../../inserter-listbox';
import { searchItems } from '../search-items';
import BlockPatternsPaging from '../../block-patterns-paging';
import usePatternsPaging from '../hooks/use-patterns-paging';
import { INSERTER_PATTERN_TYPES, allPatternsCategory, myPatternsCategory } from '../block-patterns-tab/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PatternsListHeader({
  filterValue,
  filteredBlockPatternsLength
}) {
  if (!filterValue) {
    return null;
  }
  return /*#__PURE__*/_jsx(Heading, {
    level: 2,
    lineHeight: "48px",
    className: "block-editor-block-patterns-explorer__search-results-count",
    children: sprintf( /* translators: %d: number of patterns. */
    _n('%d pattern found', '%d patterns found', filteredBlockPatternsLength), filteredBlockPatternsLength)
  });
}
function PatternList({
  searchValue,
  selectedCategory,
  patternCategories,
  rootClientId
}) {
  const container = useRef();
  const debouncedSpeak = useDebounce(speak, 500);
  const [destinationRootClientId, onInsertBlocks] = useInsertionPoint({
    rootClientId,
    shouldFocusBlock: true
  });
  const [patterns,, onClickPattern] = usePatternsState(onInsertBlocks, destinationRootClientId, selectedCategory);
  const registeredPatternCategories = useMemo(() => patternCategories.map(patternCategory => patternCategory.name), [patternCategories]);
  const filteredBlockPatterns = useMemo(() => {
    const filteredPatterns = patterns.filter(pattern => {
      if (selectedCategory === allPatternsCategory.name) {
        return true;
      }
      if (selectedCategory === myPatternsCategory.name && pattern.type === INSERTER_PATTERN_TYPES.user) {
        return true;
      }
      if (selectedCategory === 'uncategorized') {
        const hasKnownCategory = pattern.categories.some(category => registeredPatternCategories.includes(category));
        return !pattern.categories?.length || !hasKnownCategory;
      }
      return pattern.categories?.includes(selectedCategory);
    });
    if (!searchValue) {
      return filteredPatterns;
    }
    return searchItems(filteredPatterns, searchValue);
  }, [searchValue, patterns, selectedCategory, registeredPatternCategories]);

  // Announce search results on change.
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const count = filteredBlockPatterns.length;
    const resultsFoundMessage = sprintf( /* translators: %d: number of results. */
    _n('%d result found.', '%d results found.', count), count);
    debouncedSpeak(resultsFoundMessage);
  }, [searchValue, debouncedSpeak, filteredBlockPatterns.length]);
  const pagingProps = usePatternsPaging(filteredBlockPatterns, selectedCategory, container);

  // Reset page when search value changes.
  const [previousSearchValue, setPreviousSearchValue] = useState(searchValue);
  if (searchValue !== previousSearchValue) {
    setPreviousSearchValue(searchValue);
    pagingProps.changePage(1);
  }
  const hasItems = !!filteredBlockPatterns?.length;
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-patterns-explorer__list",
    ref: container,
    children: [/*#__PURE__*/_jsx(PatternsListHeader, {
      filterValue: searchValue,
      filteredBlockPatternsLength: filteredBlockPatterns.length
    }), /*#__PURE__*/_jsx(InserterListbox, {
      children: hasItems && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockPatternsList, {
          shownPatterns: pagingProps.categoryPatternsAsyncList,
          blockPatterns: pagingProps.categoryPatterns,
          onClickPattern: onClickPattern,
          isDraggable: false
        }), /*#__PURE__*/_jsx(BlockPatternsPaging, {
          ...pagingProps
        })]
      })
    })]
  });
}
export default PatternList;
//# sourceMappingURL=pattern-list.js.map