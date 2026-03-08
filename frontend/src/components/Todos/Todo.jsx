import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import styles from './Todo.module.css';
import {
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from '../../store/api/apiSlice';

function Todo({ todo }) {
    const [delTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    return (
        <div
            className={`${styles.todo} ${
                todo.completed ? styles.completedTodo : ''
            }`}
        >
            <RiTodoFill className={styles.todoIcon} />
            <div className={styles.todoText}>{todo.title}</div>
            <RiDeleteBin2Line
                className={styles.deleteIcon}
                onClick={() => delTodo(todo.id)}
            />
            <FaCheck
                className={styles.checkIcon}
                onClick={() =>
                    updateTodo({
                        id: todo.id,
                        completed: !todo.completed,
                    })
                }
            />
        </div>
    );
}

export default Todo;
