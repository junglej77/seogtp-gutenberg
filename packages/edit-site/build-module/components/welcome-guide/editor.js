/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { store as preferencesStore } from '@wordpress/preferences';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import WelcomeGuideImage from './image';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuideEditor() {
  const {
    toggle
  } = useDispatch(preferencesStore);
  const {
    isActive,
    isBlockBasedTheme
  } = useSelect(select => {
    return {
      isActive: !!select(preferencesStore).get('core/edit-site', 'welcomeGuide'),
      isBlockBasedTheme: select(coreStore).getCurrentTheme()?.is_block_theme
    };
  }, []);
  if (!isActive || !isBlockBasedTheme) {
    return null;
  }
  return /*#__PURE__*/_jsx(Guide, {
    className: "edit-site-welcome-guide guide-editor",
    contentLabel: __('Welcome to the site editor'),
    finishButtonText: __('Get started'),
    onFinish: () => toggle('core/edit-site', 'welcomeGuide'),
    pages: [{
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/edit-your-site.svg?1",
        animatedSrc: "https://s.w.org/images/block-editor/edit-your-site.gif?1"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-site-welcome-guide__heading",
          children: __('Edit your site')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-site-welcome-guide__text",
          children: __('Design everything on your site — from the header right down to the footer — using blocks.')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-site-welcome-guide__text",
          children: createInterpolateElement(__('Click <StylesIconImage /> to start designing your blocks, and choose your typography, layout, and colors.'), {
            StylesIconImage: /*#__PURE__*/_jsx("img", {
              alt: __('styles'),
              src: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 4c-4.4 0-8 3.6-8 8v.1c0 4.1 3.2 7.5 7.2 7.9h.8c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 15V5c3.9 0 7 3.1 7 7s-3.1 7-7 7z' fill='%231E1E1E'/%3E%3C/svg%3E%0A"
            })
          })
        })]
      })
    }]
  });
}
//# sourceMappingURL=editor.js.map