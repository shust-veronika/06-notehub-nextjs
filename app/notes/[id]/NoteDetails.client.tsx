'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface Props {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false, 
  });

  if (isLoading) return <p className={css.container}>Loading, please wait...</p>;
  if (error || !note) return <p className={css.container}>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <button onClick={() => router.back()} className={css.backBtn}>
          ← Back to list
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <span className={css.tag}>{note.tag}</span>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}