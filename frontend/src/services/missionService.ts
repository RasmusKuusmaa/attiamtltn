const API_URL = "http://localhost:8080/api/user/missions";

export async function getProjectMissions(token:string, project_id: number) {
    const response = await fetch(`${API_URL}/project/${project_id}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`,
        },
    });
    if (!response.ok){
        throw  new Error("failed to fetch missions");
    }
    return response.json();
}