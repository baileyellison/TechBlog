document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username= e.target.username.value.trim();
    const password = e.target.password.value.trim();
    if (! username || ! password) {return}
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"},
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            console.log("error");
        }
    } catch (err) {
        console.log(err);
    }
});