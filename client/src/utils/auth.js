export async function loginUser(login, password) {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при авторизации:", error);
        return { success: false, error: "Ошибка сети" };
    }
}
