/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { Button } from '@wordpress/components';
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { MediaCategoryPanel } from './media-panel';
import MediaUploadCheck from '../../media-upload/check';
import MediaUpload from '../../media-upload';
import { useMediaCategories } from './hooks';
import { getBlockAndPreviewFromMedia } from './utils';
import MobileTabNavigation from '../mobile-tab-navigation';
import CategoryTabs from '../category-tabs';
import InserterNoResults from '../no-results';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['image', 'video', 'audio'];
function MediaTab({
  rootClientId,
  selectedCategory,
  onSelectCategory,
  onInsert,
  children
}) {
  const mediaCategories = useMediaCategories(rootClientId);
  const isMobile = useViewportMatch('medium', '<');
  const baseCssClass = 'block-editor-inserter__media-tabs';
  const onSelectMedia = useCallback(media => {
    if (!media?.url) {
      return;
    }
    const [block] = getBlockAndPreviewFromMedia(media, media.type);
    onInsert(block);
  }, [onInsert]);
  const categories = useMemo(() => mediaCategories.map(mediaCategory => ({
    ...mediaCategory,
    label: mediaCategory.labels.name
  })), [mediaCategories]);
  if (!categories.length) {
    return /*#__PURE__*/_jsx(InserterNoResults, {});
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!isMobile && /*#__PURE__*/_jsxs("div", {
      className: `${baseCssClass}-container`,
      children: [/*#__PURE__*/_jsx(CategoryTabs, {
        categories: categories,
        selectedCategory: selectedCategory,
        onSelectCategory: onSelectCategory,
        children: children
      }), /*#__PURE__*/_jsx(MediaUploadCheck, {
        children: /*#__PURE__*/_jsx(MediaUpload, {
          multiple: false,
          onSelect: onSelectMedia,
          allowedTypes: ALLOWED_MEDIA_TYPES,
          render: ({
            open
          }) => /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            onClick: event => {
              // Safari doesn't emit a focus event on button elements when
              // clicked and we need to manually focus the button here.
              // The reason is that core's Media Library modal explicitly triggers a
              // focus event and therefore a `blur` event is triggered on a different
              // element, which doesn't contain the `data-unstable-ignore-focus-outside-for-relatedtarget`
              // attribute making the Inserter dialog to close.
              event.target.focus();
              open();
            },
            className: "block-editor-inserter__media-library-button",
            variant: "secondary",
            "data-unstable-ignore-focus-outside-for-relatedtarget": ".media-modal",
            children: __('Open Media Library')
          })
        })
      })]
    }), isMobile && /*#__PURE__*/_jsx(MobileTabNavigation, {
      categories: categories,
      children: category => /*#__PURE__*/_jsx(MediaCategoryPanel, {
        onInsert: onInsert,
        rootClientId: rootClientId,
        category: category
      })
    })]
  });
}
export default MediaTab;
//# sourceMappingURL=media-tab.js.map