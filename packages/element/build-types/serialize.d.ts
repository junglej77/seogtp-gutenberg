/**
 * Returns true if the specified string is prefixed by one of an array of
 * possible prefixes.
 *
 * @param {string}   string   String to check.
 * @param {string[]} prefixes Possible prefixes.
 *
 * @return {boolean} Whether string has prefix.
 */
export function hasPrefix(string: string, prefixes: string[]): boolean;
/**
 * Serializes a React element to string.
 *
 * @param {import('react').ReactNode} element         Element to serialize.
 * @param {Object}                    [context]       Context object.
 * @param {Object}                    [legacyContext] Legacy context object.
 *
 * @return {string} Serialized element.
 */
export function renderElement(element: import("react").ReactNode, context?: any, legacyContext?: any): string;
/**
 * Serializes a native component type to string.
 *
 * @param {?string} type            Native component type to serialize, or null if
 *                                  rendering as fragment of children content.
 * @param {Object}  props           Props object.
 * @param {Object}  [context]       Context object.
 * @param {Object}  [legacyContext] Legacy context object.
 *
 * @return {string} Serialized element.
 */
export function renderNativeComponent(type: string | null, props: any, context?: any, legacyContext?: any): string;
/** @typedef {import('react').ComponentType} ComponentType */
/**
 * Serializes a non-native component type to string.
 *
 * @param {ComponentType} Component       Component type to serialize.
 * @param {Object}        props           Props object.
 * @param {Object}        [context]       Context object.
 * @param {Object}        [legacyContext] Legacy context object.
 *
 * @return {string} Serialized element
 */
export function renderComponent(Component: ComponentType, props: any, context?: any, legacyContext?: any): string;
/**
 * Renders a props object as a string of HTML attributes.
 *
 * @param {Object} props Props object.
 *
 * @return {string} Attributes string.
 */
export function renderAttributes(props: any): string;
/**
 * Renders a style object as a string attribute value.
 *
 * @param {Object} style Style object.
 *
 * @return {string} Style attribute value.
 */
export function renderStyle(style: any): string;
export default renderElement;
export type ComponentType = import("react").ComponentType;
export type ReactElement = import("react").ReactElement;
//# sourceMappingURL=serialize.d.ts.map