/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { ExternalLink, Guide } from '@wordpress/components';
import { __, sprintf, _n } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuide() {
  var _widgetAreas$filter$l;
  const isActive = useSelect(select => !!select(preferencesStore).get('core/edit-widgets', 'welcomeGuide'), []);
  const {
    toggle
  } = useDispatch(preferencesStore);
  const widgetAreas = useSelect(select => select(editWidgetsStore).getWidgetAreas({
    per_page: -1
  }), []);
  if (!isActive) {
    return null;
  }
  const isEntirelyBlockWidgets = widgetAreas?.every(widgetArea => widgetArea.id === 'wp_inactive_widgets' || widgetArea.widgets.every(widgetId => widgetId.startsWith('block-')));
  const numWidgetAreas = (_widgetAreas$filter$l = widgetAreas?.filter(widgetArea => widgetArea.id !== 'wp_inactive_widgets').length) !== null && _widgetAreas$filter$l !== void 0 ? _widgetAreas$filter$l : 0;
  return /*#__PURE__*/_jsx(Guide, {
    className: "edit-widgets-welcome-guide",
    contentLabel: __('Welcome to block Widgets'),
    finishButtonText: __('Get started'),
    onFinish: () => toggle('core/edit-widgets', 'welcomeGuide'),
    pages: [{
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-canvas.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-canvas.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-widgets-welcome-guide__heading",
          children: __('Welcome to block Widgets')
        }), isEntirelyBlockWidgets ? /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsx("p", {
            className: "edit-widgets-welcome-guide__text",
            children: sprintf(
            // Translators: %s: Number of block areas in the current theme.
            _n('Your theme provides %s “block” area for you to add and edit content. Try adding a search bar, social icons, or other types of blocks here and see how they’ll look on your site.', 'Your theme provides %s different “block” areas for you to add and edit content. Try adding a search bar, social icons, or other types of blocks here and see how they’ll look on your site.', numWidgetAreas), numWidgetAreas)
          })
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            className: "edit-widgets-welcome-guide__text",
            children: __('You can now add any block to your site’s widget areas. Don’t worry, all of your favorite widgets still work flawlessly.')
          }), /*#__PURE__*/_jsxs("p", {
            className: "edit-widgets-welcome-guide__text",
            children: [/*#__PURE__*/_jsx("strong", {
              children: __('Want to stick with the old widgets?')
            }), ' ', /*#__PURE__*/_jsx(ExternalLink, {
              href: __('https://wordpress.org/plugins/classic-widgets/'),
              children: __('Get the Classic Widgets plugin.')
            })]
          })]
        })]
      })
    }, {
      image: /*#__PURE__*/_jsx(WelcomeGuideImage, {
        nonAnimatedSrc: "https://s.w.org/images/block-editor/welcome-editor.svg",
        animatedSrc: "https://s.w.org/images/block-editor/welcome-editor.gif"
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-widgets-welcome-guide__heading",
          children: __('Make each block your own')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-widgets-welcome-guide__text",
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
          className: "edit-widgets-welcome-guide__heading",
          children: __('Get to know the block library')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-widgets-welcome-guide__text",
          children: createInterpolateElement(__('All of the blocks available to you live in the block library. You’ll find it wherever you see the <InserterIconImage /> icon.'), {
            InserterIconImage: /*#__PURE__*/_jsx("img", {
              className: "edit-widgets-welcome-guide__inserter-icon",
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
          className: "edit-widgets-welcome-guide__heading",
          children: __('Learn how to use the block editor')
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-widgets-welcome-guide__text",
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
function WelcomeGuideImage({
  nonAnimatedSrc,
  animatedSrc
}) {
  return /*#__PURE__*/_jsxs("picture", {
    className: "edit-widgets-welcome-guide__image",
    children: [/*#__PURE__*/_jsx("source", {
      srcSet: nonAnimatedSrc,
      media: "(prefers-reduced-motion: reduce)"
    }), /*#__PURE__*/_jsx("img", {
      src: animatedSrc,
      width: "312",
      height: "240",
      alt: ""
    })]
  });
}
//# sourceMappingURL=index.js.map