/**
 * External dependencies
 */
import { v4 as uuid } from 'uuid';

/**
 * WordPress dependencies
 */
import { forwardRef, useState, useMemo } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import NoticeList from '../../notice/list';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Override the default edit UI to include notices if supported.
 *
 * Wrapping the original component with `withNotices` encapsulates the component
 * with the additional props `noticeOperations` and `noticeUI`.
 *
 * ```jsx
 * import { withNotices, Button } from '@wordpress/components';
 *
 * const MyComponentWithNotices = withNotices(
 * 	( { noticeOperations, noticeUI } ) => {
 * 		const addError = () =>
 * 			noticeOperations.createErrorNotice( 'Error message' );
 * 		return (
 * 			<div>
 * 				{ noticeUI }
 * 				<Button variant="secondary" onClick={ addError }>
 * 					Add error
 * 				</Button>
 * 			</div>
 * 		);
 * 	}
 * );
 * ```
 *
 * @param OriginalComponent Original component.
 *
 * @return Wrapped component.
 */
export default createHigherOrderComponent(OriginalComponent => {
  function Component(props, ref) {
    const [noticeList, setNoticeList] = useState([]);
    const noticeOperations = useMemo(() => {
      const createNotice = notice => {
        const noticeToAdd = notice.id ? notice : {
          ...notice,
          id: uuid()
        };
        setNoticeList(current => [...current, noticeToAdd]);
      };
      return {
        createNotice,
        createErrorNotice: msg => {
          // @ts-expect-error TODO: Missing `id`, potentially a bug
          createNotice({
            status: 'error',
            content: msg
          });
        },
        removeNotice: id => {
          setNoticeList(current => current.filter(notice => notice.id !== id));
        },
        removeAllNotices: () => {
          setNoticeList([]);
        }
      };
    }, []);
    const propsOut = {
      ...props,
      noticeList,
      noticeOperations,
      noticeUI: noticeList.length > 0 && /*#__PURE__*/_jsx(NoticeList, {
        className: "components-with-notices-ui",
        notices: noticeList,
        onRemove: noticeOperations.removeNotice
      })
    };
    return isForwardRef ? /*#__PURE__*/_jsx(OriginalComponent, {
      ...propsOut,
      ref: ref
    }) : /*#__PURE__*/_jsx(OriginalComponent, {
      ...propsOut
    });
  }
  let isForwardRef;
  // @ts-expect-error - `render` will only be present when OriginalComponent was wrapped with forwardRef().
  const {
    render
  } = OriginalComponent;
  // Returns a forwardRef if OriginalComponent appears to be a forwardRef.
  if (typeof render === 'function') {
    isForwardRef = true;
    return forwardRef(Component);
  }
  return Component;
}, 'withNotices');
//# sourceMappingURL=index.js.map