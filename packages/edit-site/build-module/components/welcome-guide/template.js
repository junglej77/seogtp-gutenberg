/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as preferencesStore } from '@wordpress/preferences';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import useEditedEntityRecord from '../use-edited-entity-record';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuideTemplate() {
  const {
    toggle
  } = useDispatch(preferencesStore);
  const {
    isLoaded,
    record
  } = useEditedEntityRecord();
  const isPostTypeTemplate = isLoaded && record.type === 'wp_template';
  const {
    isActive,
    hasPreviousEntity
  } = useSelect(select => {
    const {
      getEditorSettings
    } = select(editorStore);
    const {
      get
    } = select(preferencesStore);
    return {
      isActive: get('core/edit-site', 'welcomeGuideTemplate'),
      hasPreviousEntity: !!getEditorSettings().onNavigateToPreviousEntityRecord
    };
  }, []);
  const isVisible = isActive && isPostTypeTemplate && hasPreviousEntity;
  if (!isVisible) {
    return null;
  }
  const heading = __('Editing a template');
  return /*#__PURE__*/_jsx(Guide, {
    className: "edit-site-welcome-guide guide-template",
    contentLabel: heading,
    finishButtonText: __('Continue'),
    onFinish: () => toggle('core/edit-site', 'welcomeGuideTemplate'),
    pages: [{
      image: /*#__PURE__*/_jsx("video", {
        className: "edit-site-welcome-guide__video",
        autoPlay: true,
        loop: true,
        muted: true,
        width: "312",
        height: "240",
        children: /*#__PURE__*/_jsx("source", {
          src: "https://s.w.org/images/block-editor/editing-your-template.mp4",
          type: "video/mp4"
        })
      }),
      content: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "edit-site-welcome-guide__heading",
          children: heading
        }), /*#__PURE__*/_jsx("p", {
          className: "edit-site-welcome-guide__text",
          children: __('Note that the same template can be used by multiple pages, so any changes made here may affect other pages on the site. To switch back to editing the page content click the ‘Back’ button in the toolbar.')
        })]
      })
    }]
  });
}
//# sourceMappingURL=template.js.map