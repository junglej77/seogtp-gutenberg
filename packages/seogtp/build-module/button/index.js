import { Button } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const SaveButton = ({
  isSaving,
  onSave
}) => /*#__PURE__*/_jsx(Button, {
  isPrimary: true,
  disabled: isSaving,
  onClick: onSave,
  children: isSaving ? 'Savingaaaa...' : 'Saveaaaa'
});
export default SaveButton;
//# sourceMappingURL=index.js.map