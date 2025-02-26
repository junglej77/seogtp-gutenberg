/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useRefEffect } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { Disabled, Placeholder, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Preview({
  idBase,
  instance,
  isVisible
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [srcDoc, setSrcDoc] = useState('');
  useEffect(() => {
    const abortController = typeof window.AbortController === 'undefined' ? undefined : new window.AbortController();
    async function fetchPreviewHTML() {
      const restRoute = `/wp/v2/widget-types/${idBase}/render`;
      return await apiFetch({
        path: restRoute,
        method: 'POST',
        signal: abortController?.signal,
        data: instance ? {
          instance
        } : {}
      });
    }
    fetchPreviewHTML().then(response => {
      setSrcDoc(response.preview);
    }).catch(error => {
      if ('AbortError' === error.name) {
        // We don't want to log aborted requests.
        return;
      }
      throw error;
    });
    return () => abortController?.abort();
  }, [idBase, instance]);

  // Resize the iframe on either the load event, or when the iframe becomes visible.
  const ref = useRefEffect(iframe => {
    // Only set height if the iframe is loaded,
    // or it will grow to an unexpected large height in Safari if it's hidden initially.
    if (!isLoaded) {
      return;
    }
    // If the preview frame has another origin then this won't work.
    // One possible solution is to add custom script to call `postMessage` in the preview frame.
    // Or, better yet, we migrate away from iframe.
    function setHeight() {
      var _iframe$contentDocume, _iframe$contentDocume2;
      // Pick the maximum of these two values to account for margin collapsing.
      const height = Math.max((_iframe$contentDocume = iframe.contentDocument.documentElement?.offsetHeight) !== null && _iframe$contentDocume !== void 0 ? _iframe$contentDocume : 0, (_iframe$contentDocume2 = iframe.contentDocument.body?.offsetHeight) !== null && _iframe$contentDocume2 !== void 0 ? _iframe$contentDocume2 : 0);

      // Fallback to a height of 100px if the height cannot be determined.
      // This ensures the block is still selectable. 100px should hopefully
      // be not so big that it's annoying, and not so small that nothing
      // can be seen.
      iframe.style.height = `${height !== 0 ? height : 100}px`;
    }
    const {
      IntersectionObserver
    } = iframe.ownerDocument.defaultView;

    // Observe for intersections that might cause a change in the height of
    // the iframe, e.g. a Widget Area becoming expanded.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHeight();
      }
    }, {
      threshold: 1
    });
    intersectionObserver.observe(iframe);
    iframe.addEventListener('load', setHeight);
    return () => {
      intersectionObserver.disconnect();
      iframe.removeEventListener('load', setHeight);
    };
  }, [isLoaded]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isVisible && !isLoaded && /*#__PURE__*/_jsx(Placeholder, {
      children: /*#__PURE__*/_jsx(Spinner, {})
    }), /*#__PURE__*/_jsx("div", {
      className: clsx('wp-block-legacy-widget__edit-preview', {
        'is-offscreen': !isVisible || !isLoaded
      }),
      children: /*#__PURE__*/_jsx(Disabled, {
        children: /*#__PURE__*/_jsx("iframe", {
          ref: ref,
          className: "wp-block-legacy-widget__edit-preview-iframe",
          tabIndex: "-1",
          title: __('Legacy Widget Preview'),
          srcDoc: srcDoc,
          onLoad: event => {
            // To hide the scrollbars of the preview frame for some edge cases,
            // such as negative margins in the Gallery Legacy Widget.
            // It can't be scrolled anyway.
            // TODO: Ideally, this should be fixed in core.
            event.target.contentDocument.body.style.overflow = 'hidden';
            setIsLoaded(true);
          },
          height: 100
        })
      })
    })]
  });
}
//# sourceMappingURL=preview.js.map