/**
 * In some circumstances, such as block previews, all focusable DOM elements
 * (input fields, links, buttons, etc.) need to be disabled. This hook adds the
 * behavior to disable nested DOM elements to the returned ref.
 *
 * If you can, prefer the use of the inert HTML attribute.
 *
 * @param {Object}   config            Configuration object.
 * @param {boolean=} config.isDisabled Whether the element should be disabled.
 * @return {import('react').RefCallback<HTMLElement>} Element Ref.
 *
 * @example
 * ```js
 * import { useDisabled } from '@wordpress/compose';
 *
 * const DisabledExample = () => {
 * 	const disabledRef = useDisabled();
 *	return (
 *		<div ref={ disabledRef }>
 *			<a href="#">This link will have tabindex set to -1</a>
 *			<input placeholder="This input will have the disabled attribute added to it." type="text" />
 *		</div>
 *	);
 * };
 * ```
 */
export default function useDisabled({ isDisabled: isDisabledProp, }?: {
    isDisabled?: boolean | undefined;
}): import("react").RefCallback<Node | null>;
//# sourceMappingURL=index.d.ts.map