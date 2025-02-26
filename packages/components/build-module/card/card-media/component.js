/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

import { contextConnect } from '../../context';
import { View } from '../../view';
import { useCardMedia } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedCardMedia(props, forwardedRef) {
  const cardMediaProps = useCardMedia(props);
  return /*#__PURE__*/_jsx(View, {
    ...cardMediaProps,
    ref: forwardedRef
  });
}

/**
 * `CardMedia` provides a container for full-bleed content within a `Card`,
 * such as images, video, or even just a background color.
 *
 * @example
 * ```jsx
 * import { Card, CardBody, CardMedia } from '@wordpress/components';
 *
 * const Example = () => (
 *  <Card>
 *	  <CardMedia>
 *		  <img src="..." />
 *    </CardMedia>
 *    <CardBody>...</CardBody>
 *  </Card>
 * );
 * ```
 */
export const CardMedia = contextConnect(UnconnectedCardMedia, 'CardMedia');
export default CardMedia;
//# sourceMappingURL=component.js.map