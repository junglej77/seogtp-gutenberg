/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { ExternalLink, Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as preferencesStore } from '@wordpress/preferences';
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import WelcomeGuideImage from './image';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  interfaceStore
} = unlock(editorPrivateApis);
export default function WelcomeGuideStyles() {
  const {
    toggle
  } = useDispatch(preferencesStore);
  const {
    isActive,
    isStylesOpen
  } = useSelect(select => {
    const sidebar = select(interfaceStore).getActiveComplementaryArea('core');
    return {
      isActive: !!select(preferencesStore).get('core/edit-site', 'welcomeGuideStyles'),
      isStylesOpen: sidebar === 'edit-site/global-styles'
    };
  }, []);
  if (!isActive || !isStylesOpen) {
    return null;
  }
  const welcomeLabel = __('欢迎来到风格设置');
  return /*#__PURE__*/_jsx(Guide, {
    className: "edit-site-welcome-guide guide-styles",
    contentLabel: welcomeLabel,
    finishButtonText: __('Get started'),
    onFinish: () => toggle('core/edit-site', 'welcomeGuideStyles'),
    pages: [{
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-to-styles.svg?1",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-to-styles.gif?1"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-site-welcome-guide__heading",
          children: welcomeLabel
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-site-welcome-guide__text",
          children: __('调整你的网站，或者给它一个全新的外观!要有创意——为你的按钮换一个新的调色板，或者选择一种新的字体怎么样?看看你能在这里做些什么。')
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/set-the-design.svg?1",
        animatedSrc: "https://s.w.org/images/block-editor/set-the-design.gif?1"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-site-welcome-guide__heading",
          children: __('Set the design')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-site-welcome-guide__text",
          children: __('You can customize your site as much as you like with different colors, typography, and layouts. Or if you prefer, just leave it up to your theme to handle!')
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/personalize-blocks.svg?1",
        animatedSrc: "https://s.w.org/images/block-editor/personalize-blocks.gif?1"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-site-welcome-guide__heading",
          children: __('Personalize blocks')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-site-welcome-guide__text",
          children: __('You can adjust your blocks to ensure a cohesive experience across your site — add your unique colors to a branded Button block, or adjust the Heading block to your preferred size.')
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-documentation.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-documentation.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-site-welcome-guide__heading",
          children: __('Learn more')
        }), /*#__PURE__*/_jsxs("p", {
          className: "edit-site-welcome-guide__text",
          children: [__('New to block themes and styling your site?'), ' ', /*#__PURE__*/_jsx(ExternalLink, {
            href: __('https://wordpress.org/documentation/article/styles-overview/'),
            children: __('Here’s a detailed guide to learn how to make the most of it.')
          })]
        })]
      })
    }]
  });
}
//# sourceMappingURL=styles.js.map