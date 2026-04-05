'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NewNote } from '@/types/note';

interface NoteFormProps {
  onSuccess?: () => void; 
}

const noteSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  
  content: Yup.string().max(500, 'Maximum 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess?.();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Work' }}
      validationSchema={noteSchema}
      onSubmit={(values) => {
      
        mutation.mutate(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div>
            <Field name="title" placeholder="Title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div>
            <Field
              as="textarea"
              name="content"
              placeholder="Content (optional)"
              className={css.textarea}
            />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>

          <div>
            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.buttons}>
            <button 
              type="submit" 
              disabled={isSubmitting || mutation.isPending} 
              className={css.button}
            >
              {mutation.isPending ? 'Creating...' : 'Create note'}
            </button>
            {}
            <button type="button" onClick={onSuccess} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}