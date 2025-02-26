/**
 * WordPress dependencies
 */
import { useState, useRef } from '@wordpress/element';
import { createHigherOrderComponent, useRefEffect, useMergeRefs } from '@wordpress/compose';
import { isKeyboardEvent } from '@wordpress/keycodes';
import { jsx as _jsx } from "react/jsx-runtime";
const defaultShortcuts = {
  previous: [{
    modifier: 'ctrlShift',
    character: '`'
  }, {
    modifier: 'ctrlShift',
    character: '~'
  }, {
    modifier: 'access',
    character: 'p'
  }],
  next: [{
    modifier: 'ctrl',
    character: '`'
  }, {
    modifier: 'access',
    character: 'n'
  }]
};
export function useNavigateRegions(shortcuts = defaultShortcuts) {
  const ref = useRef(null);
  const [isFocusingRegions, setIsFocusingRegions] = useState(false);
  function focusRegion(offset) {
    var _ref$current$querySel;
    const regions = Array.from((_ref$current$querySel = ref.current?.querySelectorAll('[role="region"][tabindex="-1"]')) !== null && _ref$current$querySel !== void 0 ? _ref$current$querySel : []);
    if (!regions.length) {
      return;
    }
    let nextRegion = regions[0];
    // Based off the current element, use closest to determine the wrapping region since this operates up the DOM. Also, match tabindex to avoid edge cases with regions we do not want.
    const wrappingRegion = ref.current?.ownerDocument?.activeElement?.closest('[role="region"][tabindex="-1"]');
    const selectedIndex = wrappingRegion ? regions.indexOf(wrappingRegion) : -1;
    if (selectedIndex !== -1) {
      let nextIndex = selectedIndex + offset;
      nextIndex = nextIndex === -1 ? regions.length - 1 : nextIndex;
      nextIndex = nextIndex === regions.length ? 0 : nextIndex;
      nextRegion = regions[nextIndex];
    }
    nextRegion.focus();
    setIsFocusingRegions(true);
  }
  const clickRef = useRefEffect(element => {
    function onClick() {
      setIsFocusingRegions(false);
    }
    element.addEventListener('click', onClick);
    return () => {
      element.removeEventListener('click', onClick);
    };
  }, [setIsFocusingRegions]);
  return {
    ref: useMergeRefs([ref, clickRef]),
    className: isFocusingRegions ? 'is-focusing-regions' : '',
    onKeyDown(event) {
      if (shortcuts.previous.some(({
        modifier,
        character
      }) => {
        return isKeyboardEvent[modifier](event, character);
      })) {
        focusRegion(-1);
      } else if (shortcuts.next.some(({
        modifier,
        character
      }) => {
        return isKeyboardEvent[modifier](event, character);
      })) {
        focusRegion(1);
      }
    }
  };
}

/**
 * `navigateRegions` is a React [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html)
 * adding keyboard navigation to switch between the different DOM elements marked as "regions" (role="region").
 * These regions should be focusable (By adding a tabIndex attribute for example). For better accessibility,
 * these elements must be properly labelled to briefly describe the purpose of the content in the region.
 * For more details, see "Landmark Roles" in the [WAI-ARIA specification](https://www.w3.org/TR/wai-aria/)
 * and "Landmark Regions" in the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/).
 *
 * ```jsx
 * import { navigateRegions } from '@wordpress/components';
 *
 * const MyComponentWithNavigateRegions = navigateRegions( () => (
 * 	<div>
 * 		<div role="region" tabIndex="-1" aria-label="Header">
 * 			Header
 * 		</div>
 * 		<div role="region" tabIndex="-1" aria-label="Content">
 * 			Content
 * 		</div>
 * 		<div role="region" tabIndex="-1" aria-label="Sidebar">
 * 			Sidebar
 * 		</div>
 * 	</div>
 * ) );
 * ```
 */
export default createHigherOrderComponent(Component => ({
  shortcuts,
  ...props
}) => /*#__PURE__*/_jsx("div", {
  ...useNavigateRegions(shortcuts),
  children: /*#__PURE__*/_jsx(Component, {
    ...props
  })
}), 'navigateRegions');
//# sourceMappingURL=index.js.map