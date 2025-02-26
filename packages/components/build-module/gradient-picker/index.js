/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CircularOptionPicker from '../circular-option-picker';
import CustomGradientPicker from '../custom-gradient-picker';
import { VStack } from '../v-stack';
import { ColorHeading } from '../color-palette/styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// The Multiple Origin Gradients have a `gradients` property (an array of
// gradient objects), while Single Origin ones have a `gradient` property.
const isMultipleOriginObject = obj => Array.isArray(obj.gradients) && !('gradient' in obj);
const isMultipleOriginArray = arr => {
  return arr.length > 0 && arr.every(gradientObj => isMultipleOriginObject(gradientObj));
};
function SingleOrigin({
  className,
  clearGradient,
  gradients,
  onChange,
  value,
  ...additionalProps
}) {
  const gradientOptions = useMemo(() => {
    return gradients.map(({
      gradient,
      name,
      slug
    }, index) => /*#__PURE__*/_jsx(CircularOptionPicker.Option, {
      value: gradient,
      isSelected: value === gradient,
      tooltipText: name ||
      // translators: %s: gradient code e.g: "linear-gradient(90deg, rgba(98,16,153,1) 0%, rgba(172,110,22,1) 100%);".
      sprintf(__('Gradient code: %s'), gradient),
      style: {
        color: 'rgba( 0,0,0,0 )',
        background: gradient
      },
      onClick: value === gradient ? clearGradient : () => onChange(gradient, index),
      "aria-label": name ?
      // translators: %s: The name of the gradient e.g: "Angular red to blue".
      sprintf(__('Gradient: %s'), name) :
      // translators: %s: gradient code e.g: "linear-gradient(90deg, rgba(98,16,153,1) 0%, rgba(172,110,22,1) 100%);".
      sprintf(__('Gradient code: %s'), gradient)
    }, slug));
  }, [gradients, value, onChange, clearGradient]);
  return /*#__PURE__*/_jsx(CircularOptionPicker.OptionGroup, {
    className: className,
    options: gradientOptions,
    ...additionalProps
  });
}
function MultipleOrigin({
  className,
  clearGradient,
  gradients,
  onChange,
  value,
  headingLevel
}) {
  const instanceId = useInstanceId(MultipleOrigin);
  return /*#__PURE__*/_jsx(VStack, {
    spacing: 3,
    className: className,
    children: gradients.map(({
      name,
      gradients: gradientSet
    }, index) => {
      const id = `color-palette-${instanceId}-${index}`;
      return /*#__PURE__*/_jsxs(VStack, {
        spacing: 2,
        children: [/*#__PURE__*/_jsx(ColorHeading, {
          level: headingLevel,
          id: id,
          children: name
        }), /*#__PURE__*/_jsx(SingleOrigin, {
          clearGradient: clearGradient,
          gradients: gradientSet,
          onChange: gradient => onChange(gradient, index),
          value: value,
          "aria-labelledby": id
        })]
      }, index);
    })
  });
}
function Component(props) {
  const {
    asButtons,
    loop,
    actions,
    headingLevel,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...additionalProps
  } = props;
  const options = isMultipleOriginArray(props.gradients) ? /*#__PURE__*/_jsx(MultipleOrigin, {
    headingLevel: headingLevel,
    ...additionalProps
  }) : /*#__PURE__*/_jsx(SingleOrigin, {
    ...additionalProps
  });
  let metaProps;
  if (asButtons) {
    metaProps = {
      asButtons: true
    };
  } else {
    const _metaProps = {
      asButtons: false,
      loop
    };
    if (ariaLabel) {
      metaProps = {
        ..._metaProps,
        'aria-label': ariaLabel
      };
    } else if (ariaLabelledby) {
      metaProps = {
        ..._metaProps,
        'aria-labelledby': ariaLabelledby
      };
    } else {
      metaProps = {
        ..._metaProps,
        'aria-label': __('Custom color picker.')
      };
    }
  }
  return /*#__PURE__*/_jsx(CircularOptionPicker, {
    ...metaProps,
    actions: actions,
    options: options
  });
}

/**
 *  GradientPicker is a React component that renders a color gradient picker to
 * define a multi step gradient. There's either a _linear_ or a _radial_ type
 * available.
 *
 * ```jsx
 *import { GradientPicker } from '@wordpress/components';
 *import { useState } from '@wordpress/element';
 *
 *const myGradientPicker = () => {
 *	const [ gradient, setGradient ] = useState( null );
 *
 *	return (
 *		<GradientPicker
 *			value={ gradient }
 *			onChange={ ( currentGradient ) => setGradient( currentGradient ) }
 *			gradients={ [
 *				{
 *					name: 'JShine',
 *					gradient:
 *						'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
 *					slug: 'jshine',
 *				},
 *				{
 *					name: 'Moonlit Asteroid',
 *					gradient:
 *						'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
 *					slug: 'moonlit-asteroid',
 *				},
 *				{
 *					name: 'Rastafarie',
 *					gradient:
 *						'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
 *					slug: 'rastafari',
 *				},
 *			] }
 *		/>
 *	);
 *};
 *```
 *
 */
export function GradientPicker({
  className,
  gradients = [],
  onChange,
  value,
  clearable = true,
  disableCustomGradients = false,
  __experimentalIsRenderedInSidebar,
  headingLevel = 2,
  ...additionalProps
}) {
  const clearGradient = useCallback(() => onChange(undefined), [onChange]);
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: gradients.length ? 4 : 0,
    children: [!disableCustomGradients && /*#__PURE__*/_jsx(CustomGradientPicker, {
      __experimentalIsRenderedInSidebar: __experimentalIsRenderedInSidebar,
      value: value,
      onChange: onChange
    }), (gradients.length > 0 || clearable) && /*#__PURE__*/_jsx(Component, {
      ...additionalProps,
      className: className,
      clearGradient: clearGradient,
      gradients: gradients,
      onChange: onChange,
      value: value,
      actions: clearable && !disableCustomGradients && /*#__PURE__*/_jsx(CircularOptionPicker.ButtonAction, {
        onClick: clearGradient,
        children: __('Clear')
      }),
      headingLevel: headingLevel
    })]
  });
}
export default GradientPicker;
//# sourceMappingURL=index.js.map