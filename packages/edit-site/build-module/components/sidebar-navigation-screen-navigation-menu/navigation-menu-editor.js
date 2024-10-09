/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { BlockEditorProvider } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import NavigationMenuContent from '../sidebar-navigation-screen-navigation-menus/navigation-menu-content';
import { jsx as _jsx } from "react/jsx-runtime";
const noop = () => {};
export default function NavigationMenuEditor({
  navigationMenuId
}) {
  const {
    storedSettings
  } = useSelect(select => {
    const {
      getSettings
    } = unlock(select(editSiteStore));
    return {
      storedSettings: getSettings()
    };
  }, []);
  const blocks = useMemo(() => {
    if (!navigationMenuId) {
      return [];
    }
    return [createBlock('core/navigation', {
      ref: navigationMenuId
    })];
  }, [navigationMenuId]);
  if (!navigationMenuId || !blocks?.length) {
    return null;
  }
  return /*#__PURE__*/_jsx(BlockEditorProvider, {
    settings: storedSettings,
    value: blocks,
    onChange: noop,
    onInput: noop,
    children: /*#__PURE__*/_jsx("div", {
      className: "edit-site-sidebar-navigation-screen-navigation-menus__content",
      children: /*#__PURE__*/_jsx(NavigationMenuContent, {
        rootClientId: blocks[0].clientId
      })
    })
  });
}
//# sourceMappingURL=navigation-menu-editor.js.map