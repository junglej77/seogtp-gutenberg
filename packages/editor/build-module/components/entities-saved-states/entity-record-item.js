/**
 * WordPress dependencies
 */
import { CheckboxControl, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function EntityRecordItem({
  record,
  checked,
  onChange
}) {
  const {
    name,
    kind,
    title,
    key
  } = record;

  // Handle templates that might use default descriptive titles.
  const {
    entityRecordTitle,
    hasPostMetaChanges
  } = useSelect(select => {
    if ('postType' !== kind || 'wp_template' !== name) {
      return {
        entityRecordTitle: title,
        hasPostMetaChanges: unlock(select(editorStore)).hasPostMetaChanges(name, key)
      };
    }
    const template = select(coreStore).getEditedEntityRecord(kind, name, key);
    return {
      entityRecordTitle: select(editorStore).__experimentalGetTemplateInfo(template).title,
      hasPostMetaChanges: unlock(select(editorStore)).hasPostMetaChanges(name, key)
    };
  }, [name, kind, title, key]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(PanelRow, {
      children: /*#__PURE__*/_jsx(CheckboxControl, {
        __nextHasNoMarginBottom: true,
        label: decodeEntities(entityRecordTitle) || __('Untitled'),
        checked: checked,
        onChange: onChange
      })
    }), hasPostMetaChanges && /*#__PURE__*/_jsx("ul", {
      className: "entities-saved-states__changes",
      children: /*#__PURE__*/_jsx("li", {
        children: __('Post Meta.')
      })
    })]
  });
}
//# sourceMappingURL=entity-record-item.js.map