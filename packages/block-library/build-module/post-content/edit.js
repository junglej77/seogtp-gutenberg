/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, RecursionProvider, useHasRecursion, Warning } from '@wordpress/block-editor';
import { useEntityProp, useEntityBlockEditor, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { useCanEditEntity } from '../utils/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ReadOnlyContent({
  layoutClassNames,
  userCanEdit,
  postType,
  postId
}) {
  const [,, content] = useEntityProp('postType', postType, 'content', postId);
  const blockProps = useBlockProps({
    className: layoutClassNames
  });
  return content?.protected && !userCanEdit ? /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsx(Warning, {
      children: __('This content is password protected.')
    })
  }) : /*#__PURE__*/_jsx("div", {
    ...blockProps,
    dangerouslySetInnerHTML: {
      __html: content?.rendered
    }
  });
}
function EditableContent({
  context = {}
}) {
  const {
    postType,
    postId
  } = context;
  const [blocks, onInput, onChange] = useEntityBlockEditor('postType', postType, {
    id: postId
  });
  const entityRecord = useSelect(select => {
    return select(coreStore).getEntityRecord('postType', postType, postId);
  }, [postType, postId]);
  const hasInnerBlocks = !!entityRecord?.content?.raw || blocks?.length;
  const initialInnerBlocks = [['core/paragraph']];
  const props = useInnerBlocksProps(useBlockProps({
    className: 'entry-content'
  }), {
    value: blocks,
    onInput,
    onChange,
    template: !hasInnerBlocks ? initialInnerBlocks : undefined
  });
  return /*#__PURE__*/_jsx("div", {
    ...props
  });
}
function Content(props) {
  const {
    context: {
      queryId,
      postType,
      postId
    } = {},
    layoutClassNames
  } = props;
  const userCanEdit = useCanEditEntity('postType', postType, postId);
  if (userCanEdit === undefined) {
    return null;
  }
  const isDescendentOfQueryLoop = Number.isFinite(queryId);
  const isEditable = userCanEdit && !isDescendentOfQueryLoop;
  return isEditable ? /*#__PURE__*/_jsx(EditableContent, {
    ...props
  }) : /*#__PURE__*/_jsx(ReadOnlyContent, {
    layoutClassNames: layoutClassNames,
    userCanEdit: userCanEdit,
    postType: postType,
    postId: postId
  });
}
function Placeholder({
  layoutClassNames
}) {
  const blockProps = useBlockProps({
    className: layoutClassNames
  });
  return /*#__PURE__*/_jsxs("div", {
    ...blockProps,
    children: [/*#__PURE__*/_jsx("p", {
      children: __('This is the Content block, it will display all the blocks in any single post or page.')
    }), /*#__PURE__*/_jsx("p", {
      children: __('That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.')
    }), /*#__PURE__*/_jsx("p", {
      children: __('If there are any Custom Post Types registered at your site, the Content block can display the contents of those entries as well.')
    })]
  });
}
function RecursionError() {
  const blockProps = useBlockProps();
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsx(Warning, {
      children: __('Block cannot be rendered inside itself.')
    })
  });
}
export default function PostContentEdit({
  context,
  __unstableLayoutClassNames: layoutClassNames
}) {
  const {
    postId: contextPostId,
    postType: contextPostType
  } = context;
  const hasAlreadyRendered = useHasRecursion(contextPostId);
  if (contextPostId && contextPostType && hasAlreadyRendered) {
    return /*#__PURE__*/_jsx(RecursionError, {});
  }
  return /*#__PURE__*/_jsx(RecursionProvider, {
    uniqueId: contextPostId,
    children: contextPostId && contextPostType ? /*#__PURE__*/_jsx(Content, {
      context: context,
      layoutClassNames: layoutClassNames
    }) : /*#__PURE__*/_jsx(Placeholder, {
      layoutClassNames: layoutClassNames
    })
  });
}
//# sourceMappingURL=edit.js.map