import _styled from "@emotion/styled/base";
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { space } from '../utils/space';
import InputControl from '../input-control';
import { COLORS } from '../utils';
const inlinePadding = ({
  size
}) => {
  return space(size === 'compact' ? 1 : 2);
};
export const SuffixItemWrapper = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "effl84m1"
} : {
  target: "effl84m1",
  label: "SuffixItemWrapper"
})("display:flex;padding-inline-end:", inlinePadding, ";svg{fill:currentColor;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvc2VhcmNoLWNvbnRyb2wvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1CMkMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9zZWFyY2gtY29udHJvbC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0IElucHV0Q29udHJvbCBmcm9tICcuLi9pbnB1dC1jb250cm9sJztcclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgdHlwZSB7IFNlYXJjaENvbnRyb2xQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuY29uc3QgaW5saW5lUGFkZGluZyA9ICgge1xyXG5cdHNpemUsXHJcbn06IFJlcXVpcmVkPCBQaWNrPCBTZWFyY2hDb250cm9sUHJvcHMsICdzaXplJyA+ID4gKSA9PiB7XHJcblx0cmV0dXJuIHNwYWNlKCBzaXplID09PSAnY29tcGFjdCcgPyAxIDogMiApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFN1ZmZpeEl0ZW1XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdHBhZGRpbmctaW5saW5lLWVuZDogJHsgaW5saW5lUGFkZGluZyB9O1xyXG5cclxuXHRzdmcge1xyXG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xyXG5cdH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBTdHlsZWRJbnB1dENvbnRyb2wgPSBzdHlsZWQoIElucHV0Q29udHJvbCApYFxyXG5cdGlucHV0W3R5cGU9J3NlYXJjaCddIHtcclxuXHRcdCY6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24sXHJcblx0XHQmOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxyXG5cdFx0Jjo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24sXHJcblx0XHQmOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb24ge1xyXG5cdFx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQmOm5vdCggOmZvY3VzLXdpdGhpbiApIHtcclxuXHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1iYWNrZ3JvdW5kOiAkeyBDT0xPUlMudGhlbWUuZ3JheVsgMTAwIF0gfTtcclxuXHR9XHJcbmA7XHJcbiJdfQ== */"));
export const StyledInputControl = /*#__PURE__*/_styled(InputControl, process.env.NODE_ENV === "production" ? {
  target: "effl84m0"
} : {
  target: "effl84m0",
  label: "StyledInputControl"
})("input[type='search']{&::-webkit-search-decoration,&::-webkit-search-cancel-button,&::-webkit-search-results-button,&::-webkit-search-results-decoration{-webkit-appearance:none;}}&:not( :focus-within ){--wp-components-color-background:", COLORS.theme.gray[100], ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvc2VhcmNoLWNvbnRyb2wvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCd0QiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9zZWFyY2gtY29udHJvbC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0IElucHV0Q29udHJvbCBmcm9tICcuLi9pbnB1dC1jb250cm9sJztcclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgdHlwZSB7IFNlYXJjaENvbnRyb2xQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuY29uc3QgaW5saW5lUGFkZGluZyA9ICgge1xyXG5cdHNpemUsXHJcbn06IFJlcXVpcmVkPCBQaWNrPCBTZWFyY2hDb250cm9sUHJvcHMsICdzaXplJyA+ID4gKSA9PiB7XHJcblx0cmV0dXJuIHNwYWNlKCBzaXplID09PSAnY29tcGFjdCcgPyAxIDogMiApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFN1ZmZpeEl0ZW1XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdHBhZGRpbmctaW5saW5lLWVuZDogJHsgaW5saW5lUGFkZGluZyB9O1xyXG5cclxuXHRzdmcge1xyXG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xyXG5cdH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBTdHlsZWRJbnB1dENvbnRyb2wgPSBzdHlsZWQoIElucHV0Q29udHJvbCApYFxyXG5cdGlucHV0W3R5cGU9J3NlYXJjaCddIHtcclxuXHRcdCY6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24sXHJcblx0XHQmOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxyXG5cdFx0Jjo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24sXHJcblx0XHQmOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb24ge1xyXG5cdFx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQmOm5vdCggOmZvY3VzLXdpdGhpbiApIHtcclxuXHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1iYWNrZ3JvdW5kOiAkeyBDT0xPUlMudGhlbWUuZ3JheVsgMTAwIF0gfTtcclxuXHR9XHJcbmA7XHJcbiJdfQ== */"));
//# sourceMappingURL=styles.js.map