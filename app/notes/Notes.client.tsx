'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '@/app/components/lib/api';
import Link from 'next/link';
import css from './Notes.module.css'; 

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const { data: notes } = useQuery({
    queryKey: ['notes', search],
    queryFn: () => fetchNotes(search),
  });

  return (
    <main className={css.container}>
      {/* Тут ваша логіка пошуку та форми додавання з ДЗ-5 */}
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search notes..."
      />
      
      <ul className={css.list}>
        {notes?.map((note) => (
          <li key={note.id} className={css.card}>
            <h3>{note.title}</h3>
            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
              <button>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}