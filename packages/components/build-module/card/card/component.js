/**
 * External dependencies
 */
import { css } from '@emotion/react';
/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { contextConnect, ContextSystemProvider } from '../../context';
import { Elevation } from '../../elevation';
import { View } from '../../view';
import * as styles from '../styles';
import { useCard } from './hook';
import CONFIG from '../../utils/config-values';
import { useCx } from '../../utils/hooks/use-cx';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnconnectedCard(props, forwardedRef) {
  const {
    children,
    elevation,
    isBorderless,
    isRounded,
    size,
    ...otherProps
  } = useCard(props);
  const elevationBorderRadius = isRounded ? CONFIG.cardBorderRadius : 0;
  const cx = useCx();
  const elevationClassName = useMemo(() => cx( /*#__PURE__*/css({
    borderRadius: elevationBorderRadius
  }, process.env.NODE_ENV === "production" ? "" : ";label:elevationClassName;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvY2FyZC9jYXJkL2NvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUNZIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvY2FyZC9jYXJkL2NvbXBvbmVudC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcbmltcG9ydCB0eXBlIHsgRm9yd2FyZGVkUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uLy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyBjb250ZXh0Q29ubmVjdCwgQ29udGV4dFN5c3RlbVByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IEVsZXZhdGlvbiB9IGZyb20gJy4uLy4uL2VsZXZhdGlvbic7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuLi8uLi92aWV3JztcclxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XHJcbmltcG9ydCB7IHVzZUNhcmQgfSBmcm9tICcuL2hvb2snO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xyXG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uLy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XHJcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5mdW5jdGlvbiBVbmNvbm5lY3RlZENhcmQoXHJcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBQcm9wcywgJ2RpdicgPixcclxuXHRmb3J3YXJkZWRSZWY6IEZvcndhcmRlZFJlZjwgYW55ID5cclxuKSB7XHJcblx0Y29uc3Qge1xyXG5cdFx0Y2hpbGRyZW4sXHJcblx0XHRlbGV2YXRpb24sXHJcblx0XHRpc0JvcmRlcmxlc3MsXHJcblx0XHRpc1JvdW5kZWQsXHJcblx0XHRzaXplLFxyXG5cdFx0Li4ub3RoZXJQcm9wc1xyXG5cdH0gPSB1c2VDYXJkKCBwcm9wcyApO1xyXG5cdGNvbnN0IGVsZXZhdGlvbkJvcmRlclJhZGl1cyA9IGlzUm91bmRlZCA/IENPTkZJRy5jYXJkQm9yZGVyUmFkaXVzIDogMDtcclxuXHJcblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xyXG5cclxuXHRjb25zdCBlbGV2YXRpb25DbGFzc05hbWUgPSB1c2VNZW1vKFxyXG5cdFx0KCkgPT4gY3goIGNzcyggeyBib3JkZXJSYWRpdXM6IGVsZXZhdGlvbkJvcmRlclJhZGl1cyB9ICkgKSxcclxuXHRcdFsgY3gsIGVsZXZhdGlvbkJvcmRlclJhZGl1cyBdXHJcblx0KTtcclxuXHJcblx0Y29uc3QgY29udGV4dFByb3ZpZGVyVmFsdWUgPSB1c2VNZW1vKCAoKSA9PiB7XHJcblx0XHRjb25zdCBjb250ZXh0UHJvcHMgPSB7XHJcblx0XHRcdHNpemUsXHJcblx0XHRcdGlzQm9yZGVybGVzcyxcclxuXHRcdH07XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRDYXJkQm9keTogY29udGV4dFByb3BzLFxyXG5cdFx0XHRDYXJkSGVhZGVyOiBjb250ZXh0UHJvcHMsXHJcblx0XHRcdENhcmRGb290ZXI6IGNvbnRleHRQcm9wcyxcclxuXHRcdH07XHJcblx0fSwgWyBpc0JvcmRlcmxlc3MsIHNpemUgXSApO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PENvbnRleHRTeXN0ZW1Qcm92aWRlciB2YWx1ZT17IGNvbnRleHRQcm92aWRlclZhbHVlIH0+XHJcblx0XHRcdDxWaWV3IHsgLi4ub3RoZXJQcm9wcyB9IHJlZj17IGZvcndhcmRlZFJlZiB9PlxyXG5cdFx0XHRcdDxWaWV3IGNsYXNzTmFtZT17IGN4KCBzdHlsZXMuQ29udGVudCApIH0+eyBjaGlsZHJlbiB9PC9WaWV3PlxyXG5cdFx0XHRcdDxFbGV2YXRpb25cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT17IGVsZXZhdGlvbkNsYXNzTmFtZSB9XHJcblx0XHRcdFx0XHRpc0ludGVyYWN0aXZlPXsgZmFsc2UgfVxyXG5cdFx0XHRcdFx0dmFsdWU9eyBlbGV2YXRpb24gPyAxIDogMCB9XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8RWxldmF0aW9uXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9eyBlbGV2YXRpb25DbGFzc05hbWUgfVxyXG5cdFx0XHRcdFx0aXNJbnRlcmFjdGl2ZT17IGZhbHNlIH1cclxuXHRcdFx0XHRcdHZhbHVlPXsgZWxldmF0aW9uIH1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHQ8L1ZpZXc+XHJcblx0XHQ8L0NvbnRleHRTeXN0ZW1Qcm92aWRlcj5cclxuXHQpO1xyXG59XHJcblxyXG4vKipcclxuICogYENhcmRgIHByb3ZpZGVzIGEgZmxleGlibGUgYW5kIGV4dGVuc2libGUgY29udGVudCBjb250YWluZXIuXHJcbiAqIGBDYXJkYCBhbHNvIHByb3ZpZGVzIGEgY29udmVuaWVudCBzZXQgb2Ygc3ViLWNvbXBvbmVudHMgc3VjaCBhcyBgQ2FyZEJvZHlgLFxyXG4gKiBgQ2FyZEhlYWRlcmAsIGBDYXJkRm9vdGVyYCwgYW5kIG1vcmUuXHJcbiAqXHJcbiAqIGBgYGpzeFxyXG4gKiBpbXBvcnQge1xyXG4gKiAgIENhcmQsXHJcbiAqICAgQ2FyZEhlYWRlcixcclxuICogICBDYXJkQm9keSxcclxuICogICBDYXJkRm9vdGVyLFxyXG4gKiAgIF9fZXhwZXJpbWVudGFsVGV4dCBhcyBUZXh0LFxyXG4gKiAgIF9fZXhwZXJpbWVudGFsSGVhZGluZyBhcyBIZWFkaW5nLFxyXG4gKiB9IGZyb20gYEB3b3JkcHJlc3MvY29tcG9uZW50c2A7XHJcbiAqXHJcbiAqIGZ1bmN0aW9uIEV4YW1wbGUoKSB7XHJcbiAqICAgcmV0dXJuIChcclxuICogICAgIDxDYXJkPlxyXG4gKiAgICAgICA8Q2FyZEhlYWRlcj5cclxuICogICAgICAgICA8SGVhZGluZyBsZXZlbD17IDQgfT5DYXJkIFRpdGxlPC9IZWFkaW5nPlxyXG4gKiAgICAgICA8L0NhcmRIZWFkZXI+XHJcbiAqICAgICAgIDxDYXJkQm9keT5cclxuICogICAgICAgICA8VGV4dD5DYXJkIENvbnRlbnQ8L1RleHQ+XHJcbiAqICAgICAgIDwvQ2FyZEJvZHk+XHJcbiAqICAgICAgIDxDYXJkRm9vdGVyPlxyXG4gKiAgICAgICAgIDxUZXh0PkNhcmQgRm9vdGVyPC9UZXh0PlxyXG4gKiAgICAgICA8L0NhcmRGb290ZXI+XHJcbiAqICAgICA8L0NhcmQ+XHJcbiAqICAgKTtcclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbmV4cG9ydCBjb25zdCBDYXJkID0gY29udGV4dENvbm5lY3QoIFVuY29ubmVjdGVkQ2FyZCwgJ0NhcmQnICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iXX0= */")), [cx, elevationBorderRadius]);
  const contextProviderValue = useMemo(() => {
    const contextProps = {
      size,
      isBorderless
    };
    return {
      CardBody: contextProps,
      CardHeader: contextProps,
      CardFooter: contextProps
    };
  }, [isBorderless, size]);
  return /*#__PURE__*/_jsx(ContextSystemProvider, {
    value: contextProviderValue,
    children: /*#__PURE__*/_jsxs(View, {
      ...otherProps,
      ref: forwardedRef,
      children: [/*#__PURE__*/_jsx(View, {
        className: cx(styles.Content),
        children: children
      }), /*#__PURE__*/_jsx(Elevation, {
        className: elevationClassName,
        isInteractive: false,
        value: elevation ? 1 : 0
      }), /*#__PURE__*/_jsx(Elevation, {
        className: elevationClassName,
        isInteractive: false,
        value: elevation
      })]
    })
  });
}

/**
 * `Card` provides a flexible and extensible content container.
 * `Card` also provides a convenient set of sub-components such as `CardBody`,
 * `CardHeader`, `CardFooter`, and more.
 *
 * ```jsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardBody,
 *   CardFooter,
 *   __experimentalText as Text,
 *   __experimentalHeading as Heading,
 * } from `@wordpress/components`;
 *
 * function Example() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <Heading level={ 4 }>Card Title</Heading>
 *       </CardHeader>
 *       <CardBody>
 *         <Text>Card Content</Text>
 *       </CardBody>
 *       <CardFooter>
 *         <Text>Card Footer</Text>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 */
export const Card = contextConnect(UnconnectedCard, 'Card');
export default Card;
//# sourceMappingURL=component.js.map