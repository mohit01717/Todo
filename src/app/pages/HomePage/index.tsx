import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useTodoSlice } from './slice';
import { RootState } from './slice/types';
import styled from 'styled-components';
import { AddTodo } from 'app/components/AddTodo';
import { EditTodo } from 'app/components/EditTodo';
import { IoAdd } from 'react-icons/io5';
import { MdOutlineEdit, MdDelete } from 'react-icons/md';
export function HomePage() {
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const { actions } = useTodoSlice();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isLoading = useSelector((state: RootState) => state.todo.isLoading);
  const [editingTodoId, setEditingTodoId] = React.useState<number | null>(null);

  React.useEffect(() => {
    dispatch(actions.fetchTodos());
  }, [dispatch, actions]);

  const handleEditClick = (id: number) => {
    setEditingTodoId(id);
  };

  const handleCloseEdit = () => {
    setEditingTodoId(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <MainHeading>Todo List</MainHeading>
      <CustomButton onClick={() => setShowAdd(true)}>
        <IoAdd size={30} />
      </CustomButton>
      <OuterContainer>
        {todos.map(todo => (
          <Container key={todo.id}>
            <Heading>{todo.title}</Heading>
            <Paragraph>{todo.body}</Paragraph>
            <InnerContainer>
              <Button onClick={() => handleEditClick(todo.id)}>
                <MdOutlineEdit size={30} />
              </Button>
              <Button
                style={{ backgroundColor: 'red' }}
                onClick={() => dispatch(actions.deleteTodo(todo.id))}
              >
                <MdDelete size={30} />
              </Button>
            </InnerContainer>
          </Container>
        ))}
      </OuterContainer>
      {showAdd && (
        <AddContainer>
          <AddTodo />
        </AddContainer>
      )}
      {editingTodoId !== null && (
        <AddContainer>
          <EditTodo todoId={editingTodoId} onClose={handleCloseEdit} />
        </AddContainer>
      )}
    </>
  );
}

const MainHeading = styled.h1`
  font-size: 3vw;
  font-weight: bold;
  color: black;
  text-align: center;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
`;

const Heading = styled.h1`
  font-size: 20px;
  height: 50px;
  text-align: center;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  height: 100px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  background-color: purple;
  border-radius: 50%;
  color: white;
  height: 50px;
  width: 50px;
`;
const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
  right: 30%;
  background-color: black;
  opacity: 0.7;

  position: fixed;
  height: 400px;
  width: 40vw;
`;
const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 20px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: red;
  color: white;
  border-color: red;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 0;
  &:hover {
    background-color: lightcoral;
    border-color: lightcoral;
  }
`;
