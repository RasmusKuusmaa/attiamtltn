const API_URL = "http://localhost:8080/api/user/projects";


export async function getUserProjects(token:string) {
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok){
        throw new Error("Failed to fetch user projects");
    }
    return response.json();
}
