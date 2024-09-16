export async function deleteData(url: string, id: string) {
  console.log(url, id, "This is url and id ");
  return fetch(`/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add other headers if necessary (e.g., authorization headers)
    },
    body: JSON.stringify({ id }), // Convert the data to a JSON string
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // or response.text() for plain text responses
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error;
    });
}
