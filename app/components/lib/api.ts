import axios from 'axios';
import { Note, CreateNoteDto } from '../types/note';

const API = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (search: string = ''): Promise<Note[]> => {
  const { data } = await API.get(`/notes${search ? `?search=${search}` : ''}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await API.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await API.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await API.delete(`/notes/${id}`);
};