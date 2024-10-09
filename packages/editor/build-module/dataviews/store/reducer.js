/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';
function isReady(state = {}, action) {
  switch (action.type) {
    case 'SET_IS_READY':
      return {
        ...state,
        [action.kind]: {
          ...state[action.kind],
          [action.name]: true
        }
      };
  }
  return state;
}
function actions(state = {}, action) {
  var _state$action$kind$ac;
  switch (action.type) {
    case 'REGISTER_ENTITY_ACTION':
      return {
        ...state,
        [action.kind]: {
          ...state[action.kind],
          [action.name]: [...((_state$action$kind$ac = state[action.kind]?.[action.name]) !== null && _state$action$kind$ac !== void 0 ? _state$action$kind$ac : []).filter(_action => _action.id !== action.config.id), action.config]
        }
      };
    case 'UNREGISTER_ENTITY_ACTION':
      {
        var _state$action$kind$ac2;
        return {
          ...state,
          [action.kind]: {
            ...state[action.kind],
            [action.name]: ((_state$action$kind$ac2 = state[action.kind]?.[action.name]) !== null && _state$action$kind$ac2 !== void 0 ? _state$action$kind$ac2 : []).filter(_action => _action.id !== action.actionId)
          }
        };
      }
  }
  return state;
}
export default combineReducers({
  actions,
  isReady
});
//# sourceMappingURL=reducer.js.map