/**
 * 引入依赖WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { button as icon } from '@wordpress/icons';

/**
 * 引入内部依赖Internal dependencies
 */
import initBlock from '../utils/init-block'; // 引入了一个内部的初始化方法 initBlock，用来初始化块的注册逻辑，通常包含一些通用的块注册操作。
import deprecated from './deprecated';
import edit from './edit';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/button",
  title: "Button",
  category: "design",
  parent: ["core/buttons"],
  description: "\u7528\u6309\u94AE\u6837\u5F0F\u7684\u94FE\u63A5\u63D0\u793A\u8BBF\u95EE\u8005\u91C7\u53D6\u884C\u52A8\u3002",
  keywords: ["link"],
  textdomain: "default",
  attributes: {
    tagName: {
      type: "string",
      "enum": ["a", "button"],
      "default": "a"
    },
    type: {
      type: "string",
      "default": "button"
    },
    textAlign: {
      type: "string"
    },
    url: {
      type: "string",
      source: "attribute",
      selector: "a",
      attribute: "href",
      __experimentalRole: "content"
    },
    title: {
      type: "string",
      source: "attribute",
      selector: "a,button",
      attribute: "title",
      __experimentalRole: "content"
    },
    text: {
      type: "rich-text",
      source: "rich-text",
      selector: "a,button",
      __experimentalRole: "content"
    },
    linkTarget: {
      type: "string",
      source: "attribute",
      selector: "a",
      attribute: "target",
      __experimentalRole: "content"
    },
    rel: {
      type: "string",
      source: "attribute",
      selector: "a",
      attribute: "rel",
      __experimentalRole: "content"
    },
    placeholder: {
      type: "string"
    },
    backgroundColor: {
      type: "string"
    },
    textColor: {
      type: "string"
    },
    gradient: {
      type: "string"
    },
    width: {
      type: "number"
    }
  },
  supports: {
    listview: false,
    anchor: true,
    splitting: true,
    align: false,
    alignWide: false,
    color: {
      __experimentalSkipSerialization: true,
      gradients: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      __experimentalFontFamily: true,
      __experimentalFontWeight: true,
      __experimentalFontStyle: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalLetterSpacing: true,
      __experimentalWritingMode: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    reusable: false,
    shadow: {
      __experimentalSkipSerialization: true
    },
    spacing: {
      __experimentalSkipSerialization: true,
      padding: ["horizontal", "vertical"],
      __experimentalDefaultControls: {
        padding: true
      }
    },
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true,
      __experimentalSkipSerialization: true,
      __experimentalDefaultControls: {
        color: true,
        radius: true,
        style: true,
        width: true
      }
    },
    __experimentalSelector: ".wp-block-button .wp-block-button__link",
    interactivity: {
      clientNavigation: true
    }
  },
  styles: [{
    name: "fill",
    label: "Fill",
    isDefault: true
  }, {
    name: "outline",
    label: "Outline"
  }],
  editorStyle: "wp-block-button-editor",
  style: "wp-block-button"
};
import save from './save';
const {
  name
} = metadata;
export { metadata, name }; // 将 metadata 和 name 进行导出，这样其他文件就可以引用这个模块的块名称和元数据。
/**
 * 定义块的设置
 */
export const settings = {
  icon,
  example: {
    attributes: {
      className: 'is-style-fill',
      text: __('Call to Action')
    }
  },
  edit,
  save,
  deprecated,
  merge: (a, {
    text = ''
  }) => ({
    ...a,
    text: (a.text || '') + text
  })
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map