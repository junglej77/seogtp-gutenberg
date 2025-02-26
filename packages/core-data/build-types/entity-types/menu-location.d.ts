/**
 * Internal dependencies
 */
import type { Context, OmitNevers } from './helpers';
import type { BaseEntityRecords as _BaseEntityRecords } from './base-entity-records';
declare module './base-entity-records' {
    namespace BaseEntityRecords {
        interface MenuLocation<C extends Context> {
            /**
             * The name of the menu location.
             */
            name: string;
            /**
             * The description of the menu location.
             */
            description: string;
            /**
             * The ID of the assigned menu.
             */
            menu: number;
        }
    }
}
export type MenuLocation<C extends Context = 'edit'> = OmitNevers<_BaseEntityRecords.MenuLocation<C>>;
//# sourceMappingURL=menu-location.d.ts.map