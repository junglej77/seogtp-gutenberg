/**
 * WordPress dependencies
 */
import { useSelect, useRegistry } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import MetaBoxesArea from './meta-boxes-area';
import MetaBoxVisibility from './meta-box-visibility';
import { store as editPostStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function MetaBoxes({
  location
}) {
  const registry = useRegistry();
  const {
    metaBoxes,
    areMetaBoxesInitialized,
    isEditorReady
  } = useSelect(select => {
    const {
      __unstableIsEditorReady
    } = select(editorStore);
    const {
      getMetaBoxesPerLocation,
      areMetaBoxesInitialized: _areMetaBoxesInitialized
    } = select(editPostStore);
    return {
      metaBoxes: getMetaBoxesPerLocation(location),
      areMetaBoxesInitialized: _areMetaBoxesInitialized(),
      isEditorReady: __unstableIsEditorReady()
    };
  }, [location]);
  const hasMetaBoxes = !!metaBoxes?.length;

  // When editor is ready, initialize postboxes (wp core script) and metabox
  // saving. This initializes all meta box locations, not just this specific
  // one.
  useEffect(() => {
    if (isEditorReady && hasMetaBoxes && !areMetaBoxesInitialized) {
      registry.dispatch(editPostStore).initializeMetaBoxes();
    }
  }, [isEditorReady, hasMetaBoxes, areMetaBoxesInitialized]);
  if (!areMetaBoxesInitialized) {
    return null;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [(metaBoxes !== null && metaBoxes !== void 0 ? metaBoxes : []).map(({
      id
    }) => /*#__PURE__*/_jsx(MetaBoxVisibility, {
      id: id
    }, id)), /*#__PURE__*/_jsx(MetaBoxesArea, {
      location: location
    })]
  });
}
//# sourceMappingURL=index.js.map