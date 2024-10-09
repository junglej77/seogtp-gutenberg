/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Modal, privateApis as componentsPrivateApis } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import InstalledFonts from './installed-fonts';
import FontCollection from './font-collection';
import UploadFonts from './upload-fonts';
import { FontLibraryContext } from './context';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
const DEFAULT_TAB = {
  id: 'installed-fonts',
  title: _x('Library', 'Font library')
};
const UPLOAD_TAB = {
  id: 'upload-fonts',
  title: __('Upload')
};
const tabsFromCollections = collections => collections.map(({
  slug,
  name
}) => ({
  id: slug,
  title: collections.length === 1 && slug === 'google-fonts' ? __('Install Fonts') : name
}));
function FontLibraryModal({
  onRequestClose,
  defaultTabId = 'installed-fonts'
}) {
  const {
    collections
  } = useContext(FontLibraryContext);
  const canUserCreate = useSelect(select => {
    return select(coreStore).canUser('create', {
      kind: 'postType',
      name: 'wp_font_family'
    });
  }, []);
  const tabs = [DEFAULT_TAB];
  if (canUserCreate) {
    tabs.push(UPLOAD_TAB);
    tabs.push(...tabsFromCollections(collections || []));
  }
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Fonts'),
    onRequestClose: onRequestClose,
    isFullScreen: true,
    className: "font-library-modal",
    children: /*#__PURE__*/_jsx("div", {
      className: "font-library-modal__tabs",
      children: /*#__PURE__*/_jsxs(Tabs, {
        defaultTabId: defaultTabId,
        children: [/*#__PURE__*/_jsx(Tabs.TabList, {
          children: tabs.map(({
            id,
            title
          }) => /*#__PURE__*/_jsx(Tabs.Tab, {
            tabId: id,
            children: title
          }, id))
        }), tabs.map(({
          id
        }) => {
          let contents;
          switch (id) {
            case 'upload-fonts':
              contents = /*#__PURE__*/_jsx(UploadFonts, {});
              break;
            case 'installed-fonts':
              contents = /*#__PURE__*/_jsx(InstalledFonts, {});
              break;
            default:
              contents = /*#__PURE__*/_jsx(FontCollection, {
                slug: id
              });
          }
          return /*#__PURE__*/_jsx(Tabs.TabPanel, {
            tabId: id,
            focusable: false,
            children: contents
          }, id);
        })]
      })
    })
  });
}
export default FontLibraryModal;
//# sourceMappingURL=index.js.map