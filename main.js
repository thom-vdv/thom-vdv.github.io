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

update(0);