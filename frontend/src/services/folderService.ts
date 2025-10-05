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

export async function addNewFolder(token: string, title: string,  folderType: number) {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title, folderType})
    });
    if (!response.ok){
        throw new Error("Failed to add a folder");
    }
    else {
        return 
    }
}