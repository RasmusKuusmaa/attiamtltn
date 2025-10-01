const API_URL = "http://localhost:8080/api/user/folders";

export async function getUserFolders(token: string){
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    if (!response.ok){
        throw new Error("Failed to fetch user folders");
    }
    return response.json();
}