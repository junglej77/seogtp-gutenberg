/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { NavigationButtonAsItem } from '../navigation-button';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);

// Only core block styles (source === block) or block styles with a matching
// theme.json style variation will be configurable via Global Styles.
function getFilteredBlockStyles(blockStyles, variations) {
  return blockStyles?.filter(style => style.source === 'block' || variations.includes(style.name));
}
export function useBlockVariations(name) {
  const blockStyles = useSelect(select => {
    const {
      getBlockStyles
    } = select(blocksStore);
    return getBlockStyles(name);
  }, [name]);
  const [variations] = useGlobalStyle('variations', name);
  const variationNames = Object.keys(variations !== null && variations !== void 0 ? variations : {});
  return getFilteredBlockStyles(blockStyles, variationNames);
}
export function VariationsPanel({
  name
}) {
  const coreBlockStyles = useBlockVariations(name);
  return /*#__PURE__*/_jsx(ItemGroup, {
    isBordered: true,
    isSeparated: true,
    children: coreBlockStyles.map((style, index) => {
      if (style?.isDefault) {
        return null;
      }
      return /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        path: '/blocks/' + encodeURIComponent(name) + '/variations/' + encodeURIComponent(style.name),
        "aria-label": style.label,
        children: style.label
      }, index);
    })
  });
}
//# sourceMappingURL=variations-panel.js.map