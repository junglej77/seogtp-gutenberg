/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
function SaveButton() {
  const {
    hasEditedWidgetAreaIds,
    isSaving
  } = useSelect(select => {
    const {
      getEditedWidgetAreas,
      isSavingWidgetAreas
    } = select(editWidgetsStore);
    return {
      hasEditedWidgetAreaIds: getEditedWidgetAreas()?.length > 0,
      isSaving: isSavingWidgetAreas()
    };
  }, []);
  const {
    saveEditedWidgetAreas
  } = useDispatch(editWidgetsStore);
  const isDisabled = isSaving || !hasEditedWidgetAreaIds;
  return /*#__PURE__*/_jsx(Button, {
    variant: "primary",
    isBusy: isSaving,
    "aria-disabled": isDisabled,
    onClick: isDisabled ? undefined : saveEditedWidgetAreas,
    size: "compact",
    children: isSaving ? __('Saving…') : __('Update')
  });
}
export default SaveButton;
//# sourceMappingURL=index.js.map