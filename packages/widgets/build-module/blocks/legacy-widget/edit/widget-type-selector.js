/**
 * WordPress dependencies
 */
import { Spinner, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
export default function WidgetTypeSelector({
  selectedId,
  onSelect
}) {
  const widgetTypes = useSelect(select => {
    var _select$getSettings$w;
    const hiddenIds = (_select$getSettings$w = select(blockEditorStore).getSettings()?.widgetTypesToHideFromLegacyWidgetBlock) !== null && _select$getSettings$w !== void 0 ? _select$getSettings$w : [];
    return select(coreStore).getWidgetTypes({
      per_page: -1
    })?.filter(widgetType => !hiddenIds.includes(widgetType.id));
  }, []);
  if (!widgetTypes) {
    return /*#__PURE__*/_jsx(Spinner, {});
  }
  if (widgetTypes.length === 0) {
    return __('There are no widgets available.');
  }
  return /*#__PURE__*/_jsx(SelectControl, {
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    label: __('Select a legacy widget to display:'),
    value: selectedId !== null && selectedId !== void 0 ? selectedId : '',
    options: [{
      value: '',
      label: __('Select widget')
    }, ...widgetTypes.map(widgetType => ({
      value: widgetType.id,
      label: widgetType.name
    }))],
    onChange: value => {
      if (value) {
        const selected = widgetTypes.find(widgetType => widgetType.id === value);
        onSelect({
          selectedId: selected.id,
          isMulti: selected.is_multi
        });
      } else {
        onSelect({
          selectedId: null
        });
      }
    }
  });
}
//# sourceMappingURL=widget-type-selector.js.map