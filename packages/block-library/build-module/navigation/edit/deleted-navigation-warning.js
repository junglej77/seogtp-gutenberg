/**
 * WordPress dependencies
 */
import { Warning } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
function DeletedNavigationWarning({
  onCreateNew
}) {
  return /*#__PURE__*/_jsx(Warning, {
    children: createInterpolateElement(__('Navigation Menu has been deleted or is unavailable. <button>Create a new Menu?</button>'), {
      button: /*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        onClick: onCreateNew,
        variant: "link"
      })
    })
  });
}
export default DeletedNavigationWarning;
//# sourceMappingURL=deleted-navigation-warning.js.map