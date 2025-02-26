import type { ConfirmDialogProps } from './types';
/**
 * `ConfirmDialog` is built of top of [`Modal`](/packages/components/src/modal/README.md)
 * and displays a confirmation dialog, with _confirm_ and _cancel_ buttons.
 * The dialog is confirmed by clicking the _confirm_ button or by pressing the `Enter` key.
 * It is cancelled (closed) by clicking the _cancel_ button, by pressing the `ESC` key, or by
 * clicking outside the dialog focus (i.e, the overlay).
 *
 * `ConfirmDialog` has two main implicit modes: controlled and uncontrolled.
 *
 * UnControlled:
 *
 * Allows the component to be used standalone, just by declaring it as part of another React's component render method:
 * -   It will be automatically open (displayed) upon mounting;
 * -   It will be automatically closed when clicking the _cancel_ button, by pressing the `ESC` key, or by clicking outside the dialog focus (i.e, the overlay);
 * -   `onCancel` is not mandatory but can be passed. Even if passed, the dialog will still be able to close itself.
 *
 * Activating this mode is as simple as omitting the `isOpen` prop. The only mandatory prop, in this case, is the `onConfirm` callback. The message is passed as the `children`. You can pass any JSX you'd like, which allows to further format the message or include sub-component if you'd like:
 *
 * ```jsx
 * import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
 *
 * function Example() {
 * 	return (
 * 		<ConfirmDialog onConfirm={ () => console.debug( ' Confirmed! ' ) }>
 * 			Are you sure? <strong>This action cannot be undone!</strong>
 * 		</ConfirmDialog>
 * 	);
 * }
 * ```
 *
 *
 * Controlled mode:
 *  Let the parent component control when the dialog is open/closed. It's activated when a
 * boolean value is passed to `isOpen`:
 * -   It will not be automatically closed. You need to let it know when to open/close by updating the value of the `isOpen` prop;
 * -   Both `onConfirm` and the `onCancel` callbacks are mandatory props in this mode;
 * -   You'll want to update the state that controls `isOpen` by updating it from the `onCancel` and `onConfirm` callbacks.
 *
 *```jsx
 * import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * function Example() {
 * 	const [ isOpen, setIsOpen ] = useState( true );
 *
 * 	const handleConfirm = () => {
 * 		console.debug( 'Confirmed!' );
 * 		setIsOpen( false );
 * 	};
 *
 * 	const handleCancel = () => {
 * 		console.debug( 'Cancelled!' );
 * 		setIsOpen( false );
 * 	};
 *
 * 	return (
 * 		<ConfirmDialog
 * 			isOpen={ isOpen }
 * 			onConfirm={ handleConfirm }
 * 			onCancel={ handleCancel }
 * 		>
 * 			Are you sure? <strong>This action cannot be undone!</strong>
 * 		</ConfirmDialog>
 * 	);
 * }
 * ```
 */
export declare const ConfirmDialog: import("../context").WordPressComponent<"div", ConfirmDialogProps & import("react").RefAttributes<any>, false>;
export default ConfirmDialog;
//# sourceMappingURL=component.d.ts.map