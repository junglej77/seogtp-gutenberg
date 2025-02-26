/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { useRefEffect } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const handleMouseDown = e => {
  // By preventing default here, we will not lose focus of <input> when clicking a suggestion.
  e.preventDefault();
};
export function SuggestionsList({
  selectedIndex,
  scrollIntoView,
  match,
  onHover,
  onSelect,
  suggestions = [],
  displayTransform,
  instanceId,
  __experimentalRenderItem
}) {
  const listRef = useRefEffect(listNode => {
    // only have to worry about scrolling selected suggestion into view
    // when already expanded.
    let rafId;
    if (selectedIndex > -1 && scrollIntoView && listNode.children[selectedIndex]) {
      listNode.children[selectedIndex].scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
        inline: 'nearest'
      });
    }
    return () => {
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [selectedIndex, scrollIntoView]);
  const handleHover = suggestion => {
    return () => {
      onHover?.(suggestion);
    };
  };
  const handleClick = suggestion => {
    return () => {
      onSelect?.(suggestion);
    };
  };
  const computeSuggestionMatch = suggestion => {
    const matchText = displayTransform(match).toLocaleLowerCase();
    if (matchText.length === 0) {
      return null;
    }
    const transformedSuggestion = displayTransform(suggestion);
    const indexOfMatch = transformedSuggestion.toLocaleLowerCase().indexOf(matchText);
    return {
      suggestionBeforeMatch: transformedSuggestion.substring(0, indexOfMatch),
      suggestionMatch: transformedSuggestion.substring(indexOfMatch, indexOfMatch + matchText.length),
      suggestionAfterMatch: transformedSuggestion.substring(indexOfMatch + matchText.length)
    };
  };
  return /*#__PURE__*/_jsx("ul", {
    ref: listRef,
    className: "components-form-token-field__suggestions-list",
    id: `components-form-token-suggestions-${instanceId}`,
    role: "listbox",
    children: suggestions.map((suggestion, index) => {
      const matchText = computeSuggestionMatch(suggestion);
      const isSelected = index === selectedIndex;
      const isDisabled = typeof suggestion === 'object' && suggestion?.disabled;
      const key = typeof suggestion === 'object' && 'value' in suggestion ? suggestion?.value : displayTransform(suggestion);
      const className = clsx('components-form-token-field__suggestion', {
        'is-selected': isSelected
      });
      let output;
      if (typeof __experimentalRenderItem === 'function') {
        output = __experimentalRenderItem({
          item: suggestion
        });
      } else if (matchText) {
        output = /*#__PURE__*/_jsxs("span", {
          "aria-label": displayTransform(suggestion),
          children: [matchText.suggestionBeforeMatch, /*#__PURE__*/_jsx("strong", {
            className: "components-form-token-field__suggestion-match",
            children: matchText.suggestionMatch
          }), matchText.suggestionAfterMatch]
        });
      } else {
        output = displayTransform(suggestion);
      }

      /* eslint-disable jsx-a11y/click-events-have-key-events */
      return /*#__PURE__*/_jsx("li", {
        id: `components-form-token-suggestions-${instanceId}-${index}`,
        role: "option",
        className: className,
        onMouseDown: handleMouseDown,
        onClick: handleClick(suggestion),
        onMouseEnter: handleHover(suggestion),
        "aria-selected": index === selectedIndex,
        "aria-disabled": isDisabled,
        children: output
      }, key);
      /* eslint-enable jsx-a11y/click-events-have-key-events */
    })
  });
}
export default SuggestionsList;
//# sourceMappingURL=suggestions-list.js.map