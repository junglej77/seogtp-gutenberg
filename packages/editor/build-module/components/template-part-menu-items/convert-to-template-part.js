/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { symbolFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import CreateTemplatePartModal from '../create-template-part-modal';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ConvertToTemplatePart({
  clientIds,
  blocks
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    replaceBlocks
  } = useDispatch(blockEditorStore);
  const {
    createSuccessNotice
  } = useDispatch(noticesStore);
  const {
    canCreate
  } = useSelect(select => {
    return {
      canCreate: select(blockEditorStore).canInsertBlockType('core/template-part')
    };
  }, []);
  if (!canCreate) {
    return null;
  }
  const onConvert = async templatePart => {
    replaceBlocks(clientIds, createBlock('core/template-part', {
      slug: templatePart.slug,
      theme: templatePart.theme
    }));
    createSuccessNotice(__('Template part created.'), {
      type: 'snackbar'
    });

    // The modal and this component will be unmounted because of `replaceBlocks` above,
    // so no need to call `closeModal` or `onClose`.
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(MenuItem, {
      icon: symbolFilled,
      onClick: () => {
        setIsModalOpen(true);
      },
      "aria-expanded": isModalOpen,
      "aria-haspopup": "dialog",
      children: __('Create template part')
    }), isModalOpen && /*#__PURE__*/_jsx(CreateTemplatePartModal, {
      closeModal: () => {
        setIsModalOpen(false);
      },
      blocks: blocks,
      onCreate: onConvert
    })]
  });
}
//# sourceMappingURL=convert-to-template-part.js.map