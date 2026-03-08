import Todo from './Todo';
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from '../../store/api/apiSlice';
import styles from './TodoList.module.css';

function TodoList() {
    const { data: todos, isLoading, error } = useGetTodosQuery();
    const [delTodo] = useDeleteTodoMutation();
    const [addTodo] = useAddTodoMutation();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Помилка</p>;
    return (
        <div className={styles.todoListContainer}>
            {!todos.length && <h2>Список завдань чистий</h2>}
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
            ))}
        </div>
    );
}

export default TodoList;
