import React, { useState } from 'react';
import { TodoType } from '../../types/todoType';

type TodoWriteProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleTodoUpdate: (newTodo: TodoType) => void;
};

const TodoWrite = ({ setTodos, handleTodoUpdate }: TodoWriteProps) => {
  // js 자리
  // 할일 제목 값 관리
  const [title, setTitle] = useState<string>('');

  // title 변경시 onChange 이벤트 처리해보기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };
  // 새 할일 등록하기
  const handleAdd = () => {
    // 공백 입력 금지
    if (title.trim()) {
      // id: '', title: '', completed:false
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };

      // 1. 만약 setTodo 등의 useState 를 활용한다면?
      // 아래는 prev: 현재 최신 state 를 나타냄
      // setTodos(prev => [newTodo, ...prev]);
      // 2. 함수의 매개변수로 전달한다면?
      handleTodoUpdate(newTodo);
      setTitle(''); // 입력창 초기화
    }
  };
  // jsx 자리
  return (
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
      <button>취소</button>
    </div>
  );
};

export default TodoWrite;
