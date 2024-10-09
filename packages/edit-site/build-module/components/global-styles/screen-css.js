/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import ScreenHeader from './header';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useGlobalStyle,
  AdvancedPanel: StylesAdvancedPanel
} = unlock(blockEditorPrivateApis);
function ScreenCSS() {
  const description = __('Add your own CSS to customize the appearance and layout of your site.');
  const [style] = useGlobalStyle('', undefined, 'user', {
    shouldDecodeEncode: false
  });
  const [inheritedStyle, setStyle] = useGlobalStyle('', undefined, 'all', {
    shouldDecodeEncode: false
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('CSS'),
      description: /*#__PURE__*/_jsxs(_Fragment, {
        children: [description, /*#__PURE__*/_jsx(ExternalLink, {
          href: __('https://developer.wordpress.org/advanced-administration/wordpress/css/'),
          className: "edit-site-global-styles-screen-css-help-link",
          children: __('Learn more about CSS')
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-site-global-styles-screen-css",
      children: /*#__PURE__*/_jsx(StylesAdvancedPanel, {
        value: style,
        onChange: setStyle,
        inheritedValue: inheritedStyle
      })
    })]
  });
}
export default ScreenCSS;
//# sourceMappingURL=screen-css.js.map