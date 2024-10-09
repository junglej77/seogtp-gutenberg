import _styled from "@emotion/styled/base";
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { COLORS } from '../../utils';
import { space } from '../../utils/space';
import { Text } from '../../text';
import CONFIG from '../../utils/config-values';
const CIRCLE_SIZE = 32;
const INNER_CIRCLE_SIZE = 6;
export const CircleRoot = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eln3bjz3"
} : {
  target: "eln3bjz3",
  label: "CircleRoot"
})("border-radius:", CONFIG.radiusRound, ";border:", CONFIG.borderWidth, " solid ", COLORS.ui.border, ";box-sizing:border-box;cursor:grab;height:", CIRCLE_SIZE, "px;overflow:hidden;width:", CIRCLE_SIZE, "px;:active{cursor:grabbing;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYW5nbGUtcGlja2VyLWNvbnRyb2wvc3R5bGVzL2FuZ2xlLXBpY2tlci1jb250cm9sLXN0eWxlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JvQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2FuZ2xlLXBpY2tlci1jb250cm9sL3N0eWxlcy9hbmdsZS1waWNrZXItY29udHJvbC1zdHlsZXMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uLy4uL3RleHQnO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xyXG5cclxuY29uc3QgQ0lSQ0xFX1NJWkUgPSAzMjtcclxuY29uc3QgSU5ORVJfQ0lSQ0xFX1NJWkUgPSA2O1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZVJvb3QgPSBzdHlsZWQuZGl2YFxyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJvcmRlcjogJHsgQ09ORklHLmJvcmRlcldpZHRoIH0gc29saWQgJHsgQ09MT1JTLnVpLmJvcmRlciB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0Y3Vyc29yOiBncmFiO1xyXG5cdGhlaWdodDogJHsgQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdG92ZXJmbG93OiBoaWRkZW47XHJcblx0d2lkdGg6ICR7IENJUkNMRV9TSVpFIH1weDtcclxuXHJcblx0OmFjdGl2ZSB7XHJcblx0XHRjdXJzb3I6IGdyYWJiaW5nO1xyXG5cdH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDaXJjbGVJbmRpY2F0b3JXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblxyXG5cdDpmb2N1cy12aXNpYmxlIHtcclxuXHRcdG91dGxpbmU6IG5vbmU7XHJcblx0fVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZUluZGljYXRvciA9IHN0eWxlZC5kaXZgXHJcblx0YmFja2dyb3VuZDogJHsgQ09MT1JTLnRoZW1lLmFjY2VudCB9O1xyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0bGVmdDogNTAlO1xyXG5cdHRvcDogNHB4O1xyXG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWCggLTUwJSApO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR3aWR0aDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdGhlaWdodDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVuaXRUZXh0ID0gc3R5bGVkKCBUZXh0IClgXHJcblx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcclxuXHRtYXJnaW4tcmlnaHQ6ICR7IHNwYWNlKCAzICkgfTtcclxuYDtcclxuIl19 */"));
export const CircleIndicatorWrapper = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eln3bjz2"
} : {
  target: "eln3bjz2",
  label: "CircleIndicatorWrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "1r307gh",
  styles: "box-sizing:border-box;position:relative;width:100%;height:100%;:focus-visible{outline:none;}"
} : {
  name: "1r307gh",
  styles: "box-sizing:border-box;position:relative;width:100%;height:100%;:focus-visible{outline:none;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYW5nbGUtcGlja2VyLWNvbnRyb2wvc3R5bGVzL2FuZ2xlLXBpY2tlci1jb250cm9sLXN0eWxlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEJnRCIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2FuZ2xlLXBpY2tlci1jb250cm9sL3N0eWxlcy9hbmdsZS1waWNrZXItY29udHJvbC1zdHlsZXMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uLy4uL3RleHQnO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xyXG5cclxuY29uc3QgQ0lSQ0xFX1NJWkUgPSAzMjtcclxuY29uc3QgSU5ORVJfQ0lSQ0xFX1NJWkUgPSA2O1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZVJvb3QgPSBzdHlsZWQuZGl2YFxyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJvcmRlcjogJHsgQ09ORklHLmJvcmRlcldpZHRoIH0gc29saWQgJHsgQ09MT1JTLnVpLmJvcmRlciB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0Y3Vyc29yOiBncmFiO1xyXG5cdGhlaWdodDogJHsgQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdG92ZXJmbG93OiBoaWRkZW47XHJcblx0d2lkdGg6ICR7IENJUkNMRV9TSVpFIH1weDtcclxuXHJcblx0OmFjdGl2ZSB7XHJcblx0XHRjdXJzb3I6IGdyYWJiaW5nO1xyXG5cdH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDaXJjbGVJbmRpY2F0b3JXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblxyXG5cdDpmb2N1cy12aXNpYmxlIHtcclxuXHRcdG91dGxpbmU6IG5vbmU7XHJcblx0fVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZUluZGljYXRvciA9IHN0eWxlZC5kaXZgXHJcblx0YmFja2dyb3VuZDogJHsgQ09MT1JTLnRoZW1lLmFjY2VudCB9O1xyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0bGVmdDogNTAlO1xyXG5cdHRvcDogNHB4O1xyXG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWCggLTUwJSApO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR3aWR0aDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdGhlaWdodDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVuaXRUZXh0ID0gc3R5bGVkKCBUZXh0IClgXHJcblx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcclxuXHRtYXJnaW4tcmlnaHQ6ICR7IHNwYWNlKCAzICkgfTtcclxuYDtcclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
export const CircleIndicator = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eln3bjz1"
} : {
  target: "eln3bjz1",
  label: "CircleIndicator"
})("background:", COLORS.theme.accent, ";border-radius:", CONFIG.radiusRound, ";box-sizing:border-box;display:block;left:50%;top:4px;transform:translateX( -50% );position:absolute;width:", INNER_CIRCLE_SIZE, "px;height:", INNER_CIRCLE_SIZE, "px;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYW5nbGUtcGlja2VyLWNvbnRyb2wvc3R5bGVzL2FuZ2xlLXBpY2tlci1jb250cm9sLXN0eWxlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUN5QyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2FuZ2xlLXBpY2tlci1jb250cm9sL3N0eWxlcy9hbmdsZS1waWNrZXItY29udHJvbC1zdHlsZXMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uLy4uL3RleHQnO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xyXG5cclxuY29uc3QgQ0lSQ0xFX1NJWkUgPSAzMjtcclxuY29uc3QgSU5ORVJfQ0lSQ0xFX1NJWkUgPSA2O1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZVJvb3QgPSBzdHlsZWQuZGl2YFxyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJvcmRlcjogJHsgQ09ORklHLmJvcmRlcldpZHRoIH0gc29saWQgJHsgQ09MT1JTLnVpLmJvcmRlciB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0Y3Vyc29yOiBncmFiO1xyXG5cdGhlaWdodDogJHsgQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdG92ZXJmbG93OiBoaWRkZW47XHJcblx0d2lkdGg6ICR7IENJUkNMRV9TSVpFIH1weDtcclxuXHJcblx0OmFjdGl2ZSB7XHJcblx0XHRjdXJzb3I6IGdyYWJiaW5nO1xyXG5cdH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDaXJjbGVJbmRpY2F0b3JXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblxyXG5cdDpmb2N1cy12aXNpYmxlIHtcclxuXHRcdG91dGxpbmU6IG5vbmU7XHJcblx0fVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZUluZGljYXRvciA9IHN0eWxlZC5kaXZgXHJcblx0YmFja2dyb3VuZDogJHsgQ09MT1JTLnRoZW1lLmFjY2VudCB9O1xyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0bGVmdDogNTAlO1xyXG5cdHRvcDogNHB4O1xyXG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWCggLTUwJSApO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR3aWR0aDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdGhlaWdodDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVuaXRUZXh0ID0gc3R5bGVkKCBUZXh0IClgXHJcblx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcclxuXHRtYXJnaW4tcmlnaHQ6ICR7IHNwYWNlKCAzICkgfTtcclxuYDtcclxuIl19 */"));
export const UnitText = /*#__PURE__*/_styled(Text, process.env.NODE_ENV === "production" ? {
  target: "eln3bjz0"
} : {
  target: "eln3bjz0",
  label: "UnitText"
})("color:", COLORS.theme.accent, ";margin-right:", space(3), ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYW5nbGUtcGlja2VyLWNvbnRyb2wvc3R5bGVzL2FuZ2xlLXBpY2tlci1jb250cm9sLXN0eWxlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0RzQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2FuZ2xlLXBpY2tlci1jb250cm9sL3N0eWxlcy9hbmdsZS1waWNrZXItY29udHJvbC1zdHlsZXMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uLy4uL3RleHQnO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xyXG5cclxuY29uc3QgQ0lSQ0xFX1NJWkUgPSAzMjtcclxuY29uc3QgSU5ORVJfQ0lSQ0xFX1NJWkUgPSA2O1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZVJvb3QgPSBzdHlsZWQuZGl2YFxyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJvcmRlcjogJHsgQ09ORklHLmJvcmRlcldpZHRoIH0gc29saWQgJHsgQ09MT1JTLnVpLmJvcmRlciB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0Y3Vyc29yOiBncmFiO1xyXG5cdGhlaWdodDogJHsgQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdG92ZXJmbG93OiBoaWRkZW47XHJcblx0d2lkdGg6ICR7IENJUkNMRV9TSVpFIH1weDtcclxuXHJcblx0OmFjdGl2ZSB7XHJcblx0XHRjdXJzb3I6IGdyYWJiaW5nO1xyXG5cdH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDaXJjbGVJbmRpY2F0b3JXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRoZWlnaHQ6IDEwMCU7XHJcblxyXG5cdDpmb2N1cy12aXNpYmxlIHtcclxuXHRcdG91dGxpbmU6IG5vbmU7XHJcblx0fVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENpcmNsZUluZGljYXRvciA9IHN0eWxlZC5kaXZgXHJcblx0YmFja2dyb3VuZDogJHsgQ09MT1JTLnRoZW1lLmFjY2VudCB9O1xyXG5cdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNSb3VuZCB9O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0bGVmdDogNTAlO1xyXG5cdHRvcDogNHB4O1xyXG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWCggLTUwJSApO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR3aWR0aDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5cdGhlaWdodDogJHsgSU5ORVJfQ0lSQ0xFX1NJWkUgfXB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVuaXRUZXh0ID0gc3R5bGVkKCBUZXh0IClgXHJcblx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcclxuXHRtYXJnaW4tcmlnaHQ6ICR7IHNwYWNlKCAzICkgfTtcclxuYDtcclxuIl19 */"));
//# sourceMappingURL=angle-picker-control-styles.js.map