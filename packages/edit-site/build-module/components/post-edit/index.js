/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DataForm } from '@wordpress/dataviews';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { __experimentalVStack as VStack } from '@wordpress/components';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import Page from '../page';
import usePostFields from '../post-fields';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  PostCardPanel
} = unlock(editorPrivateApis);
function PostEditForm({
  postType,
  postId
}) {
  const ids = useMemo(() => postId.split(','), [postId]);
  const {
    record
  } = useSelect(select => {
    return {
      record: ids.length === 1 ? select(coreDataStore).getEditedEntityRecord('postType', postType, ids[0]) : null
    };
  }, [postType, ids]);
  const [multiEdits, setMultiEdits] = useState({});
  const {
    editEntityRecord
  } = useDispatch(coreDataStore);
  const {
    fields: _fields
  } = usePostFields();
  const fields = useMemo(() => _fields?.map(field => {
    if (field.id === 'status') {
      return {
        ...field,
        elements: field.elements.filter(element => element.value !== 'trash')
      };
    }
    return field;
  }), [_fields]);
  const form = {
    type: 'panel',
    fields: ['title', 'status', 'date', 'author', 'comment_status']
  };
  const onChange = edits => {
    for (const id of ids) {
      if (edits.status !== 'future' && record.status === 'future' && new Date(record.date) > new Date()) {
        edits.date = null;
      }
      if (edits.status === 'private' && record.password) {
        edits.password = '';
      }
      editEntityRecord('postType', postType, id, edits);
      if (ids.length > 1) {
        setMultiEdits(prev => ({
          ...prev,
          ...edits
        }));
      }
    }
  };
  useEffect(() => {
    setMultiEdits({});
  }, [ids]);
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 4,
    children: [ids.length === 1 && /*#__PURE__*/_jsx(PostCardPanel, {
      postType: postType,
      postId: ids[0]
    }), /*#__PURE__*/_jsx(DataForm, {
      data: ids.length === 1 ? record : multiEdits,
      fields: fields,
      form: form,
      onChange: onChange
    })]
  });
}
export function PostEdit({
  postType,
  postId
}) {
  return /*#__PURE__*/_jsxs(Page, {
    className: clsx('edit-site-post-edit', {
      'is-empty': !postId
    }),
    label: __('Post Edit'),
    children: [postId && /*#__PURE__*/_jsx(PostEditForm, {
      postType: postType,
      postId: postId
    }), !postId && /*#__PURE__*/_jsx("p", {
      children: __('Select a page to edit')
    })]
  });
}
//# sourceMappingURL=index.js.map