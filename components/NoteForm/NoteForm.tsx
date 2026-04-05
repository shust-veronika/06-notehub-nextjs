'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NewNote } from '@/types/note';

interface NoteFormProps {
  onCancel?: () => void; 
}

const noteSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Work' }}
      validationSchema={noteSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
        onCancel?.(); 
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
              placeholder="Content"
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
            <button type="submit" disabled={isSubmitting || mutation.isLoading} className={css.button}>
              {mutation.isLoading ? 'Creating...' : 'Create note'}
            </button>
            {onCancel && (
              <button type="button" onClick={onCancel} className={css.cancelButton}>
                Cancel
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}