/**
 * Helper util to return a value from a certain path of the object.
 * Path is specified as either:
 * - a string of properties, separated by dots, for example: "x.y".
 * - an array of properties, for example `[ 'x', 'y' ]`.
 * You can also specify a default value in case the result is nullish.
 *
 * @param {Object}       object       Input object.
 * @param {string|Array} path         Path to the object property.
 * @param {*}            defaultValue Default value if the value at the specified path is undefined.
 * @return {*} Value of the object property at the specified path.
 */
export default function getNestedValue(object: any, path: string | any[], defaultValue: any): any;
//# sourceMappingURL=get-nested-value.d.ts.map