const images = [
  "images/animefest.jpeg",
  "images/ioimall.jpeg",
  "images/nijigen.jpeg",
  "images/cf.jpeg"
];

// duplicate & shuffle
const cardsData = [...images, ...images].sort(() => Math.random() - 0.5);

const game = document.getElementById("memory-game");
const letter = document.getElementById("love-letter");

let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

cardsData.forEach(img => {
  const card = document.createElement("div");
  card.className = "memory-card";

  card.innerHTML = `
    <div class="memory-inner">
      <div class="memory-front">💜</div>
      <div class="memory-back" style="background-image: url('${img}')"></div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flip");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    const firstImg = firstCard.querySelector(".memory-back").style.backgroundImage;
    const secondImg = card.querySelector(".memory-back").style.backgroundImage;

    if (firstImg === secondImg) {
      // match
      card.classList.add("matched");
      firstCard.classList.add("matched");
      matchedPairs++;

      firstCard = null;

      if (matchedPairs === images.length) {
    setTimeout(() => {
        game.classList.add("hide");
        letter.classList.add("show");

        const lines = letter.querySelectorAll(".line");

        lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add("show");
        }, index * 5000); // delay between lines
        });
    }, 600);
}

    } else {
      // not a match
      lockBoard = true;
      setTimeout(() => {
        card.classList.remove("flip");
        firstCard.classList.remove("flip");
        firstCard = null;
        lockBoard = false;
      }, 800);
    }
  });

  game.appendChild(card);
});
