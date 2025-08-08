type TodoItemProps = {
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};
function TodoItem({ onToggle, onDelete, onEdit }: TodoItemProps) {
  return <div>TodoItem</div>;
}

export default TodoItem;
