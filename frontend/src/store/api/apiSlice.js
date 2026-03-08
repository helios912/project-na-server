import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query slice для всіх даних
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        // ---------------- Todos ----------------
        getTodos: builder.query({
            query: () => 'todos',
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation({
            query: (todo) => ({ url: 'todos', method: 'POST', body: todo }),
            invalidatesTags: ['Todos'],
        }),
        // UPDATE todo
        updateTodo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `todos/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({ url: `todos/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Todos'],
        }),
    }),
});

// Автогенеровані хуки
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} = apiSlice;
