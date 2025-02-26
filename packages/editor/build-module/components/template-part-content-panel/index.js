/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as blocksStore } from '@wordpress/blocks';
import { store as blockEditorStore, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { TEMPLATE_PART_POST_TYPE } from '../../store/constants';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  BlockQuickNavigation
} = unlock(blockEditorPrivateApis);
function TemplatePartContentPanelInner() {
  const blockTypes = useSelect(select => {
    const {
      getBlockTypes
    } = select(blocksStore);
    return getBlockTypes();
  }, []);
  const themeBlockNames = useMemo(() => {
    return blockTypes.filter(blockType => {
      return blockType.category === 'theme';
    }).map(({
      name
    }) => name);
  }, [blockTypes]);
  const themeBlocks = useSelect(select => {
    const {
      getBlocksByName
    } = select(blockEditorStore);
    return getBlocksByName(themeBlockNames);
  }, [themeBlockNames]);
  if (themeBlocks.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(PanelBody, {
    title: __('Content'),
    children: /*#__PURE__*/_jsx(BlockQuickNavigation, {
      clientIds: themeBlocks
    })
  });
}
export default function TemplatePartContentPanel() {
  const postType = useSelect(select => {
    const {
      getCurrentPostType
    } = select(editorStore);
    return getCurrentPostType();
  }, []);
  if (postType !== TEMPLATE_PART_POST_TYPE) {
    return null;
  }
  return /*#__PURE__*/_jsx(TemplatePartContentPanelInner, {});
}
//# sourceMappingURL=index.js.map