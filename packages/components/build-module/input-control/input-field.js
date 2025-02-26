/**
 * External dependencies
 */
import { useDrag } from '@use-gesture/react';
/**
 * WordPress dependencies
 */
import { forwardRef, useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { useDragCursor } from './utils';
import { Input } from './styles/input-control-styles';
import { useInputControlStateReducer } from './reducer/reducer';
import { withIgnoreIMEEvents } from '../utils/with-ignore-ime-events';
import { jsx as _jsx } from "react/jsx-runtime";
const noop = () => {};
function InputField({
  disabled = false,
  dragDirection = 'n',
  dragThreshold = 10,
  id,
  isDragEnabled = false,
  isPressEnterToChange = false,
  onBlur = noop,
  onChange = noop,
  onDrag = noop,
  onDragEnd = noop,
  onDragStart = noop,
  onKeyDown = noop,
  onValidate = noop,
  size = 'default',
  stateReducer = state => state,
  value: valueProp,
  type,
  ...props
}, ref) {
  const {
    // State.
    state,
    // Actions.
    change,
    commit,
    drag,
    dragEnd,
    dragStart,
    invalidate,
    pressDown,
    pressEnter,
    pressUp,
    reset
  } = useInputControlStateReducer(stateReducer, {
    isDragEnabled,
    value: valueProp,
    isPressEnterToChange
  }, onChange);
  const {
    value,
    isDragging,
    isDirty
  } = state;
  const wasDirtyOnBlur = useRef(false);
  const dragCursor = useDragCursor(isDragging, dragDirection);
  const handleOnBlur = event => {
    onBlur(event);

    /**
     * If isPressEnterToChange is set, this commits the value to
     * the onChange callback.
     */
    if (isDirty || !event.target.validity.valid) {
      wasDirtyOnBlur.current = true;
      handleOnCommit(event);
    }
  };
  const handleOnChange = event => {
    const nextValue = event.target.value;
    change(nextValue, event);
  };
  const handleOnCommit = event => {
    const nextValue = event.currentTarget.value;
    try {
      onValidate(nextValue);
      commit(nextValue, event);
    } catch (err) {
      invalidate(err, event);
    }
  };
  const handleOnKeyDown = event => {
    const {
      key
    } = event;
    onKeyDown(event);
    switch (key) {
      case 'ArrowUp':
        pressUp(event);
        break;
      case 'ArrowDown':
        pressDown(event);
        break;
      case 'Enter':
        pressEnter(event);
        if (isPressEnterToChange) {
          event.preventDefault();
          handleOnCommit(event);
        }
        break;
      case 'Escape':
        if (isPressEnterToChange && isDirty) {
          event.preventDefault();
          reset(valueProp, event);
        }
        break;
    }
  };
  const dragGestureProps = useDrag(dragProps => {
    const {
      distance,
      dragging,
      event,
      target
    } = dragProps;

    // The `target` prop always references the `input` element while, by
    // default, the `dragProps.event.target` property would reference the real
    // event target (i.e. any DOM element that the pointer is hovering while
    // dragging). Ensuring that the `target` is always the `input` element
    // allows consumers of `InputControl` (or any higher-level control) to
    // check the input's validity by accessing `event.target.validity.valid`.
    dragProps.event = {
      ...dragProps.event,
      target
    };
    if (!distance) {
      return;
    }
    event.stopPropagation();

    /**
     * Quick return if no longer dragging.
     * This prevents unnecessary value calculations.
     */
    if (!dragging) {
      onDragEnd(dragProps);
      dragEnd(dragProps);
      return;
    }
    onDrag(dragProps);
    drag(dragProps);
    if (!isDragging) {
      onDragStart(dragProps);
      dragStart(dragProps);
    }
  }, {
    axis: dragDirection === 'e' || dragDirection === 'w' ? 'x' : 'y',
    threshold: dragThreshold,
    enabled: isDragEnabled,
    pointer: {
      capture: false
    }
  });
  const dragProps = isDragEnabled ? dragGestureProps() : {};
  /*
   * Works around the odd UA (e.g. Firefox) that does not focus inputs of
   * type=number when their spinner arrows are pressed.
   */
  let handleOnMouseDown;
  if (type === 'number') {
    handleOnMouseDown = event => {
      props.onMouseDown?.(event);
      if (event.currentTarget !== event.currentTarget.ownerDocument.activeElement) {
        event.currentTarget.focus();
      }
    };
  }
  return /*#__PURE__*/_jsx(Input, {
    ...props,
    ...dragProps,
    className: "components-input-control__input",
    disabled: disabled,
    dragCursor: dragCursor,
    isDragging: isDragging,
    id: id,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onKeyDown: withIgnoreIMEEvents(handleOnKeyDown),
    onMouseDown: handleOnMouseDown,
    ref: ref,
    inputSize: size
    // Fallback to `''` to avoid "uncontrolled to controlled" warning.
    // See https://github.com/WordPress/gutenberg/pull/47250 for details.
    ,
    value: value !== null && value !== void 0 ? value : '',
    type: type
  });
}
const ForwardedComponent = forwardRef(InputField);
export default ForwardedComponent;
//# sourceMappingURL=input-field.js.map