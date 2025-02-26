/**
 * MenuItem is a component which renders a button intended to be used in combination with the `DropdownMenu` component.
 *
 * ```jsx
 * import { MenuItem } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyMenuItem = () => {
 * 	const [ isActive, setIsActive ] = useState( true );
 *
 * 	return (
 * 		<MenuItem
 * 			icon={ isActive ? 'yes' : 'no' }
 * 			isSelected={ isActive }
 * 			role="menuitemcheckbox"
 * 			onClick={ () => setIsActive( ( state ) => ! state ) }
 * 		>
 * 			Toggle
 * 		</MenuItem>
 * 	);
 * };
 * ```
 */
export declare const MenuItem: import("react").ForwardRefExoticComponent<Pick<import("../button/types").ButtonAsButtonProps, "isDestructive"> & {
    className?: string;
    children?: import("react").ReactNode;
    info?: string;
    icon?: JSX.Element | null;
    iconPosition?: import("../button/types").ButtonAsButtonProps["iconPosition"];
    isSelected?: boolean;
    shortcut?: string | {
        display: string;
        ariaLabel: string;
    };
    role?: string;
    suffix?: import("react").ReactNode;
    label?: string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "role" | "shortcut" | "icon" | "isDestructive" | "suffix" | "info" | "iconPosition" | "isSelected"> & import("react").RefAttributes<HTMLButtonElement>>;
export default MenuItem;
//# sourceMappingURL=index.d.ts.map