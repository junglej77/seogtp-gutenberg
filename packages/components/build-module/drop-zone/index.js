/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { upload, Icon } from '@wordpress/icons';
import { getFilesFromDataTransfer } from '@wordpress/dom';
import { __experimentalUseDropZone as useDropZone } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * `DropZone` is a component creating a drop zone area taking the full size of its parent element. It supports dropping files, HTML content or any other HTML drop event.
 *
 * ```jsx
 * import { DropZone } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyDropZone = () => {
 *   const [ hasDropped, setHasDropped ] = useState( false );
 *
 *   return (
 *     <div>
 *       { hasDropped ? 'Dropped!' : 'Drop something here' }
 *       <DropZone
 *         onFilesDrop={ () => setHasDropped( true ) }
 *         onHTMLDrop={ () => setHasDropped( true ) }
 *         onDrop={ () => setHasDropped( true ) }
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function DropZoneComponent({
  className,
  label,
  onFilesDrop,
  onHTMLDrop,
  onDrop,
  ...restProps
}) {
  const [isDraggingOverDocument, setIsDraggingOverDocument] = useState();
  const [isDraggingOverElement, setIsDraggingOverElement] = useState();
  const [type, setType] = useState();
  const ref = useDropZone({
    onDrop(event) {
      const files = event.dataTransfer ? getFilesFromDataTransfer(event.dataTransfer) : [];
      const html = event.dataTransfer?.getData('text/html');

      /**
       * From Windows Chrome 96, the `event.dataTransfer` returns both file object and HTML.
       * The order of the checks is important to recognize the HTML drop.
       */
      if (html && onHTMLDrop) {
        onHTMLDrop(html);
      } else if (files.length && onFilesDrop) {
        onFilesDrop(files);
      } else if (onDrop) {
        onDrop(event);
      }
    },
    onDragStart(event) {
      setIsDraggingOverDocument(true);
      let _type = 'default';

      /**
       * From Windows Chrome 96, the `event.dataTransfer` returns both file object and HTML.
       * The order of the checks is important to recognize the HTML drop.
       */
      if (event.dataTransfer?.types.includes('text/html')) {
        _type = 'html';
      } else if (
      // Check for the types because sometimes the files themselves
      // are only available on drop.
      event.dataTransfer?.types.includes('Files') || (event.dataTransfer ? getFilesFromDataTransfer(event.dataTransfer) : []).length > 0) {
        _type = 'file';
      }
      setType(_type);
    },
    onDragEnd() {
      setIsDraggingOverDocument(false);
      setType(undefined);
    },
    onDragEnter() {
      setIsDraggingOverElement(true);
    },
    onDragLeave() {
      setIsDraggingOverElement(false);
    }
  });
  const classes = clsx('components-drop-zone', className, {
    'is-active': (isDraggingOverDocument || isDraggingOverElement) && (type === 'file' && onFilesDrop || type === 'html' && onHTMLDrop || type === 'default' && onDrop),
    'has-dragged-out': !isDraggingOverElement,
    // Keeping the following classnames for legacy purposes
    'is-dragging-over-document': isDraggingOverDocument,
    'is-dragging-over-element': isDraggingOverElement,
    [`is-dragging-${type}`]: !!type
  });
  return /*#__PURE__*/_jsx("div", {
    ...restProps,
    ref: ref,
    className: classes,
    children: /*#__PURE__*/_jsx("div", {
      className: "components-drop-zone__content",
      children: /*#__PURE__*/_jsxs("div", {
        className: "components-drop-zone__content-inner",
        children: [/*#__PURE__*/_jsx(Icon, {
          icon: upload,
          className: "components-drop-zone__content-icon"
        }), /*#__PURE__*/_jsx("span", {
          className: "components-drop-zone__content-text",
          children: label ? label : __('Drop files to upload')
        })]
      })
    })
  });
}
export default DropZoneComponent;
//# sourceMappingURL=index.js.map