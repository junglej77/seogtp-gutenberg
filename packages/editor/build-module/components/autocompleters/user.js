/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/** @typedef {import('@wordpress/components').WPCompleter} WPCompleter */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function getUserLabel(user) {
  const avatar = user.avatar_urls && user.avatar_urls[24] ? /*#__PURE__*/_jsx("img", {
    className: "editor-autocompleters__user-avatar",
    alt: "",
    src: user.avatar_urls[24]
  }) : /*#__PURE__*/_jsx("span", {
    className: "editor-autocompleters__no-avatar"
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [avatar, /*#__PURE__*/_jsx("span", {
      className: "editor-autocompleters__user-name",
      children: user.name
    }), /*#__PURE__*/_jsx("span", {
      className: "editor-autocompleters__user-slug",
      children: user.slug
    })]
  });
}

/**
 * A user mentions completer.
 *
 * @type {WPCompleter}
 */
export default {
  name: 'users',
  className: 'editor-autocompleters__user',
  triggerPrefix: '@',
  useItems(filterValue) {
    const users = useSelect(select => {
      const {
        getUsers
      } = select(coreStore);
      return getUsers({
        context: 'view',
        search: encodeURIComponent(filterValue)
      });
    }, [filterValue]);
    const options = useMemo(() => users ? users.map(user => ({
      key: `user-${user.slug}`,
      value: user,
      label: getUserLabel(user)
    })) : [], [users]);
    return [options];
  },
  getOptionCompletion(user) {
    return `@${user.slug}`;
  }
};
//# sourceMappingURL=user.js.map