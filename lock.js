const correctPasscode = "14012008";

const lockScreen = document.getElementById("lock-screen");
const input = document.getElementById("passcode-input");
const button = document.getElementById("unlock-btn");
const error = document.getElementById("lock-error");

// prevent scrolling while locked
document.body.style.overflow = "hidden";

function tryUnlock() {
    if (input.value === correctPasscode) {
        lockScreen.classList.add("unlock");
        document.body.style.overflow = "auto";

        setTimeout(() => {
            lockScreen.remove();
        }, 800);
    } else {
        error.classList.add("show");
        input.value = "";
        setTimeout(() => error.classList.remove("show"), 600);
    }
}

button.addEventListener("click", tryUnlock);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        tryUnlock();
    }
});
