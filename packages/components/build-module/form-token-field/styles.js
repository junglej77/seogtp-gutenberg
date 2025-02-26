import _styled from "@emotion/styled/base";
/**
 * External dependencies
 */

import { css } from '@emotion/react';

/**
 * Internal dependencies
 */
import { Flex } from '../flex';
import { space } from '../utils/space';
import { boxSizingReset } from '../utils';
const deprecatedPaddings = ({
  __next40pxDefaultSize,
  hasTokens
}) => !__next40pxDefaultSize && /*#__PURE__*/css("padding-top:", space(hasTokens ? 1 : 0.5), ";padding-bottom:", space(hasTokens ? 1 : 0.5), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:deprecatedPaddings;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZm9ybS10b2tlbi1maWVsZC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJJIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZm9ybS10b2tlbi1maWVsZC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IEZsZXggfSBmcm9tICcuLi9mbGV4JztcclxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi91dGlscy9zcGFjZSc7XHJcbmltcG9ydCB7IGJveFNpemluZ1Jlc2V0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxudHlwZSBUb2tlbnNBbmRJbnB1dFdyYXBwZXJQcm9wcyA9IHtcclxuXHRfX25leHQ0MHB4RGVmYXVsdFNpemU6IGJvb2xlYW47XHJcblx0aGFzVG9rZW5zOiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgZGVwcmVjYXRlZFBhZGRpbmdzID0gKCB7XHJcblx0X19uZXh0NDBweERlZmF1bHRTaXplLFxyXG5cdGhhc1Rva2VucyxcclxufTogVG9rZW5zQW5kSW5wdXRXcmFwcGVyUHJvcHMgKSA9PlxyXG5cdCEgX19uZXh0NDBweERlZmF1bHRTaXplICYmXHJcblx0Y3NzYFxyXG5cdFx0cGFkZGluZy10b3A6ICR7IHNwYWNlKCBoYXNUb2tlbnMgPyAxIDogMC41ICkgfTtcclxuXHRcdHBhZGRpbmctYm90dG9tOiAkeyBzcGFjZSggaGFzVG9rZW5zID8gMSA6IDAuNSApIH07XHJcblx0YDtcclxuXHJcbmV4cG9ydCBjb25zdCBUb2tlbnNBbmRJbnB1dFdyYXBwZXJGbGV4ID0gc3R5bGVkKCBGbGV4IClgXHJcblx0cGFkZGluZzogN3B4O1xyXG5cdCR7IGJveFNpemluZ1Jlc2V0IH1cclxuXHJcblx0JHsgZGVwcmVjYXRlZFBhZGRpbmdzIH1cclxuYDtcclxuIl19 */");
export const TokensAndInputWrapperFlex = /*#__PURE__*/_styled(Flex, process.env.NODE_ENV === "production" ? {
  target: "ehq8nmi0"
} : {
  target: "ehq8nmi0",
  label: "TokensAndInputWrapperFlex"
})("padding:7px;", boxSizingReset, " ", deprecatedPaddings, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZm9ybS10b2tlbi1maWVsZC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJ1RCIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2Zvcm0tdG9rZW4tZmllbGQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBGbGV4IH0gZnJvbSAnLi4vZmxleCc7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vdXRpbHMvc3BhY2UnO1xyXG5pbXBvcnQgeyBib3hTaXppbmdSZXNldCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbnR5cGUgVG9rZW5zQW5kSW5wdXRXcmFwcGVyUHJvcHMgPSB7XHJcblx0X19uZXh0NDBweERlZmF1bHRTaXplOiBib29sZWFuO1xyXG5cdGhhc1Rva2VuczogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IGRlcHJlY2F0ZWRQYWRkaW5ncyA9ICgge1xyXG5cdF9fbmV4dDQwcHhEZWZhdWx0U2l6ZSxcclxuXHRoYXNUb2tlbnMsXHJcbn06IFRva2Vuc0FuZElucHV0V3JhcHBlclByb3BzICkgPT5cclxuXHQhIF9fbmV4dDQwcHhEZWZhdWx0U2l6ZSAmJlxyXG5cdGNzc2BcclxuXHRcdHBhZGRpbmctdG9wOiAkeyBzcGFjZSggaGFzVG9rZW5zID8gMSA6IDAuNSApIH07XHJcblx0XHRwYWRkaW5nLWJvdHRvbTogJHsgc3BhY2UoIGhhc1Rva2VucyA/IDEgOiAwLjUgKSB9O1xyXG5cdGA7XHJcblxyXG5leHBvcnQgY29uc3QgVG9rZW5zQW5kSW5wdXRXcmFwcGVyRmxleCA9IHN0eWxlZCggRmxleCApYFxyXG5cdHBhZGRpbmc6IDdweDtcclxuXHQkeyBib3hTaXppbmdSZXNldCB9XHJcblxyXG5cdCR7IGRlcHJlY2F0ZWRQYWRkaW5ncyB9XHJcbmA7XHJcbiJdfQ== */"));
//# sourceMappingURL=styles.js.map