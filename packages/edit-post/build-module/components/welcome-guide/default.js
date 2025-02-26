/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { ExternalLink, Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import WelcomeGuideImage from './image';
import { store as editPostStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuideDefault() {
  const {
    toggleFeature
  } = useDispatch(editPostStore);
  return /*#__PURE__*/_jsx(Guide, {
    className: "edit-post-welcome-guide",
    contentLabel: __('Welcome to the block editor'),
    finishButtonText: __('Get started'),
    onFinish: () => toggleFeature('welcomeGuide'),
    pages: [{
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-canvas.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-canvas.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-post-welcome-guide__heading",
          children: __('Welcome to the block editor')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-post-welcome-guide__text",
          children: __('In the WordPress editor, each paragraph, image, or video is presented as a distinct “block” of content.')
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-editor.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-editor.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-post-welcome-guide__heading",
          children: __('Make each block your own')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-post-welcome-guide__text",
          children: __('Each block comes with its own set of controls for changing things like color, width, and alignment. These will show and hide automatically when you have a block selected.')
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-library.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-library.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-post-welcome-guide__heading",
          children: __('Get to know the block library')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-post-welcome-guide__text",
          children: createInterpolateElement(__('All of the blocks available to you live in the block library. You’ll find it wherever you see the <InserterIconImage /> icon.'), {
            InserterIconImage: /*#__PURE__*/_jsx("img", {
              alt: __('inserter'),
              src: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' rx='2' fill='%231E1E1E'/%3E%3Cpath d='M9.22727 4V14M4 8.77273H14' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E%0A"
            })
          })
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-documentation.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-documentation.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-post-welcome-guide__heading",
          children: __('Learn how to use the block editor')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-post-welcome-guide__text",
          children: createInterpolateElement(__("New to the block editor? Want to learn more about using it? <a>Here's a detailed guide.</a>"), {
            a: /*#__PURE__*/_jsx(ExternalLink, {
              href: __('https://wordpress.org/documentation/article/wordpress-block-editor/')
            })
          })
        })]
      })
    }]
  });
}
//# sourceMappingURL=default.js.map