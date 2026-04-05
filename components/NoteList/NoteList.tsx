'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.header}>
            <h3>{note.title}</h3>
            <span className={css.tag}>{note.tag}</span>
          </div>
          
          {}
          <p className={css.content}>{note.content}</p>
          
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.detailsLink}>
              View details
            </Link>
            <button
              onClick={() => mutation.mutate(note.id)}
              className={css.deleteBtn}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}