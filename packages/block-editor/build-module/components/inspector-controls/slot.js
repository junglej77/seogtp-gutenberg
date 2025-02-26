/**
 * WordPress dependencies
 */
import { __experimentalUseSlotFills as useSlotFills, __unstableMotionContext as MotionContext } from '@wordpress/components';
import { useContext, useMemo } from '@wordpress/element';
import warning from '@wordpress/warning';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import BlockSupportToolsPanel from './block-support-tools-panel';
import BlockSupportSlotContainer from './block-support-slot-container';
import groups from './groups';
import { jsx as _jsx } from "react/jsx-runtime";
export default function InspectorControlsSlot({
  __experimentalGroup,
  group = 'default',
  label,
  fillProps,
  ...props
}) {
  if (__experimentalGroup) {
    deprecated('`__experimentalGroup` property in `InspectorControlsSlot`', {
      since: '6.2',
      version: '6.4',
      alternative: '`group`'
    });
    group = __experimentalGroup;
  }
  const Slot = groups[group]?.Slot;
  const fills = useSlotFills(Slot?.__unstableName);
  const motionContextValue = useContext(MotionContext);
  const computedFillProps = useMemo(() => {
    var _fillProps$forwardedC;
    return {
      ...(fillProps !== null && fillProps !== void 0 ? fillProps : {}),
      forwardedContext: [...((_fillProps$forwardedC = fillProps?.forwardedContext) !== null && _fillProps$forwardedC !== void 0 ? _fillProps$forwardedC : []), [MotionContext.Provider, {
        value: motionContextValue
      }]]
    };
  }, [motionContextValue, fillProps]);
  if (!Slot) {
    globalThis.SCRIPT_DEBUG === true ? warning(`Unknown InspectorControls group "${group}" provided.`) : void 0;
    return null;
  }
  if (!fills?.length) {
    return null;
  }
  if (label) {
    return /*#__PURE__*/_jsx(BlockSupportToolsPanel, {
      group: group,
      label: label,
      children: /*#__PURE__*/_jsx(BlockSupportSlotContainer, {
        ...props,
        fillProps: computedFillProps,
        Slot: Slot
      })
    });
  }
  return /*#__PURE__*/_jsx(Slot, {
    ...props,
    fillProps: computedFillProps,
    bubblesVirtually: true
  });
}
//# sourceMappingURL=slot.js.map