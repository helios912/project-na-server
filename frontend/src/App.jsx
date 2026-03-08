import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosActions';
import './App.css';
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from './store/api/apiSlice';

function App() {
    const { data: todos, isLoading, error } = useGetTodosQuery();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Помилка</p>;
    const completedTodosCount = todos?.filter(
        (todo) => todo.completed === false,
    ).length;

    return (
        <div className="App">
            <h1>Список завдань</h1>
            <TodoForm />
            {!!todos.length && <TodosActions />}
            <TodoList />
            {completedTodosCount > 0 && (
                <h2>{`У Вас є  ${completedTodosCount} ${
                    completedTodosCount > 1 ? 'завдань' : 'завдання'
                }`}</h2>
            )}
        </div>
    );
}

export default App;
