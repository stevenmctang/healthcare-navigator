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

  statusMessage.textContent = `Selected: ${file.name}`;
  results.classList.remove("hidden");

  documentType.textContent = "Document Ready";
  providerResult.textContent = "Not analyzed yet";
  dateResult.textContent = "Not analyzed yet";
  serviceResult.textContent = "Not analyzed yet";
  patientResult.textContent = "Not analyzed yet";

  summaryResult.textContent =
    "Your PDF was selected successfully. Backend document analysis will be connected in the next step.";
});
