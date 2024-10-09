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

import { useContextSystem } from '../context';
import * as styles from './styles';
import { TRUNCATE_ELLIPSIS, TRUNCATE_TYPE, truncateContent } from './utils';
import { useCx } from '../utils/hooks/use-cx';
export default function useTruncate(props) {
  const {
    className,
    children,
    ellipsis = TRUNCATE_ELLIPSIS,
    ellipsizeMode = TRUNCATE_TYPE.auto,
    limit = 0,
    numberOfLines = 0,
    ...otherProps
  } = useContextSystem(props, 'Truncate');
  const cx = useCx();
  let childrenAsText;
  if (typeof children === 'string') {
    childrenAsText = children;
  } else if (typeof children === 'number') {
    childrenAsText = children.toString();
  }
  const truncatedContent = childrenAsText ? truncateContent(childrenAsText, {
    ellipsis,
    ellipsizeMode,
    limit,
    numberOfLines
  }) : children;
  const shouldTruncate = !!childrenAsText && ellipsizeMode === TRUNCATE_TYPE.auto;
  const classes = useMemo(() => {
    // The `word-break: break-all` property first makes sure a text line
    // breaks even when it contains 'unbreakable' content such as long URLs.
    // See https://github.com/WordPress/gutenberg/issues/60860.
    const truncateLines = /*#__PURE__*/css(numberOfLines === 1 ? 'word-break: break-all;' : '', " -webkit-box-orient:vertical;-webkit-line-clamp:", numberOfLines, ";display:-webkit-box;overflow:hidden;" + (process.env.NODE_ENV === "production" ? "" : ";label:truncateLines;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdHJ1bmNhdGUvaG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwRDJCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdHJ1bmNhdGUvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuXHJcbi8qKlxyXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcclxuaW1wb3J0IHsgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5pbXBvcnQgeyBUUlVOQ0FURV9FTExJUFNJUywgVFJVTkNBVEVfVFlQRSwgdHJ1bmNhdGVDb250ZW50IH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcclxuaW1wb3J0IHR5cGUgeyBUcnVuY2F0ZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUcnVuY2F0ZShcclxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFRydW5jYXRlUHJvcHMsICdzcGFuJyA+XHJcbikge1xyXG5cdGNvbnN0IHtcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdGNoaWxkcmVuLFxyXG5cdFx0ZWxsaXBzaXMgPSBUUlVOQ0FURV9FTExJUFNJUyxcclxuXHRcdGVsbGlwc2l6ZU1vZGUgPSBUUlVOQ0FURV9UWVBFLmF1dG8sXHJcblx0XHRsaW1pdCA9IDAsXHJcblx0XHRudW1iZXJPZkxpbmVzID0gMCxcclxuXHRcdC4uLm90aGVyUHJvcHNcclxuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdUcnVuY2F0ZScgKTtcclxuXHJcblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xyXG5cclxuXHRsZXQgY2hpbGRyZW5Bc1RleHQ7XHJcblx0aWYgKCB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnICkge1xyXG5cdFx0Y2hpbGRyZW5Bc1RleHQgPSBjaGlsZHJlbjtcclxuXHR9IGVsc2UgaWYgKCB0eXBlb2YgY2hpbGRyZW4gPT09ICdudW1iZXInICkge1xyXG5cdFx0Y2hpbGRyZW5Bc1RleHQgPSBjaGlsZHJlbi50b1N0cmluZygpO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgdHJ1bmNhdGVkQ29udGVudCA9IGNoaWxkcmVuQXNUZXh0XHJcblx0XHQ/IHRydW5jYXRlQ29udGVudCggY2hpbGRyZW5Bc1RleHQsIHtcclxuXHRcdFx0XHRlbGxpcHNpcyxcclxuXHRcdFx0XHRlbGxpcHNpemVNb2RlLFxyXG5cdFx0XHRcdGxpbWl0LFxyXG5cdFx0XHRcdG51bWJlck9mTGluZXMsXHJcblx0XHQgIH0gKVxyXG5cdFx0OiBjaGlsZHJlbjtcclxuXHJcblx0Y29uc3Qgc2hvdWxkVHJ1bmNhdGUgPVxyXG5cdFx0ISEgY2hpbGRyZW5Bc1RleHQgJiYgZWxsaXBzaXplTW9kZSA9PT0gVFJVTkNBVEVfVFlQRS5hdXRvO1xyXG5cclxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xyXG5cdFx0Ly8gVGhlIGB3b3JkLWJyZWFrOiBicmVhay1hbGxgIHByb3BlcnR5IGZpcnN0IG1ha2VzIHN1cmUgYSB0ZXh0IGxpbmVcclxuXHRcdC8vIGJyZWFrcyBldmVuIHdoZW4gaXQgY29udGFpbnMgJ3VuYnJlYWthYmxlJyBjb250ZW50IHN1Y2ggYXMgbG9uZyBVUkxzLlxyXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Xb3JkUHJlc3MvZ3V0ZW5iZXJnL2lzc3Vlcy82MDg2MC5cclxuXHRcdGNvbnN0IHRydW5jYXRlTGluZXMgPSBjc3NgXHJcblx0XHRcdCR7IG51bWJlck9mTGluZXMgPT09IDEgPyAnd29yZC1icmVhazogYnJlYWstYWxsOycgOiAnJyB9XHJcblx0XHRcdC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XHJcblx0XHRcdC13ZWJraXQtbGluZS1jbGFtcDogJHsgbnVtYmVyT2ZMaW5lcyB9O1xyXG5cdFx0XHRkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuXHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdGA7XHJcblxyXG5cdFx0cmV0dXJuIGN4KFxyXG5cdFx0XHRzaG91bGRUcnVuY2F0ZSAmJiAhIG51bWJlck9mTGluZXMgJiYgc3R5bGVzLlRydW5jYXRlLFxyXG5cdFx0XHRzaG91bGRUcnVuY2F0ZSAmJiAhISBudW1iZXJPZkxpbmVzICYmIHRydW5jYXRlTGluZXMsXHJcblx0XHRcdGNsYXNzTmFtZVxyXG5cdFx0KTtcclxuXHR9LCBbIGNsYXNzTmFtZSwgY3gsIG51bWJlck9mTGluZXMsIHNob3VsZFRydW5jYXRlIF0gKTtcclxuXHJcblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzLCBjaGlsZHJlbjogdHJ1bmNhdGVkQ29udGVudCB9O1xyXG59XHJcbiJdfQ== */");
    return cx(shouldTruncate && !numberOfLines && styles.Truncate, shouldTruncate && !!numberOfLines && truncateLines, className);
  }, [className, cx, numberOfLines, shouldTruncate]);
  return {
    ...otherProps,
    className: classes,
    children: truncatedContent
  };
}
//# sourceMappingURL=hook.js.map