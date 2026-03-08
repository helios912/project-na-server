import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
import Button from '../UI/Button';
import styles from './TodosActions.module.css';
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from '../../store/api/apiSlice';

function TodosActions() {
    const { data: todos, isLoading, error } = useGetTodosQuery();
    const [delTodo] = useDeleteTodoMutation();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Помилка</p>;

    const clearAllTodos = async () => {
        if (!todos?.length) return;

        await Promise.all(todos.map((todo) => delTodo(todo.id)));
    };

    const clearCompleted = async () => {
        if (!todos?.length) return;

        const completedTodos = todos.filter((todo) => todo.completed === true);

        await Promise.all(
            completedTodos.map((todo) => delTodo(todo.id).unwrap()),
        );
    };

    return (
        <div className={styles.todosActionsContainer}>
            <Button title="Очистити список" onClick={clearAllTodos}>
                <RiRefreshLine />
            </Button>
            <Button title="Видалити виконані завдання" onClick={clearCompleted}>
                <RiDeleteBin2Line />
            </Button>
        </div>
    );
}

export default TodosActions;
