let scholarships = [];

// CONNECT JSON FILE
fetch("scholarships.json")
  .then(response => response.json())
  .then(data => {
    scholarships = data;
    console.log("JSON connected:", scholarships);
  })
  .catch(error => console.error("Error loading JSON:", error));

function checkScholarship() {
  const category = document.getElementById("category").value;
  const income = Number(document.getElementById("income").value);
  const education = document.getElementById("education").value;
  const state = document.getElementById("state").value.toLowerCase();

  let html = "";

  scholarships.forEach(s => {
    if (
      (category === "" || s.Category === category || s.Category === "All") &&
      (education === "" || s.Education === education) &&
      income <= s.Income &&
      (state === "" || s.State === "All" || s.State.toLowerCase() === state)
    ) {
      html += `
        <div class="scholarship-card">
          <h3>${s.Name}</h3>
          <p>Income Limit: ₹${s.Income}</p>
          <a href="${s.Link}" target="_blank">Apply</a>
        </div>
      `;
    }
  });

  document.getElementById("results").innerHTML =
    html || `<p class="no-result">No scholarships found</p>`;
}
