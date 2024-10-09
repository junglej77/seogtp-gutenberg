/**
 * WordPress dependencies
 */
import { BlockIcon } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
function DownloadableBlockIcon({
  icon
}) {
  const className = 'block-directory-downloadable-block-icon';
  return icon.match(/\.(jpeg|jpg|gif|png|svg)(?:\?.*)?$/) !== null ? /*#__PURE__*/_jsx("img", {
    className: className,
    src: icon,
    alt: ""
  }) : /*#__PURE__*/_jsx(BlockIcon, {
    className: className,
    icon: icon,
    showColors: true
  });
}
export default DownloadableBlockIcon;
//# sourceMappingURL=index.js.map