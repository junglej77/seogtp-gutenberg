/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { VisuallyHidden } from '../visually-hidden';
import { Wrapper, StyledField, StyledLabel, StyledHelp, StyledVisualLabel } from './styles/base-control-styles';
import { contextConnectWithoutRef, useContextSystem } from '../context';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { useBaseControlProps } from './hooks';
const UnconnectedBaseControl = props => {
  const {
    __nextHasNoMarginBottom = false,
    __associatedWPComponentName = 'BaseControl',
    id,
    label,
    hideLabelFromVision = false,
    help,
    className,
    children
  } = useContextSystem(props, 'BaseControl');
  if (!__nextHasNoMarginBottom) {
    deprecated(`Bottom margin styles for wp.components.${__associatedWPComponentName}`, {
      since: '6.7',
      version: '7.0',
      hint: 'Set the `__nextHasNoMarginBottom` prop to true to start opting into the new styles, which will become the default in a future version.'
    });
  }
  return /*#__PURE__*/_jsxs(Wrapper, {
    className: className,
    children: [/*#__PURE__*/_jsxs(StyledField, {
      className: "components-base-control__field"
      // TODO: Official deprecation for this should start after all internal usages have been migrated
      ,
      __nextHasNoMarginBottom: __nextHasNoMarginBottom,
      children: [label && id && (hideLabelFromVision ? /*#__PURE__*/_jsx(VisuallyHidden, {
        as: "label",
        htmlFor: id,
        children: label
      }) : /*#__PURE__*/_jsx(StyledLabel, {
        className: "components-base-control__label",
        htmlFor: id,
        children: label
      })), label && !id && (hideLabelFromVision ? /*#__PURE__*/_jsx(VisuallyHidden, {
        as: "label",
        children: label
      }) : /*#__PURE__*/_jsx(VisualLabel, {
        children: label
      })), children]
    }), !!help && /*#__PURE__*/_jsx(StyledHelp, {
      id: id ? id + '__help' : undefined,
      className: "components-base-control__help",
      __nextHasNoMarginBottom: __nextHasNoMarginBottom,
      children: help
    })]
  });
};
const UnforwardedVisualLabel = (props, ref) => {
  const {
    className,
    children,
    ...restProps
  } = props;
  return /*#__PURE__*/_jsx(StyledVisualLabel, {
    ref: ref,
    ...restProps,
    className: clsx('components-base-control__label', className),
    children: children
  });
};
export const VisualLabel = forwardRef(UnforwardedVisualLabel);

/**
 * `BaseControl` is a component used to generate labels and help text for components handling user inputs.
 *
 * ```jsx
 * import { BaseControl, useBaseControlProps } from '@wordpress/components';
 *
 * // Render a `BaseControl` for a textarea input
 * const MyCustomTextareaControl = ({ children, ...baseProps }) => (
 * 	// `useBaseControlProps` is a convenience hook to get the props for the `BaseControl`
 * 	// and the inner control itself. Namely, it takes care of generating a unique `id`,
 * 	// properly associating it with the `label` and `help` elements.
 * 	const { baseControlProps, controlProps } = useBaseControlProps( baseProps );
 *
 * 	return (
 * 		<BaseControl { ...baseControlProps } __nextHasNoMarginBottom>
 * 			<textarea { ...controlProps }>
 * 			  { children }
 * 			</textarea>
 * 		</BaseControl>
 * 	);
 * );
 * ```
 */
export const BaseControl = Object.assign(contextConnectWithoutRef(UnconnectedBaseControl, 'BaseControl'), {
  /**
   * `BaseControl.VisualLabel` is used to render a purely visual label inside a `BaseControl` component.
   *
   * It should only be used in cases where the children being rendered inside `BaseControl` are already accessibly labeled,
   * e.g., a button, but we want an additional visual label for that section equivalent to the labels `BaseControl` would
   * otherwise use if the `label` prop was passed.
   *
   * ```jsx
   * import { BaseControl } from '@wordpress/components';
   *
   * const MyBaseControl = () => (
   * 	<BaseControl
   * 		__nextHasNoMarginBottom
   * 		help="This button is already accessibly labeled."
   * 	>
   * 		<BaseControl.VisualLabel>Author</BaseControl.VisualLabel>
   * 		<Button>Select an author</Button>
   * 	</BaseControl>
   * );
   * ```
   */
  VisualLabel
});
export default BaseControl;
//# sourceMappingURL=index.js.map