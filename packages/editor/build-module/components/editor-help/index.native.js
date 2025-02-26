/**
 * External dependencies
 */
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

/**
 * WordPress dependencies
 */
import { BottomSheet, BottomSheetConsumer, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { helpFilled, plusCircleFilled, trash, cog } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { requestContactCustomerSupport, requestGotoCustomerSupportOptions } from '@wordpress/react-native-bridge';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import HelpDetailNavigationScreen from './help-detail-navigation-screen';
import HelpTopicRow from './help-topic-row';
import HelpGetSupportButton from './help-get-support-button';
import IntroToBlocks from './intro-to-blocks';
import AddBlocks from './add-blocks';
import MoveBlocks from './move-blocks';
import RemoveBlocks from './remove-blocks';
import CustomizeBlocks from './customize-blocks';
import moveBlocksIcon from './icon-move-blocks';
import HelpSectionTitle from './help-section-title';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const HELP_TOPICS = [{
  label: __('What is a block?'),
  slug: 'what-is-a-block',
  icon: helpFilled,
  view: /*#__PURE__*/_jsx(IntroToBlocks, {})
}, {
  label: __('Add blocks'),
  slug: 'add-blocks',
  icon: plusCircleFilled,
  view: /*#__PURE__*/_jsx(AddBlocks, {})
}, {
  label: __('Move blocks'),
  slug: 'move-blocks',
  icon: moveBlocksIcon,
  view: /*#__PURE__*/_jsx(MoveBlocks, {})
}, {
  label: __('Remove blocks'),
  slug: 'remove-blocks',
  icon: trash,
  view: /*#__PURE__*/_jsx(RemoveBlocks, {})
}, {
  label: __('Customize blocks'),
  slug: 'customize-blocks',
  icon: cog,
  view: /*#__PURE__*/_jsx(CustomizeBlocks, {})
}];
function EditorHelpTopics({
  close,
  isVisible,
  onClose,
  showSupport
}) {
  const {
    postType
  } = useSelect(select => ({
    postType: select(editorStore).getEditedPostAttribute('type')
  }));
  const title = postType === 'page' ? __('How to edit your page') : __('How to edit your post');
  const supportSection = /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HelpSectionTitle, {
      children: __('Get support')
    }), /*#__PURE__*/_jsx(HelpGetSupportButton, {
      title: __('Contact support'),
      onPress: requestContactCustomerSupport
    }), /*#__PURE__*/_jsx(HelpGetSupportButton, {
      title: __('More support options'),
      onPress: requestGotoCustomerSupportOptions
    })]
  });
  return /*#__PURE__*/_jsx(BottomSheet, {
    isVisible: isVisible,
    onClose: onClose,
    hideHeader: true,
    hasNavigation: true,
    contentStyle: styles.contentContainer,
    testID: "editor-help-modal",
    children: /*#__PURE__*/_jsx(SafeAreaView, {
      style: styles.safeAreaContainer,
      children: /*#__PURE__*/_jsxs(BottomSheet.NavigationContainer, {
        animate: true,
        main: true,
        style: styles.navigationContainer,
        children: [/*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
          isScrollable: true,
          fullScreen: true,
          name: "help-topics",
          children: /*#__PURE__*/_jsxs(View, {
            style: styles.container,
            children: [/*#__PURE__*/_jsxs(BottomSheet.NavBar, {
              children: [/*#__PURE__*/_jsx(BottomSheet.NavBar.DismissButton, {
                onPress: close,
                iosText: __('Close')
              }), /*#__PURE__*/_jsx(BottomSheet.NavBar.Heading, {
                children: title
              })]
            }), /*#__PURE__*/_jsx(BottomSheetConsumer, {
              children: ({
                listProps
              }) => {
                const contentContainerStyle = StyleSheet.flatten(listProps.contentContainerStyle);
                return /*#__PURE__*/_jsx(ScrollView, {
                  ...listProps,
                  contentContainerStyle: {
                    ...contentContainerStyle,
                    paddingBottom: Math.max(listProps.safeAreaBottomInset, contentContainerStyle.paddingBottom),
                    /**
                     * Remove margin set via `hideHeader`. Combining a header
                     * and navigation in this bottom sheet is at odds with the
                     * current `BottomSheet` implementation.
                     */
                    marginTop: 0
                  },
                  children: /*#__PURE__*/_jsxs(PanelBody, {
                    children: [/*#__PURE__*/_jsx(HelpSectionTitle, {
                      children: __('The basics')
                    }), HELP_TOPICS.map(({
                      label,
                      icon,
                      slug
                    }, index) => {
                      const isLastItem = index === HELP_TOPICS.length - 1;
                      return /*#__PURE__*/_jsx(HelpTopicRow, {
                        label: label,
                        icon: icon,
                        screenName: slug,
                        isLastItem: isLastItem
                      }, slug);
                    }), showSupport && supportSection]
                  })
                });
              }
            })]
          })
        }), HELP_TOPICS.map(({
          view,
          label,
          slug
        }) => {
          return /*#__PURE__*/_jsx(HelpDetailNavigationScreen, {
            name: slug,
            content: view,
            label: label,
            options: {
              gestureEnabled: false,
              ...TransitionPresets.DefaultTransition
            }
          }, slug);
        })]
      })
    })
  });
}
export default EditorHelpTopics;
//# sourceMappingURL=index.native.js.map