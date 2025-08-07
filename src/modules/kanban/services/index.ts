import api from "@/api/api";

export const getBoard = async () => {
  const { data } = await api.get('/board');
  return data;
};