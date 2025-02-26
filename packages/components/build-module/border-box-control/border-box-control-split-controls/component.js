/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BorderBoxControlVisualizer from '../border-box-control-visualizer';
import { BorderControl } from '../../border-control';
import { Grid } from '../../grid';
import { contextConnect } from '../../context';
import { useBorderBoxControlSplitControls } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BorderBoxControlSplitControls = (props, forwardedRef) => {
  const {
    centeredClassName,
    colors,
    disableCustomColors,
    enableAlpha,
    enableStyle,
    onChange,
    popoverPlacement,
    popoverOffset,
    rightAlignedClassName,
    size = 'default',
    value,
    __experimentalIsRenderedInSidebar,
    ...otherProps
  } = useBorderBoxControlSplitControls(props);

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = useMemo(() => popoverPlacement ? {
    placement: popoverPlacement,
    offset: popoverOffset,
    anchor: popoverAnchor,
    shift: true
  } : undefined, [popoverPlacement, popoverOffset, popoverAnchor]);
  const sharedBorderControlProps = {
    colors,
    disableCustomColors,
    enableAlpha,
    enableStyle,
    isCompact: true,
    __experimentalIsRenderedInSidebar,
    size
  };
  const mergedRef = useMergeRefs([setPopoverAnchor, forwardedRef]);
  return /*#__PURE__*/_jsxs(Grid, {
    ...otherProps,
    ref: mergedRef,
    gap: 4,
    children: [/*#__PURE__*/_jsx(BorderBoxControlVisualizer, {
      value: value,
      size: size
    }), /*#__PURE__*/_jsx(BorderControl, {
      className: centeredClassName,
      hideLabelFromVision: true,
      label: __('Top border'),
      onChange: newBorder => onChange(newBorder, 'top'),
      __unstablePopoverProps: popoverProps,
      value: value?.top,
      ...sharedBorderControlProps
    }), /*#__PURE__*/_jsx(BorderControl, {
      hideLabelFromVision: true,
      label: __('Left border'),
      onChange: newBorder => onChange(newBorder, 'left'),
      __unstablePopoverProps: popoverProps,
      value: value?.left,
      ...sharedBorderControlProps
    }), /*#__PURE__*/_jsx(BorderControl, {
      className: rightAlignedClassName,
      hideLabelFromVision: true,
      label: __('Right border'),
      onChange: newBorder => onChange(newBorder, 'right'),
      __unstablePopoverProps: popoverProps,
      value: value?.right,
      ...sharedBorderControlProps
    }), /*#__PURE__*/_jsx(BorderControl, {
      className: centeredClassName,
      hideLabelFromVision: true,
      label: __('Bottom border'),
      onChange: newBorder => onChange(newBorder, 'bottom'),
      __unstablePopoverProps: popoverProps,
      value: value?.bottom,
      ...sharedBorderControlProps
    })]
  });
};
const ConnectedBorderBoxControlSplitControls = contextConnect(BorderBoxControlSplitControls, 'BorderBoxControlSplitControls');
export default ConnectedBorderBoxControlSplitControls;
//# sourceMappingURL=component.js.map