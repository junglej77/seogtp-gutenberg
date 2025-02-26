/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import WelcomeGuideImage from './image';
import { store as editPostStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuideTemplate() {
  const {
    toggleFeature
  } = useDispatch(editPostStore);
  return /*#__PURE__*/_jsx(Guide, {
    className: "edit-template-welcome-guide",
    contentLabel: __('Welcome to the template editor'),
    finishButtonText: __('Get started'),
    onFinish: () => toggleFeature('welcomeGuideTemplate'),
    pages: [{
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-template-editor.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-template-editor.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-post-welcome-guide__heading",
          children: __('Welcome to the template editor')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-post-welcome-guide__text",
          children: __('Templates help define the layout of the site. You can customize all aspects of your posts and pages using blocks and patterns in this editor.')
        })]
      })
    }]
  });
}
//# sourceMappingURL=template.js.map