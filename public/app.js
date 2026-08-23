const uploadForm = document.getElementById("uploadForm");
const documentInput = document.getElementById("documentInput");
const statusMessage = document.getElementById("statusMessage");
const results = document.getElementById("results");

const documentType = document.getElementById("documentType");
const providerResult = document.getElementById("providerResult");
const dateResult = document.getElementById("dateResult");
const serviceResult = document.getElementById("serviceResult");
const patientResult = document.getElementById("patientResult");
const summaryResult = document.getElementById("summaryResult");

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const file = documentInput.files[0];

  if (!file) {
    statusMessage.textContent = "Please choose a PDF first.";
    results.classList.add("hidden");
    return;
  }

  if (file.type !== "application/pdf") {
    statusMessage.textContent = "Please upload a PDF document.";
    results.classList.add("hidden");
    return;
  }

  statusMessage.textContent = "Connecting to Healthcare Navigator...";
  results.classList.add("hidden");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    statusMessage.textContent = "API connection successful.";

    results.classList.remove("hidden");

    documentType.textContent = "Backend Connected";
    providerResult.textContent = "Coming next";
    dateResult.textContent = "Coming next";
    serviceResult.textContent = "Coming next";
    patientResult.textContent = "Coming next";

    summaryResult.textContent =
      data.message || "Healthcare Navigator API is working.";
  } catch (error) {
    console.error(error);

    statusMessage.textContent =
      "Could not connect to the analysis service.";

    results.classList.add("hidden");
  }
});
