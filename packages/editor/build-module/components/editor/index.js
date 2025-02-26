/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TEMPLATE_POST_TYPE } from '../../store/constants';
import EditorInterface from '../editor-interface';
import { ExperimentalEditorProvider } from '../provider';
import Sidebar from '../sidebar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function Editor({
  postType,
  postId,
  templateId,
  settings,
  children,
  initialEdits,
  // This could be part of the settings.
  onActionPerformed,
  // The following abstractions are not ideal but necessary
  // to account for site editor and post editor differences for now.
  extraContent,
  extraSidebarPanels,
  ...props
}) {
  const {
    post,
    template,
    hasLoadedPost
  } = useSelect(select => {
    const {
      getEntityRecord,
      hasFinishedResolution
    } = select(coreStore);
    return {
      post: getEntityRecord('postType', postType, postId),
      template: templateId ? getEntityRecord('postType', TEMPLATE_POST_TYPE, templateId) : undefined,
      hasLoadedPost: hasFinishedResolution('getEntityRecord', ['postType', postType, postId])
    };
  }, [postType, postId, templateId]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [hasLoadedPost && !post && /*#__PURE__*/_jsx(Notice, {
      status: "warning",
      isDismissible: false,
      children: __("You attempted to edit an item that doesn't exist. Perhaps it was deleted?")
    }), !!post && /*#__PURE__*/_jsxs(ExperimentalEditorProvider, {
      post: post,
      __unstableTemplate: template,
      settings: settings,
      initialEdits: initialEdits,
      useSubRegistry: false,
      children: [/*#__PURE__*/_jsx(EditorInterface, {
        ...props,
        children: extraContent
      }), children, /*#__PURE__*/_jsx(Sidebar, {
        onActionPerformed: onActionPerformed,
        extraPanels: extraSidebarPanels
      })]
    })]
  });
}
export default Editor;
//# sourceMappingURL=index.js.map