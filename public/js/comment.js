document.querySelector("#comment-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const comment_text = event.target.text.value.trim();
  const post_id = event.target.getAttribute("data-id");

  if (comment_text && post_id) {
      try {
          const response = await fetch("/api/comments", {
              method: "POST",
              body: JSON.stringify({ comment_text, post_id }),
              headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
              document.location.reload();
          } else {
              alert("Failed to submit comment.");
          }
      } catch (err) {
          console.error("Error submitting comment:", err);
          alert("Failed to submit comment. Please try again.");
      }
  }
});