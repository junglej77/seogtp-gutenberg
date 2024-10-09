/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import AutoBlockUninstaller from '../components/auto-block-uninstaller';
import InserterMenuDownloadableBlocksPanel from './inserter-menu-downloadable-blocks-panel';
import InstalledBlocksPrePublishPanel from './installed-blocks-pre-publish-panel';
import getInstallMissing from './get-install-missing';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
registerPlugin('block-directory', {
  render() {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(AutoBlockUninstaller, {}), /*#__PURE__*/_jsx(InserterMenuDownloadableBlocksPanel, {}), /*#__PURE__*/_jsx(InstalledBlocksPrePublishPanel, {})]
    });
  }
});
addFilter('blocks.registerBlockType', 'block-directory/fallback', (settings, name) => {
  if (name !== 'core/missing') {
    return settings;
  }
  settings.edit = getInstallMissing(settings.edit);
  return settings;
});
//# sourceMappingURL=index.js.map