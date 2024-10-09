/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, ExternalLink } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as preferencesStore } from '@wordpress/preferences';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuide({
  sidebar
}) {
  const {
    toggle
  } = useDispatch(preferencesStore);
  const isEntirelyBlockWidgets = sidebar.getWidgets().every(widget => widget.id.startsWith('block-'));
  return /*#__PURE__*/_jsxs("div", {
    className: "customize-widgets-welcome-guide",
    children: [/*#__PURE__*/_jsx("div", {
      className: "customize-widgets-welcome-guide__image__wrapper",
      children: /*#__PURE__*/_jsxs("picture", {
        children: [/*#__PURE__*/_jsx("source", {
          srcSet: "https://s.w.org/images/block-editor/welcome-editor.svg",
          media: "(prefers-reduced-motion: reduce)"
        }), /*#__PURE__*/_jsx("img", {
          className: "customize-widgets-welcome-guide__image",
          src: "https://s.w.org/images/block-editor/welcome-editor.gif",
          width: "312",
          height: "240",
          alt: ""
        })]
      })
    }), /*#__PURE__*/_jsx("h1", {
      className: "customize-widgets-welcome-guide__heading",
      children: __('Welcome to block Widgets')
    }), /*#__PURE__*/_jsx("p", {
      className: "customize-widgets-welcome-guide__text",
      children: isEntirelyBlockWidgets ? __('Your theme provides different “block” areas for you to add and edit content. Try adding a search bar, social icons, or other types of blocks here and see how they’ll look on your site.') : __('You can now add any block to your site’s widget areas. Don’t worry, all of your favorite widgets still work flawlessly.')
    }), /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "customize-widgets-welcome-guide__button",
      variant: "primary",
      onClick: () => toggle('core/customize-widgets', 'welcomeGuide'),
      children: __('Got it')
    }), /*#__PURE__*/_jsx("hr", {
      className: "customize-widgets-welcome-guide__separator"
    }), !isEntirelyBlockWidgets && /*#__PURE__*/_jsxs("p", {
      className: "customize-widgets-welcome-guide__more-info",
      children: [__('Want to stick with the old widgets?'), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx(ExternalLink, {
        href: __('https://wordpress.org/plugins/classic-widgets/'),
        children: __('Get the Classic Widgets plugin.')
      })]
    }), /*#__PURE__*/_jsxs("p", {
      className: "customize-widgets-welcome-guide__more-info",
      children: [__('New to the block editor?'), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx(ExternalLink, {
        href: __('https://wordpress.org/documentation/article/wordpress-block-editor/'),
        children: __("Here's a detailed guide.")
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map