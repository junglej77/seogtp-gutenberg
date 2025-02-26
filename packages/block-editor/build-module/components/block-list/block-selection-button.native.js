/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { getBlockType } from '@wordpress/blocks';
import { BlockIcon } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { View, Text, TouchableOpacity } from 'react-native';

/**
 * Internal dependencies
 */
import BlockTitle from '../block-title';
import useBlockDisplayInformation from '../use-block-display-information';
import SubdirectorSVG from './subdirectory-icon';
import { store as blockEditorStore } from '../../store';
import styles from './block-selection-button.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BlockSelectionButton = ({
  clientId,
  rootClientId,
  rootBlockIcon,
  isRTL
}) => {
  const blockInformation = useBlockDisplayInformation(clientId);
  return /*#__PURE__*/_jsx(View, {
    style: [styles.selectionButtonContainer, rootClientId && styles.densedPaddingLeft],
    children: /*#__PURE__*/_jsxs(TouchableOpacity, {
      style: styles.button,
      onPress: () => {
        /* Open BottomSheet with markup. */
      },
      disabled: true /* Disable temporarily since onPress function is empty. */,
      children: [rootClientId && rootBlockIcon && [/*#__PURE__*/_jsx(Icon, {
        size: 24,
        icon: rootBlockIcon.src,
        fill: styles.icon.color
      }, "parent-icon"), /*#__PURE__*/_jsx(View, {
        style: styles.arrow,
        children: /*#__PURE__*/_jsx(SubdirectorSVG, {
          fill: styles.arrow.color,
          isRTL: isRTL
        })
      }, "subdirectory-icon")], blockInformation?.icon && /*#__PURE__*/_jsx(BlockIcon, {
        size: 24,
        icon: blockInformation.icon,
        fill: styles.icon.color
      }), /*#__PURE__*/_jsx(Text, {
        maxFontSizeMultiplier: 1.25,
        ellipsizeMode: "tail",
        numberOfLines: 1,
        style: styles.selectionButtonTitle,
        children: /*#__PURE__*/_jsx(BlockTitle, {
          clientId: clientId,
          maximumLength: 35
        })
      })]
    })
  });
};
export default compose([withSelect((select, {
  clientId
}) => {
  const {
    getBlockRootClientId,
    getBlockName,
    getSettings
  } = select(blockEditorStore);
  const rootClientId = getBlockRootClientId(clientId);
  if (!rootClientId) {
    return {
      clientId
    };
  }
  const rootBlockName = getBlockName(rootClientId);
  const rootBlockType = getBlockType(rootBlockName);
  const rootBlockIcon = rootBlockType ? rootBlockType.icon : {};
  return {
    clientId,
    rootClientId,
    rootBlockIcon,
    isRTL: getSettings().isRTL
  };
})])(BlockSelectionButton);
//# sourceMappingURL=block-selection-button.native.js.map