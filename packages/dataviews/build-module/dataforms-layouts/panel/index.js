/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalSpacer as Spacer, Dropdown, Button } from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { normalizeFields } from '../../normalize-fields';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function DropdownHeader({
  title,
  onClose
}) {
  return /*#__PURE__*/_jsx(VStack, {
    className: "dataforms-layouts-panel__dropdown-header",
    spacing: 4,
    children: /*#__PURE__*/_jsxs(HStack, {
      alignment: "center",
      children: [/*#__PURE__*/_jsx(Heading, {
        level: 2,
        size: 13,
        children: title
      }), /*#__PURE__*/_jsx(Spacer, {}), onClose && /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "dataforms-layouts-panel__dropdown-header-action",
        label: __('Close'),
        icon: closeSmall,
        onClick: onClose
      })]
    })
  });
}
function FormField({
  data,
  field,
  onChange
}) {
  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = useMemo(() => ({
    // Anchor the popover to the middle of the entire row so that it doesn't
    // move around when the label changes.
    anchor: popoverAnchor,
    placement: 'left-start',
    offset: 36,
    shift: true
  }), [popoverAnchor]);
  return /*#__PURE__*/_jsxs(HStack, {
    ref: setPopoverAnchor,
    className: "dataforms-layouts-panel__field",
    children: [/*#__PURE__*/_jsx("div", {
      className: "dataforms-layouts-panel__field-label",
      children: field.label
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Dropdown, {
        contentClassName: "dataforms-layouts-panel__field-dropdown",
        popoverProps: popoverProps,
        focusOnMount: true,
        toggleProps: {
          size: 'compact',
          variant: 'tertiary',
          tooltipPosition: 'middle left'
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/_jsx(Button, {
          className: "dataforms-layouts-panel__field-control",
          size: "compact",
          variant: "tertiary",
          "aria-expanded": isOpen,
          "aria-label": sprintf(
          // translators: %s: Field name.
          __('Edit %s'), field.label),
          onClick: onToggle,
          children: /*#__PURE__*/_jsx(field.render, {
            item: data
          })
        }),
        renderContent: ({
          onClose
        }) => /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(DropdownHeader, {
            title: field.label,
            onClose: onClose
          }), /*#__PURE__*/_jsx(field.Edit, {
            data: data,
            field: field,
            onChange: onChange,
            hideLabelFromVision: true
          }, field.id)]
        })
      })
    })]
  });
}
export default function FormPanel({
  data,
  fields,
  form,
  onChange
}) {
  const visibleFields = useMemo(() => {
    var _form$fields;
    return normalizeFields(((_form$fields = form.fields) !== null && _form$fields !== void 0 ? _form$fields : []).map(fieldId => fields.find(({
      id
    }) => id === fieldId)).filter(field => !!field));
  }, [fields, form.fields]);
  return /*#__PURE__*/_jsx(VStack, {
    spacing: 2,
    children: visibleFields.map(field => {
      return /*#__PURE__*/_jsx(FormField, {
        data: data,
        field: field,
        onChange: onChange
      }, field.id);
    })
  });
}
//# sourceMappingURL=index.js.map