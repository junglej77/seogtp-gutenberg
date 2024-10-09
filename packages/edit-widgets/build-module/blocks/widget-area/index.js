/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  name: "core/widget-area",
  title: "Widget Area",
  category: "widgets",
  attributes: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    }
  },
  supports: {
    html: false,
    inserter: false,
    customClassName: false,
    reusable: false,
    __experimentalToolbar: false,
    __experimentalParentSelector: false,
    __experimentalDisableBlockOverlay: true
  },
  editorStyle: "wp-block-widget-area-editor",
  style: "wp-block-widget-area"
};
import edit from './edit';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  title: __('Widget Area'),
  description: __('A widget area container.'),
  __experimentalLabel: ({
    name: label
  }) => label,
  edit
};
//# sourceMappingURL=index.js.map