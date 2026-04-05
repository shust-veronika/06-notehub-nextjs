import axios from 'axios';
import { Note, NewNote } from '../../types/note';

const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', 
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await axiosInstance.get('/notes');
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await axiosInstance.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/notes/${id}`);
};