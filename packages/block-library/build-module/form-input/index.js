/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import deprecated from './deprecated';
import edit from './edit';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  __experimental: true,
  name: "core/form-input",
  title: "Input Field",
  category: "common",
  ancestor: ["core/form"],
  description: "The basic building block for forms.",
  keywords: ["input", "form"],
  textdomain: "default",
  icon: "forms",
  attributes: {
    type: {
      type: "string",
      "default": "text"
    },
    name: {
      type: "string"
    },
    label: {
      type: "rich-text",
      "default": "Label",
      selector: ".wp-block-form-input__label-content",
      source: "rich-text",
      __experimentalRole: "content"
    },
    inlineLabel: {
      type: "boolean",
      "default": false
    },
    required: {
      type: "boolean",
      "default": false,
      selector: ".wp-block-form-input__input",
      source: "attribute",
      attribute: "required"
    },
    placeholder: {
      type: "string",
      selector: ".wp-block-form-input__input",
      source: "attribute",
      attribute: "placeholder",
      __experimentalRole: "content"
    },
    value: {
      type: "string",
      "default": "",
      selector: "input",
      source: "attribute",
      attribute: "value"
    },
    visibilityPermissions: {
      type: "string",
      "default": "all"
    }
  },
  supports: {
    anchor: true,
    reusable: false,
    spacing: {
      margin: ["top", "bottom"]
    },
    __experimentalBorder: {
      radius: true,
      __experimentalSkipSerialization: true,
      __experimentalDefaultControls: {
        radius: true
      }
    }
  },
  style: ["wp-block-form-input"]
};
import save from './save';
import variations from './variations';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  deprecated,
  edit,
  save,
  variations
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map