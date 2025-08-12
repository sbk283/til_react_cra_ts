import { TodoType } from '@/types/todoType';
import { useState } from 'react';

type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  // js 자리
  // 현재 Edit 상태인지 아닌지
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Edit 상태라면 입력중인 title 내용 관리
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  // 수정은 별도의 입력창 구성으로 수정 후 값 만 업데이트
  const handleEdit = () => {
    console.log('여기에서 내용을 수정하는 기능 작성 후 완료된 데이터 전송');
    setIsEdit(true);
    onEdit(todo.id, editTitle);
  };
  // 수정 후 저장 기능
  const handleEditSave = () => {
    console.log('수정완료 저장');
    // 1. 업데이트 해줌
    if (editTitle.trim()) {
      // 변경되어야 할 ID, 새로운 타이틀 전달
      onEdit(todo.id, editTitle);
      // 2. 상태는 isEdit 을 false 로 변경
      setIsEdit(false);
    }
  };
  const handleEditCancel = () => {
    // 1. editTitle 을 원래대로 돌리고
    setEditTitle(todo.title);
    // 2. isEdit 을 false 로 설정하고
    setIsEdit(false);
  };
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  };
  // css 객체 만들기
  const liStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    color: todo.completed ? 'gray' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
  };
  return (
    <li style={liStyle}>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
