function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/**
 * External dependencies
 */

import { css } from '@emotion/react';

/**
 * WordPress dependencies
 */
import { useMemo, Children, cloneElement } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { hasConnectNamespace, useContextSystem } from '../context';
import { useTruncate } from '../truncate';
import { getOptimalTextShade } from '../utils/colors';
import * as styles from './styles';
import { createHighlighterText } from './utils';
import { getFontSize } from '../utils/font-size';
import { CONFIG, COLORS } from '../utils';
import { getLineHeight } from './get-line-height';
import { useCx } from '../utils/hooks/use-cx';
var _ref = process.env.NODE_ENV === "production" ? {
  name: "50zrmy",
  styles: "text-transform:uppercase"
} : {
  name: "18bqwxz-sx-upperCase",
  styles: "text-transform:uppercase;label:sx-upperCase;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtHaUIiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy90ZXh0L2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyB1c2VNZW1vLCBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcclxuaW1wb3J0IHsgaGFzQ29ubmVjdE5hbWVzcGFjZSwgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyB1c2VUcnVuY2F0ZSB9IGZyb20gJy4uL3RydW5jYXRlJztcclxuaW1wb3J0IHsgZ2V0T3B0aW1hbFRleHRTaGFkZSB9IGZyb20gJy4uL3V0aWxzL2NvbG9ycyc7XHJcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUhpZ2hsaWdodGVyVGV4dCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRGb250U2l6ZSB9IGZyb20gJy4uL3V0aWxzL2ZvbnQtc2l6ZSc7XHJcbmltcG9ydCB7IENPTkZJRywgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXRMaW5lSGVpZ2h0IH0gZnJvbSAnLi9nZXQtbGluZS1oZWlnaHQnO1xyXG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XHJcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9jb250ZXh0JykuV29yZFByZXNzQ29tcG9uZW50UHJvcHM8aW1wb3J0KCcuL3R5cGVzJykuUHJvcHMsICdzcGFuJz59IHByb3BzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUZXh0KFxyXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgUHJvcHMsICdzcGFuJyA+XHJcbikge1xyXG5cdGNvbnN0IHtcclxuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxyXG5cdFx0YWxpZ24sXHJcblx0XHRjaGlsZHJlbixcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdGNvbG9yLFxyXG5cdFx0ZWxsaXBzaXplTW9kZSxcclxuXHRcdGlzRGVzdHJ1Y3RpdmUgPSBmYWxzZSxcclxuXHRcdGRpc3BsYXksXHJcblx0XHRoaWdobGlnaHRFc2NhcGUgPSBmYWxzZSxcclxuXHRcdGhpZ2hsaWdodENhc2VTZW5zaXRpdmUgPSBmYWxzZSxcclxuXHRcdGhpZ2hsaWdodFdvcmRzLFxyXG5cdFx0aGlnaGxpZ2h0U2FuaXRpemUsXHJcblx0XHRpc0Jsb2NrID0gZmFsc2UsXHJcblx0XHRsZXR0ZXJTcGFjaW5nLFxyXG5cdFx0bGluZUhlaWdodDogbGluZUhlaWdodFByb3AsXHJcblx0XHRvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yLFxyXG5cdFx0c2l6ZSxcclxuXHRcdHRydW5jYXRlID0gZmFsc2UsXHJcblx0XHR1cHBlckNhc2UgPSBmYWxzZSxcclxuXHRcdHZhcmlhbnQsXHJcblx0XHR3ZWlnaHQgPSBDT05GSUcuZm9udFdlaWdodCxcclxuXHRcdC4uLm90aGVyUHJvcHNcclxuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdUZXh0JyApO1xyXG5cclxuXHRsZXQgY29udGVudDogUmVhY3QuUmVhY3ROb2RlID0gY2hpbGRyZW47XHJcblx0Y29uc3QgaXNIaWdobGlnaHRlciA9IEFycmF5LmlzQXJyYXkoIGhpZ2hsaWdodFdvcmRzICk7XHJcblx0Y29uc3QgaXNDYXB0aW9uID0gc2l6ZSA9PT0gJ2NhcHRpb24nO1xyXG5cclxuXHRpZiAoIGlzSGlnaGxpZ2h0ZXIgKSB7XHJcblx0XHRpZiAoIHR5cGVvZiBjaGlsZHJlbiAhPT0gJ3N0cmluZycgKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXHJcblx0XHRcdFx0J2BjaGlsZHJlbmAgb2YgYFRleHRgIG11c3Qgb25seSBiZSBgc3RyaW5nYCB0eXBlcyB3aGVuIGBoaWdobGlnaHRXb3Jkc2AgaXMgZGVmaW5lZCdcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250ZW50ID0gY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0KCB7XHJcblx0XHRcdGF1dG9Fc2NhcGU6IGhpZ2hsaWdodEVzY2FwZSxcclxuXHRcdFx0Y2hpbGRyZW4sXHJcblx0XHRcdGNhc2VTZW5zaXRpdmU6IGhpZ2hsaWdodENhc2VTZW5zaXRpdmUsXHJcblx0XHRcdHNlYXJjaFdvcmRzOiBoaWdobGlnaHRXb3JkcyxcclxuXHRcdFx0c2FuaXRpemU6IGhpZ2hsaWdodFNhbml0aXplLFxyXG5cdFx0fSApO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xyXG5cclxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xyXG5cdFx0Y29uc3Qgc3g6IFJlY29yZDwgc3RyaW5nLCBTZXJpYWxpemVkU3R5bGVzIHwgbnVsbCA+ID0ge307XHJcblxyXG5cdFx0Y29uc3QgbGluZUhlaWdodCA9IGdldExpbmVIZWlnaHQoXHJcblx0XHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxyXG5cdFx0XHRsaW5lSGVpZ2h0UHJvcFxyXG5cdFx0KTtcclxuXHJcblx0XHRzeC5CYXNlID0gY3NzKCB7XHJcblx0XHRcdGNvbG9yLFxyXG5cdFx0XHRkaXNwbGF5LFxyXG5cdFx0XHRmb250U2l6ZTogZ2V0Rm9udFNpemUoIHNpemUgKSxcclxuXHRcdFx0Zm9udFdlaWdodDogd2VpZ2h0LFxyXG5cdFx0XHRsaW5lSGVpZ2h0LFxyXG5cdFx0XHRsZXR0ZXJTcGFjaW5nLFxyXG5cdFx0XHR0ZXh0QWxpZ246IGFsaWduLFxyXG5cdFx0fSApO1xyXG5cclxuXHRcdHN4LnVwcGVyQ2FzZSA9IGNzcyggeyB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9ICk7XHJcblxyXG5cdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IG51bGw7XHJcblxyXG5cdFx0aWYgKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkge1xyXG5cdFx0XHRjb25zdCBpc09wdGltYWxUZXh0Q29sb3JEYXJrID1cclxuXHRcdFx0XHRnZXRPcHRpbWFsVGV4dFNoYWRlKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkgPT09ICdkYXJrJztcclxuXHJcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBpc09wdGltYWxUZXh0Q29sb3JEYXJrXHJcblx0XHRcdFx0PyBjc3MoIHsgY29sb3I6IENPTE9SUy5ncmF5WyA5MDAgXSB9IClcclxuXHRcdFx0XHQ6IGNzcyggeyBjb2xvcjogQ09MT1JTLndoaXRlIH0gKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY3goXHJcblx0XHRcdHN0eWxlcy5UZXh0LFxyXG5cdFx0XHRzeC5CYXNlLFxyXG5cdFx0XHRzeC5vcHRpbWFsVGV4dENvbG9yLFxyXG5cdFx0XHRpc0Rlc3RydWN0aXZlICYmIHN0eWxlcy5kZXN0cnVjdGl2ZSxcclxuXHRcdFx0ISEgaXNIaWdobGlnaHRlciAmJiBzdHlsZXMuaGlnaGxpZ2h0ZXJUZXh0LFxyXG5cdFx0XHRpc0Jsb2NrICYmIHN0eWxlcy5ibG9jayxcclxuXHRcdFx0aXNDYXB0aW9uICYmIHN0eWxlcy5tdXRlZCxcclxuXHRcdFx0dmFyaWFudCAmJiBzdHlsZXNbIHZhcmlhbnQgXSxcclxuXHRcdFx0dXBwZXJDYXNlICYmIHN4LnVwcGVyQ2FzZSxcclxuXHRcdFx0Y2xhc3NOYW1lXHJcblx0XHQpO1xyXG5cdH0sIFtcclxuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxyXG5cdFx0YWxpZ24sXHJcblx0XHRjbGFzc05hbWUsXHJcblx0XHRjb2xvcixcclxuXHRcdGN4LFxyXG5cdFx0ZGlzcGxheSxcclxuXHRcdGlzQmxvY2ssXHJcblx0XHRpc0NhcHRpb24sXHJcblx0XHRpc0Rlc3RydWN0aXZlLFxyXG5cdFx0aXNIaWdobGlnaHRlcixcclxuXHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRsaW5lSGVpZ2h0UHJvcCxcclxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXHJcblx0XHRzaXplLFxyXG5cdFx0dXBwZXJDYXNlLFxyXG5cdFx0dmFyaWFudCxcclxuXHRcdHdlaWdodCxcclxuXHRdICk7XHJcblxyXG5cdGxldCBmaW5hbEVsbGlwc2l6ZU1vZGU6IHVuZGVmaW5lZCB8ICdhdXRvJyB8ICdub25lJztcclxuXHRpZiAoIHRydW5jYXRlID09PSB0cnVlICkge1xyXG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ2F1dG8nO1xyXG5cdH1cclxuXHRpZiAoIHRydW5jYXRlID09PSBmYWxzZSApIHtcclxuXHRcdGZpbmFsRWxsaXBzaXplTW9kZSA9ICdub25lJztcclxuXHR9XHJcblxyXG5cdGNvbnN0IGZpbmFsQ29tcG9uZW50UHJvcHMgPSB7XHJcblx0XHQuLi5vdGhlclByb3BzLFxyXG5cdFx0Y2xhc3NOYW1lOiBjbGFzc2VzLFxyXG5cdFx0Y2hpbGRyZW4sXHJcblx0XHRlbGxpcHNpemVNb2RlOiBlbGxpcHNpemVNb2RlIHx8IGZpbmFsRWxsaXBzaXplTW9kZSxcclxuXHR9O1xyXG5cclxuXHRjb25zdCB0cnVuY2F0ZVByb3BzID0gdXNlVHJ1bmNhdGUoIGZpbmFsQ29tcG9uZW50UHJvcHMgKTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5oYW5jZSBjaGlsZCBgPExpbmsgLz5gIGNvbXBvbmVudHMgdG8gaW5oZXJpdCBmb250IHNpemUuXHJcblx0ICovXHJcblx0aWYgKCAhIHRydW5jYXRlICYmIEFycmF5LmlzQXJyYXkoIGNoaWxkcmVuICkgKSB7XHJcblx0XHRjb250ZW50ID0gQ2hpbGRyZW4ubWFwKCBjaGlsZHJlbiwgKCBjaGlsZCApID0+IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHxcclxuXHRcdFx0XHRjaGlsZCA9PT0gbnVsbCB8fFxyXG5cdFx0XHRcdCEgKCAncHJvcHMnIGluIGNoaWxkIClcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBpc0xpbmsgPSBoYXNDb25uZWN0TmFtZXNwYWNlKCBjaGlsZCwgWyAnTGluaycgXSApO1xyXG5cdFx0XHRpZiAoIGlzTGluayApIHtcclxuXHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KCBjaGlsZCwge1xyXG5cdFx0XHRcdFx0c2l6ZTogY2hpbGQucHJvcHMuc2l6ZSB8fCAnaW5oZXJpdCcsXHJcblx0XHRcdFx0fSApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0XHR9ICk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Li4udHJ1bmNhdGVQcm9wcyxcclxuXHRcdGNoaWxkcmVuOiB0cnVuY2F0ZSA/IHRydW5jYXRlUHJvcHMuY2hpbGRyZW4gOiBjb250ZW50LFxyXG5cdH07XHJcbn1cclxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
/**
 * @param {import('../context').WordPressComponentProps<import('./types').Props, 'span'>} props
 */
export default function useText(props) {
  const {
    adjustLineHeightForInnerControls,
    align,
    children,
    className,
    color,
    ellipsizeMode,
    isDestructive = false,
    display,
    highlightEscape = false,
    highlightCaseSensitive = false,
    highlightWords,
    highlightSanitize,
    isBlock = false,
    letterSpacing,
    lineHeight: lineHeightProp,
    optimizeReadabilityFor,
    size,
    truncate = false,
    upperCase = false,
    variant,
    weight = CONFIG.fontWeight,
    ...otherProps
  } = useContextSystem(props, 'Text');
  let content = children;
  const isHighlighter = Array.isArray(highlightWords);
  const isCaption = size === 'caption';
  if (isHighlighter) {
    if (typeof children !== 'string') {
      throw new TypeError('`children` of `Text` must only be `string` types when `highlightWords` is defined');
    }
    content = createHighlighterText({
      autoEscape: highlightEscape,
      children,
      caseSensitive: highlightCaseSensitive,
      searchWords: highlightWords,
      sanitize: highlightSanitize
    });
  }
  const cx = useCx();
  const classes = useMemo(() => {
    const sx = {};
    const lineHeight = getLineHeight(adjustLineHeightForInnerControls, lineHeightProp);
    sx.Base = /*#__PURE__*/css({
      color,
      display,
      fontSize: getFontSize(size),
      fontWeight: weight,
      lineHeight,
      letterSpacing,
      textAlign: align
    }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdGWSIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IHVzZU1lbW8sIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyBoYXNDb25uZWN0TmFtZXNwYWNlLCB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IHVzZVRydW5jYXRlIH0gZnJvbSAnLi4vdHJ1bmNhdGUnO1xyXG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcclxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IHsgY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0IH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcclxuaW1wb3J0IHsgQ09ORklHLCBDT0xPUlMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldExpbmVIZWlnaHQgfSBmcm9tICcuL2dldC1saW5lLWhlaWdodCc7XHJcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcclxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2NvbnRleHQnKS5Xb3JkUHJlc3NDb21wb25lbnRQcm9wczxpbXBvcnQoJy4vdHlwZXMnKS5Qcm9wcywgJ3NwYW4nPn0gcHJvcHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRleHQoXHJcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBQcm9wcywgJ3NwYW4nID5cclxuKSB7XHJcblx0Y29uc3Qge1xyXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRhbGlnbixcclxuXHRcdGNoaWxkcmVuLFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0Y29sb3IsXHJcblx0XHRlbGxpcHNpemVNb2RlLFxyXG5cdFx0aXNEZXN0cnVjdGl2ZSA9IGZhbHNlLFxyXG5cdFx0ZGlzcGxheSxcclxuXHRcdGhpZ2hsaWdodEVzY2FwZSA9IGZhbHNlLFxyXG5cdFx0aGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSA9IGZhbHNlLFxyXG5cdFx0aGlnaGxpZ2h0V29yZHMsXHJcblx0XHRoaWdobGlnaHRTYW5pdGl6ZSxcclxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcclxuXHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0UHJvcCxcclxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXHJcblx0XHRzaXplLFxyXG5cdFx0dHJ1bmNhdGUgPSBmYWxzZSxcclxuXHRcdHVwcGVyQ2FzZSA9IGZhbHNlLFxyXG5cdFx0dmFyaWFudCxcclxuXHRcdHdlaWdodCA9IENPTkZJRy5mb250V2VpZ2h0LFxyXG5cdFx0Li4ub3RoZXJQcm9wc1xyXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XHJcblxyXG5cdGxldCBjb250ZW50OiBSZWFjdC5SZWFjdE5vZGUgPSBjaGlsZHJlbjtcclxuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcclxuXHRjb25zdCBpc0NhcHRpb24gPSBzaXplID09PSAnY2FwdGlvbic7XHJcblxyXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcclxuXHRcdGlmICggdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcclxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRlbnQgPSBjcmVhdGVIaWdobGlnaHRlclRleHQoIHtcclxuXHRcdFx0YXV0b0VzY2FwZTogaGlnaGxpZ2h0RXNjYXBlLFxyXG5cdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0Y2FzZVNlbnNpdGl2ZTogaGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSxcclxuXHRcdFx0c2VhcmNoV29yZHM6IGhpZ2hsaWdodFdvcmRzLFxyXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXHJcblx0XHR9ICk7XHJcblx0fVxyXG5cclxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XHJcblxyXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XHJcblx0XHRjb25zdCBzeDogUmVjb3JkPCBzdHJpbmcsIFNlcmlhbGl6ZWRTdHlsZXMgfCBudWxsID4gPSB7fTtcclxuXHJcblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcclxuXHRcdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRcdGxpbmVIZWlnaHRQcm9wXHJcblx0XHQpO1xyXG5cclxuXHRcdHN4LkJhc2UgPSBjc3MoIHtcclxuXHRcdFx0Y29sb3IsXHJcblx0XHRcdGRpc3BsYXksXHJcblx0XHRcdGZvbnRTaXplOiBnZXRGb250U2l6ZSggc2l6ZSApLFxyXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXHJcblx0XHRcdGxpbmVIZWlnaHQsXHJcblx0XHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcclxuXHJcblx0XHRzeC5vcHRpbWFsVGV4dENvbG9yID0gbnVsbDtcclxuXHJcblx0XHRpZiAoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSB7XHJcblx0XHRcdGNvbnN0IGlzT3B0aW1hbFRleHRDb2xvckRhcmsgPVxyXG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xyXG5cclxuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IGlzT3B0aW1hbFRleHRDb2xvckRhcmtcclxuXHRcdFx0XHQ/IGNzcyggeyBjb2xvcjogQ09MT1JTLmdyYXlbIDkwMCBdIH0gKVxyXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjeChcclxuXHRcdFx0c3R5bGVzLlRleHQsXHJcblx0XHRcdHN4LkJhc2UsXHJcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXHJcblx0XHRcdGlzRGVzdHJ1Y3RpdmUgJiYgc3R5bGVzLmRlc3RydWN0aXZlLFxyXG5cdFx0XHQhISBpc0hpZ2hsaWdodGVyICYmIHN0eWxlcy5oaWdobGlnaHRlclRleHQsXHJcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxyXG5cdFx0XHRpc0NhcHRpb24gJiYgc3R5bGVzLm11dGVkLFxyXG5cdFx0XHR2YXJpYW50ICYmIHN0eWxlc1sgdmFyaWFudCBdLFxyXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxyXG5cdFx0XHRjbGFzc05hbWVcclxuXHRcdCk7XHJcblx0fSwgW1xyXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRhbGlnbixcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdGNvbG9yLFxyXG5cdFx0Y3gsXHJcblx0XHRkaXNwbGF5LFxyXG5cdFx0aXNCbG9jayxcclxuXHRcdGlzQ2FwdGlvbixcclxuXHRcdGlzRGVzdHJ1Y3RpdmUsXHJcblx0XHRpc0hpZ2hsaWdodGVyLFxyXG5cdFx0bGV0dGVyU3BhY2luZyxcclxuXHRcdGxpbmVIZWlnaHRQcm9wLFxyXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcclxuXHRcdHNpemUsXHJcblx0XHR1cHBlckNhc2UsXHJcblx0XHR2YXJpYW50LFxyXG5cdFx0d2VpZ2h0LFxyXG5cdF0gKTtcclxuXHJcblx0bGV0IGZpbmFsRWxsaXBzaXplTW9kZTogdW5kZWZpbmVkIHwgJ2F1dG8nIHwgJ25vbmUnO1xyXG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XHJcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnYXV0byc7XHJcblx0fVxyXG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xyXG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ25vbmUnO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgZmluYWxDb21wb25lbnRQcm9wcyA9IHtcclxuXHRcdC4uLm90aGVyUHJvcHMsXHJcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXHJcblx0XHRjaGlsZHJlbixcclxuXHRcdGVsbGlwc2l6ZU1vZGU6IGVsbGlwc2l6ZU1vZGUgfHwgZmluYWxFbGxpcHNpemVNb2RlLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHRydW5jYXRlUHJvcHMgPSB1c2VUcnVuY2F0ZSggZmluYWxDb21wb25lbnRQcm9wcyApO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmhhbmNlIGNoaWxkIGA8TGluayAvPmAgY29tcG9uZW50cyB0byBpbmhlcml0IGZvbnQgc2l6ZS5cclxuXHQgKi9cclxuXHRpZiAoICEgdHJ1bmNhdGUgJiYgQXJyYXkuaXNBcnJheSggY2hpbGRyZW4gKSApIHtcclxuXHRcdGNvbnRlbnQgPSBDaGlsZHJlbi5tYXAoIGNoaWxkcmVuLCAoIGNoaWxkICkgPT4ge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0dHlwZW9mIGNoaWxkICE9PSAnb2JqZWN0JyB8fFxyXG5cdFx0XHRcdGNoaWxkID09PSBudWxsIHx8XHJcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGlzTGluayA9IGhhc0Nvbm5lY3ROYW1lc3BhY2UoIGNoaWxkLCBbICdMaW5rJyBdICk7XHJcblx0XHRcdGlmICggaXNMaW5rICkge1xyXG5cdFx0XHRcdHJldHVybiBjbG9uZUVsZW1lbnQoIGNoaWxkLCB7XHJcblx0XHRcdFx0XHRzaXplOiBjaGlsZC5wcm9wcy5zaXplIHx8ICdpbmhlcml0JyxcclxuXHRcdFx0XHR9ICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjaGlsZDtcclxuXHRcdH0gKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHQuLi50cnVuY2F0ZVByb3BzLFxyXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXHJcblx0fTtcclxufVxyXG4iXX0= */");
    sx.upperCase = _ref;
    sx.optimalTextColor = null;
    if (optimizeReadabilityFor) {
      const isOptimalTextColorDark = getOptimalTextShade(optimizeReadabilityFor) === 'dark';
      sx.optimalTextColor = isOptimalTextColorDark ? /*#__PURE__*/css({
        color: COLORS.gray[900]
      }, process.env.NODE_ENV === "production" ? "" : ";label:sx-optimalTextColor;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJHTSIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IHVzZU1lbW8sIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyBoYXNDb25uZWN0TmFtZXNwYWNlLCB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IHVzZVRydW5jYXRlIH0gZnJvbSAnLi4vdHJ1bmNhdGUnO1xyXG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcclxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IHsgY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0IH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcclxuaW1wb3J0IHsgQ09ORklHLCBDT0xPUlMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldExpbmVIZWlnaHQgfSBmcm9tICcuL2dldC1saW5lLWhlaWdodCc7XHJcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcclxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2NvbnRleHQnKS5Xb3JkUHJlc3NDb21wb25lbnRQcm9wczxpbXBvcnQoJy4vdHlwZXMnKS5Qcm9wcywgJ3NwYW4nPn0gcHJvcHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRleHQoXHJcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBQcm9wcywgJ3NwYW4nID5cclxuKSB7XHJcblx0Y29uc3Qge1xyXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRhbGlnbixcclxuXHRcdGNoaWxkcmVuLFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0Y29sb3IsXHJcblx0XHRlbGxpcHNpemVNb2RlLFxyXG5cdFx0aXNEZXN0cnVjdGl2ZSA9IGZhbHNlLFxyXG5cdFx0ZGlzcGxheSxcclxuXHRcdGhpZ2hsaWdodEVzY2FwZSA9IGZhbHNlLFxyXG5cdFx0aGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSA9IGZhbHNlLFxyXG5cdFx0aGlnaGxpZ2h0V29yZHMsXHJcblx0XHRoaWdobGlnaHRTYW5pdGl6ZSxcclxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcclxuXHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0UHJvcCxcclxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXHJcblx0XHRzaXplLFxyXG5cdFx0dHJ1bmNhdGUgPSBmYWxzZSxcclxuXHRcdHVwcGVyQ2FzZSA9IGZhbHNlLFxyXG5cdFx0dmFyaWFudCxcclxuXHRcdHdlaWdodCA9IENPTkZJRy5mb250V2VpZ2h0LFxyXG5cdFx0Li4ub3RoZXJQcm9wc1xyXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XHJcblxyXG5cdGxldCBjb250ZW50OiBSZWFjdC5SZWFjdE5vZGUgPSBjaGlsZHJlbjtcclxuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcclxuXHRjb25zdCBpc0NhcHRpb24gPSBzaXplID09PSAnY2FwdGlvbic7XHJcblxyXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcclxuXHRcdGlmICggdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcclxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRlbnQgPSBjcmVhdGVIaWdobGlnaHRlclRleHQoIHtcclxuXHRcdFx0YXV0b0VzY2FwZTogaGlnaGxpZ2h0RXNjYXBlLFxyXG5cdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0Y2FzZVNlbnNpdGl2ZTogaGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSxcclxuXHRcdFx0c2VhcmNoV29yZHM6IGhpZ2hsaWdodFdvcmRzLFxyXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXHJcblx0XHR9ICk7XHJcblx0fVxyXG5cclxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XHJcblxyXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XHJcblx0XHRjb25zdCBzeDogUmVjb3JkPCBzdHJpbmcsIFNlcmlhbGl6ZWRTdHlsZXMgfCBudWxsID4gPSB7fTtcclxuXHJcblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcclxuXHRcdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRcdGxpbmVIZWlnaHRQcm9wXHJcblx0XHQpO1xyXG5cclxuXHRcdHN4LkJhc2UgPSBjc3MoIHtcclxuXHRcdFx0Y29sb3IsXHJcblx0XHRcdGRpc3BsYXksXHJcblx0XHRcdGZvbnRTaXplOiBnZXRGb250U2l6ZSggc2l6ZSApLFxyXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXHJcblx0XHRcdGxpbmVIZWlnaHQsXHJcblx0XHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcclxuXHJcblx0XHRzeC5vcHRpbWFsVGV4dENvbG9yID0gbnVsbDtcclxuXHJcblx0XHRpZiAoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSB7XHJcblx0XHRcdGNvbnN0IGlzT3B0aW1hbFRleHRDb2xvckRhcmsgPVxyXG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xyXG5cclxuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IGlzT3B0aW1hbFRleHRDb2xvckRhcmtcclxuXHRcdFx0XHQ/IGNzcyggeyBjb2xvcjogQ09MT1JTLmdyYXlbIDkwMCBdIH0gKVxyXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjeChcclxuXHRcdFx0c3R5bGVzLlRleHQsXHJcblx0XHRcdHN4LkJhc2UsXHJcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXHJcblx0XHRcdGlzRGVzdHJ1Y3RpdmUgJiYgc3R5bGVzLmRlc3RydWN0aXZlLFxyXG5cdFx0XHQhISBpc0hpZ2hsaWdodGVyICYmIHN0eWxlcy5oaWdobGlnaHRlclRleHQsXHJcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxyXG5cdFx0XHRpc0NhcHRpb24gJiYgc3R5bGVzLm11dGVkLFxyXG5cdFx0XHR2YXJpYW50ICYmIHN0eWxlc1sgdmFyaWFudCBdLFxyXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxyXG5cdFx0XHRjbGFzc05hbWVcclxuXHRcdCk7XHJcblx0fSwgW1xyXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRhbGlnbixcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdGNvbG9yLFxyXG5cdFx0Y3gsXHJcblx0XHRkaXNwbGF5LFxyXG5cdFx0aXNCbG9jayxcclxuXHRcdGlzQ2FwdGlvbixcclxuXHRcdGlzRGVzdHJ1Y3RpdmUsXHJcblx0XHRpc0hpZ2hsaWdodGVyLFxyXG5cdFx0bGV0dGVyU3BhY2luZyxcclxuXHRcdGxpbmVIZWlnaHRQcm9wLFxyXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcclxuXHRcdHNpemUsXHJcblx0XHR1cHBlckNhc2UsXHJcblx0XHR2YXJpYW50LFxyXG5cdFx0d2VpZ2h0LFxyXG5cdF0gKTtcclxuXHJcblx0bGV0IGZpbmFsRWxsaXBzaXplTW9kZTogdW5kZWZpbmVkIHwgJ2F1dG8nIHwgJ25vbmUnO1xyXG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XHJcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnYXV0byc7XHJcblx0fVxyXG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xyXG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ25vbmUnO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgZmluYWxDb21wb25lbnRQcm9wcyA9IHtcclxuXHRcdC4uLm90aGVyUHJvcHMsXHJcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXHJcblx0XHRjaGlsZHJlbixcclxuXHRcdGVsbGlwc2l6ZU1vZGU6IGVsbGlwc2l6ZU1vZGUgfHwgZmluYWxFbGxpcHNpemVNb2RlLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHRydW5jYXRlUHJvcHMgPSB1c2VUcnVuY2F0ZSggZmluYWxDb21wb25lbnRQcm9wcyApO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmhhbmNlIGNoaWxkIGA8TGluayAvPmAgY29tcG9uZW50cyB0byBpbmhlcml0IGZvbnQgc2l6ZS5cclxuXHQgKi9cclxuXHRpZiAoICEgdHJ1bmNhdGUgJiYgQXJyYXkuaXNBcnJheSggY2hpbGRyZW4gKSApIHtcclxuXHRcdGNvbnRlbnQgPSBDaGlsZHJlbi5tYXAoIGNoaWxkcmVuLCAoIGNoaWxkICkgPT4ge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0dHlwZW9mIGNoaWxkICE9PSAnb2JqZWN0JyB8fFxyXG5cdFx0XHRcdGNoaWxkID09PSBudWxsIHx8XHJcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGlzTGluayA9IGhhc0Nvbm5lY3ROYW1lc3BhY2UoIGNoaWxkLCBbICdMaW5rJyBdICk7XHJcblx0XHRcdGlmICggaXNMaW5rICkge1xyXG5cdFx0XHRcdHJldHVybiBjbG9uZUVsZW1lbnQoIGNoaWxkLCB7XHJcblx0XHRcdFx0XHRzaXplOiBjaGlsZC5wcm9wcy5zaXplIHx8ICdpbmhlcml0JyxcclxuXHRcdFx0XHR9ICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjaGlsZDtcclxuXHRcdH0gKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHQuLi50cnVuY2F0ZVByb3BzLFxyXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXHJcblx0fTtcclxufVxyXG4iXX0= */") : /*#__PURE__*/css({
        color: COLORS.white
      }, process.env.NODE_ENV === "production" ? "" : ";label:sx-optimalTextColor;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRHTSIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IHVzZU1lbW8sIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyBoYXNDb25uZWN0TmFtZXNwYWNlLCB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IHVzZVRydW5jYXRlIH0gZnJvbSAnLi4vdHJ1bmNhdGUnO1xyXG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcclxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcclxuaW1wb3J0IHsgY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0IH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcclxuaW1wb3J0IHsgQ09ORklHLCBDT0xPUlMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldExpbmVIZWlnaHQgfSBmcm9tICcuL2dldC1saW5lLWhlaWdodCc7XHJcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcclxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgdHlwZSBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2NvbnRleHQnKS5Xb3JkUHJlc3NDb21wb25lbnRQcm9wczxpbXBvcnQoJy4vdHlwZXMnKS5Qcm9wcywgJ3NwYW4nPn0gcHJvcHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRleHQoXHJcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBQcm9wcywgJ3NwYW4nID5cclxuKSB7XHJcblx0Y29uc3Qge1xyXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRhbGlnbixcclxuXHRcdGNoaWxkcmVuLFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0Y29sb3IsXHJcblx0XHRlbGxpcHNpemVNb2RlLFxyXG5cdFx0aXNEZXN0cnVjdGl2ZSA9IGZhbHNlLFxyXG5cdFx0ZGlzcGxheSxcclxuXHRcdGhpZ2hsaWdodEVzY2FwZSA9IGZhbHNlLFxyXG5cdFx0aGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSA9IGZhbHNlLFxyXG5cdFx0aGlnaGxpZ2h0V29yZHMsXHJcblx0XHRoaWdobGlnaHRTYW5pdGl6ZSxcclxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcclxuXHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0UHJvcCxcclxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXHJcblx0XHRzaXplLFxyXG5cdFx0dHJ1bmNhdGUgPSBmYWxzZSxcclxuXHRcdHVwcGVyQ2FzZSA9IGZhbHNlLFxyXG5cdFx0dmFyaWFudCxcclxuXHRcdHdlaWdodCA9IENPTkZJRy5mb250V2VpZ2h0LFxyXG5cdFx0Li4ub3RoZXJQcm9wc1xyXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XHJcblxyXG5cdGxldCBjb250ZW50OiBSZWFjdC5SZWFjdE5vZGUgPSBjaGlsZHJlbjtcclxuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcclxuXHRjb25zdCBpc0NhcHRpb24gPSBzaXplID09PSAnY2FwdGlvbic7XHJcblxyXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcclxuXHRcdGlmICggdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJyApIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcclxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRlbnQgPSBjcmVhdGVIaWdobGlnaHRlclRleHQoIHtcclxuXHRcdFx0YXV0b0VzY2FwZTogaGlnaGxpZ2h0RXNjYXBlLFxyXG5cdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0Y2FzZVNlbnNpdGl2ZTogaGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSxcclxuXHRcdFx0c2VhcmNoV29yZHM6IGhpZ2hsaWdodFdvcmRzLFxyXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXHJcblx0XHR9ICk7XHJcblx0fVxyXG5cclxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XHJcblxyXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XHJcblx0XHRjb25zdCBzeDogUmVjb3JkPCBzdHJpbmcsIFNlcmlhbGl6ZWRTdHlsZXMgfCBudWxsID4gPSB7fTtcclxuXHJcblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcclxuXHRcdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRcdGxpbmVIZWlnaHRQcm9wXHJcblx0XHQpO1xyXG5cclxuXHRcdHN4LkJhc2UgPSBjc3MoIHtcclxuXHRcdFx0Y29sb3IsXHJcblx0XHRcdGRpc3BsYXksXHJcblx0XHRcdGZvbnRTaXplOiBnZXRGb250U2l6ZSggc2l6ZSApLFxyXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXHJcblx0XHRcdGxpbmVIZWlnaHQsXHJcblx0XHRcdGxldHRlclNwYWNpbmcsXHJcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcclxuXHJcblx0XHRzeC5vcHRpbWFsVGV4dENvbG9yID0gbnVsbDtcclxuXHJcblx0XHRpZiAoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSB7XHJcblx0XHRcdGNvbnN0IGlzT3B0aW1hbFRleHRDb2xvckRhcmsgPVxyXG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xyXG5cclxuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IGlzT3B0aW1hbFRleHRDb2xvckRhcmtcclxuXHRcdFx0XHQ/IGNzcyggeyBjb2xvcjogQ09MT1JTLmdyYXlbIDkwMCBdIH0gKVxyXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjeChcclxuXHRcdFx0c3R5bGVzLlRleHQsXHJcblx0XHRcdHN4LkJhc2UsXHJcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXHJcblx0XHRcdGlzRGVzdHJ1Y3RpdmUgJiYgc3R5bGVzLmRlc3RydWN0aXZlLFxyXG5cdFx0XHQhISBpc0hpZ2hsaWdodGVyICYmIHN0eWxlcy5oaWdobGlnaHRlclRleHQsXHJcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxyXG5cdFx0XHRpc0NhcHRpb24gJiYgc3R5bGVzLm11dGVkLFxyXG5cdFx0XHR2YXJpYW50ICYmIHN0eWxlc1sgdmFyaWFudCBdLFxyXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxyXG5cdFx0XHRjbGFzc05hbWVcclxuXHRcdCk7XHJcblx0fSwgW1xyXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXHJcblx0XHRhbGlnbixcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdGNvbG9yLFxyXG5cdFx0Y3gsXHJcblx0XHRkaXNwbGF5LFxyXG5cdFx0aXNCbG9jayxcclxuXHRcdGlzQ2FwdGlvbixcclxuXHRcdGlzRGVzdHJ1Y3RpdmUsXHJcblx0XHRpc0hpZ2hsaWdodGVyLFxyXG5cdFx0bGV0dGVyU3BhY2luZyxcclxuXHRcdGxpbmVIZWlnaHRQcm9wLFxyXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcclxuXHRcdHNpemUsXHJcblx0XHR1cHBlckNhc2UsXHJcblx0XHR2YXJpYW50LFxyXG5cdFx0d2VpZ2h0LFxyXG5cdF0gKTtcclxuXHJcblx0bGV0IGZpbmFsRWxsaXBzaXplTW9kZTogdW5kZWZpbmVkIHwgJ2F1dG8nIHwgJ25vbmUnO1xyXG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XHJcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnYXV0byc7XHJcblx0fVxyXG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xyXG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ25vbmUnO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgZmluYWxDb21wb25lbnRQcm9wcyA9IHtcclxuXHRcdC4uLm90aGVyUHJvcHMsXHJcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXHJcblx0XHRjaGlsZHJlbixcclxuXHRcdGVsbGlwc2l6ZU1vZGU6IGVsbGlwc2l6ZU1vZGUgfHwgZmluYWxFbGxpcHNpemVNb2RlLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHRydW5jYXRlUHJvcHMgPSB1c2VUcnVuY2F0ZSggZmluYWxDb21wb25lbnRQcm9wcyApO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmhhbmNlIGNoaWxkIGA8TGluayAvPmAgY29tcG9uZW50cyB0byBpbmhlcml0IGZvbnQgc2l6ZS5cclxuXHQgKi9cclxuXHRpZiAoICEgdHJ1bmNhdGUgJiYgQXJyYXkuaXNBcnJheSggY2hpbGRyZW4gKSApIHtcclxuXHRcdGNvbnRlbnQgPSBDaGlsZHJlbi5tYXAoIGNoaWxkcmVuLCAoIGNoaWxkICkgPT4ge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0dHlwZW9mIGNoaWxkICE9PSAnb2JqZWN0JyB8fFxyXG5cdFx0XHRcdGNoaWxkID09PSBudWxsIHx8XHJcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGlzTGluayA9IGhhc0Nvbm5lY3ROYW1lc3BhY2UoIGNoaWxkLCBbICdMaW5rJyBdICk7XHJcblx0XHRcdGlmICggaXNMaW5rICkge1xyXG5cdFx0XHRcdHJldHVybiBjbG9uZUVsZW1lbnQoIGNoaWxkLCB7XHJcblx0XHRcdFx0XHRzaXplOiBjaGlsZC5wcm9wcy5zaXplIHx8ICdpbmhlcml0JyxcclxuXHRcdFx0XHR9ICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjaGlsZDtcclxuXHRcdH0gKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHQuLi50cnVuY2F0ZVByb3BzLFxyXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXHJcblx0fTtcclxufVxyXG4iXX0= */");
    }
    return cx(styles.Text, sx.Base, sx.optimalTextColor, isDestructive && styles.destructive, !!isHighlighter && styles.highlighterText, isBlock && styles.block, isCaption && styles.muted, variant && styles[variant], upperCase && sx.upperCase, className);
  }, [adjustLineHeightForInnerControls, align, className, color, cx, display, isBlock, isCaption, isDestructive, isHighlighter, letterSpacing, lineHeightProp, optimizeReadabilityFor, size, upperCase, variant, weight]);
  let finalEllipsizeMode;
  if (truncate === true) {
    finalEllipsizeMode = 'auto';
  }
  if (truncate === false) {
    finalEllipsizeMode = 'none';
  }
  const finalComponentProps = {
    ...otherProps,
    className: classes,
    children,
    ellipsizeMode: ellipsizeMode || finalEllipsizeMode
  };
  const truncateProps = useTruncate(finalComponentProps);

  /**
   * Enhance child `<Link />` components to inherit font size.
   */
  if (!truncate && Array.isArray(children)) {
    content = Children.map(children, child => {
      if (typeof child !== 'object' || child === null || !('props' in child)) {
        return child;
      }
      const isLink = hasConnectNamespace(child, ['Link']);
      if (isLink) {
        return cloneElement(child, {
          size: child.props.size || 'inherit'
        });
      }
      return child;
    });
  }
  return {
    ...truncateProps,
    children: truncate ? truncateProps.children : content
  };
}
//# sourceMappingURL=hook.js.map