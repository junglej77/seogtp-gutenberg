import type { PaletteEditProps, PaletteElement } from './types';
/**
 * Returns a name and slug for a palette item. The name takes the format "Color + id".
 * To ensure there are no duplicate ids, this function checks all slugs.
 * It expects slugs to be in the format: slugPrefix + color- + number.
 * It then sets the id component of the new name based on the incremented id of the highest existing slug id.
 *
 * @param elements   An array of color palette items.
 * @param slugPrefix The slug prefix used to match the element slug.
 *
 * @return A name and slug for the new palette item.
 */
export declare function getNameAndSlugForPosition(elements: PaletteElement[], slugPrefix: string): {
    name: string;
    slug: string;
};
/**
 * Allows editing a palette of colors or gradients.
 *
 * ```jsx
 * import { PaletteEdit } from '@wordpress/components';
 * const MyPaletteEdit = () => {
 *   const [ controlledColors, setControlledColors ] = useState( colors );
 *
 *   return (
 *     <PaletteEdit
 *       colors={ controlledColors }
 *       onChange={ ( newColors?: Color[] ) => {
 *         setControlledColors( newColors );
 *       } }
 *       paletteLabel="Here is a label"
 *     />
 *   );
 * };
 * ```
 */
export declare function PaletteEdit({ gradients, colors, onChange, paletteLabel, paletteLabelHeadingLevel, emptyMessage, canOnlyChangeValues, canReset, slugPrefix, popoverProps, }: PaletteEditProps): import("react").JSX.Element;
export default PaletteEdit;
//# sourceMappingURL=index.d.ts.map