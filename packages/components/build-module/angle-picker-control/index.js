/**
 * External dependencies
 */

import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';
import { isRTL, __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Flex, FlexBlock } from '../flex';
import { Spacer } from '../spacer';
import NumberControl from '../number-control';
import AngleCircle from './angle-circle';
import { UnitText } from './styles/angle-picker-control-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedAnglePickerControl(props, ref) {
  const {
    className,
    label = __('Angle'),
    onChange,
    value,
    ...restProps
  } = props;
  const handleOnNumberChange = unprocessedValue => {
    if (onChange === undefined) {
      return;
    }
    const inputValue = unprocessedValue !== undefined && unprocessedValue !== '' ? parseInt(unprocessedValue, 10) : 0;
    onChange(inputValue);
  };
  const classes = clsx('components-angle-picker-control', className);
  const unitText = /*#__PURE__*/_jsx(UnitText, {
    children: "\xB0"
  });
  const [prefixedUnitText, suffixedUnitText] = isRTL() ? [unitText, null] : [null, unitText];
  return /*#__PURE__*/_jsxs(Flex, {
    ...restProps,
    ref: ref,
    className: classes,
    gap: 2,
    children: [/*#__PURE__*/_jsx(FlexBlock, {
      children: /*#__PURE__*/_jsx(NumberControl, {
        label: label,
        className: "components-angle-picker-control__input-field",
        max: 360,
        min: 0,
        onChange: handleOnNumberChange,
        size: "__unstable-large",
        step: "1",
        value: value,
        spinControls: "none",
        prefix: prefixedUnitText,
        suffix: suffixedUnitText
      })
    }), /*#__PURE__*/_jsx(Spacer, {
      marginBottom: "1",
      marginTop: "auto",
      children: /*#__PURE__*/_jsx(AngleCircle, {
        "aria-hidden": "true",
        value: value,
        onChange: onChange
      })
    })]
  });
}

/**
 * `AnglePickerControl` is a React component to render a UI that allows users to
 * pick an angle. Users can choose an angle in a visual UI with the mouse by
 * dragging an angle indicator inside a circle or by directly inserting the
 * desired angle in a text field.
 *
 * ```jsx
 * import { useState } from '@wordpress/element';
 * import { AnglePickerControl } from '@wordpress/components';
 *
 * function Example() {
 *   const [ angle, setAngle ] = useState( 0 );
 *   return (
 *     <AnglePickerControl
 *       value={ angle }
 *       onChange={ setAngle }
 *     </>
 *   );
 * }
 * ```
 */
export const AnglePickerControl = forwardRef(UnforwardedAnglePickerControl);
export default AnglePickerControl;
//# sourceMappingURL=index.js.map