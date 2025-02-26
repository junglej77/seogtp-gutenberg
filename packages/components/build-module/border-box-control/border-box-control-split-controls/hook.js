/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import * as styles from '../styles';
import { useContextSystem } from '../../context';
import { useCx } from '../../utils/';
export function useBorderBoxControlSplitControls(props) {
  const {
    className,
    colors = [],
    enableAlpha = false,
    enableStyle = true,
    size = 'default',
    __experimentalIsRenderedInSidebar = false,
    ...otherProps
  } = useContextSystem(props, 'BorderBoxControlSplitControls');

  // Generate class names.
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.borderBoxControlSplitControls(size), className);
  }, [cx, className, size]);
  const centeredClassName = useMemo(() => {
    return cx(styles.centeredBorderControl, className);
  }, [cx, className]);
  const rightAlignedClassName = useMemo(() => {
    return cx(styles.rightBorderControl(), className);
  }, [cx, className]);
  return {
    ...otherProps,
    centeredClassName,
    className: classes,
    colors,
    enableAlpha,
    enableStyle,
    rightAlignedClassName,
    size,
    __experimentalIsRenderedInSidebar
  };
}
//# sourceMappingURL=hook.js.map