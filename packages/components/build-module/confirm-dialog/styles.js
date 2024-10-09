function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/**
 * External dependencies
 */
import { css } from '@emotion/react';

/**
 * The z-index for ConfirmDialog is being set here instead of in
 * packages/base-styles/_z-index.scss, because this component uses
 * emotion instead of sass.
 *
 * ConfirmDialog needs this higher z-index to ensure it renders on top of
 * any parent Popover component.
 */
export const wrapper = process.env.NODE_ENV === "production" ? {
  name: "7g5ii0",
  styles: "&&{z-index:1000001;}"
} : {
  name: "1gucf3d-wrapper",
  styles: "&&{z-index:1000001;};label:wrapper;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvY29uZmlybS1kaWFsb2cvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWEwQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2NvbmZpcm0tZGlhbG9nL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBUaGUgei1pbmRleCBmb3IgQ29uZmlybURpYWxvZyBpcyBiZWluZyBzZXQgaGVyZSBpbnN0ZWFkIG9mIGluXHJcbiAqIHBhY2thZ2VzL2Jhc2Utc3R5bGVzL196LWluZGV4LnNjc3MsIGJlY2F1c2UgdGhpcyBjb21wb25lbnQgdXNlc1xyXG4gKiBlbW90aW9uIGluc3RlYWQgb2Ygc2Fzcy5cclxuICpcclxuICogQ29uZmlybURpYWxvZyBuZWVkcyB0aGlzIGhpZ2hlciB6LWluZGV4IHRvIGVuc3VyZSBpdCByZW5kZXJzIG9uIHRvcCBvZlxyXG4gKiBhbnkgcGFyZW50IFBvcG92ZXIgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSBjc3NgXHJcblx0JiYge1xyXG5cdFx0ei1pbmRleDogMTAwMDAwMTtcclxuXHR9XHJcbmA7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
//# sourceMappingURL=styles.js.map