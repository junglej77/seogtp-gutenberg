/**
 * External dependencies
 */
import clsx from 'clsx';
import { colord } from 'colord';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useRef, useState, useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Button from '../../button';
import { HStack } from '../../h-stack';
import { ColorPicker } from '../../color-picker';
import { VisuallyHidden } from '../../visually-hidden';
import { CustomColorPickerDropdown } from '../../color-palette';
import { addControlPoint, clampPercent, removeControlPoint, updateControlPointColor, updateControlPointColorByPosition, updateControlPointPosition, getHorizontalRelativeGradientPosition } from './utils';
import { MINIMUM_SIGNIFICANT_MOVE, KEYBOARD_CONTROL_POINT_VARIATION } from './constants';
import DropdownContentWrapper from '../../dropdown/dropdown-content-wrapper';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ControlPointButton({
  isOpen,
  position,
  color,
  ...additionalProps
}) {
  const instanceId = useInstanceId(ControlPointButton);
  const descriptionId = `components-custom-gradient-picker__control-point-button-description-${instanceId}`;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      "aria-label": sprintf(
      // translators: %1$s: gradient position e.g: 70, %2$s: gradient color code e.g: rgb(52,121,151).
      __('Gradient control point at position %1$s%% with color code %2$s.'), position, color),
      "aria-describedby": descriptionId,
      "aria-haspopup": "true",
      "aria-expanded": isOpen,
      className: clsx('components-custom-gradient-picker__control-point-button', {
        'is-active': isOpen
      }),
      ...additionalProps
    }), /*#__PURE__*/_jsx(VisuallyHidden, {
      id: descriptionId,
      children: __('Use your left or right arrow keys or drag and drop with the mouse to change the gradient position. Press the button to change the color or remove the control point.')
    })]
  });
}
function GradientColorPickerDropdown({
  isRenderedInSidebar,
  className,
  ...props
}) {
  // Open the popover below the gradient control/insertion point
  const popoverProps = useMemo(() => ({
    placement: 'bottom',
    offset: 8,
    // Disabling resize as it would otherwise cause the popover to show
    // scrollbars while dragging the color picker's handle close to the
    // popover edge.
    resize: false
  }), []);
  const mergedClassName = clsx('components-custom-gradient-picker__control-point-dropdown', className);
  return /*#__PURE__*/_jsx(CustomColorPickerDropdown, {
    isRenderedInSidebar: isRenderedInSidebar,
    popoverProps: popoverProps,
    className: mergedClassName,
    ...props
  });
}
function ControlPoints({
  disableRemove,
  disableAlpha,
  gradientPickerDomRef,
  ignoreMarkerPosition,
  value: controlPoints,
  onChange,
  onStartControlPointChange,
  onStopControlPointChange,
  __experimentalIsRenderedInSidebar
}) {
  const controlPointMoveStateRef = useRef();
  const onMouseMove = event => {
    if (controlPointMoveStateRef.current === undefined || gradientPickerDomRef.current === null) {
      return;
    }
    const relativePosition = getHorizontalRelativeGradientPosition(event.clientX, gradientPickerDomRef.current);
    const {
      initialPosition,
      index,
      significantMoveHappened
    } = controlPointMoveStateRef.current;
    if (!significantMoveHappened && Math.abs(initialPosition - relativePosition) >= MINIMUM_SIGNIFICANT_MOVE) {
      controlPointMoveStateRef.current.significantMoveHappened = true;
    }
    onChange(updateControlPointPosition(controlPoints, index, relativePosition));
  };
  const cleanEventListeners = () => {
    if (window && window.removeEventListener && controlPointMoveStateRef.current && controlPointMoveStateRef.current.listenersActivated) {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', cleanEventListeners);
      onStopControlPointChange();
      controlPointMoveStateRef.current.listenersActivated = false;
    }
  };

  // Adding `cleanEventListeners` to the dependency array below requires the function itself to be wrapped in a `useCallback`
  // This memoization would prevent the event listeners from being properly cleaned.
  // Instead, we'll pass a ref to the function in our `useEffect` so `cleanEventListeners` itself is no longer a dependency.
  const cleanEventListenersRef = useRef();
  cleanEventListenersRef.current = cleanEventListeners;
  useEffect(() => {
    return () => {
      cleanEventListenersRef.current?.();
    };
  }, []);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: controlPoints.map((point, index) => {
      const initialPosition = point?.position;
      return ignoreMarkerPosition !== initialPosition && /*#__PURE__*/_jsx(GradientColorPickerDropdown, {
        isRenderedInSidebar: __experimentalIsRenderedInSidebar,
        onClose: onStopControlPointChange,
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/_jsx(ControlPointButton, {
          onClick: () => {
            if (controlPointMoveStateRef.current && controlPointMoveStateRef.current.significantMoveHappened) {
              return;
            }
            if (isOpen) {
              onStopControlPointChange();
            } else {
              onStartControlPointChange();
            }
            onToggle();
          },
          onMouseDown: () => {
            if (window && window.addEventListener) {
              controlPointMoveStateRef.current = {
                initialPosition,
                index,
                significantMoveHappened: false,
                listenersActivated: true
              };
              onStartControlPointChange();
              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', cleanEventListeners);
            }
          },
          onKeyDown: event => {
            if (event.code === 'ArrowLeft') {
              // Stop propagation of the key press event to avoid focus moving
              // to another editor area.
              event.stopPropagation();
              onChange(updateControlPointPosition(controlPoints, index, clampPercent(point.position - KEYBOARD_CONTROL_POINT_VARIATION)));
            } else if (event.code === 'ArrowRight') {
              // Stop propagation of the key press event to avoid focus moving
              // to another editor area.
              event.stopPropagation();
              onChange(updateControlPointPosition(controlPoints, index, clampPercent(point.position + KEYBOARD_CONTROL_POINT_VARIATION)));
            }
          },
          isOpen: isOpen,
          position: point.position,
          color: point.color
        }, index),
        renderContent: ({
          onClose
        }) => /*#__PURE__*/_jsxs(DropdownContentWrapper, {
          paddingSize: "none",
          children: [/*#__PURE__*/_jsx(ColorPicker, {
            enableAlpha: !disableAlpha,
            color: point.color,
            onChange: color => {
              onChange(updateControlPointColor(controlPoints, index, colord(color).toRgbString()));
            }
          }), !disableRemove && controlPoints.length > 2 && /*#__PURE__*/_jsx(HStack, {
            className: "components-custom-gradient-picker__remove-control-point-wrapper",
            alignment: "center",
            children: /*#__PURE__*/_jsx(Button, {
              onClick: () => {
                onChange(removeControlPoint(controlPoints, index));
                onClose();
              },
              variant: "link",
              children: __('Remove Control Point')
            })
          })]
        }),
        style: {
          left: `${point.position}%`,
          transform: 'translateX( -50% )'
        }
      }, index);
    })
  });
}
function InsertPoint({
  value: controlPoints,
  onChange,
  onOpenInserter,
  onCloseInserter,
  insertPosition,
  disableAlpha,
  __experimentalIsRenderedInSidebar
}) {
  const [alreadyInsertedPoint, setAlreadyInsertedPoint] = useState(false);
  return /*#__PURE__*/_jsx(GradientColorPickerDropdown, {
    isRenderedInSidebar: __experimentalIsRenderedInSidebar,
    className: "components-custom-gradient-picker__inserter",
    onClose: () => {
      onCloseInserter();
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(Button, {
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      onClick: () => {
        if (isOpen) {
          onCloseInserter();
        } else {
          setAlreadyInsertedPoint(false);
          onOpenInserter();
        }
        onToggle();
      },
      className: "components-custom-gradient-picker__insert-point-dropdown",
      icon: plus
    }),
    renderContent: () => /*#__PURE__*/_jsx(DropdownContentWrapper, {
      paddingSize: "none",
      children: /*#__PURE__*/_jsx(ColorPicker, {
        enableAlpha: !disableAlpha,
        onChange: color => {
          if (!alreadyInsertedPoint) {
            onChange(addControlPoint(controlPoints, insertPosition, colord(color).toRgbString()));
            setAlreadyInsertedPoint(true);
          } else {
            onChange(updateControlPointColorByPosition(controlPoints, insertPosition, colord(color).toRgbString()));
          }
        }
      })
    }),
    style: insertPosition !== null ? {
      left: `${insertPosition}%`,
      transform: 'translateX( -50% )'
    } : undefined
  });
}
ControlPoints.InsertPoint = InsertPoint;
export default ControlPoints;
//# sourceMappingURL=control-points.js.map