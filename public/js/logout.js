

// Event listeners
document.querySelector("#logout-btn")?.addEventListener("click", async () => {
  try {
      const response = await fetch("/api/users/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
          document.location.replace("/");
      } else {
          alert("Failed to log out.");
      }
  } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to log out. Please try again.");
  }
});
  