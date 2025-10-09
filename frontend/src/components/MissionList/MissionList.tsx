import { Mission } from "../../types";
import "./MissionList.css";

interface MissionListProps {
  missions: Mission[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  loading?: boolean;
  onAdd: () => void;
}

export const MissionList: React.FC<MissionListProps> = ({
  missions,
  selectedId,
  onSelect,
  loading = false,
  onAdd,
}) => {
  return (
    <aside className="mission-sidebar">
      <h2>Missions</h2>

      {loading ? (
        <div>Loading missions...</div>
      ) : (
        <ul className="mission-sidebar-list">
          <button onClick={onAdd} className="mission-new-button">
            +
          </button>

          {missions.length === 0 && (
            <li className="mission-empty">No missions yet</li>
          )}

          {missions.map((mission) => (
            <li
              key={mission.id}
              className={`mission-item ${
                mission.id === selectedId ? "selected" : ""
              }`}
              onClick={() => onSelect(mission.id)}
            >
              {mission.title || "Untitled"}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
