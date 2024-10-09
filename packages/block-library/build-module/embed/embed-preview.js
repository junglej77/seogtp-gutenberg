/**
 * Internal dependencies
 */
import { getPhotoHtml } from './util';

/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Placeholder, SandBox } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { getAuthority } from '@wordpress/url';

/**
 * Internal dependencies
 */
import WpEmbedPreview from './wp-embed-preview';
import { Caption } from '../utils/caption';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
class EmbedPreview extends Component {
  constructor() {
    super(...arguments);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.state = {
      interactive: false
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (!nextProps.isSelected && state.interactive) {
      // We only want to change this when the block is not selected, because changing it when
      // the block becomes selected makes the overlap disappear too early. Hiding the overlay
      // happens on mouseup when the overlay is clicked.
      return {
        interactive: false
      };
    }
    return null;
  }
  hideOverlay() {
    // This is called onMouseUp on the overlay. We can't respond to the `isSelected` prop
    // changing, because that happens on mouse down, and the overlay immediately disappears,
    // and the mouse event can end up in the preview content. We can't use onClick on
    // the overlay to hide it either, because then the editor misses the mouseup event, and
    // thinks we're multi-selecting blocks.
    this.setState({
      interactive: true
    });
  }
  render() {
    const {
      preview,
      previewable,
      url,
      type,
      className,
      icon,
      label,
      insertBlocksAfter,
      attributes,
      setAttributes,
      isSelected
    } = this.props;
    const {
      scripts
    } = preview;
    const {
      interactive
    } = this.state;
    const html = 'photo' === type ? getPhotoHtml(preview) : preview.html;
    const embedSourceUrl = getAuthority(url);
    const iframeTitle = sprintf(
    // translators: %s: host providing embed content e.g: www.youtube.com
    __('Embedded content from %s'), embedSourceUrl);
    const sandboxClassnames = clsx(type, className, 'wp-block-embed__wrapper');

    // Disabled because the overlay div doesn't actually have a role or functionality
    // as far as the user is concerned. We're just catching the first click so that
    // the block can be selected without interacting with the embed preview that the overlay covers.
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const embedWrapper = 'wp-embed' === type ? /*#__PURE__*/_jsx(WpEmbedPreview, {
      html: html
    }) : /*#__PURE__*/_jsxs("div", {
      className: "wp-block-embed__wrapper",
      children: [/*#__PURE__*/_jsx(SandBox, {
        html: html,
        scripts: scripts,
        title: iframeTitle,
        type: sandboxClassnames,
        onFocus: this.hideOverlay
      }), !interactive && /*#__PURE__*/_jsx("div", {
        className: "block-library-embed__interactive-overlay",
        onMouseUp: this.hideOverlay
      })]
    });
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    return /*#__PURE__*/_jsxs("figure", {
      className: clsx(className, 'wp-block-embed', {
        'is-type-video': 'video' === type
      }),
      children: [previewable ? embedWrapper : /*#__PURE__*/_jsxs(Placeholder, {
        icon: /*#__PURE__*/_jsx(BlockIcon, {
          icon: icon,
          showColors: true
        }),
        label: label,
        children: [/*#__PURE__*/_jsx("p", {
          className: "components-placeholder__error",
          children: /*#__PURE__*/_jsx("a", {
            href: url,
            children: url
          })
        }), /*#__PURE__*/_jsx("p", {
          className: "components-placeholder__error",
          children: sprintf( /* translators: %s: host providing embed content e.g: www.youtube.com */
          __("Embedded content from %s can't be previewed in the editor."), embedSourceUrl)
        })]
      }), /*#__PURE__*/_jsx(Caption, {
        attributes: attributes,
        setAttributes: setAttributes,
        isSelected: isSelected,
        insertBlocksAfter: insertBlocksAfter,
        label: __('Embed caption text'),
        showToolbarButton: isSelected
      })]
    });
  }
}
export default EmbedPreview;
//# sourceMappingURL=embed-preview.js.map