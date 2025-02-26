/**
 * WordPress dependencies
 */
import { NoticeList } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import TemplateValidationNotice from '../template-validation-notice';

/**
 * This component renders the notices displayed in the editor. It displays pinned notices first, followed by dismissible
 *
 * @example
 * ```jsx
 * <EditorNotices />
 * ```
 *
 * @return {JSX.Element} The rendered EditorNotices component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function EditorNotices() {
  const {
    notices
  } = useSelect(select => ({
    notices: select(noticesStore).getNotices()
  }), []);
  const {
    removeNotice
  } = useDispatch(noticesStore);
  const dismissibleNotices = notices.filter(({
    isDismissible,
    type
  }) => isDismissible && type === 'default');
  const nonDismissibleNotices = notices.filter(({
    isDismissible,
    type
  }) => !isDismissible && type === 'default');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(NoticeList, {
      notices: nonDismissibleNotices,
      className: "components-editor-notices__pinned"
    }), /*#__PURE__*/_jsx(NoticeList, {
      notices: dismissibleNotices,
      className: "components-editor-notices__dismissible",
      onRemove: removeNotice,
      children: /*#__PURE__*/_jsx(TemplateValidationNotice, {})
    })]
  });
}
export default EditorNotices;
//# sourceMappingURL=index.js.map