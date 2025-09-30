const API_URL = "http://localhost:8080/api/user/dailies";

export async function getUserDailies(token: string){
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok){
        throw new Error("Failed to fetch user Dailies");
    }
    return response.json();
}

export async function DeleteDaily(token: string, id: number){
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok){
        throw new Error("Failed to delete daily");
    }
}