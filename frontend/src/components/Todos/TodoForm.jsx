import { useState } from 'react';
import styles from './TodoForm.module.css';
import Button from '../UI/Button';
import { useAddTodoMutation } from '../../store/api/apiSlice';
import { v4 as uuidv4 } from 'uuid';

function TodoForm() {
    const [text, setText] = useState('');
    const [addTodo] = useAddTodoMutation();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!text.trim()) return;

        try {
            await addTodo({
                title: text,
                completed: false, // ⚠️ краще completed, не isCompleted
                id: uuidv4(),
            }).unwrap();

            setText('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <div className={styles.todoFormContainer}>
            <form onSubmit={onSubmitHandler}>
                <input
                    placeholder="Введіть нове завдання"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit" title="додати">
                    додати
                </Button>
            </form>
        </div>
    );
}

export default TodoForm;
