/**
 * Internal dependencies
 */
import getFieldTypeDefinition from './field-types';
import { getControl } from './dataform-controls';

/**
 * Apply default values and normalize the fields config.
 *
 * @param fields Fields config.
 * @return Normalized fields config.
 */
export function normalizeFields(fields) {
  return fields.map(field => {
    var _field$sort, _field$isValid, _field$enableHiding, _field$enableSorting;
    const fieldTypeDefinition = getFieldTypeDefinition(field.type);
    const getValue = field.getValue || (({
      item
    }) => item[field.id]);
    const sort = (_field$sort = field.sort) !== null && _field$sort !== void 0 ? _field$sort : function sort(a, b, direction) {
      return fieldTypeDefinition.sort(getValue({
        item: a
      }), getValue({
        item: b
      }), direction);
    };
    const isValid = (_field$isValid = field.isValid) !== null && _field$isValid !== void 0 ? _field$isValid : function isValid(item, context) {
      return fieldTypeDefinition.isValid(getValue({
        item
      }), context);
    };
    const Edit = getControl(field, fieldTypeDefinition);
    const renderFromElements = ({
      item
    }) => {
      const value = getValue({
        item
      });
      return field?.elements?.find(element => element.value === value)?.label || getValue({
        item
      });
    };
    const render = field.render || (field.elements ? renderFromElements : getValue);
    return {
      ...field,
      label: field.label || field.id,
      header: field.header || field.label || field.id,
      getValue,
      render,
      sort,
      isValid,
      Edit,
      enableHiding: (_field$enableHiding = field.enableHiding) !== null && _field$enableHiding !== void 0 ? _field$enableHiding : true,
      enableSorting: (_field$enableSorting = field.enableSorting) !== null && _field$enableSorting !== void 0 ? _field$enableSorting : true
    };
  });
}
//# sourceMappingURL=normalize-fields.js.map