/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';
import { useStoreState } from '@ariakit/react';

/**
 * WordPress dependencies
 */
import warning from '@wordpress/warning';
import { forwardRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { useTabsContext } from './context';
import { TabListWrapper } from './styles';
import clsx from 'clsx';
import { useTrackElementOffsetRect } from '../utils/element-rect';
import { useOnValueUpdate } from '../utils/hooks/use-on-value-update';
import { jsx as _jsx } from "react/jsx-runtime";
export const TabList = forwardRef(function TabList({
  children,
  ...otherProps
}, ref) {
  const context = useTabsContext();
  const tabStoreState = useStoreState(context?.store);
  const selectedId = tabStoreState?.selectedId;
  const indicatorPosition = useTrackElementOffsetRect(context?.store.item(selectedId)?.element);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  useOnValueUpdate(selectedId, ({
    previousValue
  }) => previousValue && setAnimationEnabled(true));
  if (!context || !tabStoreState) {
    globalThis.SCRIPT_DEBUG === true ? warning('`Tabs.TabList` must be wrapped in a `Tabs` component.') : void 0;
    return null;
  }
  const {
    store
  } = context;
  const {
    activeId,
    selectOnMove
  } = tabStoreState;
  const {
    setActiveId
  } = store;
  const onBlur = () => {
    if (!selectOnMove) {
      return;
    }

    // When automatic tab selection is on, make sure that the active tab is up
    // to date with the selected tab when leaving the tablist. This makes sure
    // that the selected tab will receive keyboard focus when tabbing back into
    // the tablist.
    if (selectedId !== activeId) {
      setActiveId(selectedId);
    }
  };
  return /*#__PURE__*/_jsx(Ariakit.TabList, {
    ref: ref,
    store: store,
    render: /*#__PURE__*/_jsx(TabListWrapper, {
      onTransitionEnd: event => {
        if (event.pseudoElement === '::after') {
          setAnimationEnabled(false);
        }
      }
    }),
    onBlur: onBlur,
    ...otherProps,
    style: {
      '--indicator-left': `${indicatorPosition.left}px`,
      '--indicator-top': `${indicatorPosition.top}px`,
      '--indicator-width': `${indicatorPosition.width}px`,
      '--indicator-height': `${indicatorPosition.height}px`,
      ...otherProps.style
    },
    className: clsx(animationEnabled ? 'is-animation-enabled' : '', otherProps.className),
    children: children
  });
});
//# sourceMappingURL=tablist.js.map