import { useState, useEffect } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import Insights from './components/Insights';
import './styles.css';

export default function App() {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('habits');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      doneToday: false,
      lastDoneDate: null,
      streak: 0,
    };
    setHabits([newHabit, ...habits]);
  };

  const toggleHabit = (id) => {
    const today = new Date().toISOString().split('T')[0];

    const updated = habits.map((habit) => {
      if (habit.id !== id) return habit;
      const wasDoneToday = habit.doneToday;
      const lastDone = habit.lastDoneDate;
      let newStreak = habit.streak;

      if (wasDoneToday) {
        return { ...habit, doneToday: false };
      } else {
        if (!lastDone) newStreak = 1;
        else {
          const yest = new Date();
          yest.setDate(yest.getDate() - 1);
          const yestStr = yest.toISOString().split('T')[0];
          newStreak = lastDone === yestStr ? newStreak + 1 : 1;
        }

        return {
          ...habit,
          doneToday: true,
          lastDoneDate: today,
          streak: newStreak,
        };
      }
    });

    setHabits(updated);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="app-container">
      <div className="title-bar">
        <span>🧠 Habit Tracker</span>
        <span>⋯</span>
      </div>
      <HabitForm onAdd={addHabit} />
      <HabitList habits={habits} onToggle={toggleHabit} onDelete={deleteHabit} />
      <button className="clear-btn" onClick={() => {
        if (confirm('Clear all habits?')) {
          setHabits([]);
          localStorage.removeItem('habits');
        }
      }}>🧹 Clear All</button>
      <Insights habits={habits} />
    </div>
  );
}