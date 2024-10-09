// 外部依赖
import clsx from 'clsx';

// WordPress 依赖
import { createContext, useContext, useState, useRef, useLayoutEffect } from '@wordpress/element';
import { focus } from '@wordpress/dom';

// 创建一个上下文，用于管理侧边栏导航状态
import { jsx as _jsx } from "react/jsx-runtime";
export const SidebarNavigationContext = createContext(() => {});

// 根据导航方向和选择器聚焦侧边栏元素
function focusSidebarElement(el, direction, focusSelector) {
  let elementToFocus;
  if (direction === 'back' && focusSelector) {
    elementToFocus = el.querySelector(focusSelector);
  }
  if (direction !== null && !elementToFocus) {
    const [firstTabbable] = focus.tabbable.find(el);
    elementToFocus = firstTabbable !== null && firstTabbable !== void 0 ? firstTabbable : el;
  }
  elementToFocus?.focus();
}

// 创建导航状态，用于管理导航方向和聚焦选择器
function createNavState() {
  let state = {
    direction: null,
    focusSelector: null
  };
  return {
    get() {
      return state;
    },
    navigate(direction, focusSelector = null) {
      state = {
        direction,
        focusSelector: direction === 'forward' && focusSelector ? focusSelector : state.focusSelector
      };
    }
  };
}

// 侧边栏内容包装组件
function SidebarContentWrapper({
  children
}) {
  const navState = useContext(SidebarNavigationContext);
  const wrapperRef = useRef();
  const [navAnimation, setNavAnimation] = useState(null);
  useLayoutEffect(() => {
    const {
      direction,
      focusSelector
    } = navState.get();
    focusSidebarElement(wrapperRef.current, direction, focusSelector);
    setNavAnimation(direction);
  }, [navState]);
  const wrapperCls = clsx('edit-site-sidebar__screen-wrapper', {
    'slide-from-left': navAnimation === 'back',
    'slide-from-right': navAnimation === 'forward'
  });
  return /*#__PURE__*/_jsx("div", {
    ref: wrapperRef,
    className: wrapperCls,
    children: children
  });
}

// 侧边栏内容主组件
export default function SidebarContent({
  routeKey,
  children
}) {
  const [navState] = useState(createNavState);
  return /*#__PURE__*/_jsx(SidebarNavigationContext.Provider, {
    value: navState,
    children: /*#__PURE__*/_jsx("div", {
      className: "edit-site-sidebar__content",
      children: /*#__PURE__*/_jsx(SidebarContentWrapper, {
        children: children
      }, routeKey)
    })
  });
}
//# sourceMappingURL=index.js.map