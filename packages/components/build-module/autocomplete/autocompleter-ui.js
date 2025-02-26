/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useLayoutEffect, useRef, useEffect, useState } from '@wordpress/element';
import { useAnchor } from '@wordpress/rich-text';
import { useDebounce, useMergeRefs, useRefEffect } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import getDefaultUseItems from './get-default-use-items';
import Button from '../button';
import Popover from '../popover';
import { VisuallyHidden } from '../visually-hidden';
import { createPortal } from 'react-dom';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ListBox({
  items,
  onSelect,
  selectedIndex,
  instanceId,
  listBoxId,
  className,
  Component = 'div'
}) {
  return /*#__PURE__*/_jsx(Component, {
    id: listBoxId,
    role: "listbox",
    className: "components-autocomplete__results",
    children: items.map((option, index) => /*#__PURE__*/_jsx(Button, {
      id: `components-autocomplete-item-${instanceId}-${option.key}`,
      role: "option",
      "aria-selected": index === selectedIndex,
      accessibleWhenDisabled: true,
      disabled: option.isDisabled,
      className: clsx('components-autocomplete__result', className, {
        // Unused, for backwards compatibility.
        'is-selected': index === selectedIndex
      }),
      variant: index === selectedIndex ? 'primary' : undefined,
      onClick: () => onSelect(option),
      children: option.label
    }, option.key))
  });
}
export function getAutoCompleterUI(autocompleter) {
  var _autocompleter$useIte;
  const useItems = (_autocompleter$useIte = autocompleter.useItems) !== null && _autocompleter$useIte !== void 0 ? _autocompleter$useIte : getDefaultUseItems(autocompleter);
  function AutocompleterUI({
    filterValue,
    instanceId,
    listBoxId,
    className,
    selectedIndex,
    onChangeOptions,
    onSelect,
    onReset,
    reset,
    contentRef
  }) {
    const [items] = useItems(filterValue);
    const popoverAnchor = useAnchor({
      editableContentElement: contentRef.current
    });
    const [needsA11yCompat, setNeedsA11yCompat] = useState(false);
    const popoverRef = useRef(null);
    const popoverRefs = useMergeRefs([popoverRef, useRefEffect(node => {
      if (!contentRef.current) {
        return;
      }

      // If the popover is rendered in a different document than
      // the content, we need to duplicate the options list in the
      // content document so that it's available to the screen
      // readers, which check the DOM ID based aria-* attributes.
      setNeedsA11yCompat(node.ownerDocument !== contentRef.current.ownerDocument);
    }, [contentRef])]);
    useOnClickOutside(popoverRef, reset);
    const debouncedSpeak = useDebounce(speak, 500);
    function announce(options) {
      if (!debouncedSpeak) {
        return;
      }
      if (!!options.length) {
        if (filterValue) {
          debouncedSpeak(sprintf( /* translators: %d: number of results. */
          _n('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', options.length), options.length), 'assertive');
        } else {
          debouncedSpeak(sprintf( /* translators: %d: number of results. */
          _n('Initial %d result loaded. Type to filter all available results. Use up and down arrow keys to navigate.', 'Initial %d results loaded. Type to filter all available results. Use up and down arrow keys to navigate.', options.length), options.length), 'assertive');
        }
      } else {
        debouncedSpeak(__('No results.'), 'assertive');
      }
    }
    useLayoutEffect(() => {
      onChangeOptions(items);
      announce(items);
      // Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
      // See https://github.com/WordPress/gutenberg/pull/41820
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);
    if (items.length === 0) {
      return null;
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Popover, {
        focusOnMount: false,
        onClose: onReset,
        placement: "top-start",
        className: "components-autocomplete__popover",
        anchor: popoverAnchor,
        ref: popoverRefs,
        children: /*#__PURE__*/_jsx(ListBox, {
          items: items,
          onSelect: onSelect,
          selectedIndex: selectedIndex,
          instanceId: instanceId,
          listBoxId: listBoxId,
          className: className
        })
      }), contentRef.current && needsA11yCompat && createPortal( /*#__PURE__*/_jsx(ListBox, {
        items: items,
        onSelect: onSelect,
        selectedIndex: selectedIndex,
        instanceId: instanceId,
        listBoxId: listBoxId,
        className: className,
        Component: VisuallyHidden
      }), contentRef.current.ownerDocument.body)]
    });
  }
  return AutocompleterUI;
}
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements, or if the ref is not referencing an element
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
    // Disable reason: `ref` is a ref object and should not be included in a
    // hook's dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);
}
//# sourceMappingURL=autocompleter-ui.js.map