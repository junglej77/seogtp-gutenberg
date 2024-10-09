import _styled from "@emotion/styled/base";
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
const PolymorphicDiv = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e19lxcc00"
} : {
  target: "e19lxcc00",
  label: "PolymorphicDiv"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdmlldy9jb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVpQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3ZpZXcvY29tcG9uZW50LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcclxuXHJcbi8qKlxyXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBmb3J3YXJkUmVmIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcclxuXHJcbmNvbnN0IFBvbHltb3JwaGljRGl2ID0gc3R5bGVkLmRpdmBgO1xyXG5cclxuZnVuY3Rpb24gVW5mb3J3YXJkZWRWaWV3PCBUIGV4dGVuZHMgUmVhY3QuRWxlbWVudFR5cGUgPSAnZGl2JyA+KFxyXG5cdHsgYXMsIC4uLnJlc3RQcm9wcyB9OiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwge30sIFQgPixcclxuXHRyZWY6IFJlYWN0LkZvcndhcmRlZFJlZjwgYW55ID5cclxuKSB7XHJcblx0cmV0dXJuIDxQb2x5bW9ycGhpY0RpdiBhcz17IGFzIH0gcmVmPXsgcmVmIH0geyAuLi5yZXN0UHJvcHMgfSAvPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGBWaWV3YCBpcyBhIGNvcmUgY29tcG9uZW50IHRoYXQgcmVuZGVycyBldmVyeXRoaW5nIGluIHRoZSBsaWJyYXJ5LlxyXG4gKiBJdCBpcyB0aGUgcHJpbmNpcGxlIGNvbXBvbmVudCBpbiB0aGUgZW50aXJlIGxpYnJhcnkuXHJcbiAqXHJcbiAqIGBgYGpzeFxyXG4gKiBpbXBvcnQgeyBWaWV3IH0gZnJvbSBgQHdvcmRwcmVzcy9jb21wb25lbnRzYDtcclxuICpcclxuICogZnVuY3Rpb24gRXhhbXBsZSgpIHtcclxuICogXHRyZXR1cm4gKFxyXG4gKiBcdFx0PFZpZXc+XHJcbiAqIFx0XHRcdCBDb2RlIGlzIFBvZXRyeVxyXG4gKiBcdFx0PC9WaWV3PlxyXG4gKiBcdCk7XHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVmlldyA9IE9iamVjdC5hc3NpZ24oIGZvcndhcmRSZWYoIFVuZm9yd2FyZGVkVmlldyApLCB7XHJcblx0c2VsZWN0b3I6ICcuY29tcG9uZW50cy12aWV3JyxcclxufSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIl19 */");
function UnforwardedView({
  as,
  ...restProps
}, ref) {
  return /*#__PURE__*/_jsx(PolymorphicDiv, {
    as: as,
    ref: ref,
    ...restProps
  });
}

/**
 * `View` is a core component that renders everything in the library.
 * It is the principle component in the entire library.
 *
 * ```jsx
 * import { View } from `@wordpress/components`;
 *
 * function Example() {
 * 	return (
 * 		<View>
 * 			 Code is Poetry
 * 		</View>
 * 	);
 * }
 * ```
 */
export const View = Object.assign(forwardRef(UnforwardedView), {
  selector: '.components-view'
});
export default View;
//# sourceMappingURL=component.js.map