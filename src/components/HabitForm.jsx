import { useState } from 'react';

export default function HabitForm({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        placeholder="Enter a new habit..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="habit-input"
      />
      <button type="submit" className="habit-button">Add</button>
    </form>
  );
}