import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTodoSlice } from 'app/pages/HomePage/slice';
import { RootState, Todo } from 'app/pages/HomePage/slice/types';

interface Props {
  todoId: number;
  onClose: () => void;
}

const EditTodoComponent: React.FC<Props> = ({ todoId, onClose }) => {
  const { t, i18n } = useTranslation();
  const { actions } = useTodoSlice();
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) =>
    state.todo.todos.find(t => t.id === todoId),
  );

  const [title, setTitle] = useState<string>(todo?.title || '');
  const [body, setBody] = useState<string>(todo?.body || '');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setBody(todo.body);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body && todo) {
      const updatedTodo: Todo = {
        ...todo,
        title,
        body,
      };
      dispatch(actions.editTodo(updatedTodo));
      onClose();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Body"
      />
      <button type="submit">Edit Todo</button>
    </Form>
  );
};

export const EditTodo = memo(EditTodoComponent);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30vw;

  input,
  textarea {
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
    background-color: yellow;
  }
  button:hover {
    background-color: orange;
  }
`;
