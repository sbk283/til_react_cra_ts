import { useState } from 'react';
import TodoList from './components/todos/TodoList';

// 1.  type 으로 하겠다.
export type TodoType = { id: string; titel: string; completed: boolean };
// 2. interface 으로 하겠다.
interface ITodoType {
  id: string;
  titel: string;
  completed: boolean;
}

function App(): JSX.Element {
  // ts 자리
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>([]);

  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = () => {
    // setTodos(???)
  };
  const onToggle = () => {};
  const onDelete = () => {};
  const onEdit = () => {};
  // tsx 자리
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        {/* <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} /> */}
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
