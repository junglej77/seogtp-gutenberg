/**
 * WordPress dependencies
 */
import { siteLogo as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/site-logo",
  title: "Site Logo",
  category: "theme",
  description: "Display an image to represent this site. Update this block and the changes apply everywhere.",
  textdomain: "default",
  attributes: {
    width: {
      type: "number"
    },
    isLink: {
      type: "boolean",
      "default": true
    },
    linkTarget: {
      type: "string",
      "default": "_self"
    },
    shouldSyncIcon: {
      type: "boolean"
    }
  },
  example: {
    viewportWidth: 500,
    attributes: {
      width: 350,
      className: "block-editor-block-types-list__site-logo-example"
    }
  },
  supports: {
    html: false,
    align: true,
    alignWide: false,
    color: {
      __experimentalDuotone: "img, .components-placeholder__illustration, .components-placeholder::before",
      text: false,
      background: false
    },
    spacing: {
      margin: true,
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    interactivity: {
      clientNavigation: true
    }
  },
  styles: [{
    name: "default",
    label: "Default",
    isDefault: true
  }, {
    name: "rounded",
    label: "Rounded"
  }],
  editorStyle: "wp-block-site-logo-editor",
  style: "wp-block-site-logo"
};
import edit from './edit';
import transforms from './transforms';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  example: {},
  edit,
  transforms
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map