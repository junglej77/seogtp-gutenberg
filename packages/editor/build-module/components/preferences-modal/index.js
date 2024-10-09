/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as preferencesStore, privateApis as preferencesPrivateApis } from '@wordpress/preferences';
import { store as interfaceStore } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import EnablePanelOption from './enable-panel';
import EnablePluginDocumentSettingPanelOption from './enable-plugin-document-setting-panel';
import EnablePublishSidebarOption from './enable-publish-sidebar';
import BlockManager from '../block-manager';
import PostTaxonomies from '../post-taxonomies';
import PostFeaturedImageCheck from '../post-featured-image/check';
import PostExcerptCheck from '../post-excerpt/check';
import PageAttributesCheck from '../page-attributes/check';
import PostTypeSupportCheck from '../post-type-support-check';
import { store as editorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { useStartPatterns } from '../start-page-options';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  PreferencesModal,
  PreferencesModalTabs,
  PreferencesModalSection,
  PreferenceToggleControl
} = unlock(preferencesPrivateApis);
export default function EditorPreferencesModal({
  extraSections = {}
}) {
  const isLargeViewport = useViewportMatch('medium');
  const {
    isActive,
    showBlockBreadcrumbsOption
  } = useSelect(select => {
    const {
      getEditorSettings
    } = select(editorStore);
    const {
      get
    } = select(preferencesStore);
    const {
      isModalActive
    } = select(interfaceStore);
    const isRichEditingEnabled = getEditorSettings().richEditingEnabled;
    const isDistractionFreeEnabled = get('core', 'distractionFree');
    return {
      showBlockBreadcrumbsOption: !isDistractionFreeEnabled && isLargeViewport && isRichEditingEnabled,
      isActive: isModalActive('editor/preferences')
    };
  }, [isLargeViewport]);
  const {
    closeModal
  } = useDispatch(interfaceStore);
  const {
    setIsListViewOpened,
    setIsInserterOpened
  } = useDispatch(editorStore);
  const {
    set: setPreference
  } = useDispatch(preferencesStore);
  const hasStarterPatterns = !!useStartPatterns().length;
  const sections = useMemo(() => [{
    name: 'general',
    tabLabel: __('General'),
    content: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(PreferencesModalSection, {
        title: __('Interface'),
        children: [/*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "showListViewByDefault",
          help: __('Opens the List View sidebar by default.'),
          label: __('Always open List View')
        }), showBlockBreadcrumbsOption && /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "showBlockBreadcrumbs",
          help: __('Display the block hierarchy trail at the bottom of the editor.'),
          label: __('Show block breadcrumbs')
        }), /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "allowRightClickOverrides",
          help: __('Allows contextual List View menus via right-click, overriding browser defaults.'),
          label: __('Allow right-click contextual menus')
        }), hasStarterPatterns && /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "enableChoosePatternModal",
          help: __('Shows starter patterns when creating a new page.'),
          label: __('Show starter patterns')
        })]
      }), /*#__PURE__*/_jsxs(PreferencesModalSection, {
        title: __('Document settings'),
        description: __('Select what settings are shown in the document panel.'),
        children: [/*#__PURE__*/_jsx(EnablePluginDocumentSettingPanelOption.Slot, {}), /*#__PURE__*/_jsx(PostTaxonomies, {
          taxonomyWrapper: (content, taxonomy) => /*#__PURE__*/_jsx(EnablePanelOption, {
            label: taxonomy.labels.menu_name,
            panelName: `taxonomy-panel-${taxonomy.slug}`
          })
        }), /*#__PURE__*/_jsx(PostFeaturedImageCheck, {
          children: /*#__PURE__*/_jsx(EnablePanelOption, {
            label: __('Featured image'),
            panelName: "featured-image"
          })
        }), /*#__PURE__*/_jsx(PostExcerptCheck, {
          children: /*#__PURE__*/_jsx(EnablePanelOption, {
            label: __('Excerpt'),
            panelName: "post-excerpt"
          })
        }), /*#__PURE__*/_jsx(PostTypeSupportCheck, {
          supportKeys: ['comments', 'trackbacks'],
          children: /*#__PURE__*/_jsx(EnablePanelOption, {
            label: __('Discussion'),
            panelName: "discussion-panel"
          })
        }), /*#__PURE__*/_jsx(PageAttributesCheck, {
          children: /*#__PURE__*/_jsx(EnablePanelOption, {
            label: __('Page attributes'),
            panelName: "page-attributes"
          })
        })]
      }), isLargeViewport && /*#__PURE__*/_jsx(PreferencesModalSection, {
        title: __('Publishing'),
        children: /*#__PURE__*/_jsx(EnablePublishSidebarOption, {
          help: __('Review settings, such as visibility and tags.'),
          label: __('Enable pre-publish checks')
        })
      }), extraSections?.general]
    })
  }, {
    name: 'appearance',
    tabLabel: __('Appearance'),
    content: /*#__PURE__*/_jsxs(PreferencesModalSection, {
      title: __('Appearance'),
      description: __('Customize the editor interface to suit your needs.'),
      children: [/*#__PURE__*/_jsx(PreferenceToggleControl, {
        scope: "core",
        featureName: "fixedToolbar",
        onToggle: () => setPreference('core', 'distractionFree', false),
        help: __('Access all block and document tools in a single place.'),
        label: __('Top toolbar')
      }), /*#__PURE__*/_jsx(PreferenceToggleControl, {
        scope: "core",
        featureName: "distractionFree",
        onToggle: () => {
          setPreference('core', 'fixedToolbar', true);
          setIsInserterOpened(false);
          setIsListViewOpened(false);
        },
        help: __('Reduce visual distractions by hiding the toolbar and other elements to focus on writing.'),
        label: __('Distraction free')
      }), /*#__PURE__*/_jsx(PreferenceToggleControl, {
        scope: "core",
        featureName: "focusMode",
        help: __('Highlights the current block and fades other content.'),
        label: __('Spotlight mode')
      }), extraSections?.appearance]
    })
  }, {
    name: 'accessibility',
    tabLabel: __('Accessibility'),
    content: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(PreferencesModalSection, {
        title: __('Navigation'),
        description: __('Optimize the editing experience for enhanced control.'),
        children: /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "keepCaretInsideBlock",
          help: __('Keeps the text cursor within the block boundaries, aiding users with screen readers by preventing unintentional cursor movement outside the block.'),
          label: __('Contain text cursor inside block')
        })
      }), /*#__PURE__*/_jsx(PreferencesModalSection, {
        title: __('Interface'),
        children: /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "showIconLabels",
          label: __('Show button text labels'),
          help: __('Show text instead of icons on buttons across the interface.')
        })
      })]
    })
  }, {
    name: 'blocks',
    tabLabel: __('Blocks'),
    content: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(PreferencesModalSection, {
        title: __('Inserter'),
        children: /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core",
          featureName: "mostUsedBlocks",
          help: __('Adds a category with the most frequently used blocks in the inserter.'),
          label: __('Show most used blocks')
        })
      }), /*#__PURE__*/_jsx(PreferencesModalSection, {
        title: __('Manage block visibility'),
        description: __("Disable blocks that you don't want to appear in the inserter. They can always be toggled back on later."),
        children: /*#__PURE__*/_jsx(BlockManager, {})
      })]
    })
  }, window.__experimentalMediaProcessing && {
    name: 'media',
    tabLabel: __('Media'),
    content: /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsxs(PreferencesModalSection, {
        title: __('General'),
        description: __('Customize options related to the media upload flow.'),
        children: [/*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core/media",
          featureName: "optimizeOnUpload",
          help: __('Compress media items before uploading to the server.'),
          label: __('Pre-upload compression')
        }), /*#__PURE__*/_jsx(PreferenceToggleControl, {
          scope: "core/media",
          featureName: "requireApproval",
          help: __('Require approval step when optimizing existing media.'),
          label: __('Approval step')
        })]
      })
    })
  }].filter(Boolean), [showBlockBreadcrumbsOption, extraSections, setIsInserterOpened, setIsListViewOpened, setPreference, isLargeViewport, hasStarterPatterns]);
  if (!isActive) {
    return null;
  }
  return /*#__PURE__*/_jsx(PreferencesModal, {
    closeModal: closeModal,
    children: /*#__PURE__*/_jsx(PreferencesModalTabs, {
      sections: sections
    })
  });
}
//# sourceMappingURL=index.js.map