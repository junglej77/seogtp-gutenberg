import type { SlotKey } from './types';
/**
 * React hook returning the active slot given a name.
 *
 * @param name Slot name.
 * @return Slot object.
 */
declare const useSlot: (name: SlotKey) => import("react").Component<import("./types").BaseSlotComponentProps, {}, any> | undefined;
export default useSlot;
//# sourceMappingURL=use-slot.d.ts.map