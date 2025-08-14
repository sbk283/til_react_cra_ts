import { TodoType } from '../types/todoType';
import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

// 전역 state 에서 관리할 데이터 모양
type TodoState = {
  todos: TodoType[];
};
// 1. 초기값
const initialState: TodoState = {
  todos: [],
};
// 2. Reduce 함수 : action 으로 state 를 관리하는 함수
// 매개변수로 state 와 action 이 전달됨
// action 의 모양 {type:string, payload: TodoType}
// type AddAction = {
//   type: 'ADD' | 'TOGGLE' | 'DELETE' | 'EDIT';
//   payload: TodoType | { id: string } | { id: string; title: string };
// };
type AddAction = { type: 'ADD'; payload: TodoType };
type ToggleAction = { type: 'TOGGLE'; payload: { id: string } };
type DeleteAction = { type: 'DELETE'; payload: { id: string } };
type EditAction = { type: 'EDIT'; payload: { id: string; title: string } };
type TodoAction = AddAction | ToggleAction | DeleteAction | EditAction;
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD': {
      const todo = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    }
    case 'TOGGLE': {
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      return { ...state, todos: arr };
    }
    case 'DELETE': {
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.filter(todo => todo.id !== id);
      return { ...state, todos: arr };
    }
    case 'EDIT': {
      const { id, title } = action.payload;
      const arr: TodoType[] = state.todos.map(todo => (todo.id === id ? { ...todo, title } : todo));
      return { ...state, todos: arr };
    }
    default: {
      return state;
    }
  }
}

// 3. Context 생성
// Context 에서 관리할 Value 타입
type TodoContextValue = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
};
export const TodoContext = createContext<TodoContextValue | null>(null);

// 4. Provide 생성
// export const TodoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
export const TodoProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  // 5. useReduce 로 state 관리하기
  const [state, dispatch] = useReducer(todoReducer, initialState);
  // dispatch 용 전용 함수
  const addTodo = useCallback((todo: TodoType) => {
    dispatch({ type: 'ADD', payload: todo });
  }, []);
  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  }, []);
  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  }, []);
  const editTodo = useCallback((id: string, title: string) => {
    dispatch({ type: 'EDIT', payload: { id, title } });
  }, []);
  // context 의 value 는 현재 {} 로 정의되어 있다.
  const value = useMemo(
    () => ({
      todos: state.todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
    }),
    [state.todos, addTodo, toggleTodo, deleteTodo, editTodo],
  );
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// 커스텀 훅
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
