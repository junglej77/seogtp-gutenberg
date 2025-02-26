/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { useRef, useLayoutEffect, useContext, forwardRef } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { View } from '../../view';
import SlotFillContext from './slot-fill-context';
import { jsx as _jsx } from "react/jsx-runtime";
function Slot(props, forwardedRef) {
  const {
    name,
    fillProps = {},
    as,
    // `children` is not allowed. However, if it is passed,
    // it will be displayed as is, so remove `children`.
    // @ts-ignore
    children,
    ...restProps
  } = props;
  const {
    registerSlot,
    unregisterSlot,
    ...registry
  } = useContext(SlotFillContext);
  const ref = useRef(null);
  useLayoutEffect(() => {
    registerSlot(name, ref, fillProps);
    return () => {
      unregisterSlot(name, ref);
    };
    // Ignore reason: We don't want to unregister and register the slot whenever
    // `fillProps` change, which would cause the fill to be re-mounted. Instead,
    // we can just update the slot (see hook below).
    // For more context, see https://github.com/WordPress/gutenberg/pull/44403#discussion_r994415973
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerSlot, unregisterSlot, name]);
  // fillProps may be an update that interacts with the layout, so we
  // useLayoutEffect.
  useLayoutEffect(() => {
    registry.updateSlot(name, fillProps);
  });
  return /*#__PURE__*/_jsx(View, {
    as: as,
    ref: useMergeRefs([forwardedRef, ref]),
    ...restProps
  });
}
export default forwardRef(Slot);
//# sourceMappingURL=slot.js.map