/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import { jsx as _jsx } from "react/jsx-runtime";
function ManagePatternsMenuItem() {
  const url = useSelect(select => {
    const {
      canUser
    } = select(coreStore);
    const defaultUrl = addQueryArgs('edit.php', {
      post_type: 'wp_block'
    });
    const patternsUrl = addQueryArgs('site-editor.php', {
      path: '/patterns'
    });

    // The site editor and templates both check whether the user has
    // edit_theme_options capabilities. We can leverage that here and not
    // display the manage patterns link if the user can't access it.
    return canUser('create', {
      kind: 'postType',
      name: 'wp_template'
    }) ? patternsUrl : defaultUrl;
  }, []);
  return /*#__PURE__*/_jsx(MenuItem, {
    role: "menuitem",
    href: url,
    children: __('Manage patterns')
  });
}
export default ManagePatternsMenuItem;
//# sourceMappingURL=manage-patterns-menu-item.js.map