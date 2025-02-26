/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInstanceId, useMergeRefs } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Icon, search, closeSmall } from '@wordpress/icons';
import { forwardRef, useMemo, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../button';
import { ContextSystemProvider } from '../context';
import { StyledInputControl, SuffixItemWrapper } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
function SuffixItem({
  searchRef,
  value,
  onChange,
  onClose
}) {
  if (!onClose && !value) {
    return /*#__PURE__*/_jsx(Icon, {
      icon: search
    });
  }
  const onReset = () => {
    onChange('');
    searchRef.current?.focus();
  };
  return /*#__PURE__*/_jsx(Button, {
    size: "small",
    icon: closeSmall,
    label: onClose ? __('Close search') : __('Reset search'),
    onClick: onClose !== null && onClose !== void 0 ? onClose : onReset
  });
}
function UnforwardedSearchControl({
  __nextHasNoMarginBottom = false,
  className,
  onChange,
  value,
  label = __('Search'),
  placeholder = __('Search'),
  hideLabelFromVision = true,
  onClose,
  size = 'default',
  ...restProps
}, forwardedRef) {
  // @ts-expect-error The `disabled` prop is not yet supported in the SearchControl component.
  // Work with the design team (@WordPress/gutenberg-design) if you need this feature.
  delete restProps.disabled;
  const searchRef = useRef(null);
  const instanceId = useInstanceId(SearchControl, 'components-search-control');
  const contextValue = useMemo(() => ({
    BaseControl: {
      // Overrides the underlying BaseControl `__nextHasNoMarginBottom` via the context system
      // to provide backwards compatibile margin for SearchControl.
      // (In a standard InputControl, the BaseControl `__nextHasNoMarginBottom` is always set to true.)
      _overrides: {
        __nextHasNoMarginBottom
      },
      __associatedWPComponentName: 'SearchControl'
    },
    // `isBorderless` is still experimental and not a public prop for InputControl yet.
    InputBase: {
      isBorderless: true
    }
  }), [__nextHasNoMarginBottom]);
  return /*#__PURE__*/_jsx(ContextSystemProvider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(StyledInputControl, {
      __next40pxDefaultSize: true,
      id: instanceId,
      hideLabelFromVision: hideLabelFromVision,
      label: label,
      ref: useMergeRefs([searchRef, forwardedRef]),
      type: "search",
      size: size,
      className: clsx('components-search-control', className),
      onChange: nextValue => onChange(nextValue !== null && nextValue !== void 0 ? nextValue : ''),
      autoComplete: "off",
      placeholder: placeholder,
      value: value !== null && value !== void 0 ? value : '',
      suffix: /*#__PURE__*/_jsx(SuffixItemWrapper, {
        size: size,
        children: /*#__PURE__*/_jsx(SuffixItem, {
          searchRef: searchRef,
          value: value,
          onChange: onChange,
          onClose: onClose
        })
      }),
      ...restProps
    })
  });
}

/**
 * SearchControl components let users display a search control.
 *
 * ```jsx
 * import { SearchControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * function MySearchControl( { className, setState } ) {
 *   const [ searchInput, setSearchInput ] = useState( '' );
 *
 *   return (
 *     <SearchControl
 *       __nextHasNoMarginBottom
 *       value={ searchInput }
 *       onChange={ setSearchInput }
 *     />
 *   );
 * }
 * ```
 */
export const SearchControl = forwardRef(UnforwardedSearchControl);
export default SearchControl;
//# sourceMappingURL=index.js.map