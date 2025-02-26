/**
 * External dependencies
 */
import { Animated, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SegmentedControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockTypesTab from './block-types-tab';
import ReusableBlocksTab from './reusable-blocks-tab';
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
const TAB_ANIMATION_DURATION = 250;
function InserterTabs({
  listProps,
  onSelect,
  rootClientId,
  showReusableBlocks,
  tabIndex
}) {
  const tabAnimation = useRef(new Animated.Value(0)).current;
  const lastScrollEvents = useRef([]).current;
  const [wrapperWidth, setWrapperWidth] = useState(0);
  function onScroll(event) {
    lastScrollEvents[tabIndex] = event.nativeEvent;
    listProps.onScroll(event);
  }
  const onWrapperLayout = useCallback(({
    nativeEvent
  }) => {
    setWrapperWidth(nativeEvent.layout.width);
  }, [setWrapperWidth]);
  useEffect(() => {
    Animated.timing(tabAnimation, {
      duration: TAB_ANIMATION_DURATION,
      toValue: tabIndex,
      useNativeDriver: true
    }).start();

    // Notify upstream with the last scroll event of the current tab.
    const lastScrollEvent = lastScrollEvents[tabIndex];
    if (lastScrollEvent) {
      listProps.onScroll({
        nativeEvent: lastScrollEvent
      });
    }
  }, [tabIndex]);
  const {
    tabs,
    tabKeys
  } = useMemo(() => {
    const filteredTabs = InserterTabs.getTabs().filter(({
      name
    }) => showReusableBlocks || name !== 'reusable');
    return {
      tabs: filteredTabs,
      tabKeys: [...filteredTabs.keys()]
    };
  }, [showReusableBlocks]);
  const translateX = useMemo(() => tabKeys.length > 1 ? tabAnimation.interpolate({
    inputRange: tabKeys,
    outputRange: tabKeys.map(key => key * -wrapperWidth)
  }) : tabAnimation, [tabAnimation, tabKeys, wrapperWidth]);
  const containerStyle = [styles['inserter-tabs__container'], {
    width: wrapperWidth * tabKeys.length,
    transform: [{
      translateX
    }]
  }];
  return /*#__PURE__*/_jsx(View, {
    style: styles['inserter-tabs__wrapper'],
    onLayout: onWrapperLayout,
    children: /*#__PURE__*/_jsx(Animated.View, {
      style: containerStyle,
      children: tabs.map(({
        component: TabComponent
      }, index) => /*#__PURE__*/_jsx(View, {
        children: /*#__PURE__*/_jsx(TabComponent, {
          rootClientId: rootClientId,
          onSelect: onSelect,
          listProps: {
            ...listProps,
            onScroll
          }
        })
      }, `tab-${index}`))
    })
  });
}
function TabsControl({
  onChangeTab,
  showReusableBlocks
}) {
  const tabs = InserterTabs.getTabs();
  const segments = useMemo(() => {
    const filteredTabs = tabs.filter(({
      name
    }) => showReusableBlocks || name !== 'reusable');
    return filteredTabs.map(({
      title
    }) => title);
  }, [showReusableBlocks]);
  const segmentHandler = useCallback(selectedTab => {
    const tabTitles = tabs.map(({
      title
    }) => title);
    onChangeTab(tabTitles.indexOf(selectedTab));
  }, [onChangeTab]);
  return segments.length > 1 ? /*#__PURE__*/_jsx(SegmentedControl, {
    segments: segments,
    segmentHandler: segmentHandler
  }) : null;
}
InserterTabs.Control = TabsControl;
InserterTabs.getTabs = () => [{
  name: 'blocks',
  title: __('Blocks'),
  component: BlockTypesTab
}, {
  name: 'reusable',
  title: __('Synced patterns'),
  component: ReusableBlocksTab
}];
export default InserterTabs;
//# sourceMappingURL=tabs.native.js.map