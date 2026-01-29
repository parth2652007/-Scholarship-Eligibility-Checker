let scholarships = [];
let hasSearched = false;

fetch("scholarships.json")
  .then(res => res.json())
  .then(data => {
    scholarships = data;
    console.log("Scholarships loaded:", scholarships.length);
  })
  .catch(err => console.error("Data load error:", err));

function checkScholarship() {
  hasSearched = true;

  const category = document.getElementById("category").value;
  const gender = document.getElementById("gender").value;
  const income = Number(document.getElementById("income").value);
  const education = document.getElementById("education").value;
  const state = document.getElementById("state").value.trim().toLowerCase();

  const results = document.getElementById("results");
  let html = "";

  // 🔴 CASE 1: User clicked but fields are missing
  if (!category || !gender || !income || !education || !state) {
    results.innerHTML = `<p class="warn">⚠️ Please fill all fields</p>`;
    return;
  }

  // 🔵 CASE 2: All fields filled → check scholarships
  scholarships.forEach((s) => {
    if (
      (s.Category === category || s.Category === "All") &&
      (s.Gender === "All" || s.Gender === gender) &&
      s.Education === education &&
      income <= s.Income &&
      (s.State === "All" || s.State.toLowerCase() === state)
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

  // 🔴 CASE 3: All fields filled but no match
  results.innerHTML =
    html || `<p class="no-result">❌ No scholarships found</p>`;
}



