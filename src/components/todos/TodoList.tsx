import { TodoType } from '@/types/todoType';
import TodoItem from './TodoItem';

type TodoItemProps = {
  todos: TodoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};
const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoItemProps): JSX.Element => {
  return (
    <div>
      <h2>할일목록</h2>
      {todos.length === 0 ? (
        <p>등록된 할일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
      {/* 할일 즉 todos 는 여러개의 item 으로 구성된 배열이다. map 으로 출력 */}
    </div>
  );
};

export default TodoList;
