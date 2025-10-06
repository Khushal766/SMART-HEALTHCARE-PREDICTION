document.getElementById("predictBtn").addEventListener("click", async () => {
  const modelType = document.getElementById("model").value;
  const input = document.getElementById("features").value.trim();

  if (!input) {
    alert("Please enter input features separated by commas.");
    return;
  }

  const inputData = input.split(",").map(Number);

  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelType, inputData })
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.result;
});
