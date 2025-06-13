import HabitItem from './HabitItem';

export default function HabitList({ habits, onToggle, onDelete }) {
  return (
    <div>
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}