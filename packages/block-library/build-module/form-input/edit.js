/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText, useBlockProps, __experimentalUseBorderProps as useBorderProps, __experimentalUseColorProps as useColorProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, CheckboxControl } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function InputFieldBlock({
  attributes,
  setAttributes,
  className
}) {
  const {
    type,
    name,
    label,
    inlineLabel,
    required,
    placeholder,
    value
  } = attributes;
  const blockProps = useBlockProps();
  const ref = useRef();
  const TagName = type === 'textarea' ? 'textarea' : 'input';
  const borderProps = useBorderProps(attributes);
  const colorProps = useColorProps(attributes);
  if (ref.current) {
    ref.current.focus();
  }
  const controls = /*#__PURE__*/_jsxs(_Fragment, {
    children: ['hidden' !== type && /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: ['checkbox' !== type && /*#__PURE__*/_jsx(CheckboxControl, {
          __nextHasNoMarginBottom: true,
          label: __('Inline label'),
          checked: inlineLabel,
          onChange: newVal => {
            setAttributes({
              inlineLabel: newVal
            });
          }
        }), /*#__PURE__*/_jsx(CheckboxControl, {
          __nextHasNoMarginBottom: true,
          label: __('Required'),
          checked: required,
          onChange: newVal => {
            setAttributes({
              required: newVal
            });
          }
        })]
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      group: "advanced",
      children: /*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        autoComplete: "off",
        label: __('Name'),
        value: name,
        onChange: newVal => {
          setAttributes({
            name: newVal
          });
        },
        help: __('Affects the "name" atribute of the input element, and is used as a name for the form submission results.')
      })
    })]
  });
  if ('hidden' === type) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [controls, /*#__PURE__*/_jsx("input", {
        type: "hidden",
        className: clsx(className, 'wp-block-form-input__input', colorProps.className, borderProps.className),
        "aria-label": __('Value'),
        value: value,
        onChange: event => setAttributes({
          value: event.target.value
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    ...blockProps,
    children: [controls, /*#__PURE__*/_jsxs("span", {
      className: clsx('wp-block-form-input__label', {
        'is-label-inline': inlineLabel || 'checkbox' === type
      }),
      children: [/*#__PURE__*/_jsx(RichText, {
        tagName: "span",
        className: "wp-block-form-input__label-content",
        value: label,
        onChange: newLabel => setAttributes({
          label: newLabel
        }),
        "aria-label": label ? __('Label') : __('Empty label'),
        "data-empty": label ? false : true,
        placeholder: __('Type the label for this input')
      }), /*#__PURE__*/_jsx(TagName, {
        type: 'textarea' === type ? undefined : type,
        className: clsx(className, 'wp-block-form-input__input', colorProps.className, borderProps.className),
        "aria-label": __('Optional placeholder text')
        // We hide the placeholder field's placeholder when there is a value. This
        // stops screen readers from reading the placeholder field's placeholder
        // which is confusing.
        ,
        placeholder: placeholder ? undefined : __('Optional placeholder…'),
        value: placeholder,
        onChange: event => setAttributes({
          placeholder: event.target.value
        }),
        "aria-required": required,
        style: {
          ...borderProps.style,
          ...colorProps.style
        }
      })]
    })]
  });
}
export default InputFieldBlock;
//# sourceMappingURL=edit.js.map