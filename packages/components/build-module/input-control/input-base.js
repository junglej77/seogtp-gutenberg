/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Backdrop from './backdrop';
import Label from './label';
import { Container, Root, Prefix, Suffix } from './styles/input-control-styles';
import { ContextSystemProvider, contextConnect, useContextSystem } from '../context';
import { useDeprecated36pxDefaultSizeProp } from '../utils/use-deprecated-props';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function useUniqueId(idProp) {
  const instanceId = useInstanceId(InputBase);
  const id = `input-base-control-${instanceId}`;
  return idProp || id;
}

// Adapter to map props for the new ui/flex component.
function getUIFlexProps(labelPosition) {
  const props = {};
  switch (labelPosition) {
    case 'top':
      props.direction = 'column';
      props.expanded = false;
      props.gap = 0;
      break;
    case 'bottom':
      props.direction = 'column-reverse';
      props.expanded = false;
      props.gap = 0;
      break;
    case 'edge':
      props.justify = 'space-between';
      break;
  }
  return props;
}
function InputBase(props, ref) {
  const {
    __next40pxDefaultSize,
    __unstableInputWidth,
    children,
    className,
    disabled = false,
    hideLabelFromVision = false,
    labelPosition,
    id: idProp,
    isBorderless = false,
    label,
    prefix,
    size = 'default',
    suffix,
    ...restProps
  } = useDeprecated36pxDefaultSizeProp(useContextSystem(props, 'InputBase'));
  const id = useUniqueId(idProp);
  const hideLabel = hideLabelFromVision || !label;
  const prefixSuffixContextValue = useMemo(() => {
    return {
      InputControlPrefixWrapper: {
        __next40pxDefaultSize,
        size
      },
      InputControlSuffixWrapper: {
        __next40pxDefaultSize,
        size
      }
    };
  }, [__next40pxDefaultSize, size]);
  return (
    /*#__PURE__*/
    // @ts-expect-error The `direction` prop from Flex (FlexDirection) conflicts with legacy SVGAttributes `direction` (string) that come from React intrinsic prop definitions.
    _jsxs(Root, {
      ...restProps,
      ...getUIFlexProps(labelPosition),
      className: className,
      gap: 2,
      ref: ref,
      children: [/*#__PURE__*/_jsx(Label, {
        className: "components-input-control__label",
        hideLabelFromVision: hideLabelFromVision,
        labelPosition: labelPosition,
        htmlFor: id,
        children: label
      }), /*#__PURE__*/_jsxs(Container, {
        __unstableInputWidth: __unstableInputWidth,
        className: "components-input-control__container",
        disabled: disabled,
        hideLabel: hideLabel,
        labelPosition: labelPosition,
        children: [/*#__PURE__*/_jsxs(ContextSystemProvider, {
          value: prefixSuffixContextValue,
          children: [prefix && /*#__PURE__*/_jsx(Prefix, {
            className: "components-input-control__prefix",
            children: prefix
          }), children, suffix && /*#__PURE__*/_jsx(Suffix, {
            className: "components-input-control__suffix",
            children: suffix
          })]
        }), /*#__PURE__*/_jsx(Backdrop, {
          disabled: disabled,
          isBorderless: isBorderless
        })]
      })]
    })
  );
}

/**
 * `InputBase` is an internal component used to style the standard borders for an input,
 * as well as handle the layout for prefix/suffix elements.
 */
export default contextConnect(InputBase, 'InputBase');
//# sourceMappingURL=input-base.js.map