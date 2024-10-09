/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { useCompositeContext } from './context';
import { jsx as _jsx } from "react/jsx-runtime";
export const CompositeHover = forwardRef(function CompositeHover(props, ref) {
  const context = useCompositeContext();
  return /*#__PURE__*/_jsx(Ariakit.CompositeHover, {
    store: context.store,
    ...props,
    ref: ref
  });
});
//# sourceMappingURL=hover.js.map