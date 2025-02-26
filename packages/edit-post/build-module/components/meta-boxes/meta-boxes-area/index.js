/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

/**
 * Render metabox area.
 *
 * @param {Object} props          Component props.
 * @param {string} props.location metabox location.
 * @return {Component} The component to be rendered.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function MetaBoxesArea({
  location
}) {
  const container = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    formRef.current = document.querySelector('.metabox-location-' + location);
    if (formRef.current) {
      container.current.appendChild(formRef.current);
    }
    return () => {
      if (formRef.current) {
        document.querySelector('#metaboxes').appendChild(formRef.current);
      }
    };
  }, [location]);
  const isSaving = useSelect(select => {
    return select(editPostStore).isSavingMetaBoxes();
  }, []);
  const classes = clsx('edit-post-meta-boxes-area', `is-${location}`, {
    'is-loading': isSaving
  });
  return /*#__PURE__*/_jsxs("div", {
    className: classes,
    children: [isSaving && /*#__PURE__*/_jsx(Spinner, {}), /*#__PURE__*/_jsx("div", {
      className: "edit-post-meta-boxes-area__container",
      ref: container
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-post-meta-boxes-area__clear"
    })]
  });
}
export default MetaBoxesArea;
//# sourceMappingURL=index.js.map