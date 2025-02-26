/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';
import { StyledTextarea } from './styles/textarea-control-styles';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedTextareaControl(props, ref) {
  const {
    __nextHasNoMarginBottom,
    label,
    hideLabelFromVision,
    value,
    help,
    onChange,
    rows = 4,
    className,
    ...additionalProps
  } = props;
  const instanceId = useInstanceId(TextareaControl);
  const id = `inspector-textarea-control-${instanceId}`;
  const onChangeValue = event => onChange(event.target.value);
  return /*#__PURE__*/_jsx(BaseControl, {
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    __associatedWPComponentName: "TextareaControl",
    label: label,
    hideLabelFromVision: hideLabelFromVision,
    id: id,
    help: help,
    className: className,
    children: /*#__PURE__*/_jsx(StyledTextarea, {
      className: "components-textarea-control__input",
      id: id,
      rows: rows,
      onChange: onChangeValue,
      "aria-describedby": !!help ? id + '__help' : undefined,
      value: value,
      ref: ref,
      ...additionalProps
    })
  });
}

/**
 * TextareaControls are TextControls that allow for multiple lines of text, and
 * wrap overflow text onto a new line. They are a fixed height and scroll
 * vertically when the cursor reaches the bottom of the field.
 *
 * ```jsx
 * import { TextareaControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyTextareaControl = () => {
 *   const [ text, setText ] = useState( '' );
 *
 *   return (
 *     <TextareaControl
 *       __nextHasNoMarginBottom
 *       label="Text"
 *       help="Enter some text"
 *       value={ text }
 *       onChange={ ( value ) => setText( value ) }
 *     />
 *   );
 * };
 * ```
 */
export const TextareaControl = forwardRef(UnforwardedTextareaControl);
export default TextareaControl;
//# sourceMappingURL=index.js.map