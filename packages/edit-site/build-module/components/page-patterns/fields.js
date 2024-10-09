/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, Button, Tooltip, Flex } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useState, useMemo, useId } from '@wordpress/element';
import { BlockPreview, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { Icon, lockSmall } from '@wordpress/icons';
import { parse } from '@wordpress/blocks';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { Async } from '../async';
import { PATTERN_TYPES, TEMPLATE_PART_POST_TYPE, PATTERN_SYNC_TYPES, OPERATOR_IS } from '../../utils/constants';
import { unlock } from '../../lock-unlock';
import { useLink } from '../routes/link';
import { useAddedBy } from '../page-templates/hooks';
import { defaultGetTitle } from './search-items';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
function PreviewWrapper({
  item,
  onClick,
  ariaDescribedBy,
  children
}) {
  return /*#__PURE__*/_jsx("button", {
    className: "page-patterns-preview-field__button",
    type: "button",
    onClick: item.type !== PATTERN_TYPES.theme ? onClick : undefined,
    "aria-label": item.title,
    "aria-describedby": ariaDescribedBy,
    "aria-disabled": item.type === PATTERN_TYPES.theme,
    children: children
  });
}
function PreviewField({
  item
}) {
  const descriptionId = useId();
  const description = item.description || item?.excerpt?.raw;
  const isUserPattern = item.type === PATTERN_TYPES.user;
  const isTemplatePart = item.type === TEMPLATE_PART_POST_TYPE;
  const [backgroundColor] = useGlobalStyle('color.background');
  const {
    onClick
  } = useLink({
    postType: item.type,
    postId: isUserPattern || isTemplatePart ? item.id : item.name,
    canvas: 'edit'
  });
  const blocks = useMemo(() => {
    var _item$blocks;
    return (_item$blocks = item.blocks) !== null && _item$blocks !== void 0 ? _item$blocks : parse(item.content.raw, {
      __unstableSkipMigrationLogs: true
    });
  }, [item?.content?.raw, item.blocks]);
  const isEmpty = !blocks?.length;
  return /*#__PURE__*/_jsxs("div", {
    className: "page-patterns-preview-field",
    style: {
      backgroundColor
    },
    children: [/*#__PURE__*/_jsxs(PreviewWrapper, {
      item: item,
      onClick: onClick,
      ariaDescribedBy: !!description ? descriptionId : undefined,
      children: [isEmpty && isTemplatePart && __('Empty template part'), isEmpty && !isTemplatePart && __('Empty pattern'), !isEmpty && /*#__PURE__*/_jsx(Async, {
        children: /*#__PURE__*/_jsx(BlockPreview, {
          blocks: blocks,
          viewportWidth: item.viewportWidth
        })
      })]
    }), !!description && /*#__PURE__*/_jsx("div", {
      hidden: true,
      id: descriptionId,
      children: description
    })]
  });
}
export const previewField = {
  label: __('Preview'),
  id: 'preview',
  render: PreviewField,
  enableSorting: false
};
function TitleField({
  item
}) {
  const isUserPattern = item.type === PATTERN_TYPES.user;
  const isTemplatePart = item.type === TEMPLATE_PART_POST_TYPE;
  const {
    onClick
  } = useLink({
    postType: item.type,
    postId: isUserPattern || isTemplatePart ? item.id : item.name,
    canvas: 'edit'
  });
  const title = decodeEntities(defaultGetTitle(item));
  return /*#__PURE__*/_jsxs(HStack, {
    alignment: "center",
    justify: "flex-start",
    spacing: 2,
    children: [/*#__PURE__*/_jsx(Flex, {
      as: "div",
      gap: 0,
      justify: "flex-start",
      className: "edit-site-patterns__pattern-title",
      children: item.type === PATTERN_TYPES.theme ? title : /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "link",
        onClick: onClick
        // Required for the grid's roving tab index system.
        // See https://github.com/WordPress/gutenberg/pull/51898#discussion_r1243399243.
        ,
        tabIndex: "-1",
        children: title
      })
    }), item.type === PATTERN_TYPES.theme && /*#__PURE__*/_jsx(Tooltip, {
      placement: "top",
      text: __('This pattern cannot be edited.'),
      children: /*#__PURE__*/_jsx(Icon, {
        className: "edit-site-patterns__pattern-lock-icon",
        icon: lockSmall,
        size: 24
      })
    })]
  });
}
export const titleField = {
  label: __('Title'),
  id: 'title',
  getValue: ({
    item
  }) => item.title?.raw || item.title,
  render: TitleField,
  enableHiding: false
};
const SYNC_FILTERS = [{
  value: PATTERN_SYNC_TYPES.full,
  label: _x('Synced', 'pattern (singular)'),
  description: __('Patterns that are kept in sync across the site.')
}, {
  value: PATTERN_SYNC_TYPES.unsynced,
  label: _x('Not synced', 'pattern (singular)'),
  description: __('Patterns that can be changed freely without affecting the site.')
}];
export const patternStatusField = {
  label: __('Sync status'),
  id: 'sync-status',
  render: ({
    item
  }) => {
    const syncStatus = 'wp_pattern_sync_status' in item ? item.wp_pattern_sync_status || PATTERN_SYNC_TYPES.full : PATTERN_SYNC_TYPES.unsynced;
    // User patterns can have their sync statuses checked directly.
    // Non-user patterns are all unsynced for the time being.
    return /*#__PURE__*/_jsx("span", {
      className: `edit-site-patterns__field-sync-status-${syncStatus}`,
      children: SYNC_FILTERS.find(({
        value
      }) => value === syncStatus).label
    });
  },
  elements: SYNC_FILTERS,
  filterBy: {
    operators: [OPERATOR_IS],
    isPrimary: true
  },
  enableSorting: false
};
function AuthorField({
  item
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const {
    text,
    icon,
    imageUrl
  } = useAddedBy(item.type, item.id);
  return /*#__PURE__*/_jsxs(HStack, {
    alignment: "left",
    spacing: 0,
    children: [imageUrl && /*#__PURE__*/_jsx("div", {
      className: clsx('page-templates-author-field__avatar', {
        'is-loaded': isImageLoaded
      }),
      children: /*#__PURE__*/_jsx("img", {
        onLoad: () => setIsImageLoaded(true),
        alt: "",
        src: imageUrl
      })
    }), !imageUrl && /*#__PURE__*/_jsx("div", {
      className: "page-templates-author-field__icon",
      children: /*#__PURE__*/_jsx(Icon, {
        icon: icon
      })
    }), /*#__PURE__*/_jsx("span", {
      className: "page-templates-author-field__name",
      children: text
    })]
  });
}
export const templatePartAuthorField = {
  label: __('Author'),
  id: 'author',
  getValue: ({
    item
  }) => item.author_text,
  render: AuthorField,
  filterBy: {
    isPrimary: true
  }
};
//# sourceMappingURL=fields.js.map