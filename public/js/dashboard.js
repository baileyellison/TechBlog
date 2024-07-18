// Function to handle editing a post
const editPostFormHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute("data-id");
    const title = document.querySelector("#edit-post-title").value.trim();
    const content = document.querySelector("#edit-post-content").value.trim();

    if (post_id && title && content) {
        try {
            const response = await fetch(`/api/posts/${post_id}`, {
                method: "PUT",
                body: JSON.stringify({ title, content }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Failed to edit post.");
            }
        } catch (err) {
            console.error("Error editing post:", err);
            alert("Failed to edit post. Please try again.");
        }
    }
};

// Function to handle deleting a post
const deletePostHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Failed to delete post.");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete post. Please try again.");
        }
    }
};


// Show/hide new post form
document.querySelector("#new-post-btn")?.addEventListener("click", () => {
  document.querySelector("#new-post-form").classList.toggle("hidden");
});

// Event listeners
document.querySelector("#new-post-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
      try {
          const response = await fetch("/api/posts", {
              method: "POST",
              body: JSON.stringify({ title, content }),
              headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
              document.location.replace("/dashboard");
          } else {
              alert("Failed to create post.");
          }
      } catch (err) {
          console.error("Error creating post:", err);
          alert("Failed to create post. Please try again.");
      }
  }
});
document.querySelectorAll(".edit-post-btn").forEach((btn) =>
    btn.addEventListener("click", editPostFormHandler)
);
document.querySelectorAll(".delete-post-btn").forEach((btn) =>
    btn.addEventListener("click", deletePostHandler)
);