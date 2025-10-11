const API_URL = "http://localhost:8080/api/user/mission-tasks";

export async function getMissionTasks(token: string, mission_id: number){
    const response = await fetch(`${API_URL}/mission/${mission_id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok){
        throw new Error("Failed to fetch mission tasks");
    };
    return response.json();
}

