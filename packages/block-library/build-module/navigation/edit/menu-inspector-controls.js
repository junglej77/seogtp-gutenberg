/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, __experimentalHStack as HStack, __experimentalHeading as Heading, Spinner } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NavigationMenuSelector from './navigation-menu-selector';
import { unlock } from '../../lock-unlock';
import DeletedNavigationWarning from './deleted-navigation-warning';
import useNavigationMenu from '../use-navigation-menu';
import LeafMoreMenu from './leaf-more-menu';
import { updateAttributes } from '../../navigation-link/update-attributes';
import { LinkUI } from '../../navigation-link/link-ui';

/* translators: %s: The name of a menu. */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const actionLabel = __("Switch to '%s'");
const BLOCKS_WITH_LINK_UI_SUPPORT = ['core/navigation-link', 'core/navigation-submenu'];
const {
  PrivateListView
} = unlock(blockEditorPrivateApis);
function AdditionalBlockContent({
  block,
  insertedBlock,
  setInsertedBlock
}) {
  const {
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  const supportsLinkControls = BLOCKS_WITH_LINK_UI_SUPPORT?.includes(insertedBlock?.name);
  const blockWasJustInserted = insertedBlock?.clientId === block.clientId;
  const showLinkControls = supportsLinkControls && blockWasJustInserted;
  if (!showLinkControls) {
    return null;
  }
  const setInsertedBlockAttributes = _insertedBlockClientId => _updatedAttributes => {
    if (!_insertedBlockClientId) {
      return;
    }
    updateBlockAttributes(_insertedBlockClientId, _updatedAttributes);
  };
  return /*#__PURE__*/_jsx(LinkUI, {
    clientId: insertedBlock?.clientId,
    link: insertedBlock?.attributes,
    onClose: () => {
      setInsertedBlock(null);
    },
    onChange: updatedValue => {
      updateAttributes(updatedValue, setInsertedBlockAttributes(insertedBlock?.clientId), insertedBlock?.attributes);
      setInsertedBlock(null);
    },
    onCancel: () => {
      setInsertedBlock(null);
    }
  });
}
const MainContent = ({
  clientId,
  currentMenuId,
  isLoading,
  isNavigationMenuMissing,
  onCreateNew
}) => {
  const hasChildren = useSelect(select => {
    return !!select(blockEditorStore).getBlockCount(clientId);
  }, [clientId]);
  const {
    navigationMenu
  } = useNavigationMenu(currentMenuId);
  if (currentMenuId && isNavigationMenuMissing) {
    return /*#__PURE__*/_jsx(DeletedNavigationWarning, {
      onCreateNew: onCreateNew
    });
  }
  if (isLoading) {
    return /*#__PURE__*/_jsx(Spinner, {});
  }
  const description = navigationMenu ? sprintf( /* translators: %s: The name of a menu. */
  __('Structure for Navigation Menu: %s'), navigationMenu?.title || __('Untitled menu')) : __('You have not yet created any menus. Displaying a list of your Pages');
  return /*#__PURE__*/_jsxs("div", {
    className: "wp-block-navigation__menu-inspector-controls",
    children: [!hasChildren && /*#__PURE__*/_jsx("p", {
      className: "wp-block-navigation__menu-inspector-controls__empty-message",
      children: __('This Navigation Menu is empty.')
    }), /*#__PURE__*/_jsx(PrivateListView, {
      rootClientId: clientId,
      isExpanded: true,
      description: description,
      showAppender: true,
      blockSettingsMenu: LeafMoreMenu,
      additionalBlockContent: AdditionalBlockContent
    })]
  });
};
const MenuInspectorControls = props => {
  const {
    createNavigationMenuIsSuccess,
    createNavigationMenuIsError,
    currentMenuId = null,
    onCreateNew,
    onSelectClassicMenu,
    onSelectNavigationMenu,
    isManageMenusButtonDisabled,
    blockEditingMode
  } = props;
  return /*#__PURE__*/_jsx(InspectorControls, {
    group: "list",
    children: /*#__PURE__*/_jsxs(PanelBody, {
      title: null,
      children: [/*#__PURE__*/_jsxs(HStack, {
        className: "wp-block-navigation-off-canvas-editor__header",
        children: [/*#__PURE__*/_jsx(Heading, {
          className: "wp-block-navigation-off-canvas-editor__title",
          level: 2,
          children: __('Menu')
        }), blockEditingMode === 'default' && /*#__PURE__*/_jsx(NavigationMenuSelector, {
          currentMenuId: currentMenuId,
          onSelectClassicMenu: onSelectClassicMenu,
          onSelectNavigationMenu: onSelectNavigationMenu,
          onCreateNew: onCreateNew,
          createNavigationMenuIsSuccess: createNavigationMenuIsSuccess,
          createNavigationMenuIsError: createNavigationMenuIsError,
          actionLabel: actionLabel,
          isManageMenusButtonDisabled: isManageMenusButtonDisabled
        })]
      }), /*#__PURE__*/_jsx(MainContent, {
        ...props
      })]
    })
  });
};
export default MenuInspectorControls;
//# sourceMappingURL=menu-inspector-controls.js.map