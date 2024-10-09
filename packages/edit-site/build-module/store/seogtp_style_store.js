import { registerStore } from '@wordpress/data';

// 定义 store 的默认状态
const DEFAULT_STATE = {
  currentStyle: 'default'
};

// 创建 action 来更新 currentStyle
const actions = {
  setCurrentStyle(style) {
    return {
      type: 'SET_CURRENT_STYLE',
      style
    };
  }
};

// 创建 reducer 来处理 state 更新
function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'SET_CURRENT_STYLE':
      return {
        ...state,
        currentStyle: action.style
      };
    default:
      return state;
  }
}

// 定义 selectors 来获取 state
const selectors = {
  getCurrentStyle(state) {
    return state.currentStyle;
  }
};

// 注册 store
const store = registerStore('seogtp-gutenberg/seogtp_style_store', {
  reducer,
  actions,
  selectors
});
export default store;
//# sourceMappingURL=seogtp_style_store.js.map