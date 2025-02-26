/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BaseControl from '.';
/**
 * Generate props for the `BaseControl` and the inner control itself.
 *
 * Namely, it takes care of generating a unique `id`, properly associating it with the `label` and `help` elements.
 *
 * @param props
 */
export function useBaseControlProps(props) {
  const {
    help,
    id: preferredId,
    ...restProps
  } = props;
  const uniqueId = useInstanceId(BaseControl, 'wp-components-base-control', preferredId);
  return {
    baseControlProps: {
      id: uniqueId,
      help,
      ...restProps
    },
    controlProps: {
      id: uniqueId,
      ...(!!help ? {
        'aria-describedby': `${uniqueId}__help`
      } : {})
    }
  };
}
//# sourceMappingURL=hooks.js.map