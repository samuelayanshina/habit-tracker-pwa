export default function HabitItem({ habit, onToggle, onDelete }) {
    return (
      <div className="habit-item">
        <div>
          <p className={`habit-name ${habit.doneToday ? 'strike' : ''}`}>{habit.name}</p>
          <div className="fire">🔥 {habit.streak}</div>
        </div>
        <div className="habit-actions">
          <button className="habit-button" onClick={() => onToggle(habit.id)}>
            {habit.doneToday ? 'Undo' : 'Done'}
          </button>
          <button className="delete-button" onClick={() => onDelete(habit.id)}>×</button>
        </div>
      </div>
    );
  }