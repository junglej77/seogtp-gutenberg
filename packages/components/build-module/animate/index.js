/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */

/**
 * @param type The animation type
 * @return Default origin
 */
function getDefaultOrigin(type) {
  return type === 'appear' ? 'top' : 'left';
}

/**
 * @param options
 *
 * @return ClassName that applies the animations
 */
export function getAnimateClassName(options) {
  if (options.type === 'loading') {
    return 'components-animate__loading';
  }
  const {
    type,
    origin = getDefaultOrigin(type)
  } = options;
  if (type === 'appear') {
    const [yAxis, xAxis = 'center'] = origin.split(' ');
    return clsx('components-animate__appear', {
      ['is-from-' + xAxis]: xAxis !== 'center',
      ['is-from-' + yAxis]: yAxis !== 'middle'
    });
  }
  if (type === 'slide-in') {
    return clsx('components-animate__slide-in', 'is-from-' + origin);
  }
  return undefined;
}

/**
 * Simple interface to introduce animations to components.
 *
 * ```jsx
 * import { Animate, Notice } from '@wordpress/components';
 *
 * const MyAnimatedNotice = () => (
 * 	<Animate type="slide-in" options={ { origin: 'top' } }>
 * 		{ ( { className } ) => (
 * 			<Notice className={ className } status="success">
 * 				<p>Animation finished.</p>
 * 			</Notice>
 * 		) }
 * 	</Animate>
 * );
 * ```
 */
export function Animate({
  type,
  options = {},
  children
}) {
  return children({
    className: getAnimateClassName({
      type,
      ...options
    })
  });
}
export default Animate;
//# sourceMappingURL=index.js.map