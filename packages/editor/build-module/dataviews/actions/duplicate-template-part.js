/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { __, sprintf, _x } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useMemo } from '@wordpress/element';
// @ts-ignore
import { parse } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import { TEMPLATE_PART_POST_TYPE } from '../../store/constants';
import { CreateTemplatePartModalContents } from '../../components/create-template-part-modal';
import { getItemTitle } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
const duplicateTemplatePart = {
  id: 'duplicate-template-part',
  label: _x('Duplicate', 'action label'),
  isEligible: item => item.type === TEMPLATE_PART_POST_TYPE,
  modalHeader: _x('Duplicate template part', 'action label'),
  RenderModal: ({
    items,
    closeModal
  }) => {
    const [item] = items;
    const blocks = useMemo(() => {
      var _item$blocks;
      return (_item$blocks = item.blocks) !== null && _item$blocks !== void 0 ? _item$blocks : parse(typeof item.content === 'string' ? item.content : item.content.raw, {
        __unstableSkipMigrationLogs: true
      });
    }, [item.content, item.blocks]);
    const {
      createSuccessNotice
    } = useDispatch(noticesStore);
    function onTemplatePartSuccess() {
      createSuccessNotice(sprintf(
      // translators: %s: The new template part's title e.g. 'Call to action (copy)'.
      __('"%s" duplicated.'), getItemTitle(item)), {
        type: 'snackbar',
        id: 'edit-site-patterns-success'
      });
      closeModal?.();
    }
    return /*#__PURE__*/_jsx(CreateTemplatePartModalContents, {
      blocks: blocks,
      defaultArea: item.area,
      defaultTitle: sprintf( /* translators: %s: Existing template part title */
      __('%s (Copy)'), getItemTitle(item)),
      onCreate: onTemplatePartSuccess,
      onError: closeModal,
      confirmLabel: _x('Duplicate', 'action label'),
      closeModal: closeModal
    });
  }
};
export default duplicateTemplatePart;
//# sourceMappingURL=duplicate-template-part.js.map