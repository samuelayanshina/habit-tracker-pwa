export default function Insights({ habits }) {
    const hasDoneToday = habits.some(h => h.doneToday);
    const totalTracked = habits.length > 0;
  
    // Get last 7 dates
    const getLast7Days = () => {
      const days = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().split("T")[0];
        days.push({ 
          label: d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
          key
        });
      }
      return days;
    };
  
    const days = getLast7Days();
    const completedDays = days.filter(day => 
      habits.some(h => h.lastDoneDate === day.key)
    ).length;
  
    return (
      <div className="insights">
        <div className="insight-title">Insights</div>
        <div className="insight-cards">
  
          {/* Weekly Progress Box */}
          <div className="insight-box">
            <p>This week</p>
            <p><strong>{totalTracked ? `${completedDays} / 7 days` : '--'}</strong></p>
  
            {totalTracked ? (
              <div className="week-bar">
                {days.map((d) => {
                  const count = habits.filter(h => h.lastDoneDate === d.key).length;
                  return (
                    <div key={d.key} style={{ '--level': count }}></div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: '#ccc', marginTop: '12px' }}>
                No activity tracked yet
              </p>
            )}
          </div>
  
          {/* Emoji Feedback Box */}
          <div className="insight-box">
            <p>You feel...</p>
            <div style={{ fontSize: '2rem', marginTop: '8px' }}>
              {hasDoneToday ? '😊' : '🤔'}
            </div>
          </div>
  
        </div>
      </div>
    );
  }
  