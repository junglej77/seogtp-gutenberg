function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/**
 * External dependencies
 */
import { css } from '@emotion/react';

/**
 * Internal dependencies
 */
import { COLORS, CONFIG, rtl } from '../utils';
export const borderBoxControl = /*#__PURE__*/css(process.env.NODE_ENV === "production" ? "" : ";label:borderBoxControl;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhbUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ib3JkZXItYm94LWNvbnRyb2wvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcsIHJ0bCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB0eXBlIHsgQm9yZGVyIH0gZnJvbSAnLi4vYm9yZGVyLWNvbnRyb2wvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IEJvcmRlcnMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sID0gY3NzYGA7XHJcblxyXG5leHBvcnQgY29uc3QgbGlua2VkQm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHRmbGV4OiAxO1xyXG5cdCR7IHJ0bCggeyBtYXJnaW5SaWdodDogJzI0cHgnIH0gKSgpIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sTGlua2VkQnV0dG9uID0gKFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzhweCcgOiAnM3B4JyB9O1xyXG5cdFx0JHsgcnRsKCB7IHJpZ2h0OiAwIH0gKSgpIH1cclxuXHRcdGxpbmUtaGVpZ2h0OiAwO1xyXG5cdGA7XHJcbn07XHJcblxyXG5jb25zdCBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayA9ICggYm9yZGVyPzogQm9yZGVyICkgPT4ge1xyXG5cdGNvbnN0IHtcclxuXHRcdGNvbG9yID0gQ09MT1JTLmdyYXlbIDIwMCBdLFxyXG5cdFx0c3R5bGUgPSAnc29saWQnLFxyXG5cdFx0d2lkdGggPSBDT05GSUcuYm9yZGVyV2lkdGgsXHJcblx0fSA9IGJvcmRlciB8fCB7fTtcclxuXHJcblx0Y29uc3QgY2xhbXBlZFdpZHRoID1cclxuXHRcdHdpZHRoICE9PSBDT05GSUcuYm9yZGVyV2lkdGggPyBgY2xhbXAoMXB4LCAkeyB3aWR0aCB9LCAxMHB4KWAgOiB3aWR0aDtcclxuXHRjb25zdCBoYXNWaXNpYmxlQm9yZGVyID0gKCAhISB3aWR0aCAmJiB3aWR0aCAhPT0gJzAnICkgfHwgISEgY29sb3I7XHJcblx0Y29uc3QgYm9yZGVyU3R5bGUgPSBoYXNWaXNpYmxlQm9yZGVyID8gc3R5bGUgfHwgJ3NvbGlkJyA6IHN0eWxlO1xyXG5cclxuXHRyZXR1cm4gYCR7IGNvbG9yIH0gJHsgYm9yZGVyU3R5bGUgfSAkeyBjbGFtcGVkV2lkdGggfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFZpc3VhbGl6ZXIgPSAoXHJcblx0Ym9yZGVycz86IEJvcmRlcnMsXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IHtcclxuXHRyZXR1cm4gY3NzYFxyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMjBweCcgOiAnMTVweCcgfTtcclxuXHRcdHJpZ2h0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvdHRvbTogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRsZWZ0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvcmRlci10b3A6ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy50b3AgKSB9O1xyXG5cdFx0Ym9yZGVyLWJvdHRvbTogJHsgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmJvdHRvbSApIH07XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyTGVmdDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmxlZnQgKSxcclxuXHRcdH0gKSgpIH1cclxuXHRcdCR7IHJ0bCgge1xyXG5cdFx0XHRib3JkZXJSaWdodDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LnJpZ2h0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sU3BsaXRDb250cm9scyA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRmbGV4OiAxO1xyXG5cdHdpZHRoOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyB1bmRlZmluZWQgOiAnODAlJyB9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNlbnRlcmVkQm9yZGVyQ29udHJvbCA9IGNzc2BcclxuXHRncmlkLWNvbHVtbjogc3BhbiAyO1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJpZ2h0Qm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHQkeyBydGwoIHsgbWFyZ2luTGVmdDogJ2F1dG8nIH0gKSgpIH1cclxuYDtcclxuIl19 */");
export const linkedBorderControl = () => /*#__PURE__*/css("flex:1;", rtl({
  marginRight: '24px'
})(), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:linkedBorderControl;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlNEMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ib3JkZXItYm94LWNvbnRyb2wvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcsIHJ0bCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB0eXBlIHsgQm9yZGVyIH0gZnJvbSAnLi4vYm9yZGVyLWNvbnRyb2wvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IEJvcmRlcnMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sID0gY3NzYGA7XHJcblxyXG5leHBvcnQgY29uc3QgbGlua2VkQm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHRmbGV4OiAxO1xyXG5cdCR7IHJ0bCggeyBtYXJnaW5SaWdodDogJzI0cHgnIH0gKSgpIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sTGlua2VkQnV0dG9uID0gKFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzhweCcgOiAnM3B4JyB9O1xyXG5cdFx0JHsgcnRsKCB7IHJpZ2h0OiAwIH0gKSgpIH1cclxuXHRcdGxpbmUtaGVpZ2h0OiAwO1xyXG5cdGA7XHJcbn07XHJcblxyXG5jb25zdCBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayA9ICggYm9yZGVyPzogQm9yZGVyICkgPT4ge1xyXG5cdGNvbnN0IHtcclxuXHRcdGNvbG9yID0gQ09MT1JTLmdyYXlbIDIwMCBdLFxyXG5cdFx0c3R5bGUgPSAnc29saWQnLFxyXG5cdFx0d2lkdGggPSBDT05GSUcuYm9yZGVyV2lkdGgsXHJcblx0fSA9IGJvcmRlciB8fCB7fTtcclxuXHJcblx0Y29uc3QgY2xhbXBlZFdpZHRoID1cclxuXHRcdHdpZHRoICE9PSBDT05GSUcuYm9yZGVyV2lkdGggPyBgY2xhbXAoMXB4LCAkeyB3aWR0aCB9LCAxMHB4KWAgOiB3aWR0aDtcclxuXHRjb25zdCBoYXNWaXNpYmxlQm9yZGVyID0gKCAhISB3aWR0aCAmJiB3aWR0aCAhPT0gJzAnICkgfHwgISEgY29sb3I7XHJcblx0Y29uc3QgYm9yZGVyU3R5bGUgPSBoYXNWaXNpYmxlQm9yZGVyID8gc3R5bGUgfHwgJ3NvbGlkJyA6IHN0eWxlO1xyXG5cclxuXHRyZXR1cm4gYCR7IGNvbG9yIH0gJHsgYm9yZGVyU3R5bGUgfSAkeyBjbGFtcGVkV2lkdGggfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFZpc3VhbGl6ZXIgPSAoXHJcblx0Ym9yZGVycz86IEJvcmRlcnMsXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IHtcclxuXHRyZXR1cm4gY3NzYFxyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMjBweCcgOiAnMTVweCcgfTtcclxuXHRcdHJpZ2h0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvdHRvbTogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRsZWZ0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvcmRlci10b3A6ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy50b3AgKSB9O1xyXG5cdFx0Ym9yZGVyLWJvdHRvbTogJHsgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmJvdHRvbSApIH07XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyTGVmdDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmxlZnQgKSxcclxuXHRcdH0gKSgpIH1cclxuXHRcdCR7IHJ0bCgge1xyXG5cdFx0XHRib3JkZXJSaWdodDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LnJpZ2h0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sU3BsaXRDb250cm9scyA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRmbGV4OiAxO1xyXG5cdHdpZHRoOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyB1bmRlZmluZWQgOiAnODAlJyB9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNlbnRlcmVkQm9yZGVyQ29udHJvbCA9IGNzc2BcclxuXHRncmlkLWNvbHVtbjogc3BhbiAyO1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJpZ2h0Qm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHQkeyBydGwoIHsgbWFyZ2luTGVmdDogJ2F1dG8nIH0gKSgpIH1cclxuYDtcclxuIl19 */");
export const wrapper = process.env.NODE_ENV === "production" ? {
  name: "bjn8wh",
  styles: "position:relative"
} : {
  name: "memc06-wrapper",
  styles: "position:relative;label:wrapper;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQjBCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IENPTE9SUywgQ09ORklHLCBydGwgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IEJvcmRlciB9IGZyb20gJy4uL2JvcmRlci1jb250cm9sL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBCb3JkZXJzIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbCA9IGNzc2BgO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmtlZEJvcmRlckNvbnRyb2wgPSAoKSA9PiBjc3NgXHJcblx0ZmxleDogMTtcclxuXHQkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcyNHB4JyB9ICkoKSB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3Qgd3JhcHBlciA9IGNzc2BcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbExpbmtlZEJ1dHRvbiA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4ge1xyXG5cdHJldHVybiBjc3NgXHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6ICR7IHNpemUgPT09ICdfX3Vuc3RhYmxlLWxhcmdlJyA/ICc4cHgnIDogJzNweCcgfTtcclxuXHRcdCR7IHJ0bCggeyByaWdodDogMCB9ICkoKSB9XHJcblx0XHRsaW5lLWhlaWdodDogMDtcclxuXHRgO1xyXG59O1xyXG5cclxuY29uc3QgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2sgPSAoIGJvcmRlcj86IEJvcmRlciApID0+IHtcclxuXHRjb25zdCB7XHJcblx0XHRjb2xvciA9IENPTE9SUy5ncmF5WyAyMDAgXSxcclxuXHRcdHN0eWxlID0gJ3NvbGlkJyxcclxuXHRcdHdpZHRoID0gQ09ORklHLmJvcmRlcldpZHRoLFxyXG5cdH0gPSBib3JkZXIgfHwge307XHJcblxyXG5cdGNvbnN0IGNsYW1wZWRXaWR0aCA9XHJcblx0XHR3aWR0aCAhPT0gQ09ORklHLmJvcmRlcldpZHRoID8gYGNsYW1wKDFweCwgJHsgd2lkdGggfSwgMTBweClgIDogd2lkdGg7XHJcblx0Y29uc3QgaGFzVmlzaWJsZUJvcmRlciA9ICggISEgd2lkdGggJiYgd2lkdGggIT09ICcwJyApIHx8ICEhIGNvbG9yO1xyXG5cdGNvbnN0IGJvcmRlclN0eWxlID0gaGFzVmlzaWJsZUJvcmRlciA/IHN0eWxlIHx8ICdzb2xpZCcgOiBzdHlsZTtcclxuXHJcblx0cmV0dXJuIGAkeyBjb2xvciB9ICR7IGJvcmRlclN0eWxlIH0gJHsgY2xhbXBlZFdpZHRoIH1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJvcmRlckJveENvbnRyb2xWaXN1YWxpemVyID0gKFxyXG5cdGJvcmRlcnM/OiBCb3JkZXJzLFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRyaWdodDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzM5cHgnIDogJzI5cHgnIH07XHJcblx0XHRib3R0b206ICR7IHNpemUgPT09ICdfX3Vuc3RhYmxlLWxhcmdlJyA/ICcyMHB4JyA6ICcxNXB4JyB9O1xyXG5cdFx0bGVmdDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzM5cHgnIDogJzI5cHgnIH07XHJcblx0XHRib3JkZXItdG9wOiAkeyBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayggYm9yZGVycz8udG9wICkgfTtcclxuXHRcdGJvcmRlci1ib3R0b206ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5ib3R0b20gKSB9O1xyXG5cdFx0JHsgcnRsKCB7XHJcblx0XHRcdGJvcmRlckxlZnQ6IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5sZWZ0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyUmlnaHQ6IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5yaWdodCApLFxyXG5cdFx0fSApKCkgfVxyXG5cdGA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFNwbGl0Q29udHJvbHMgPSAoXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IGNzc2BcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0ZmxleDogMTtcclxuXHR3aWR0aDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gdW5kZWZpbmVkIDogJzgwJScgfTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBjZW50ZXJlZEJvcmRlckNvbnRyb2wgPSBjc3NgXHJcblx0Z3JpZC1jb2x1bW46IHNwYW4gMjtcclxuXHRtYXJnaW46IDAgYXV0bztcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCByaWdodEJvcmRlckNvbnRyb2wgPSAoKSA9PiBjc3NgXHJcblx0JHsgcnRsKCB7IG1hcmdpbkxlZnQ6ICdhdXRvJyB9ICkoKSB9XHJcbmA7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
export const borderBoxControlLinkedButton = size => {
  return /*#__PURE__*/css("position:absolute;top:", size === '__unstable-large' ? '8px' : '3px', ";", rtl({
    right: 0
  })(), " line-height:0;" + (process.env.NODE_ENV === "production" ? "" : ";label:borderBoxControlLinkedButton;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQlciLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ib3JkZXItYm94LWNvbnRyb2wvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcsIHJ0bCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB0eXBlIHsgQm9yZGVyIH0gZnJvbSAnLi4vYm9yZGVyLWNvbnRyb2wvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IEJvcmRlcnMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sID0gY3NzYGA7XHJcblxyXG5leHBvcnQgY29uc3QgbGlua2VkQm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHRmbGV4OiAxO1xyXG5cdCR7IHJ0bCggeyBtYXJnaW5SaWdodDogJzI0cHgnIH0gKSgpIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sTGlua2VkQnV0dG9uID0gKFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzhweCcgOiAnM3B4JyB9O1xyXG5cdFx0JHsgcnRsKCB7IHJpZ2h0OiAwIH0gKSgpIH1cclxuXHRcdGxpbmUtaGVpZ2h0OiAwO1xyXG5cdGA7XHJcbn07XHJcblxyXG5jb25zdCBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayA9ICggYm9yZGVyPzogQm9yZGVyICkgPT4ge1xyXG5cdGNvbnN0IHtcclxuXHRcdGNvbG9yID0gQ09MT1JTLmdyYXlbIDIwMCBdLFxyXG5cdFx0c3R5bGUgPSAnc29saWQnLFxyXG5cdFx0d2lkdGggPSBDT05GSUcuYm9yZGVyV2lkdGgsXHJcblx0fSA9IGJvcmRlciB8fCB7fTtcclxuXHJcblx0Y29uc3QgY2xhbXBlZFdpZHRoID1cclxuXHRcdHdpZHRoICE9PSBDT05GSUcuYm9yZGVyV2lkdGggPyBgY2xhbXAoMXB4LCAkeyB3aWR0aCB9LCAxMHB4KWAgOiB3aWR0aDtcclxuXHRjb25zdCBoYXNWaXNpYmxlQm9yZGVyID0gKCAhISB3aWR0aCAmJiB3aWR0aCAhPT0gJzAnICkgfHwgISEgY29sb3I7XHJcblx0Y29uc3QgYm9yZGVyU3R5bGUgPSBoYXNWaXNpYmxlQm9yZGVyID8gc3R5bGUgfHwgJ3NvbGlkJyA6IHN0eWxlO1xyXG5cclxuXHRyZXR1cm4gYCR7IGNvbG9yIH0gJHsgYm9yZGVyU3R5bGUgfSAkeyBjbGFtcGVkV2lkdGggfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFZpc3VhbGl6ZXIgPSAoXHJcblx0Ym9yZGVycz86IEJvcmRlcnMsXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IHtcclxuXHRyZXR1cm4gY3NzYFxyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMjBweCcgOiAnMTVweCcgfTtcclxuXHRcdHJpZ2h0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvdHRvbTogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRsZWZ0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvcmRlci10b3A6ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy50b3AgKSB9O1xyXG5cdFx0Ym9yZGVyLWJvdHRvbTogJHsgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmJvdHRvbSApIH07XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyTGVmdDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmxlZnQgKSxcclxuXHRcdH0gKSgpIH1cclxuXHRcdCR7IHJ0bCgge1xyXG5cdFx0XHRib3JkZXJSaWdodDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LnJpZ2h0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sU3BsaXRDb250cm9scyA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRmbGV4OiAxO1xyXG5cdHdpZHRoOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyB1bmRlZmluZWQgOiAnODAlJyB9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNlbnRlcmVkQm9yZGVyQ29udHJvbCA9IGNzc2BcclxuXHRncmlkLWNvbHVtbjogc3BhbiAyO1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJpZ2h0Qm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHQkeyBydGwoIHsgbWFyZ2luTGVmdDogJ2F1dG8nIH0gKSgpIH1cclxuYDtcclxuIl19 */");
};
const borderBoxStyleWithFallback = border => {
  const {
    color = COLORS.gray[200],
    style = 'solid',
    width = CONFIG.borderWidth
  } = border || {};
  const clampedWidth = width !== CONFIG.borderWidth ? `clamp(1px, ${width}, 10px)` : width;
  const hasVisibleBorder = !!width && width !== '0' || !!color;
  const borderStyle = hasVisibleBorder ? style || 'solid' : style;
  return `${color} ${borderStyle} ${clampedWidth}`;
};
export const borderBoxControlVisualizer = (borders, size) => {
  return /*#__PURE__*/css("position:absolute;top:", size === '__unstable-large' ? '20px' : '15px', ";right:", size === '__unstable-large' ? '39px' : '29px', ";bottom:", size === '__unstable-large' ? '20px' : '15px', ";left:", size === '__unstable-large' ? '39px' : '29px', ";border-top:", borderBoxStyleWithFallback(borders?.top), ";border-bottom:", borderBoxStyleWithFallback(borders?.bottom), ";", rtl({
    borderLeft: borderBoxStyleWithFallback(borders?.left)
  })(), " ", rtl({
    borderRight: borderBoxStyleWithFallback(borders?.right)
  })(), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:borderBoxControlVisualizer;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzRFciLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ib3JkZXItYm94LWNvbnRyb2wvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcsIHJ0bCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB0eXBlIHsgQm9yZGVyIH0gZnJvbSAnLi4vYm9yZGVyLWNvbnRyb2wvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IEJvcmRlcnMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sID0gY3NzYGA7XHJcblxyXG5leHBvcnQgY29uc3QgbGlua2VkQm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHRmbGV4OiAxO1xyXG5cdCR7IHJ0bCggeyBtYXJnaW5SaWdodDogJzI0cHgnIH0gKSgpIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sTGlua2VkQnV0dG9uID0gKFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzhweCcgOiAnM3B4JyB9O1xyXG5cdFx0JHsgcnRsKCB7IHJpZ2h0OiAwIH0gKSgpIH1cclxuXHRcdGxpbmUtaGVpZ2h0OiAwO1xyXG5cdGA7XHJcbn07XHJcblxyXG5jb25zdCBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayA9ICggYm9yZGVyPzogQm9yZGVyICkgPT4ge1xyXG5cdGNvbnN0IHtcclxuXHRcdGNvbG9yID0gQ09MT1JTLmdyYXlbIDIwMCBdLFxyXG5cdFx0c3R5bGUgPSAnc29saWQnLFxyXG5cdFx0d2lkdGggPSBDT05GSUcuYm9yZGVyV2lkdGgsXHJcblx0fSA9IGJvcmRlciB8fCB7fTtcclxuXHJcblx0Y29uc3QgY2xhbXBlZFdpZHRoID1cclxuXHRcdHdpZHRoICE9PSBDT05GSUcuYm9yZGVyV2lkdGggPyBgY2xhbXAoMXB4LCAkeyB3aWR0aCB9LCAxMHB4KWAgOiB3aWR0aDtcclxuXHRjb25zdCBoYXNWaXNpYmxlQm9yZGVyID0gKCAhISB3aWR0aCAmJiB3aWR0aCAhPT0gJzAnICkgfHwgISEgY29sb3I7XHJcblx0Y29uc3QgYm9yZGVyU3R5bGUgPSBoYXNWaXNpYmxlQm9yZGVyID8gc3R5bGUgfHwgJ3NvbGlkJyA6IHN0eWxlO1xyXG5cclxuXHRyZXR1cm4gYCR7IGNvbG9yIH0gJHsgYm9yZGVyU3R5bGUgfSAkeyBjbGFtcGVkV2lkdGggfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFZpc3VhbGl6ZXIgPSAoXHJcblx0Ym9yZGVycz86IEJvcmRlcnMsXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IHtcclxuXHRyZXR1cm4gY3NzYFxyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMjBweCcgOiAnMTVweCcgfTtcclxuXHRcdHJpZ2h0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvdHRvbTogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRsZWZ0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvcmRlci10b3A6ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy50b3AgKSB9O1xyXG5cdFx0Ym9yZGVyLWJvdHRvbTogJHsgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmJvdHRvbSApIH07XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyTGVmdDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmxlZnQgKSxcclxuXHRcdH0gKSgpIH1cclxuXHRcdCR7IHJ0bCgge1xyXG5cdFx0XHRib3JkZXJSaWdodDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LnJpZ2h0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sU3BsaXRDb250cm9scyA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRmbGV4OiAxO1xyXG5cdHdpZHRoOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyB1bmRlZmluZWQgOiAnODAlJyB9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNlbnRlcmVkQm9yZGVyQ29udHJvbCA9IGNzc2BcclxuXHRncmlkLWNvbHVtbjogc3BhbiAyO1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJpZ2h0Qm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHQkeyBydGwoIHsgbWFyZ2luTGVmdDogJ2F1dG8nIH0gKSgpIH1cclxuYDtcclxuIl19 */");
};
export const borderBoxControlSplitControls = size => /*#__PURE__*/css("position:relative;flex:1;width:", size === '__unstable-large' ? undefined : '80%', ";" + (process.env.NODE_ENV === "production" ? "" : ";label:borderBoxControlSplitControls;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5RVEiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ib3JkZXItYm94LWNvbnRyb2wvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcsIHJ0bCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB0eXBlIHsgQm9yZGVyIH0gZnJvbSAnLi4vYm9yZGVyLWNvbnRyb2wvdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSB7IEJvcmRlcnMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sID0gY3NzYGA7XHJcblxyXG5leHBvcnQgY29uc3QgbGlua2VkQm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHRmbGV4OiAxO1xyXG5cdCR7IHJ0bCggeyBtYXJnaW5SaWdodDogJzI0cHgnIH0gKSgpIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sTGlua2VkQnV0dG9uID0gKFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzhweCcgOiAnM3B4JyB9O1xyXG5cdFx0JHsgcnRsKCB7IHJpZ2h0OiAwIH0gKSgpIH1cclxuXHRcdGxpbmUtaGVpZ2h0OiAwO1xyXG5cdGA7XHJcbn07XHJcblxyXG5jb25zdCBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayA9ICggYm9yZGVyPzogQm9yZGVyICkgPT4ge1xyXG5cdGNvbnN0IHtcclxuXHRcdGNvbG9yID0gQ09MT1JTLmdyYXlbIDIwMCBdLFxyXG5cdFx0c3R5bGUgPSAnc29saWQnLFxyXG5cdFx0d2lkdGggPSBDT05GSUcuYm9yZGVyV2lkdGgsXHJcblx0fSA9IGJvcmRlciB8fCB7fTtcclxuXHJcblx0Y29uc3QgY2xhbXBlZFdpZHRoID1cclxuXHRcdHdpZHRoICE9PSBDT05GSUcuYm9yZGVyV2lkdGggPyBgY2xhbXAoMXB4LCAkeyB3aWR0aCB9LCAxMHB4KWAgOiB3aWR0aDtcclxuXHRjb25zdCBoYXNWaXNpYmxlQm9yZGVyID0gKCAhISB3aWR0aCAmJiB3aWR0aCAhPT0gJzAnICkgfHwgISEgY29sb3I7XHJcblx0Y29uc3QgYm9yZGVyU3R5bGUgPSBoYXNWaXNpYmxlQm9yZGVyID8gc3R5bGUgfHwgJ3NvbGlkJyA6IHN0eWxlO1xyXG5cclxuXHRyZXR1cm4gYCR7IGNvbG9yIH0gJHsgYm9yZGVyU3R5bGUgfSAkeyBjbGFtcGVkV2lkdGggfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFZpc3VhbGl6ZXIgPSAoXHJcblx0Ym9yZGVycz86IEJvcmRlcnMsXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IHtcclxuXHRyZXR1cm4gY3NzYFxyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMjBweCcgOiAnMTVweCcgfTtcclxuXHRcdHJpZ2h0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvdHRvbTogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRsZWZ0OiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyAnMzlweCcgOiAnMjlweCcgfTtcclxuXHRcdGJvcmRlci10b3A6ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy50b3AgKSB9O1xyXG5cdFx0Ym9yZGVyLWJvdHRvbTogJHsgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmJvdHRvbSApIH07XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyTGVmdDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LmxlZnQgKSxcclxuXHRcdH0gKSgpIH1cclxuXHRcdCR7IHJ0bCgge1xyXG5cdFx0XHRib3JkZXJSaWdodDogYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2soIGJvcmRlcnM/LnJpZ2h0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBib3JkZXJCb3hDb250cm9sU3BsaXRDb250cm9scyA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4gY3NzYFxyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRmbGV4OiAxO1xyXG5cdHdpZHRoOiAkeyBzaXplID09PSAnX191bnN0YWJsZS1sYXJnZScgPyB1bmRlZmluZWQgOiAnODAlJyB9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNlbnRlcmVkQm9yZGVyQ29udHJvbCA9IGNzc2BcclxuXHRncmlkLWNvbHVtbjogc3BhbiAyO1xyXG5cdG1hcmdpbjogMCBhdXRvO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJpZ2h0Qm9yZGVyQ29udHJvbCA9ICgpID0+IGNzc2BcclxuXHQkeyBydGwoIHsgbWFyZ2luTGVmdDogJ2F1dG8nIH0gKSgpIH1cclxuYDtcclxuIl19 */");
export const centeredBorderControl = process.env.NODE_ENV === "production" ? {
  name: "1nwbfnf",
  styles: "grid-column:span 2;margin:0 auto"
} : {
  name: "gedmrr-centeredBorderControl",
  styles: "grid-column:span 2;margin:0 auto;label:centeredBorderControl;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErRXdDIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IENPTE9SUywgQ09ORklHLCBydGwgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IEJvcmRlciB9IGZyb20gJy4uL2JvcmRlci1jb250cm9sL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBCb3JkZXJzIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbCA9IGNzc2BgO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmtlZEJvcmRlckNvbnRyb2wgPSAoKSA9PiBjc3NgXHJcblx0ZmxleDogMTtcclxuXHQkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcyNHB4JyB9ICkoKSB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3Qgd3JhcHBlciA9IGNzc2BcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbExpbmtlZEJ1dHRvbiA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4ge1xyXG5cdHJldHVybiBjc3NgXHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6ICR7IHNpemUgPT09ICdfX3Vuc3RhYmxlLWxhcmdlJyA/ICc4cHgnIDogJzNweCcgfTtcclxuXHRcdCR7IHJ0bCggeyByaWdodDogMCB9ICkoKSB9XHJcblx0XHRsaW5lLWhlaWdodDogMDtcclxuXHRgO1xyXG59O1xyXG5cclxuY29uc3QgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2sgPSAoIGJvcmRlcj86IEJvcmRlciApID0+IHtcclxuXHRjb25zdCB7XHJcblx0XHRjb2xvciA9IENPTE9SUy5ncmF5WyAyMDAgXSxcclxuXHRcdHN0eWxlID0gJ3NvbGlkJyxcclxuXHRcdHdpZHRoID0gQ09ORklHLmJvcmRlcldpZHRoLFxyXG5cdH0gPSBib3JkZXIgfHwge307XHJcblxyXG5cdGNvbnN0IGNsYW1wZWRXaWR0aCA9XHJcblx0XHR3aWR0aCAhPT0gQ09ORklHLmJvcmRlcldpZHRoID8gYGNsYW1wKDFweCwgJHsgd2lkdGggfSwgMTBweClgIDogd2lkdGg7XHJcblx0Y29uc3QgaGFzVmlzaWJsZUJvcmRlciA9ICggISEgd2lkdGggJiYgd2lkdGggIT09ICcwJyApIHx8ICEhIGNvbG9yO1xyXG5cdGNvbnN0IGJvcmRlclN0eWxlID0gaGFzVmlzaWJsZUJvcmRlciA/IHN0eWxlIHx8ICdzb2xpZCcgOiBzdHlsZTtcclxuXHJcblx0cmV0dXJuIGAkeyBjb2xvciB9ICR7IGJvcmRlclN0eWxlIH0gJHsgY2xhbXBlZFdpZHRoIH1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJvcmRlckJveENvbnRyb2xWaXN1YWxpemVyID0gKFxyXG5cdGJvcmRlcnM/OiBCb3JkZXJzLFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRyaWdodDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzM5cHgnIDogJzI5cHgnIH07XHJcblx0XHRib3R0b206ICR7IHNpemUgPT09ICdfX3Vuc3RhYmxlLWxhcmdlJyA/ICcyMHB4JyA6ICcxNXB4JyB9O1xyXG5cdFx0bGVmdDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzM5cHgnIDogJzI5cHgnIH07XHJcblx0XHRib3JkZXItdG9wOiAkeyBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayggYm9yZGVycz8udG9wICkgfTtcclxuXHRcdGJvcmRlci1ib3R0b206ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5ib3R0b20gKSB9O1xyXG5cdFx0JHsgcnRsKCB7XHJcblx0XHRcdGJvcmRlckxlZnQ6IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5sZWZ0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyUmlnaHQ6IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5yaWdodCApLFxyXG5cdFx0fSApKCkgfVxyXG5cdGA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFNwbGl0Q29udHJvbHMgPSAoXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IGNzc2BcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0ZmxleDogMTtcclxuXHR3aWR0aDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gdW5kZWZpbmVkIDogJzgwJScgfTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBjZW50ZXJlZEJvcmRlckNvbnRyb2wgPSBjc3NgXHJcblx0Z3JpZC1jb2x1bW46IHNwYW4gMjtcclxuXHRtYXJnaW46IDAgYXV0bztcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCByaWdodEJvcmRlckNvbnRyb2wgPSAoKSA9PiBjc3NgXHJcblx0JHsgcnRsKCB7IG1hcmdpbkxlZnQ6ICdhdXRvJyB9ICkoKSB9XHJcbmA7XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
export const rightBorderControl = () => /*#__PURE__*/css(rtl({
  marginLeft: 'auto'
})(), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:rightBorderControl;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvRjJDIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYm9yZGVyLWJveC1jb250cm9sL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IENPTE9SUywgQ09ORklHLCBydGwgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IEJvcmRlciB9IGZyb20gJy4uL2JvcmRlci1jb250cm9sL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgeyBCb3JkZXJzIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbCA9IGNzc2BgO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmtlZEJvcmRlckNvbnRyb2wgPSAoKSA9PiBjc3NgXHJcblx0ZmxleDogMTtcclxuXHQkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcyNHB4JyB9ICkoKSB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3Qgd3JhcHBlciA9IGNzc2BcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbExpbmtlZEJ1dHRvbiA9IChcclxuXHRzaXplPzogJ2RlZmF1bHQnIHwgJ19fdW5zdGFibGUtbGFyZ2UnXHJcbikgPT4ge1xyXG5cdHJldHVybiBjc3NgXHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6ICR7IHNpemUgPT09ICdfX3Vuc3RhYmxlLWxhcmdlJyA/ICc4cHgnIDogJzNweCcgfTtcclxuXHRcdCR7IHJ0bCggeyByaWdodDogMCB9ICkoKSB9XHJcblx0XHRsaW5lLWhlaWdodDogMDtcclxuXHRgO1xyXG59O1xyXG5cclxuY29uc3QgYm9yZGVyQm94U3R5bGVXaXRoRmFsbGJhY2sgPSAoIGJvcmRlcj86IEJvcmRlciApID0+IHtcclxuXHRjb25zdCB7XHJcblx0XHRjb2xvciA9IENPTE9SUy5ncmF5WyAyMDAgXSxcclxuXHRcdHN0eWxlID0gJ3NvbGlkJyxcclxuXHRcdHdpZHRoID0gQ09ORklHLmJvcmRlcldpZHRoLFxyXG5cdH0gPSBib3JkZXIgfHwge307XHJcblxyXG5cdGNvbnN0IGNsYW1wZWRXaWR0aCA9XHJcblx0XHR3aWR0aCAhPT0gQ09ORklHLmJvcmRlcldpZHRoID8gYGNsYW1wKDFweCwgJHsgd2lkdGggfSwgMTBweClgIDogd2lkdGg7XHJcblx0Y29uc3QgaGFzVmlzaWJsZUJvcmRlciA9ICggISEgd2lkdGggJiYgd2lkdGggIT09ICcwJyApIHx8ICEhIGNvbG9yO1xyXG5cdGNvbnN0IGJvcmRlclN0eWxlID0gaGFzVmlzaWJsZUJvcmRlciA/IHN0eWxlIHx8ICdzb2xpZCcgOiBzdHlsZTtcclxuXHJcblx0cmV0dXJuIGAkeyBjb2xvciB9ICR7IGJvcmRlclN0eWxlIH0gJHsgY2xhbXBlZFdpZHRoIH1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJvcmRlckJveENvbnRyb2xWaXN1YWxpemVyID0gKFxyXG5cdGJvcmRlcnM/OiBCb3JkZXJzLFxyXG5cdHNpemU/OiAnZGVmYXVsdCcgfCAnX191bnN0YWJsZS1sYXJnZSdcclxuKSA9PiB7XHJcblx0cmV0dXJuIGNzc2BcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzIwcHgnIDogJzE1cHgnIH07XHJcblx0XHRyaWdodDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzM5cHgnIDogJzI5cHgnIH07XHJcblx0XHRib3R0b206ICR7IHNpemUgPT09ICdfX3Vuc3RhYmxlLWxhcmdlJyA/ICcyMHB4JyA6ICcxNXB4JyB9O1xyXG5cdFx0bGVmdDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gJzM5cHgnIDogJzI5cHgnIH07XHJcblx0XHRib3JkZXItdG9wOiAkeyBib3JkZXJCb3hTdHlsZVdpdGhGYWxsYmFjayggYm9yZGVycz8udG9wICkgfTtcclxuXHRcdGJvcmRlci1ib3R0b206ICR7IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5ib3R0b20gKSB9O1xyXG5cdFx0JHsgcnRsKCB7XHJcblx0XHRcdGJvcmRlckxlZnQ6IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5sZWZ0ICksXHJcblx0XHR9ICkoKSB9XHJcblx0XHQkeyBydGwoIHtcclxuXHRcdFx0Ym9yZGVyUmlnaHQ6IGJvcmRlckJveFN0eWxlV2l0aEZhbGxiYWNrKCBib3JkZXJzPy5yaWdodCApLFxyXG5cdFx0fSApKCkgfVxyXG5cdGA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYm9yZGVyQm94Q29udHJvbFNwbGl0Q29udHJvbHMgPSAoXHJcblx0c2l6ZT86ICdkZWZhdWx0JyB8ICdfX3Vuc3RhYmxlLWxhcmdlJ1xyXG4pID0+IGNzc2BcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0ZmxleDogMTtcclxuXHR3aWR0aDogJHsgc2l6ZSA9PT0gJ19fdW5zdGFibGUtbGFyZ2UnID8gdW5kZWZpbmVkIDogJzgwJScgfTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBjZW50ZXJlZEJvcmRlckNvbnRyb2wgPSBjc3NgXHJcblx0Z3JpZC1jb2x1bW46IHNwYW4gMjtcclxuXHRtYXJnaW46IDAgYXV0bztcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCByaWdodEJvcmRlckNvbnRyb2wgPSAoKSA9PiBjc3NgXHJcblx0JHsgcnRsKCB7IG1hcmdpbkxlZnQ6ICdhdXRvJyB9ICkoKSB9XHJcbmA7XHJcbiJdfQ== */");
//# sourceMappingURL=styles.js.map