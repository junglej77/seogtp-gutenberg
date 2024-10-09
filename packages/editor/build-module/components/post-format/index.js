/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, RadioControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useInstanceId } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import PostFormatCheck from './check';
import { store as editorStore } from '../../store';

// All WP post formats, sorted alphabetically by translated name.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const POST_FORMATS = [{
  id: 'aside',
  caption: __('Aside')
}, {
  id: 'audio',
  caption: __('Audio')
}, {
  id: 'chat',
  caption: __('Chat')
}, {
  id: 'gallery',
  caption: __('Gallery')
}, {
  id: 'image',
  caption: __('Image')
}, {
  id: 'link',
  caption: __('Link')
}, {
  id: 'quote',
  caption: __('Quote')
}, {
  id: 'standard',
  caption: __('Standard')
}, {
  id: 'status',
  caption: __('Status')
}, {
  id: 'video',
  caption: __('Video')
}].sort((a, b) => {
  const normalizedA = a.caption.toUpperCase();
  const normalizedB = b.caption.toUpperCase();
  if (normalizedA < normalizedB) {
    return -1;
  }
  if (normalizedA > normalizedB) {
    return 1;
  }
  return 0;
});

/**
 * `PostFormat` a component that allows changing the post format while also providing a suggestion for the current post.
 *
 * @example
 * ```jsx
 * <PostFormat />
 * ```
 *
 * @return {JSX.Element} The rendered PostFormat component.
 */
export default function PostFormat() {
  const instanceId = useInstanceId(PostFormat);
  const postFormatSelectorId = `post-format-selector-${instanceId}`;
  const {
    postFormat,
    suggestedFormat,
    supportedFormats
  } = useSelect(select => {
    const {
      getEditedPostAttribute,
      getSuggestedPostFormat
    } = select(editorStore);
    const _postFormat = getEditedPostAttribute('format');
    const themeSupports = select(coreStore).getThemeSupports();
    return {
      postFormat: _postFormat !== null && _postFormat !== void 0 ? _postFormat : 'standard',
      suggestedFormat: getSuggestedPostFormat(),
      supportedFormats: themeSupports.formats
    };
  }, []);
  const formats = POST_FORMATS.filter(format => {
    // Ensure current format is always in the set.
    // The current format may not be a format supported by the theme.
    return supportedFormats?.includes(format.id) || postFormat === format.id;
  });
  const suggestion = formats.find(format => format.id === suggestedFormat);
  const {
    editPost
  } = useDispatch(editorStore);
  const onUpdatePostFormat = format => editPost({
    format
  });
  return /*#__PURE__*/_jsx(PostFormatCheck, {
    children: /*#__PURE__*/_jsxs("div", {
      className: "editor-post-format",
      children: [/*#__PURE__*/_jsx(RadioControl, {
        className: "editor-post-format__options",
        label: __('Post Format'),
        selected: postFormat,
        onChange: format => onUpdatePostFormat(format),
        id: postFormatSelectorId,
        options: formats.map(format => ({
          label: format.caption,
          value: format.id
        })),
        hideLabelFromVision: true
      }), suggestion && suggestion.id !== postFormat && /*#__PURE__*/_jsx("p", {
        className: "editor-post-format__suggestion",
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "link",
          onClick: () => onUpdatePostFormat(suggestion.id),
          children: sprintf( /* translators: %s: post format */
          __('Apply suggested format: %s'), suggestion.caption)
        })
      })]
    })
  });
}
//# sourceMappingURL=index.js.map