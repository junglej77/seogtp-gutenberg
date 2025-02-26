/**
 * Internal dependencies
 */
import onSubKey from './utils/on-sub-key';

/**
 * Reducer returning the next notices state. The notices state is an object
 * where each key is a context, its value an array of notice objects.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
const notices = onSubKey('context')((state = [], action) => {
  switch (action.type) {
    case 'CREATE_NOTICE':
      // Avoid duplicates on ID.
      return [...state.filter(({
        id
      }) => id !== action.notice.id), action.notice];
    case 'REMOVE_NOTICE':
      return state.filter(({
        id
      }) => id !== action.id);
    case 'REMOVE_NOTICES':
      return state.filter(({
        id
      }) => !action.ids.includes(id));
    case 'REMOVE_ALL_NOTICES':
      return state.filter(({
        type
      }) => type !== action.noticeType);
  }
  return state;
});
export default notices;
//# sourceMappingURL=reducer.js.map