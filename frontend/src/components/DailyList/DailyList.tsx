import { Daily } from "../../types/Daily";
import "./DailyList.css"

type Props = {
  dailies: Daily[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onAdd: () => void;
};

function DailyList({ dailies, onDelete, onToggle, onAdd }: Props) {
  return (
    <div>
      <button className="new-daily-button" onClick={onAdd}>
        Add a daily
      </button>

      <div className="daily-container">
        {dailies.map((daily) => (
          <div key={daily.daily_id} className="daily-item">
            <div className="daily-left">
              <input
                type="checkbox"
                checked={daily.completed}
                onChange={() => onToggle(daily.daily_id)}
              />
              <p>{daily.title}</p>
              <p>Streak: {daily.streak}</p>
            </div>
            <button
              className="daily-delete-button"
              onClick={() => onDelete(daily.daily_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyList;
