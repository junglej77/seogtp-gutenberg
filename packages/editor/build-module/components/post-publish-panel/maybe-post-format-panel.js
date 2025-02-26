/**
 * WordPress dependencies
 */
import { Button, PanelBody } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { POST_FORMATS } from '../post-format';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const getSuggestion = (supportedFormats, suggestedPostFormat) => {
  const formats = POST_FORMATS.filter(format => supportedFormats?.includes(format.id));
  return formats.find(format => format.id === suggestedPostFormat);
};
const PostFormatSuggestion = ({
  suggestedPostFormat,
  suggestionText,
  onUpdatePostFormat
}) => /*#__PURE__*/_jsx(Button
// TODO: Switch to `true` (40px size) if possible
, {
  __next40pxDefaultSize: false,
  variant: "link",
  onClick: () => onUpdatePostFormat(suggestedPostFormat),
  children: suggestionText
});
export default function PostFormatPanel() {
  const {
    currentPostFormat,
    suggestion
  } = useSelect(select => {
    var _select$getThemeSuppo;
    const {
      getEditedPostAttribute,
      getSuggestedPostFormat
    } = select(editorStore);
    const supportedFormats = (_select$getThemeSuppo = select(coreStore).getThemeSupports().formats) !== null && _select$getThemeSuppo !== void 0 ? _select$getThemeSuppo : [];
    return {
      currentPostFormat: getEditedPostAttribute('format'),
      suggestion: getSuggestion(supportedFormats, getSuggestedPostFormat())
    };
  }, []);
  const {
    editPost
  } = useDispatch(editorStore);
  const onUpdatePostFormat = format => editPost({
    format
  });
  const panelBodyTitle = [__('Suggestion:'), /*#__PURE__*/_jsx("span", {
    className: "editor-post-publish-panel__link",
    children: __('Use a post format')
  }, "label")];
  if (!suggestion || suggestion.id === currentPostFormat) {
    return null;
  }
  return /*#__PURE__*/_jsxs(PanelBody, {
    initialOpen: false,
    title: panelBodyTitle,
    children: [/*#__PURE__*/_jsx("p", {
      children: __('Your theme uses post formats to highlight different kinds of content, like images or videos. Apply a post format to see this special styling.')
    }), /*#__PURE__*/_jsx("p", {
      children: /*#__PURE__*/_jsx(PostFormatSuggestion, {
        onUpdatePostFormat: onUpdatePostFormat,
        suggestedPostFormat: suggestion.id,
        suggestionText: sprintf( /* translators: %s: post format */
        __('Apply the "%1$s" format.'), suggestion.caption)
      })
    })]
  });
}
//# sourceMappingURL=maybe-post-format-panel.js.map