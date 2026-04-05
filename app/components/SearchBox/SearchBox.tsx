'use client';
import css from './SearchBox.module.css';

interface Props {
  value: string;
  onSearch: (val: string) => void;
}

export default function SearchBar({ value, onSearch }: Props) {
  return (
    <div className={css.container}>
      <input
        type="text"
        className={css.input}
        placeholder="Search notes by title..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}