/**
 * @typedef OwnProps
 *
 * @property {import('./types').IconKey} icon        Icon name
 * @property {string}                    [className] Class name
 * @property {number}                    [size]      Size of the icon
 */
/**
 * Internal dependencies
 */
import type { WordPressComponentProps } from '../context';
import type { DashiconProps } from './types';
declare function Dashicon({ icon, className, size, style, ...extraProps }: WordPressComponentProps<DashiconProps, 'span', false>): import("react").JSX.Element;
export default Dashicon;
//# sourceMappingURL=index.d.ts.map