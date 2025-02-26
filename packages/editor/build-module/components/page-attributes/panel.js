/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PageAttributesCheck from './check';
import { ParentRow } from './parent';
import { jsx as _jsx } from "react/jsx-runtime";
const PANEL_NAME = 'page-attributes';
function AttributesPanel() {
  const {
    isEnabled,
    postType
  } = useSelect(select => {
    const {
      getEditedPostAttribute,
      isEditorPanelEnabled
    } = select(editorStore);
    const {
      getPostType
    } = select(coreStore);
    return {
      isEnabled: isEditorPanelEnabled(PANEL_NAME),
      postType: getPostType(getEditedPostAttribute('type'))
    };
  }, []);
  if (!isEnabled || !postType) {
    return null;
  }
  return /*#__PURE__*/_jsx(ParentRow, {});
}

/**
 * Renders the Page Attributes Panel component.
 *
 * @return {Component} The component to be rendered.
 */
export default function PageAttributesPanel() {
  return /*#__PURE__*/_jsx(PageAttributesCheck, {
    children: /*#__PURE__*/_jsx(AttributesPanel, {})
  });
}
//# sourceMappingURL=panel.js.map