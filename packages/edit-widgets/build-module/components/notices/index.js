/**
 * WordPress dependencies
 */
import { NoticeList, SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

// Last three notices. Slices from the tail end of the list.
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_VISIBLE_NOTICES = -3;
function Notices() {
  const {
    removeNotice
  } = useDispatch(noticesStore);
  const {
    notices
  } = useSelect(select => {
    return {
      notices: select(noticesStore).getNotices()
    };
  }, []);
  const dismissibleNotices = notices.filter(({
    isDismissible,
    type
  }) => isDismissible && type === 'default');
  const nonDismissibleNotices = notices.filter(({
    isDismissible,
    type
  }) => !isDismissible && type === 'default');
  const snackbarNotices = notices.filter(({
    type
  }) => type === 'snackbar').slice(MAX_VISIBLE_NOTICES);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(NoticeList, {
      notices: nonDismissibleNotices,
      className: "edit-widgets-notices__pinned"
    }), /*#__PURE__*/_jsx(NoticeList, {
      notices: dismissibleNotices,
      className: "edit-widgets-notices__dismissible",
      onRemove: removeNotice
    }), /*#__PURE__*/_jsx(SnackbarList, {
      notices: snackbarNotices,
      className: "edit-widgets-notices__snackbar",
      onRemove: removeNotice
    })]
  });
}
export default Notices;
//# sourceMappingURL=index.js.map