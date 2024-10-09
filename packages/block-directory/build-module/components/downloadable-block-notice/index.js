/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as blockDirectoryStore } from '../../store';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export const DownloadableBlockNotice = ({
  block
}) => {
  const errorNotice = useSelect(select => select(blockDirectoryStore).getErrorNoticeForBlock(block.id), [block]);
  if (!errorNotice) {
    return null;
  }
  return /*#__PURE__*/_jsx("div", {
    className: "block-directory-downloadable-block-notice",
    children: /*#__PURE__*/_jsxs("div", {
      className: "block-directory-downloadable-block-notice__content",
      children: [errorNotice.message, errorNotice.isFatal ? ' ' + __('Try reloading the page.') : null]
    })
  });
};
export default DownloadableBlockNotice;
//# sourceMappingURL=index.js.map