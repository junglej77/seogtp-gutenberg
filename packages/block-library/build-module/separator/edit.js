/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { HorizontalRule } from '@wordpress/components';
import { useBlockProps, getColorClassName, __experimentalUseColorProps as useColorProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import useDeprecatedOpacity from './use-deprecated-opacity';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function SeparatorEdit({
  attributes,
  setAttributes
}) {
  const {
    backgroundColor,
    opacity,
    style
  } = attributes;
  const colorProps = useColorProps(attributes);
  const currentColor = colorProps?.style?.backgroundColor;
  const hasCustomColor = !!style?.color?.background;
  useDeprecatedOpacity(opacity, currentColor, setAttributes);

  // The dots styles uses text for the dots, to change those dots color is
  // using color, not backgroundColor.
  const colorClass = getColorClassName('color', backgroundColor);
  const className = clsx({
    'has-text-color': backgroundColor || currentColor,
    [colorClass]: colorClass,
    'has-css-opacity': opacity === 'css',
    'has-alpha-channel-opacity': opacity === 'alpha-channel'
  }, colorProps.className);
  const styles = {
    color: currentColor,
    backgroundColor: currentColor
  };
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(HorizontalRule, {
      ...useBlockProps({
        className,
        style: hasCustomColor ? styles : undefined
      })
    })
  });
}
//# sourceMappingURL=edit.js.map