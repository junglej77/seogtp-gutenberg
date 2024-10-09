/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { SelectControl, TextControl } from '@wordpress/components';
import { sprintf, __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TemplatePartImportControls } from './import-controls';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const htmlElementMessages = {
  header: __('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
  main: __('The <main> element should be used for the primary content of your document only.'),
  section: __("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
  article: __('The <article> element should represent a self-contained, syndicatable portion of the document.'),
  aside: __("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
  footer: __('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).')
};
export function TemplatePartAdvancedControls({
  tagName,
  setAttributes,
  isEntityAvailable,
  templatePartId,
  defaultWrapper,
  hasInnerBlocks
}) {
  const [area, setArea] = useEntityProp('postType', 'wp_template_part', 'area', templatePartId);
  const [title, setTitle] = useEntityProp('postType', 'wp_template_part', 'title', templatePartId);
  const definedAreas = useSelect(select => {
    // FIXME: @wordpress/block-library should not depend on @wordpress/editor.
    // Blocks can be loaded into a *non-post* block editor.
    /* eslint-disable-next-line @wordpress/data-no-store-string-literals */
    return select('core/editor').__experimentalGetDefaultTemplatePartAreas();
  }, []);
  const areaOptions = definedAreas.map(({
    label,
    area: _area
  }) => ({
    label,
    value: _area
  }));
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isEntityAvailable && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Title'),
        value: title,
        onChange: value => {
          setTitle(value);
        },
        onFocus: event => event.target.select()
      }), /*#__PURE__*/_jsx(SelectControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Area'),
        labelPosition: "top",
        options: areaOptions,
        value: area,
        onChange: setArea
      })]
    }), /*#__PURE__*/_jsx(SelectControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: __('HTML element'),
      options: [{
        label: sprintf( /* translators: %s: HTML tag based on area. */
        __('Default based on area (%s)'), `<${defaultWrapper}>`),
        value: ''
      }, {
        label: '<header>',
        value: 'header'
      }, {
        label: '<main>',
        value: 'main'
      }, {
        label: '<section>',
        value: 'section'
      }, {
        label: '<article>',
        value: 'article'
      }, {
        label: '<aside>',
        value: 'aside'
      }, {
        label: '<footer>',
        value: 'footer'
      }, {
        label: '<div>',
        value: 'div'
      }],
      value: tagName || '',
      onChange: value => setAttributes({
        tagName: value
      }),
      help: htmlElementMessages[tagName]
    }), !hasInnerBlocks && /*#__PURE__*/_jsx(TemplatePartImportControls, {
      area: area,
      setAttributes: setAttributes
    })]
  });
}
//# sourceMappingURL=advanced-controls.js.map