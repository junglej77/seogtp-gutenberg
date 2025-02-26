/**
 * WordPress dependencies
 */

import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SlotFillContext from './context';
import { jsx as _jsx } from "react/jsx-runtime";
function createSlotRegistry() {
  const slots = {};
  const fills = {};
  let listeners = [];
  function registerSlot(name, slot) {
    const previousSlot = slots[name];
    slots[name] = slot;
    triggerListeners();

    // Sometimes the fills are registered after the initial render of slot
    // But before the registerSlot call, we need to rerender the slot.
    forceUpdateSlot(name);

    // If a new instance of a slot is being mounted while another with the
    // same name exists, force its update _after_ the new slot has been
    // assigned into the instance, such that its own rendering of children
    // will be empty (the new Slot will subsume all fills for this name).
    if (previousSlot) {
      previousSlot.forceUpdate();
    }
  }
  function registerFill(name, instance) {
    fills[name] = [...(fills[name] || []), instance];
    forceUpdateSlot(name);
  }
  function unregisterSlot(name, instance) {
    // If a previous instance of a Slot by this name unmounts, do nothing,
    // as the slot and its fills should only be removed for the current
    // known instance.
    if (slots[name] !== instance) {
      return;
    }
    delete slots[name];
    triggerListeners();
  }
  function unregisterFill(name, instance) {
    var _fills$name$filter;
    fills[name] = (_fills$name$filter = fills[name]?.filter(fill => fill !== instance)) !== null && _fills$name$filter !== void 0 ? _fills$name$filter : [];
    forceUpdateSlot(name);
  }
  function getSlot(name) {
    return slots[name];
  }
  function getFills(name, slotInstance) {
    // Fills should only be returned for the current instance of the slot
    // in which they occupy.
    if (slots[name] !== slotInstance) {
      return [];
    }
    return fills[name];
  }
  function forceUpdateSlot(name) {
    const slot = getSlot(name);
    if (slot) {
      slot.forceUpdate();
    }
  }
  function triggerListeners() {
    listeners.forEach(listener => listener());
  }
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
  return {
    registerSlot,
    unregisterSlot,
    registerFill,
    unregisterFill,
    getSlot,
    getFills,
    subscribe
  };
}
export function SlotFillProvider({
  children
}) {
  const [contextValue] = useState(createSlotRegistry);
  return /*#__PURE__*/_jsx(SlotFillContext.Provider, {
    value: contextValue,
    children: children
  });
}
export default SlotFillProvider;
//# sourceMappingURL=provider.js.map