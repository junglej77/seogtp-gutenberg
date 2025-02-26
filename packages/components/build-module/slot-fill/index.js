/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { forwardRef, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BaseFill from './fill';
import BaseSlot from './slot';
import BubblesVirtuallyFill from './bubbles-virtually/fill';
import BubblesVirtuallySlot from './bubbles-virtually/slot';
import BubblesVirtuallySlotFillProvider from './bubbles-virtually/slot-fill-provider';
import SlotFillProvider from './provider';
import SlotFillContext from './bubbles-virtually/slot-fill-context';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { default as useSlot } from './bubbles-virtually/use-slot';
export { default as useSlotFills } from './bubbles-virtually/use-slot-fills';
export function Fill(props) {
  // We're adding both Fills here so they can register themselves before
  // their respective slot has been registered. Only the Fill that has a slot
  // will render. The other one will return null.
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BaseFill, {
      ...props
    }), /*#__PURE__*/_jsx(BubblesVirtuallyFill, {
      ...props
    })]
  });
}
export function UnforwardedSlot(props, ref) {
  const {
    bubblesVirtually,
    ...restProps
  } = props;
  if (bubblesVirtually) {
    return /*#__PURE__*/_jsx(BubblesVirtuallySlot, {
      ...restProps,
      ref: ref
    });
  }
  return /*#__PURE__*/_jsx(BaseSlot, {
    ...restProps
  });
}
export const Slot = forwardRef(UnforwardedSlot);
export function Provider({
  children,
  passthrough = false
}) {
  const parent = useContext(SlotFillContext);
  if (!parent.isDefault && passthrough) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: children
    });
  }
  return /*#__PURE__*/_jsx(SlotFillProvider, {
    children: /*#__PURE__*/_jsx(BubblesVirtuallySlotFillProvider, {
      children: children
    })
  });
}
Provider.displayName = 'SlotFillProvider';
export function createSlotFill(key) {
  const baseName = typeof key === 'symbol' ? key.description : key;
  const FillComponent = props => /*#__PURE__*/_jsx(Fill, {
    name: key,
    ...props
  });
  FillComponent.displayName = `${baseName}Fill`;
  const SlotComponent = props => /*#__PURE__*/_jsx(Slot, {
    name: key,
    ...props
  });
  SlotComponent.displayName = `${baseName}Slot`;
  SlotComponent.__unstableName = key;
  return {
    Fill: FillComponent,
    Slot: SlotComponent
  };
}
export const createPrivateSlotFill = name => {
  const privateKey = Symbol(name);
  const privateSlotFill = createSlotFill(privateKey);
  return {
    privateKey,
    ...privateSlotFill
  };
};
//# sourceMappingURL=index.js.map