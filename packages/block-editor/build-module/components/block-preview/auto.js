/**
 * WordPress dependencies
 */
import { useResizeObserver, useRefEffect } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { memo, useMemo } from '@wordpress/element';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockList from '../block-list';
import Iframe from '../iframe';
import EditorStyles from '../editor-styles';
import { store } from '../../store';

// This is used to avoid rendering the block list if the sizes change.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
let MemoizedBlockList;
const MAX_HEIGHT = 2000;
const EMPTY_ADDITIONAL_STYLES = [];
function ScaledBlockPreview({
  viewportWidth,
  containerWidth,
  minHeight,
  additionalStyles = EMPTY_ADDITIONAL_STYLES
}) {
  if (!viewportWidth) {
    viewportWidth = containerWidth;
  }
  const [contentResizeListener, {
    height: contentHeight
  }] = useResizeObserver();
  const {
    styles
  } = useSelect(select => {
    const settings = select(store).getSettings();
    return {
      styles: settings.styles
    };
  }, []);

  // Avoid scrollbars for pattern previews.
  const editorStyles = useMemo(() => {
    if (styles) {
      return [...styles, {
        css: 'body{height:auto;overflow:hidden;border:none;padding:0;}',
        __unstableType: 'presets'
      }, ...additionalStyles];
    }
    return styles;
  }, [styles, additionalStyles]);

  // Initialize on render instead of module top level, to avoid circular dependency issues.
  MemoizedBlockList = MemoizedBlockList || memo(BlockList);
  const scale = containerWidth / viewportWidth;
  const aspectRatio = contentHeight ? containerWidth / (contentHeight * scale) : 0;
  return /*#__PURE__*/_jsx(Disabled, {
    className: "block-editor-block-preview__content",
    style: {
      transform: `scale(${scale})`,
      // Using width + aspect-ratio instead of height here triggers browsers' native
      // handling of scrollbar's visibility. It prevents the flickering issue seen
      // in https://github.com/WordPress/gutenberg/issues/52027.
      // See https://github.com/WordPress/gutenberg/pull/52921 for more info.
      aspectRatio,
      maxHeight: contentHeight > MAX_HEIGHT ? MAX_HEIGHT * scale : undefined,
      minHeight
    },
    children: /*#__PURE__*/_jsxs(Iframe, {
      contentRef: useRefEffect(bodyElement => {
        const {
          ownerDocument: {
            documentElement
          }
        } = bodyElement;
        documentElement.classList.add('block-editor-block-preview__content-iframe');
        documentElement.style.position = 'absolute';
        documentElement.style.width = '100%';

        // Necessary for contentResizeListener to work.
        bodyElement.style.boxSizing = 'border-box';
        bodyElement.style.position = 'absolute';
        bodyElement.style.width = '100%';
      }, []),
      "aria-hidden": true,
      tabIndex: -1,
      style: {
        position: 'absolute',
        width: viewportWidth,
        height: contentHeight,
        pointerEvents: 'none',
        // This is a catch-all max-height for patterns.
        // See: https://github.com/WordPress/gutenberg/pull/38175.
        maxHeight: MAX_HEIGHT,
        minHeight: scale !== 0 && scale < 1 && minHeight ? minHeight / scale : minHeight
      },
      children: [/*#__PURE__*/_jsx(EditorStyles, {
        styles: editorStyles
      }), contentResizeListener, /*#__PURE__*/_jsx(MemoizedBlockList, {
        renderAppender: false
      })]
    })
  });
}
export default function AutoBlockPreview(props) {
  const [containerResizeListener, {
    width: containerWidth
  }] = useResizeObserver();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      style: {
        position: 'relative',
        width: '100%',
        height: 0
      },
      children: containerResizeListener
    }), /*#__PURE__*/_jsx("div", {
      className: "block-editor-block-preview__container",
      children: !!containerWidth && /*#__PURE__*/_jsx(ScaledBlockPreview, {
        ...props,
        containerWidth: containerWidth
      })
    })]
  });
}
//# sourceMappingURL=auto.js.map