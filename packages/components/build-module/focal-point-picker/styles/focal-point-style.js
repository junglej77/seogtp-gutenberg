import _styled from "@emotion/styled/base";
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { CONFIG } from '../../utils';
export const PointerCircle = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e19snlhg0"
} : {
  target: "e19snlhg0",
  label: "PointerCircle"
})("background-color:transparent;cursor:grab;height:40px;margin:-20px 0 0 -20px;position:absolute;user-select:none;width:40px;will-change:transform;z-index:10000;background:rgba( 255, 255, 255, 0.4 );border:1px solid rgba( 255, 255, 255, 0.4 );border-radius:", CONFIG.radiusRound, ";backdrop-filter:blur( 16px ) saturate( 180% );box-shadow:rgb( 0 0 0 / 10% ) 0px 0px 8px;@media not ( prefers-reduced-motion ){transition:transform 100ms linear;}", ({
  isDragging
}) => isDragging && `
			box-shadow: rgb( 0 0 0 / 12% ) 0px 0px 10px;
			transform: scale( 1.1 );
			cursor: grabbing;
			`, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZm9jYWwtcG9pbnQtcGlja2VyL3N0eWxlcy9mb2NhbC1wb2ludC1zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVdUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9mb2NhbC1wb2ludC1waWNrZXIvc3R5bGVzL2ZvY2FsLXBvaW50LXN0eWxlLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09ORklHIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBvaW50ZXJDaXJjbGUgPSBzdHlsZWQuZGl2YFxyXG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG5cdGN1cnNvcjogZ3JhYjtcclxuXHRoZWlnaHQ6IDQwcHg7XHJcblx0bWFyZ2luOiAtMjBweCAwIDAgLTIwcHg7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHVzZXItc2VsZWN0OiBub25lO1xyXG5cdHdpZHRoOiA0MHB4O1xyXG5cdHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XHJcblx0ei1pbmRleDogMTAwMDA7XHJcblx0YmFja2dyb3VuZDogcmdiYSggMjU1LCAyNTUsIDI1NSwgMC40ICk7XHJcblx0Ym9yZGVyOiAxcHggc29saWQgcmdiYSggMjU1LCAyNTUsIDI1NSwgMC40ICk7XHJcblx0Ym9yZGVyLXJhZGl1czogJHsgQ09ORklHLnJhZGl1c1JvdW5kIH07XHJcblx0YmFja2Ryb3AtZmlsdGVyOiBibHVyKCAxNnB4ICkgc2F0dXJhdGUoIDE4MCUgKTtcclxuXHRib3gtc2hhZG93OiByZ2IoIDAgMCAwIC8gMTAlICkgMHB4IDBweCA4cHg7XHJcblxyXG5cdEBtZWRpYSBub3QgKCBwcmVmZXJzLXJlZHVjZWQtbW90aW9uICkge1xyXG5cdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDEwMG1zIGxpbmVhcjtcclxuXHR9XHJcblxyXG5cdCR7ICggeyBpc0RyYWdnaW5nIH06IHsgaXNEcmFnZ2luZzogYm9vbGVhbiB9ICkgPT5cclxuXHRcdGlzRHJhZ2dpbmcgJiZcclxuXHRcdGBcclxuXHRcdFx0Ym94LXNoYWRvdzogcmdiKCAwIDAgMCAvIDEyJSApIDBweCAwcHggMTBweDtcclxuXHRcdFx0dHJhbnNmb3JtOiBzY2FsZSggMS4xICk7XHJcblx0XHRcdGN1cnNvcjogZ3JhYmJpbmc7XHJcblx0XHRcdGAgfVxyXG5gO1xyXG4iXX0= */"));
//# sourceMappingURL=focal-point-style.js.map