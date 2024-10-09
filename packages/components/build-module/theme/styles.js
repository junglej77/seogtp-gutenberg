import _styled from "@emotion/styled/base";
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/**
 * External dependencies
 */

import { css } from '@emotion/react';

/**
 * Internal dependencies
 */

export const colorVariables = ({
  colors
}) => {
  const shades = Object.entries(colors.gray || {}).map(([k, v]) => `--wp-components-color-gray-${k}: ${v};`).join('');
  return [/*#__PURE__*/css("--wp-components-color-accent:", colors.accent, ";--wp-components-color-accent-darker-10:", colors.accentDarker10, ";--wp-components-color-accent-darker-20:", colors.accentDarker20, ";--wp-components-color-accent-inverted:", colors.accentInverted, ";--wp-components-color-background:", colors.background, ";--wp-components-color-foreground:", colors.foreground, ";--wp-components-color-foreground-inverted:", colors.foregroundInverted, ";", shades, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:colorVariables;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGhlbWUvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCSyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RoZW1lL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBUaGVtZU91dHB1dFZhbHVlcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbG9yVmFyaWFibGVzID0gKCB7IGNvbG9ycyB9OiBUaGVtZU91dHB1dFZhbHVlcyApID0+IHtcclxuXHRjb25zdCBzaGFkZXMgPSBPYmplY3QuZW50cmllcyggY29sb3JzLmdyYXkgfHwge30gKVxyXG5cdFx0Lm1hcCggKCBbIGssIHYgXSApID0+IGAtLXdwLWNvbXBvbmVudHMtY29sb3ItZ3JheS0keyBrIH06ICR7IHYgfTtgIClcclxuXHRcdC5qb2luKCAnJyApO1xyXG5cclxuXHRyZXR1cm4gW1xyXG5cdFx0Y3NzYFxyXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50OiAkeyBjb2xvcnMuYWNjZW50IH07XHJcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1hY2NlbnQtZGFya2VyLTEwOiAkeyBjb2xvcnMuYWNjZW50RGFya2VyMTAgfTtcclxuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWFjY2VudC1kYXJrZXItMjA6ICR7IGNvbG9ycy5hY2NlbnREYXJrZXIyMCB9O1xyXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50LWludmVydGVkOiAkeyBjb2xvcnMuYWNjZW50SW52ZXJ0ZWQgfTtcclxuXHJcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1iYWNrZ3JvdW5kOiAkeyBjb2xvcnMuYmFja2dyb3VuZCB9O1xyXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItZm9yZWdyb3VuZDogJHsgY29sb3JzLmZvcmVncm91bmQgfTtcclxuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWZvcmVncm91bmQtaW52ZXJ0ZWQ6ICR7IGNvbG9ycy5mb3JlZ3JvdW5kSW52ZXJ0ZWQgfTtcclxuXHJcblx0XHRcdCR7IHNoYWRlcyB9XHJcblx0XHRgLFxyXG5cdF07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcblx0Y29sb3I6IHZhciggLS13cC1jb21wb25lbnRzLWNvbG9yLWZvcmVncm91bmQsIGN1cnJlbnRDb2xvciApO1xyXG5gO1xyXG4iXX0= */")];
};
export const Wrapper = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1krjpvb0"
} : {
  target: "e1krjpvb0",
  label: "Wrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "1a3idx0",
  styles: "color:var( --wp-components-color-foreground, currentColor )"
} : {
  name: "1a3idx0",
  styles: "color:var( --wp-components-color-foreground, currentColor )",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGhlbWUvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdDaUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy90aGVtZS9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgVGhlbWVPdXRwdXRWYWx1ZXMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBjb2xvclZhcmlhYmxlcyA9ICggeyBjb2xvcnMgfTogVGhlbWVPdXRwdXRWYWx1ZXMgKSA9PiB7XHJcblx0Y29uc3Qgc2hhZGVzID0gT2JqZWN0LmVudHJpZXMoIGNvbG9ycy5ncmF5IHx8IHt9IClcclxuXHRcdC5tYXAoICggWyBrLCB2IF0gKSA9PiBgLS13cC1jb21wb25lbnRzLWNvbG9yLWdyYXktJHsgayB9OiAkeyB2IH07YCApXHJcblx0XHQuam9pbiggJycgKTtcclxuXHJcblx0cmV0dXJuIFtcclxuXHRcdGNzc2BcclxuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWFjY2VudDogJHsgY29sb3JzLmFjY2VudCB9O1xyXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50LWRhcmtlci0xMDogJHsgY29sb3JzLmFjY2VudERhcmtlcjEwIH07XHJcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1hY2NlbnQtZGFya2VyLTIwOiAkeyBjb2xvcnMuYWNjZW50RGFya2VyMjAgfTtcclxuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWFjY2VudC1pbnZlcnRlZDogJHsgY29sb3JzLmFjY2VudEludmVydGVkIH07XHJcblxyXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYmFja2dyb3VuZDogJHsgY29sb3JzLmJhY2tncm91bmQgfTtcclxuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWZvcmVncm91bmQ6ICR7IGNvbG9ycy5mb3JlZ3JvdW5kIH07XHJcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1mb3JlZ3JvdW5kLWludmVydGVkOiAkeyBjb2xvcnMuZm9yZWdyb3VuZEludmVydGVkIH07XHJcblxyXG5cdFx0XHQkeyBzaGFkZXMgfVxyXG5cdFx0YCxcclxuXHRdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG5cdGNvbG9yOiB2YXIoIC0td3AtY29tcG9uZW50cy1jb2xvci1mb3JlZ3JvdW5kLCBjdXJyZW50Q29sb3IgKTtcclxuYDtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
//# sourceMappingURL=styles.js.map