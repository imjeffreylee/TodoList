import { axiosInstance } from './axiosInstance';

export const getTodoList = async () => {
  const { data } = await axiosInstance.get('/todos');
  return data;
};

export const addTodo = async (payload) => {
  return await axiosInstance.post('/todo', payload);
};

export const updateTodo = async ({ id, ...body }) => {
  return await axiosInstance.patch(`/todos/${id}`, body);
};

export const removeTodo = async (id) => {
  return await axiosInstance.delete(`/todos/${id}`);
};
