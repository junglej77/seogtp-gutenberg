/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { normalizeFields } from '../../normalize-fields';
import { jsx as _jsx } from "react/jsx-runtime";
export default function FormRegular({
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
    spacing: 4,
    children: visibleFields.map(field => {
      return /*#__PURE__*/_jsx(field.Edit, {
        data: data,
        field: field,
        onChange: onChange
      }, field.id);
    })
  });
}
//# sourceMappingURL=index.js.map