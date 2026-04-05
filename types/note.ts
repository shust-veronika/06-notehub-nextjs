export type NoteTag = 'work' | 'personal' | 'study' | 'other';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;           
  createdAt: string;
  updatedAt: string;       
}


export type NewNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;