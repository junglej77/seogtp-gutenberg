/**
 * WordPress dependencies
 */
import { BaseControl, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { unescapeTerms } from '../../utils/terms';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MIN_MOST_USED_TERMS = 3;
const DEFAULT_QUERY = {
  per_page: 10,
  orderby: 'count',
  order: 'desc',
  hide_empty: true,
  _fields: 'id,name,count',
  context: 'view'
};
export default function MostUsedTerms({
  onSelect,
  taxonomy
}) {
  const {
    _terms,
    showTerms
  } = useSelect(select => {
    const mostUsedTerms = select(coreStore).getEntityRecords('taxonomy', taxonomy.slug, DEFAULT_QUERY);
    return {
      _terms: mostUsedTerms,
      showTerms: mostUsedTerms?.length >= MIN_MOST_USED_TERMS
    };
  }, [taxonomy.slug]);
  if (!showTerms) {
    return null;
  }
  const terms = unescapeTerms(_terms);
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-taxonomies__flat-term-most-used",
    children: [/*#__PURE__*/_jsx(BaseControl.VisualLabel, {
      as: "h3",
      className: "editor-post-taxonomies__flat-term-most-used-label",
      children: taxonomy.labels.most_used
    }), /*#__PURE__*/_jsx("ul", {
      role: "list",
      className: "editor-post-taxonomies__flat-term-most-used-list",
      children: terms.map(term => /*#__PURE__*/_jsx("li", {
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "link",
          onClick: () => onSelect(term),
          children: term.name
        })
      }, term.id))
    })]
  });
}
//# sourceMappingURL=most-used-terms.js.map