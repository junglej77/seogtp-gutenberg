/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { MenuItem, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { parse } from '@wordpress/blocks';
import { useAsyncList } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { useAvailableTemplates, useEditedPostContext } from './hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function SwapTemplateButton({
  onClick
}) {
  const [showModal, setShowModal] = useState(false);
  const {
    postType,
    postId
  } = useEditedPostContext();
  const availableTemplates = useAvailableTemplates(postType);
  const {
    editEntityRecord
  } = useDispatch(coreStore);
  if (!availableTemplates?.length) {
    return null;
  }
  const onTemplateSelect = async template => {
    editEntityRecord('postType', postType, postId, {
      template: template.name
    }, {
      undoIgnore: true
    });
    setShowModal(false); // Close the template suggestions modal first.
    onClick();
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(MenuItem, {
      onClick: () => setShowModal(true),
      children: __('Swap template')
    }), showModal && /*#__PURE__*/_jsx(Modal, {
      title: __('Choose a template'),
      onRequestClose: () => setShowModal(false),
      overlayClassName: "editor-post-template__swap-template-modal",
      isFullScreen: true,
      children: /*#__PURE__*/_jsx("div", {
        className: "editor-post-template__swap-template-modal-content",
        children: /*#__PURE__*/_jsx(TemplatesList, {
          postType: postType,
          onSelect: onTemplateSelect
        })
      })
    })]
  });
}
function TemplatesList({
  postType,
  onSelect
}) {
  const availableTemplates = useAvailableTemplates(postType);
  const templatesAsPatterns = useMemo(() => availableTemplates.map(template => ({
    name: template.slug,
    blocks: parse(template.content.raw),
    title: decodeEntities(template.title.rendered),
    id: template.id
  })), [availableTemplates]);
  const shownTemplates = useAsyncList(templatesAsPatterns);
  return /*#__PURE__*/_jsx(BlockPatternsList, {
    label: __('Templates'),
    blockPatterns: templatesAsPatterns,
    shownPatterns: shownTemplates,
    onClickPattern: onSelect
  });
}
//# sourceMappingURL=swap-template-button.js.map