'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useState } from 'react';

export default function NotesClient() {
  const [filter, setFilter] = useState('');
  
  const { data: notes = [] } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <NoteForm />
      <SearchBox value={filter} onSearch={setFilter} />
      <NoteList notes={filteredNotes} />
    </div>
  );
}