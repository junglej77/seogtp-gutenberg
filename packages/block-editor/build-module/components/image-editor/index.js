/**
 * WordPress dependencies
 */
import { ToolbarGroup, ToolbarItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import AspectRatioDropdown from './aspect-ratio-dropdown';
import BlockControls from '../block-controls';
import ImageEditingProvider from './context';
import Cropper from './cropper';
import ZoomDropdown from './zoom-dropdown';
import RotationButton from './rotation-button';
import FormControls from './form-controls';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ImageEditor({
  id,
  url,
  width,
  height,
  naturalHeight,
  naturalWidth,
  onSaveImage,
  onFinishEditing,
  borderProps
}) {
  return /*#__PURE__*/_jsxs(ImageEditingProvider, {
    id: id,
    url: url,
    naturalWidth: naturalWidth,
    naturalHeight: naturalHeight,
    onSaveImage: onSaveImage,
    onFinishEditing: onFinishEditing,
    children: [/*#__PURE__*/_jsx(Cropper, {
      borderProps: borderProps,
      url: url,
      width: width,
      height: height,
      naturalHeight: naturalHeight,
      naturalWidth: naturalWidth
    }), /*#__PURE__*/_jsxs(BlockControls, {
      children: [/*#__PURE__*/_jsxs(ToolbarGroup, {
        children: [/*#__PURE__*/_jsx(ZoomDropdown, {}), /*#__PURE__*/_jsx(ToolbarItem, {
          children: toggleProps => /*#__PURE__*/_jsx(AspectRatioDropdown, {
            toggleProps: toggleProps
          })
        }), /*#__PURE__*/_jsx(RotationButton, {})]
      }), /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(FormControls, {})
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map