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
export const CompositeRow = forwardRef(function CompositeRow(props, ref) {
  const context = useCompositeContext();
  return /*#__PURE__*/_jsx(Ariakit.CompositeRow, {
    store: context.store,
    ...props,
    ref: ref
  });
});
//# sourceMappingURL=row.js.map