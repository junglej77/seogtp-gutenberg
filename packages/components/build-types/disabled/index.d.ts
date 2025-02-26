import type { DisabledProps } from './types';
import type { WordPressComponentProps } from '../context';
/**
 * `Disabled` is a component which disables descendant tabbable elements and
 * prevents pointer interaction.
 *
 * _Note: this component may not behave as expected in browsers that don't
 * support the `inert` HTML attribute. We recommend adding the official WICG
 * polyfill when using this component in your project._
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
 *
 * ```jsx
 * import { Button, Disabled, TextControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyDisabled = () => {
 * 	const [ isDisabled, setIsDisabled ] = useState( true );
 *
 * 	let input = <TextControl label="Input" onChange={ () => {} } />;
 * 	if ( isDisabled ) {
 * 		input = <Disabled>{ input }</Disabled>;
 * 	}
 *
 * 	const toggleDisabled = () => {
 * 		setIsDisabled( ( state ) => ! state );
 * 	};
 *
 * 	return (
 * 		<div>
 * 			{ input }
 * 			<Button variant="primary" onClick={ toggleDisabled }>
 * 				Toggle Disabled
 * 			</Button>
 * 		</div>
 * 	);
 * };
 * ```
 */
declare function Disabled({ className, children, isDisabled, ...props }: WordPressComponentProps<DisabledProps, 'div'>): import("react").JSX.Element;
declare namespace Disabled {
    var Context: import("react").Context<boolean>;
    var Consumer: import("react").Consumer<boolean>;
}
export default Disabled;
//# sourceMappingURL=index.d.ts.map