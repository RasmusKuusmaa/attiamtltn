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

export async function addUserProject(token: string, title: string) {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title}),
    });
    if (!response.ok){
        throw new Error("Failed to add project");
    }
    const newProjet = await response.json();
    return newProjet;
}