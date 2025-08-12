import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';

// 공통으로 사용하는 type 정의 및 interface 는 별도의 폴더에 보관하자.
import { ITodoType, TodoType } from './types/todoType';

// 테스트를 위한 목업 데이터 (/src/api/dummy.ts 추천)
const initialTodos: TodoType[] = [];

function App(): JSX.Element {
  // ts 자리
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>(initialTodos);

  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = (newTodo: TodoType): void => {
    // 아래는 prev : 현재 최신 state 를 나타냄
    // setTodos(prev => [newTodo, ...prev]);

    const arr: TodoType[] = [newTodo, ...todos];
    setTodos(arr);
  };

  // todo 목록에서 실행할 함수들
  const onToggle = (id: string) => {
    // console.log('onToggle : ', id);
    // 전달받은 ID 를 이용해서 map 으로 찾아서 id가 같으면 completed 변경
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };
  const onDelete = (id: string) => {
    // console.log('onDelete : ', id);
    // 전달 받은 ID 를 제외한 나머지 즉, map 으로 새 목록으로 변경
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };
  const onEdit = (id: string, newTitle: string) => {
    // 아이디와 새로운 타이틀을 알수있다.
    // 아이디를 이용해서 해당 타이틀을 수정하고 업데이트 해보자.
    setTodos(todos => todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };
  // tsx 자리
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
