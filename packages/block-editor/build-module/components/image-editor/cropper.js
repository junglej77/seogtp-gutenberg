/**
 * External dependencies
 */
import Cropper from 'react-easy-crop';
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { useResizeObserver } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { MIN_ZOOM, MAX_ZOOM } from './constants';
import { useImageEditingContext } from './context';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function ImageCropper({
  url,
  width,
  height,
  naturalHeight,
  naturalWidth,
  borderProps
}) {
  const {
    isInProgress,
    editedUrl,
    position,
    zoom,
    aspect,
    setPosition,
    setCrop,
    setZoom,
    rotation
  } = useImageEditingContext();
  const [contentResizeListener, {
    width: clientWidth
  }] = useResizeObserver();
  let editedHeight = height || clientWidth * naturalHeight / naturalWidth;
  if (rotation % 180 === 90) {
    editedHeight = clientWidth * naturalWidth / naturalHeight;
  }
  const area = /*#__PURE__*/_jsxs("div", {
    className: clsx('wp-block-image__crop-area', borderProps?.className, {
      'is-applying': isInProgress
    }),
    style: {
      ...borderProps?.style,
      width: width || clientWidth,
      height: editedHeight
    },
    children: [/*#__PURE__*/_jsx(Cropper, {
      image: editedUrl || url,
      disabled: isInProgress,
      minZoom: MIN_ZOOM / 100,
      maxZoom: MAX_ZOOM / 100,
      crop: position,
      zoom: zoom / 100,
      aspect: aspect,
      onCropChange: pos => {
        setPosition(pos);
      },
      onCropComplete: newCropPercent => {
        setCrop(newCropPercent);
      },
      onZoomChange: newZoom => {
        setZoom(newZoom * 100);
      }
    }), isInProgress && /*#__PURE__*/_jsx(Spinner, {})]
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [contentResizeListener, area]
  });
}
//# sourceMappingURL=cropper.js.map