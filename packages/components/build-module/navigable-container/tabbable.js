/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import NavigableContainer from './container';
import { jsx as _jsx } from "react/jsx-runtime";
export function UnforwardedTabbableContainer({
  eventToOffset,
  ...props
}, ref) {
  const innerEventToOffset = evt => {
    const {
      code,
      shiftKey
    } = evt;
    if ('Tab' === code) {
      return shiftKey ? -1 : 1;
    }

    // Allow custom handling of keys besides Tab.
    //
    // By default, TabbableContainer will move focus forward on Tab and
    // backward on Shift+Tab. The handler below will be used for all other
    // events. The semantics for `eventToOffset`'s return
    // values are the following:
    //
    // - +1: move focus forward
    // - -1: move focus backward
    // -  0: don't move focus, but acknowledge event and thus stop it
    // - undefined: do nothing, let the event propagate.
    if (eventToOffset) {
      return eventToOffset(evt);
    }
    return undefined;
  };
  return /*#__PURE__*/_jsx(NavigableContainer, {
    ref: ref,
    stopNavigationEvents: true,
    onlyBrowserTabstops: true,
    eventToOffset: innerEventToOffset,
    ...props
  });
}

/**
 * A container for tabbable elements.
 *
 *  ```jsx
 *  import {
 *    TabbableContainer,
 *    Button,
 *  } from '@wordpress/components';
 *
 *  function onNavigate( index, target ) {
 *    console.log( `Navigates to ${ index }`, target );
 *  }
 *
 *  const MyTabbableContainer = () => (
 *    <div>
 *      <span>Tabbable Container:</span>
 *      <TabbableContainer onNavigate={ onNavigate }>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 1
 *        </Button>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 2
 *        </Button>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 3
 *        </Button>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 4
 *        </Button>
 *      </TabbableContainer>
 *    </div>
 *  );
 *  ```
 */
export const TabbableContainer = forwardRef(UnforwardedTabbableContainer);
export default TabbableContainer;
//# sourceMappingURL=tabbable.js.map