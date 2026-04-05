import css from './page.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>

      <section className={css.descriptionSection}>
        <p className={css.description}>
          NoteHub is a simple and efficient application for managing your notes.
        </p>
        <p className={css.description}>
          The app provides a clean interface and useful features to keep your notes organized.
        </p>
      </section>
    </main>
  );
}