/** @typedef {typeof ALT | CTRL | COMMAND | SHIFT } WPModifierPart */
/** @typedef {'primary' | 'primaryShift' | 'primaryAlt' | 'secondary' | 'access' | 'ctrl' | 'alt' | 'ctrlShift' | 'shift' | 'shiftAlt' | 'undefined'} WPKeycodeModifier */
/**
 * An object of handler functions for each of the possible modifier
 * combinations. A handler will return a value for a given key.
 *
 * @template T
 *
 * @typedef {Record<WPKeycodeModifier, T>} WPModifierHandler
 */
/**
 * @template T
 *
 * @typedef {(character: string, isApple?: () => boolean) => T} WPKeyHandler
 */
/** @typedef {(event: import('react').KeyboardEvent<HTMLElement> | KeyboardEvent, character: string, isApple?: () => boolean) => boolean} WPEventKeyHandler */
/** @typedef {( isApple: () => boolean ) => WPModifierPart[]} WPModifier */
/**
 * Keycode for BACKSPACE key.
 */
export const BACKSPACE: 8;
/**
 * Keycode for TAB key.
 */
export const TAB: 9;
/**
 * Keycode for ENTER key.
 */
export const ENTER: 13;
/**
 * Keycode for ESCAPE key.
 */
export const ESCAPE: 27;
/**
 * Keycode for SPACE key.
 */
export const SPACE: 32;
/**
 * Keycode for PAGEUP key.
 */
export const PAGEUP: 33;
/**
 * Keycode for PAGEDOWN key.
 */
export const PAGEDOWN: 34;
/**
 * Keycode for END key.
 */
export const END: 35;
/**
 * Keycode for HOME key.
 */
export const HOME: 36;
/**
 * Keycode for LEFT key.
 */
export const LEFT: 37;
/**
 * Keycode for UP key.
 */
export const UP: 38;
/**
 * Keycode for RIGHT key.
 */
export const RIGHT: 39;
/**
 * Keycode for DOWN key.
 */
export const DOWN: 40;
/**
 * Keycode for DELETE key.
 */
export const DELETE: 46;
/**
 * Keycode for F10 key.
 */
export const F10: 121;
/**
 * Keycode for ALT key.
 */
export const ALT: "alt";
/**
 * Keycode for CTRL key.
 */
export const CTRL: "ctrl";
/**
 * Keycode for COMMAND/META key.
 */
export const COMMAND: "meta";
/**
 * Keycode for SHIFT key.
 */
export const SHIFT: "shift";
/**
 * Keycode for ZERO key.
 */
export const ZERO: 48;
export { isAppleOS };
/**
 * Object that contains functions that return the available modifier
 * depending on platform.
 *
 * @type {WPModifierHandler< ( isApple: () => boolean ) => WPModifierPart[]>}
 */
export const modifiers: WPModifierHandler<(isApple: () => boolean) => WPModifierPart[]>;
/**
 * An object that contains functions to get raw shortcuts.
 *
 * These are intended for user with the KeyboardShortcuts.
 *
 * @example
 * ```js
 * // Assuming macOS:
 * rawShortcut.primary( 'm' )
 * // "meta+m""
 * ```
 *
 * @type {WPModifierHandler<WPKeyHandler<string>>} Keyed map of functions to raw
 *                                                 shortcuts.
 */
export const rawShortcut: WPModifierHandler<WPKeyHandler<string>>;
/**
 * Return an array of the parts of a keyboard shortcut chord for display.
 *
 * @example
 * ```js
 * // Assuming macOS:
 * displayShortcutList.primary( 'm' );
 * // [ "⌘", "M" ]
 * ```
 *
 * @type {WPModifierHandler<WPKeyHandler<string[]>>} Keyed map of functions to
 *                                                   shortcut sequences.
 */
export const displayShortcutList: WPModifierHandler<WPKeyHandler<string[]>>;
/**
 * An object that contains functions to display shortcuts.
 *
 * @example
 * ```js
 * // Assuming macOS:
 * displayShortcut.primary( 'm' );
 * // "⌘M"
 * ```
 *
 * @type {WPModifierHandler<WPKeyHandler<string>>} Keyed map of functions to
 *                                                 display shortcuts.
 */
export const displayShortcut: WPModifierHandler<WPKeyHandler<string>>;
/**
 * An object that contains functions to return an aria label for a keyboard
 * shortcut.
 *
 * @example
 * ```js
 * // Assuming macOS:
 * shortcutAriaLabel.primary( '.' );
 * // "Command + Period"
 * ```
 *
 * @type {WPModifierHandler<WPKeyHandler<string>>} Keyed map of functions to
 *                                                 shortcut ARIA labels.
 */
export const shortcutAriaLabel: WPModifierHandler<WPKeyHandler<string>>;
/**
 * An object that contains functions to check if a keyboard event matches a
 * predefined shortcut combination.
 *
 * @example
 * ```js
 * // Assuming an event for ⌘M key press:
 * isKeyboardEvent.primary( event, 'm' );
 * // true
 * ```
 *
 * @type {WPModifierHandler<WPEventKeyHandler>} Keyed map of functions
 *                                                       to match events.
 */
export const isKeyboardEvent: WPModifierHandler<WPEventKeyHandler>;
export type WPModifierPart = typeof ALT | "ctrl" | "meta" | "shift";
export type WPKeycodeModifier = "primary" | "primaryShift" | "primaryAlt" | "secondary" | "access" | "ctrl" | "alt" | "ctrlShift" | "shift" | "shiftAlt" | "undefined";
/**
 * An object of handler functions for each of the possible modifier
 * combinations. A handler will return a value for a given key.
 */
export type WPModifierHandler<T> = Record<WPKeycodeModifier, T>;
export type WPKeyHandler<T> = (character: string, isApple?: () => boolean) => T;
export type WPEventKeyHandler = (event: import("react").KeyboardEvent<HTMLElement> | KeyboardEvent, character: string, isApple?: () => boolean) => boolean;
export type WPModifier = (isApple: () => boolean) => WPModifierPart[];
import { isAppleOS } from './platform';
//# sourceMappingURL=index.d.ts.map