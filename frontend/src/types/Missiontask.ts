export type MissionTaskStatus = "created" | "todo" | "in-progress" | "done";

export interface MissionTask {
  id: number;
  missionId: string;
  title: string;
  description: string;
  status: MissionTaskStatus;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
}
