/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../button';
import { PageControlIcon } from './icons';
import { jsx as _jsx } from "react/jsx-runtime";
export default function PageControl({
  currentPage,
  numberOfPages,
  setCurrentPage
}) {
  return /*#__PURE__*/_jsx("ul", {
    className: "components-guide__page-control",
    "aria-label": __('Guide controls'),
    children: Array.from({
      length: numberOfPages
    }).map((_, page) => /*#__PURE__*/_jsx("li", {
      // Set aria-current="step" on the active page, see https://www.w3.org/TR/wai-aria-1.1/#aria-current
      "aria-current": page === currentPage ? 'step' : undefined,
      children: /*#__PURE__*/_jsx(Button, {
        icon: /*#__PURE__*/_jsx(PageControlIcon, {}),
        "aria-label": sprintf( /* translators: 1: current page number 2: total number of pages */
        __('Page %1$d of %2$d'), page + 1, numberOfPages),
        onClick: () => setCurrentPage(page)
      }, page)
    }, page))
  });
}
//# sourceMappingURL=page-control.js.map