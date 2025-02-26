/**
 * WordPress dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { backup } from '@wordpress/icons';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import PostLastRevisionCheck from './check';
import PostPanelRow from '../post-panel-row';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
function usePostLastRevisionInfo() {
  return useSelect(select => {
    const {
      getCurrentPostLastRevisionId,
      getCurrentPostRevisionsCount
    } = select(editorStore);
    return {
      lastRevisionId: getCurrentPostLastRevisionId(),
      revisionsCount: getCurrentPostRevisionsCount()
    };
  }, []);
}

/**
 * Renders the component for displaying the last revision of a post.
 *
 * @return {Component} The component to be rendered.
 */
function PostLastRevision() {
  const {
    lastRevisionId,
    revisionsCount
  } = usePostLastRevisionInfo();
  return /*#__PURE__*/_jsx(PostLastRevisionCheck, {
    children: /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      href: addQueryArgs('revision.php', {
        revision: lastRevisionId
      }),
      className: "editor-post-last-revision__title",
      icon: backup,
      iconPosition: "right",
      text: sprintf( /* translators: %s: number of revisions */
      __('Revisions (%s)'), revisionsCount)
    })
  });
}
export function PrivatePostLastRevision() {
  const {
    lastRevisionId,
    revisionsCount
  } = usePostLastRevisionInfo();
  return /*#__PURE__*/_jsx(PostLastRevisionCheck, {
    children: /*#__PURE__*/_jsx(PostPanelRow, {
      label: __('Revisions'),
      children: /*#__PURE__*/_jsx(Button, {
        href: addQueryArgs('revision.php', {
          revision: lastRevisionId
        }),
        className: "editor-private-post-last-revision__button",
        text: revisionsCount,
        variant: "tertiary",
        size: "compact"
      })
    })
  });
}
export default PostLastRevision;
//# sourceMappingURL=index.js.map