/**
 * Internal dependencies
 */

const ensureParentsAreDefined = terms => {
  return terms.every(term => term.parent !== null);
};
/**
 * Returns terms in a tree form.
 *
 * @param flatTerms Array of terms in flat format.
 *
 * @return Terms in tree format.
 */
export function buildTermsTree(flatTerms) {
  const flatTermsWithParentAndChildren = flatTerms.map(term => ({
    children: [],
    parent: null,
    ...term,
    id: String(term.id)
  }));

  // We use a custom type guard here to ensure that the parent property is
  // defined on all terms. The type of the `parent` property is `number | null`
  // and we need to ensure that it is `number`. This is because we use the
  // `parent` property as a key in the `termsByParent` object.
  if (!ensureParentsAreDefined(flatTermsWithParentAndChildren)) {
    return flatTermsWithParentAndChildren;
  }
  const termsByParent = flatTermsWithParentAndChildren.reduce((acc, term) => {
    const {
      parent
    } = term;
    if (!acc[parent]) {
      acc[parent] = [];
    }
    acc[parent].push(term);
    return acc;
  }, {});
  const fillWithChildren = terms => {
    return terms.map(term => {
      const children = termsByParent[term.id];
      return {
        ...term,
        children: children && children.length ? fillWithChildren(children) : []
      };
    });
  };
  return fillWithChildren(termsByParent['0'] || []);
}
//# sourceMappingURL=terms.js.map