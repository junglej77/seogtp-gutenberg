/**
 * External dependencies
 */
import type { SyntheticEvent } from 'react';
/**
 * Internal dependencies
 */
import type { InputState, StateReducer } from './state';
import * as actions from './actions';
import type { InputChangeCallback } from '../types';
/**
 * A custom hook that connects and external stateReducer with an internal
 * reducer. This hook manages the internal state of InputControl.
 * However, by connecting an external stateReducer function, other
 * components can react to actions as well as modify state before it is
 * applied.
 *
 * This technique uses the "stateReducer" design pattern:
 * https://kentcdodds.com/blog/the-state-reducer-pattern/
 *
 * @param stateReducer    An external state reducer.
 * @param initialState    The initial state for the reducer.
 * @param onChangeHandler A handler for the onChange event.
 * @return State, dispatch, and a collection of actions.
 */
export declare function useInputControlStateReducer(stateReducer: StateReducer | undefined, initialState: Partial<InputState> | undefined, onChangeHandler: InputChangeCallback): {
    readonly change: (nextValue: actions.ChangeEventAction["payload"]["value"], event: actions.ChangeEventAction["payload"]["event"]) => void;
    readonly commit: (nextValue: actions.ChangeEventAction["payload"]["value"], event: actions.ChangeEventAction["payload"]["event"]) => void;
    readonly dispatch: import("react").Dispatch<actions.InputAction | actions.ControlAction>;
    readonly drag: (payload: actions.DragEventAction["payload"]) => void;
    readonly dragEnd: (payload: actions.DragEventAction["payload"]) => void;
    readonly dragStart: (payload: actions.DragEventAction["payload"]) => void;
    readonly invalidate: (error: unknown, event: SyntheticEvent) => void;
    readonly pressDown: (event: actions.KeyEventAction["payload"]["event"]) => void;
    readonly pressEnter: (event: actions.KeyEventAction["payload"]["event"]) => void;
    readonly pressUp: (event: actions.KeyEventAction["payload"]["event"]) => void;
    readonly reset: (nextValue: actions.ChangeEventAction["payload"]["value"], event: actions.ChangeEventAction["payload"]["event"]) => void;
    readonly state: InputState;
};
//# sourceMappingURL=reducer.d.ts.map