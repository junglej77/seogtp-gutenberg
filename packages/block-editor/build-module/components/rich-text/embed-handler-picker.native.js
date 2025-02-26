/**
 * WordPress dependencies
 */
import { forwardRef, useRef, useImperativeHandle, memo, useCallback } from '@wordpress/element';
import { Picker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
const noop = () => {};
const DEFAULT_PICKER_OPTIONS = [{
  id: 'createEmbed',
  label: __('Create embed'),
  value: 'createEmbed',
  onSelect: noop
}, {
  id: 'createLink',
  label: __('Create link'),
  value: 'createLink',
  onSelect: noop
}];
const EmbedHandlerPicker = forwardRef(({}, ref) => {
  const pickerRef = useRef();
  const pickerOptions = useRef(DEFAULT_PICKER_OPTIONS).current;
  const onPickerSelect = useCallback(value => {
    const selectedItem = pickerOptions.find(item => item.value === value);
    selectedItem.onSelect();
  }, [pickerOptions]);
  useImperativeHandle(ref, () => ({
    presentPicker: ({
      createEmbed,
      createLink
    }) => {
      pickerOptions[0].onSelect = createEmbed;
      pickerOptions[1].onSelect = createLink;
      pickerRef.current?.presentPicker();
    }
  }));
  return /*#__PURE__*/_jsx(Picker, {
    ref: pickerRef,
    options: pickerOptions,
    onChange: onPickerSelect,
    testID: "embed-handler-picker",
    hideCancelButton: true,
    leftAlign: true
  });
});
export default memo(EmbedHandlerPicker);
//# sourceMappingURL=embed-handler-picker.native.js.map