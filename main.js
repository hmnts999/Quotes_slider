new Vue({
	el: "quote-slider",
	data: {
		quotes: [
			"That's one small step for a man, one giant leap for mankind - Neil Armstrong",
			"The Universe is under no obligation to make sense to you - Neil deGrasse Tyson",
			"I would like to die on Mars. Just not on impact - Elon Musk",
			"If we can conquer space, we can conquer childhood hunger - Buzz Aldrin",
			"The eternal silence of these infinite spaces frightens me - Blaise Pascal"
		],
		currentNumber: 0
	},

	methods: {
		next: function () {
			this.currentNumber += 1;
		},
		prev: function () {
			this.currentNumber -= 1;
		},

		download: function download() {
			function wrapText(context, text, x, y, maxWidth, lineHeight) {
				let words = text.split(" ");
				let line = "";
				for (let n = 0; n < words.length; n++) {
					let testLine = line + words[n] + " ";
					let metrics = context.measureText(testLine);
					let testWidth = metrics.width;
					if (testWidth > maxWidth && n > 0) {
						context.fillText(line, x, y);
						line = words[n] + " ";
						y += lineHeight;
					} else {
						line = testLine;
					}
				}
				context.fillText(line, x, y);
			}
			let canvas = document.getElementById("myCanvas");
			let context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			let maxWidth = 400;
			let lineHeight = 25;
			let x = (canvas.width - maxWidth) / 2;
			let y = 60;
			let text = this.currentQuote;
			context.font = "16pt Calibri";
			context.fillStyle = "red";
			wrapText(context, text, x, y, maxWidth, lineHeight);

			// Converting canvas to image
			var download = document.getElementById("download");
			image = document.getElementById("myCanvas").toDataURL("image/png");
			download.setAttribute("href", image);
		}
	},

	computed: {
		currentQuote: function () {
			return this.quotes[Math.abs(this.currentNumber) % this.quotes.length];
		}
	}
});