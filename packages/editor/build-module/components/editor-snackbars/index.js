/**
 * WordPress dependencies
 */
import { SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

// Last three notices. Slices from the tail end of the list.
import { jsx as _jsx } from "react/jsx-runtime";
const MAX_VISIBLE_NOTICES = -3;

/**
 * Renders the editor snackbars component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function EditorSnackbars() {
  const notices = useSelect(select => select(noticesStore).getNotices(), []);
  const {
    removeNotice
  } = useDispatch(noticesStore);
  const snackbarNotices = notices.filter(({
    type
  }) => type === 'snackbar').slice(MAX_VISIBLE_NOTICES);
  return /*#__PURE__*/_jsx(SnackbarList, {
    notices: snackbarNotices,
    className: "components-editor-notices__snackbar",
    onRemove: removeNotice
  });
}
//# sourceMappingURL=index.js.map