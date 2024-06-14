import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useTodoSlice } from 'app/pages/HomePage/slice';
import { Todo } from 'app/pages/HomePage/slice/types';

interface Props {}

const AddTodoComponent: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { actions } = useTodoSlice();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      const newTodo: Todo = {
        userId: 1,
        id: Date.now(),
        title,
        body,
      };
      dispatch(actions.addTodo(newTodo));
      setTitle('');
      setBody('');
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
      <button type="submit">Add Todo</button>
    </Form>
  );
};

export const AddTodo = memo(AddTodoComponent);

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
