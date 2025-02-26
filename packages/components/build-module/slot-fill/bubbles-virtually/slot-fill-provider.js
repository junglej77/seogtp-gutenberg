/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { observableMap } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import SlotFillContext from './slot-fill-context';
import { jsx as _jsx } from "react/jsx-runtime";
function createSlotRegistry() {
  const slots = observableMap();
  const fills = observableMap();
  const registerSlot = (name, ref, fillProps) => {
    const slot = slots.get(name);
    slots.set(name, {
      ...slot,
      ref: ref || slot?.ref,
      fillProps: fillProps || slot?.fillProps || {}
    });
  };
  const unregisterSlot = (name, ref) => {
    // Make sure we're not unregistering a slot registered by another element
    // See https://github.com/WordPress/gutenberg/pull/19242#issuecomment-590295412
    if (slots.get(name)?.ref === ref) {
      slots.delete(name);
    }
  };
  const updateSlot = (name, fillProps) => {
    const slot = slots.get(name);
    if (!slot) {
      return;
    }
    if (isShallowEqual(slot.fillProps, fillProps)) {
      return;
    }
    slot.fillProps = fillProps;
    const slotFills = fills.get(name);
    if (slotFills) {
      // Force update fills.
      slotFills.forEach(fill => fill.current.rerender());
    }
  };
  const registerFill = (name, ref) => {
    fills.set(name, [...(fills.get(name) || []), ref]);
  };
  const unregisterFill = (name, ref) => {
    const fillsForName = fills.get(name);
    if (!fillsForName) {
      return;
    }
    fills.set(name, fillsForName.filter(fillRef => fillRef !== ref));
  };
  return {
    slots,
    fills,
    registerSlot,
    updateSlot,
    unregisterSlot,
    registerFill,
    unregisterFill
  };
}
export default function SlotFillProvider({
  children
}) {
  const [registry] = useState(createSlotRegistry);
  return /*#__PURE__*/_jsx(SlotFillContext.Provider, {
    value: registry,
    children: children
  });
}
//# sourceMappingURL=slot-fill-provider.js.map