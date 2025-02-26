/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { useContextSystem } from '../../context';
import * as styles from '../styles';
import { useCx } from '../../utils/hooks/use-cx';
export function useCardDivider(props) {
  const {
    className,
    ...otherProps
  } = useContextSystem(props, 'CardDivider');
  const cx = useCx();
  const classes = useMemo(() => cx(styles.Divider, styles.borderColor,
  // This classname is added for legacy compatibility reasons.
  'components-card__divider', className), [className, cx]);
  return {
    ...otherProps,
    className: classes
  };
}
//# sourceMappingURL=hook.js.map