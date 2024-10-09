/**
 * WordPress dependencies
 */

import { chevronUp, chevronDown, moreVertical } from '@wordpress/icons';
import { DropdownMenu, MenuItem, MenuGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { BlockTitle, store as blockEditorStore } from '@wordpress/block-editor';
import { privateApis as routerPrivateApis } from '@wordpress/router';
const POPOVER_PROPS = {
  className: 'block-editor-block-settings-menu__popover',
  placement: 'bottom-start'
};

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHistory
} = unlock(routerPrivateApis);
export default function LeafMoreMenu(props) {
  const history = useHistory();
  const {
    block
  } = props;
  const {
    clientId
  } = block;
  const {
    moveBlocksDown,
    moveBlocksUp,
    removeBlocks
  } = useDispatch(blockEditorStore);
  const removeLabel = sprintf( /* translators: %s: block name */
  __('Remove %s'), BlockTitle({
    clientId,
    maximumLength: 25
  }));
  const goToLabel = sprintf( /* translators: %s: block name */
  __('Go to %s'), BlockTitle({
    clientId,
    maximumLength: 25
  }));
  const rootClientId = useSelect(select => {
    const {
      getBlockRootClientId
    } = select(blockEditorStore);
    return getBlockRootClientId(clientId);
  }, [clientId]);
  const onGoToPage = useCallback(selectedBlock => {
    const {
      attributes,
      name
    } = selectedBlock;
    if (attributes.kind === 'post-type' && attributes.id && attributes.type && history) {
      const {
        params
      } = history.getLocationWithParams();
      history.push({
        postType: attributes.type,
        postId: attributes.id,
        canvas: 'edit'
      }, {
        backPath: params
      });
    }
    if (name === 'core/page-list-item' && attributes.id && history) {
      const {
        params
      } = history.getLocationWithParams();
      history.push({
        postType: 'page',
        postId: attributes.id,
        canvas: 'edit'
      }, {
        backPath: params
      });
    }
  }, [history]);
  return /*#__PURE__*/_jsx(DropdownMenu, {
    icon: moreVertical,
    label: __('Options'),
    className: "block-editor-block-settings-menu",
    popoverProps: POPOVER_PROPS,
    noIcons: true,
    ...props,
    children: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(MenuGroup, {
        children: [/*#__PURE__*/_jsx(MenuItem, {
          icon: chevronUp,
          onClick: () => {
            moveBlocksUp([clientId], rootClientId);
            onClose();
          },
          children: __('Move up')
        }), /*#__PURE__*/_jsx(MenuItem, {
          icon: chevronDown,
          onClick: () => {
            moveBlocksDown([clientId], rootClientId);
            onClose();
          },
          children: __('Move down')
        }), block.attributes?.type === 'page' && block.attributes?.id && /*#__PURE__*/_jsx(MenuItem, {
          onClick: () => {
            onGoToPage(block);
            onClose();
          },
          children: goToLabel
        })]
      }), /*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsx(MenuItem, {
          onClick: () => {
            removeBlocks([clientId], false);
            onClose();
          },
          children: removeLabel
        })
      })]
    })
  });
}
//# sourceMappingURL=leaf-more-menu.js.map