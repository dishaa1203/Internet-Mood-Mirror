const canvas = document.getElementById("moodCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = 260;

let mood;
let t = 0;

const colors = {
  anger: "#ff4d4d",
  fear: "#4d79ff",
  joy: "#ffd24d",
  hope: "#4dff88",
  hype: "#b84dff"
};

fetch("http://localhost:3000/mood")
  .then(res => res.json())
  .then(data => {
    mood = data;
    document.getElementById("summary").innerText =
      `Today the internet feels: ${data.summary}`;
    renderBars(data);
    animate();
  });

function renderBars(data) {
  const bars = document.getElementById("bars");
  bars.innerHTML = "";

  Object.keys(colors).forEach(key => {
    const bar = document.createElement("div");
    bar.className = "bar";

    bar.innerHTML = `
      <span>${key}</span>
      <div class="bar-track">
        <div class="bar-fill" style="
          width:${data[key]}%;
          background:${colors[key]};
        "></div>
      </div>
    `;

    bars.appendChild(bar);
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let index = 0;
  for (let key in colors) {
    drawWave(index, mood[key], colors[key]);
    index++;
  }

  t += 0.015;
  requestAnimationFrame(animate);
}

function drawWave(i, intensity, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = intensity / 100;

  for (let x = 0; x < canvas.width; x++) {
    const y =
      canvas.height / 2 +
      Math.sin(x * 0.01 + t + i) * (intensity * 0.6);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}
