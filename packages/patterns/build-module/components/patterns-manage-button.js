/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isReusableBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { addQueryArgs } from '@wordpress/url';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as patternsStore } from '../store';
import { unlock } from '../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PatternsManageButton({
  clientId
}) {
  const {
    canRemove,
    isVisible,
    managePatternsUrl
  } = useSelect(select => {
    const {
      getBlock,
      canRemoveBlock,
      getBlockCount
    } = select(blockEditorStore);
    const {
      canUser
    } = select(coreStore);
    const reusableBlock = getBlock(clientId);
    return {
      canRemove: canRemoveBlock(clientId),
      isVisible: !!reusableBlock && isReusableBlock(reusableBlock) && !!canUser('update', {
        kind: 'postType',
        name: 'wp_block',
        id: reusableBlock.attributes.ref
      }),
      innerBlockCount: getBlockCount(clientId),
      // The site editor and templates both check whether the user
      // has edit_theme_options capabilities. We can leverage that here
      // and omit the manage patterns link if the user can't access it.
      managePatternsUrl: canUser('create', {
        kind: 'postType',
        name: 'wp_template'
      }) ? addQueryArgs('site-editor.php', {
        path: '/patterns'
      }) : addQueryArgs('edit.php', {
        post_type: 'wp_block'
      })
    };
  }, [clientId]);

  // Ignore reason: false positive of the lint rule.
  // eslint-disable-next-line @wordpress/no-unused-vars-before-return
  const {
    convertSyncedPatternToStatic
  } = unlock(useDispatch(patternsStore));
  if (!isVisible) {
    return null;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [canRemove && /*#__PURE__*/_jsx(MenuItem, {
      onClick: () => convertSyncedPatternToStatic(clientId),
      children: __('Detach')
    }), /*#__PURE__*/_jsx(MenuItem, {
      href: managePatternsUrl,
      children: __('Manage patterns')
    })]
  });
}
export default PatternsManageButton;
//# sourceMappingURL=patterns-manage-button.js.map