/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useEditedEntityRecord from '../use-edited-entity-record';
import useTitle from '../routes/use-title';
import { POST_TYPE_LABELS, TEMPLATE_POST_TYPE } from '../../utils/constants';
function useEditorTitle() {
  const {
    record: editedPost,
    getTitle,
    isLoaded: hasLoadedPost
  } = useEditedEntityRecord();
  let title;
  if (hasLoadedPost) {
    var _POST_TYPE_LABELS$edi;
    title = sprintf(
    // translators: A breadcrumb trail for the Admin document title. %1$s: title of template being edited, %2$s: type of template (Template or Template Part).
    __('%1$s ‹ %2$s'), getTitle(), (_POST_TYPE_LABELS$edi = POST_TYPE_LABELS[editedPost.type]) !== null && _POST_TYPE_LABELS$edi !== void 0 ? _POST_TYPE_LABELS$edi : POST_TYPE_LABELS[TEMPLATE_POST_TYPE]);
  }

  // Only announce the title once the editor is ready to prevent "Replace"
  // action in <URLQueryController> from double-announcing.
  useTitle(hasLoadedPost && title);
}
export default useEditorTitle;
//# sourceMappingURL=use-editor-title.js.map