/**
 * External dependencies
 */

import { LayoutGroup } from 'framer-motion';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { contextConnect, useContextSystem } from '../../context';
import { useCx } from '../../utils/hooks';
import BaseControl from '../../base-control';
import { VisualLabelWrapper } from './styles';
import * as styles from './styles';
import { ToggleGroupControlAsRadioGroup } from './as-radio-group';
import { ToggleGroupControlAsButtonGroup } from './as-button-group';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnconnectedToggleGroupControl(props, forwardedRef) {
  const {
    __nextHasNoMarginBottom = false,
    __next40pxDefaultSize = false,
    className,
    isAdaptiveWidth = false,
    isBlock = false,
    isDeselectable = false,
    label,
    hideLabelFromVision = false,
    help,
    onChange,
    size = 'default',
    value,
    children,
    ...otherProps
  } = useContextSystem(props, 'ToggleGroupControl');
  const baseId = useInstanceId(ToggleGroupControl, 'toggle-group-control');
  const normalizedSize = __next40pxDefaultSize && size === 'default' ? '__unstable-large' : size;
  const cx = useCx();
  const classes = useMemo(() => cx(styles.toggleGroupControl({
    isBlock,
    isDeselectable,
    size: normalizedSize
  }), isBlock && styles.block, className), [className, cx, isBlock, isDeselectable, normalizedSize]);
  const MainControl = isDeselectable ? ToggleGroupControlAsButtonGroup : ToggleGroupControlAsRadioGroup;
  return /*#__PURE__*/_jsxs(BaseControl, {
    help: help,
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    __associatedWPComponentName: "ToggleGroupControl",
    children: [!hideLabelFromVision && /*#__PURE__*/_jsx(VisualLabelWrapper, {
      children: /*#__PURE__*/_jsx(BaseControl.VisualLabel, {
        children: label
      })
    }), /*#__PURE__*/_jsx(MainControl, {
      ...otherProps,
      className: classes,
      isAdaptiveWidth: isAdaptiveWidth,
      label: label,
      onChange: onChange,
      ref: forwardedRef,
      size: normalizedSize,
      value: value,
      children: /*#__PURE__*/_jsx(LayoutGroup, {
        id: baseId,
        children: children
      })
    })]
  });
}

/**
 * `ToggleGroupControl` is a form component that lets users choose options
 * represented in horizontal segments. To render options for this control use
 * `ToggleGroupControlOption` component.
 *
 * This component is intended for selecting a single persistent value from a set of options,
 * similar to a how a radio button group would work. If you simply want a toggle to switch between views,
 * use a `TabPanel` instead.
 *
 * Only use this control when you know for sure the labels of items inside won't
 * wrap. For items with longer labels, you can consider a `SelectControl` or a
 * `CustomSelectControl` component instead.
 *
 * ```jsx
 * import {
 *   __experimentalToggleGroupControl as ToggleGroupControl,
 *   __experimentalToggleGroupControlOption as ToggleGroupControlOption,
 * } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <ToggleGroupControl
 *       label="my label"
 *       value="vertical"
 *       isBlock
 *       __nextHasNoMarginBottom
 *     >
 *       <ToggleGroupControlOption value="horizontal" label="Horizontal" />
 *       <ToggleGroupControlOption value="vertical" label="Vertical" />
 *     </ToggleGroupControl>
 *   );
 * }
 * ```
 */
export const ToggleGroupControl = contextConnect(UnconnectedToggleGroupControl, 'ToggleGroupControl');
export default ToggleGroupControl;
//# sourceMappingURL=component.js.map