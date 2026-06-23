const sources = [
	"tsxpl1.webp",
	"tsxpl2.webp",
	"tsxpl3.webp",
	"tsxpl4.webp",
	"tsxpl5.webp",
	"tsxpl6.webp",
	"tsxpl1.webp"
];

const viewer = document.getElementById("coverimage");
const bottomImage = document.getElementById("bottomImage");
const topImage = document.getElementById("topImage");
const door = document.getElementById("door-svg");
const doorlink = document.getElementById("door");

const points = [
  { x: 0, y: 10 },   // top-left
  { x: 24, y: 10 },  // top-right
  { x: 24, y: 42 }, // bottom-right
  { x: 0, y: 42 }   // bottom-left
];

function update(progress) {
	const segments = sources.length - 1;

	// Convert 0→1 into segment space
	const scaled = progress * segments;

	// Current pair
	const index = Math.min(
		Math.floor(scaled),
		segments - 1
	);

	// Blend amount inside current pair
	const mix = scaled - index;

	bottomImage.src = sources[index];
	topImage.src = sources[index + 1];

	viewer.style.setProperty("--mix", mix);
}

viewer.addEventListener("mousemove", (e) => {
	const rect = viewer.getBoundingClientRect();

	let progress =
		(e.clientX - rect.left) / rect.width;

	progress = Math.max(0, Math.min(1, progress));

	update(progress);
});

viewer.addEventListener("touchmove", (e) => {
	const rect = viewer.getBoundingClientRect();

	let progress =
		(e.clientX - rect.left) / rect.width;

	progress = Math.max(0, Math.min(1, progress));

	update(progress);
});

polygon = document.querySelector("#door-polygon");

function updatePolygon() {
  polygon.setAttribute(
    "points",
    points.map(p => `${p.x},${p.y}`).join(" ")
  );
}

function onComplete() {
	doorlink.href = "homepage.html";
	console.log("Door animation complete. Link updated.");
}

function animateDoor(onComplete) {
  const duration = 1000;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);

    // Linear movement right
    const xOffset = 48 * t;

    // Up then down (parabola)
    const yOffset = -10 * Math.sin(Math.PI * t);

    points[0].x = 0 + xOffset;
    points[3].x = 0 + xOffset;

    points[0].y = 10 + yOffset;
    points[3].y = 42 + yOffset;

    updatePolygon();

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
		onComplete?.();
	}
  }

  requestAnimationFrame(frame);
}

door.addEventListener("click", (e) => {
	polygon.style.fill = "rgb(155, 122, 61)";
	animateDoor(onComplete)

});

update(0);