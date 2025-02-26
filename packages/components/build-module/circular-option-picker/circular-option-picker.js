/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { isRTL } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { CircularOptionPickerContext } from './circular-option-picker-context';
import { Composite } from '../composite';
import { Option } from './circular-option-picker-option';
import { OptionGroup } from './circular-option-picker-option-group';
import { ButtonAction, DropdownLinkAction } from './circular-option-picker-actions';

/**
 *`CircularOptionPicker` is a component that displays a set of options as circular buttons.
 *
 * ```jsx
 * import { CircularOptionPicker } from '../circular-option-picker';
 * import { useState } from '@wordpress/element';
 *
 * const Example = () => {
 * 	const [ currentColor, setCurrentColor ] = useState();
 * 	const colors = [
 * 		{ color: '#f00', name: 'Red' },
 * 		{ color: '#0f0', name: 'Green' },
 * 		{ color: '#00f', name: 'Blue' },
 * 	];
 * 	const colorOptions = (
 * 		<>
 * 			{ colors.map( ( { color, name }, index ) => {
 * 				return (
 * 					<CircularOptionPicker.Option
 * 						key={ `${ color }-${ index }` }
 * 						tooltipText={ name }
 * 						style={ { backgroundColor: color, color } }
 * 						isSelected={ index === currentColor }
 * 						onClick={ () => setCurrentColor( index ) }
 * 						aria-label={ name }
 * 					/>
 * 				);
 * 			} ) }
 * 		</>
 * 	);
 * 	return (
 * 		<CircularOptionPicker
 * 				options={ colorOptions }
 * 				actions={
 * 					<CircularOptionPicker.ButtonAction
 * 						onClick={ () => setCurrentColor( undefined ) }
 * 					>
 * 						{ 'Clear' }
 * 					</CircularOptionPicker.ButtonAction>
 * 				}
 * 			/>
 * 	);
 * };
 * ```
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ListboxCircularOptionPicker(props) {
  const {
    actions,
    options,
    baseId,
    className,
    loop = true,
    children,
    ...additionalProps
  } = props;
  const [activeId, setActiveId] = useState(undefined);
  const contextValue = useMemo(() => ({
    baseId,
    activeId,
    setActiveId
  }), [baseId, activeId, setActiveId]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsxs(CircularOptionPickerContext.Provider, {
      value: contextValue,
      children: [/*#__PURE__*/_jsx(Composite, {
        ...additionalProps,
        id: baseId,
        focusLoop: loop,
        rtl: isRTL(),
        role: "listbox",
        activeId: activeId,
        setActiveId: setActiveId,
        children: options
      }), children, actions]
    })
  });
}
function ButtonsCircularOptionPicker(props) {
  const {
    actions,
    options,
    children,
    baseId,
    ...additionalProps
  } = props;
  const contextValue = useMemo(() => ({
    baseId
  }), [baseId]);
  return /*#__PURE__*/_jsx("div", {
    ...additionalProps,
    id: baseId,
    children: /*#__PURE__*/_jsxs(CircularOptionPickerContext.Provider, {
      value: contextValue,
      children: [options, children, actions]
    })
  });
}
function CircularOptionPicker(props) {
  const {
    asButtons,
    actions: actionsProp,
    options: optionsProp,
    children,
    className,
    ...additionalProps
  } = props;
  const baseId = useInstanceId(CircularOptionPicker, 'components-circular-option-picker', additionalProps.id);
  const OptionPickerImplementation = asButtons ? ButtonsCircularOptionPicker : ListboxCircularOptionPicker;
  const actions = actionsProp ? /*#__PURE__*/_jsx("div", {
    className: "components-circular-option-picker__custom-clear-wrapper",
    children: actionsProp
  }) : undefined;
  const options = /*#__PURE__*/_jsx("div", {
    className: "components-circular-option-picker__swatches",
    children: optionsProp
  });
  return /*#__PURE__*/_jsx(OptionPickerImplementation, {
    ...additionalProps,
    baseId: baseId,
    className: clsx('components-circular-option-picker', className),
    actions: actions,
    options: options,
    children: children
  });
}
CircularOptionPicker.Option = Option;
CircularOptionPicker.OptionGroup = OptionGroup;
CircularOptionPicker.ButtonAction = ButtonAction;
CircularOptionPicker.DropdownLinkAction = DropdownLinkAction;
export default CircularOptionPicker;
//# sourceMappingURL=circular-option-picker.js.map