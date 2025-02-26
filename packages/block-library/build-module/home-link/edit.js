/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const preventDefault = event => event.preventDefault();
export default function HomeEdit({
  attributes,
  setAttributes,
  context
}) {
  const homeUrl = useSelect(select => {
    // Site index.
    return select(coreStore).getEntityRecord('root', '__unstableBase')?.home;
  }, []);
  const {
    __unstableMarkNextChangeAsNotPersistent
  } = useDispatch(blockEditorStore);
  const {
    textColor,
    backgroundColor,
    style
  } = context;
  const blockProps = useBlockProps({
    className: clsx('wp-block-navigation-item', {
      'has-text-color': !!textColor || !!style?.color?.text,
      [`has-${textColor}-color`]: !!textColor,
      'has-background': !!backgroundColor || !!style?.color?.background,
      [`has-${backgroundColor}-background-color`]: !!backgroundColor
    }),
    style: {
      color: style?.color?.text,
      backgroundColor: style?.color?.background
    }
  });
  const {
    label
  } = attributes;
  useEffect(() => {
    if (label === undefined) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({
        label: __('Home')
      });
    }
  }, [label]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx("a", {
        className: "wp-block-home-link__content wp-block-navigation-item__content",
        href: homeUrl,
        onClick: preventDefault,
        children: /*#__PURE__*/_jsx(RichText, {
          identifier: "label",
          className: "wp-block-home-link__label",
          value: label,
          onChange: labelValue => {
            setAttributes({
              label: labelValue
            });
          },
          "aria-label": __('Home link text'),
          placeholder: __('Add home link'),
          withoutInteractiveFormatting: true,
          allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/strikethrough']
        })
      })
    })
  });
}
//# sourceMappingURL=edit.js.map