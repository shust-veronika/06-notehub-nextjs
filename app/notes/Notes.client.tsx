'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../lib/api/noteApi';
import NoteList from '../components/NoteList/NoteList';
// імпортуйте форму та пошук з попередньої ДЗ

export default function NotesClient() {
  const { data: notes } = useQuery({ queryKey: ['notes'], queryFn: fetchNotes });

  return (
    <div>
      {/* SearchBar, NoteForm */}
      <NoteList notes={notes || []} />
    </div>
  );
}