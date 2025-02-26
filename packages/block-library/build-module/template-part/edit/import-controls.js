/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { useDispatch, useSelect, useRegistry } from '@wordpress/data';
import { Button, FlexBlock, FlexItem, SelectControl, __experimentalHStack as HStack, __experimentalSpacer as Spacer } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { useCreateTemplatePartFromBlocks } from './utils/hooks';
import { transformWidgetToBlock } from './utils/transformers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SIDEBARS_QUERY = {
  per_page: -1,
  _fields: 'id,name,description,status,widgets'
};
export function TemplatePartImportControls({
  area,
  setAttributes
}) {
  const [selectedSidebar, setSelectedSidebar] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const registry = useRegistry();
  const {
    sidebars,
    hasResolved
  } = useSelect(select => {
    const {
      getSidebars,
      hasFinishedResolution
    } = select(coreStore);
    return {
      sidebars: getSidebars(SIDEBARS_QUERY),
      hasResolved: hasFinishedResolution('getSidebars', [SIDEBARS_QUERY])
    };
  }, []);
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  const createFromBlocks = useCreateTemplatePartFromBlocks(area, setAttributes);
  const options = useMemo(() => {
    const sidebarOptions = (sidebars !== null && sidebars !== void 0 ? sidebars : []).filter(widgetArea => widgetArea.id !== 'wp_inactive_widgets' && widgetArea.widgets.length > 0).map(widgetArea => {
      return {
        value: widgetArea.id,
        label: widgetArea.name
      };
    });
    if (!sidebarOptions.length) {
      return [];
    }
    return [{
      value: '',
      label: __('Select widget area')
    }, ...sidebarOptions];
  }, [sidebars]);

  // Render an empty node while data is loading to avoid SlotFill re-positioning bug.
  // See: https://github.com/WordPress/gutenberg/issues/15641.
  if (!hasResolved) {
    return /*#__PURE__*/_jsx(Spacer, {
      marginBottom: "0"
    });
  }
  if (hasResolved && !options.length) {
    return null;
  }
  async function createFromWidgets(event) {
    event.preventDefault();
    if (isBusy || !selectedSidebar) {
      return;
    }
    setIsBusy(true);
    const sidebar = options.find(({
      value
    }) => value === selectedSidebar);
    const {
      getWidgets
    } = registry.resolveSelect(coreStore);

    // The widgets API always returns a successful response.
    const widgets = await getWidgets({
      sidebar: sidebar.value,
      _embed: 'about'
    });
    const skippedWidgets = new Set();
    const blocks = widgets.flatMap(widget => {
      const block = transformWidgetToBlock(widget);

      // Skip the block if we have no matching transformations.
      if (!block) {
        skippedWidgets.add(widget.id_base);
        return [];
      }
      return block;
    });
    await createFromBlocks(blocks, /* translators: %s: name of the widget area */
    sprintf(__('Widget area: %s'), sidebar.label));
    if (skippedWidgets.size) {
      createErrorNotice(sprintf( /* translators: %s: the list of widgets */
      __('Unable to import the following widgets: %s.'), Array.from(skippedWidgets).join(', ')), {
        type: 'snackbar'
      });
    }
    setIsBusy(false);
  }
  return /*#__PURE__*/_jsx(Spacer, {
    marginBottom: "4",
    children: /*#__PURE__*/_jsxs(HStack, {
      as: "form",
      onSubmit: createFromWidgets,
      children: [/*#__PURE__*/_jsx(FlexBlock, {
        children: /*#__PURE__*/_jsx(SelectControl, {
          label: __('Import widget area'),
          value: selectedSidebar,
          options: options,
          onChange: value => setSelectedSidebar(value),
          disabled: !options.length,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        })
      }), /*#__PURE__*/_jsx(FlexItem, {
        style: {
          marginBottom: '8px',
          marginTop: 'auto'
        },
        children: /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          type: "submit",
          isBusy: isBusy,
          "aria-disabled": isBusy || !selectedSidebar,
          children: _x('Import', 'button label')
        })
      })]
    })
  });
}
//# sourceMappingURL=import-controls.js.map