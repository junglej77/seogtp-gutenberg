/**
 * External dependencies
 */

import { css } from '@emotion/react';

/**
 * Internal dependencies
 */

import { useContextSystem } from '../../context';
import { useFlexContext } from '../context';
import * as styles from '../styles';
import { useCx } from '../../utils/hooks/use-cx';
export function useFlexItem(props) {
  const {
    className,
    display: displayProp,
    isBlock = false,
    ...otherProps
  } = useContextSystem(props, 'FlexItem');
  const sx = {};
  const contextDisplay = useFlexContext().flexItemDisplay;
  sx.Base = /*#__PURE__*/css({
    display: displayProp || contextDisplay
  }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4LWl0ZW0vaG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ1ciLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9mbGV4L2ZsZXgtaXRlbS9ob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi8uLi9jb250ZXh0JztcclxuaW1wb3J0IHsgdXNlRmxleENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcclxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XHJcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcclxuaW1wb3J0IHR5cGUgeyBGbGV4SXRlbVByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZsZXhJdGVtKFxyXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleEl0ZW1Qcm9wcywgJ2RpdicgPlxyXG4pIHtcclxuXHRjb25zdCB7XHJcblx0XHRjbGFzc05hbWUsXHJcblx0XHRkaXNwbGF5OiBkaXNwbGF5UHJvcCxcclxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcclxuXHRcdC4uLm90aGVyUHJvcHNcclxuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdGbGV4SXRlbScgKTtcclxuXHJcblx0Y29uc3Qgc3g6IHtcclxuXHRcdEJhc2U/OiBTZXJpYWxpemVkU3R5bGVzO1xyXG5cdH0gPSB7fTtcclxuXHJcblx0Y29uc3QgY29udGV4dERpc3BsYXkgPSB1c2VGbGV4Q29udGV4dCgpLmZsZXhJdGVtRGlzcGxheTtcclxuXHJcblx0c3guQmFzZSA9IGNzcygge1xyXG5cdFx0ZGlzcGxheTogZGlzcGxheVByb3AgfHwgY29udGV4dERpc3BsYXksXHJcblx0fSApO1xyXG5cclxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XHJcblxyXG5cdGNvbnN0IGNsYXNzZXMgPSBjeChcclxuXHRcdHN0eWxlcy5JdGVtLFxyXG5cdFx0c3guQmFzZSxcclxuXHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxyXG5cdFx0Y2xhc3NOYW1lXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdC4uLm90aGVyUHJvcHMsXHJcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXHJcblx0fTtcclxufVxyXG4iXX0= */");
  const cx = useCx();
  const classes = cx(styles.Item, sx.Base, isBlock && styles.block, className);
  return {
    ...otherProps,
    className: classes
  };
}
//# sourceMappingURL=hook.js.map