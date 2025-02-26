/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { privateApis as preferencesPrivateApis } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import EnableCustomFieldsOption from './enable-custom-fields';
import EnablePanelOption from './enable-panel';
import { store as editPostStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  PreferencesModalSection
} = unlock(preferencesPrivateApis);
export function MetaBoxesSection({
  areCustomFieldsRegistered,
  metaBoxes,
  ...sectionProps
}) {
  // The 'Custom Fields' meta box is a special case that we handle separately.
  const thirdPartyMetaBoxes = metaBoxes.filter(({
    id
  }) => id !== 'postcustom');
  if (!areCustomFieldsRegistered && thirdPartyMetaBoxes.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsxs(PreferencesModalSection, {
    ...sectionProps,
    children: [areCustomFieldsRegistered && /*#__PURE__*/_jsx(EnableCustomFieldsOption, {
      label: __('Custom fields')
    }), thirdPartyMetaBoxes.map(({
      id,
      title
    }) => /*#__PURE__*/_jsx(EnablePanelOption, {
      label: title,
      panelName: `meta-box-${id}`
    }, id))]
  });
}
export default withSelect(select => {
  const {
    getEditorSettings
  } = select(editorStore);
  const {
    getAllMetaBoxes
  } = select(editPostStore);
  return {
    // This setting should not live in the block editor's store.
    areCustomFieldsRegistered: getEditorSettings().enableCustomFields !== undefined,
    metaBoxes: getAllMetaBoxes()
  };
})(MetaBoxesSection);
//# sourceMappingURL=meta-boxes-section.js.map