/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';
import { store as editorStore } from '../../store';
import { AUTHORS_QUERY } from './constants';

/**
 * Wrapper component that renders its children only if the post type supports the author.
 *
 * @param {Object}  props          The component props.
 * @param {Element} props.children Children to be rendered.
 *
 * @return {Component|null} The component to be rendered. Return `null` if the post type doesn't
 * supports the author or if there are no authors available.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export default function PostAuthorCheck({
  children
}) {
  const {
    hasAssignAuthorAction,
    hasAuthors
  } = useSelect(select => {
    var _post$_links$wpActio;
    const post = select(editorStore).getCurrentPost();
    const authors = select(coreStore).getUsers(AUTHORS_QUERY);
    return {
      hasAssignAuthorAction: (_post$_links$wpActio = post._links?.['wp:action-assign-author']) !== null && _post$_links$wpActio !== void 0 ? _post$_links$wpActio : false,
      hasAuthors: authors?.length >= 1
    };
  }, []);
  if (!hasAssignAuthorAction || !hasAuthors) {
    return null;
  }
  return /*#__PURE__*/_jsx(PostTypeSupportCheck, {
    supportKeys: "author",
    children: children
  });
}
//# sourceMappingURL=check.js.map