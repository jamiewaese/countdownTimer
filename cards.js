let previousDays = 0;
let previousHours = 0;
let previousMinutes = 0;
let previousSeconds = 0;
let suit = ["heart", "club", "diamond", "spade"];

function countdown(targetDate) {
  let currentDate = new Date();
  let diff = targetDate.getTime() - currentDate.getTime();
  if (diff > 0) {
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    console.log(
      `Time left: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
    );

    if (days != previousDays) {
      updateCards("day", days);
    }
    if (hours != previousHours) {
      updateCards("hour", hours);
    }
    if (minutes != previousMinutes) {
      updateCards("minute", minutes);
    }
    if (seconds != previousSeconds) {
      updateCards("second", seconds);
    }

    previousDays = days;
    previousHours = hours;
    previousMinutes = minutes;
    previousSeconds = seconds;

    setTimeout(() => countdown(targetDate), 1000);
  } else {
    console.log("Time's up!");
  }
}

function updateCards(slot, number) {
  number = String(number);
  const card1 = document.getElementById(slot + "-1");
  const card2 = document.getElementById(slot + "-2");
  const card3 = document.getElementById(slot + "-3");

  // Card 3 (hundreds digit)
  // if number is less than 3 digits, hide card-3
  if (slot == "day" && number.length < 3) {
    card3.classList.add("hidden");
  } else if (
    slot == "day" &&
    convertedValue(number[0]) != convertedValue(card3.getAttribute("card"))
  ) {
    card3.classList.remove("hidden");
    card3.setAttribute("suit", suit[Math.floor(Math.random() * 4)]);
    card3.setAttribute("card", convertedValue(String(number)[0]));
    const a = Math.random() * 10 - 5;
    card3.style.transform = "rotate(" + a + "deg)";
  }

  // Card 2 (tens digit)
  // only change card-2 if we need to
  if (number.length == 1) {
    card2.setAttribute("card", "10");
    const a = Math.random() * 20 - 10;
    card2.style.transform = "rotate(" + a + "deg)";
  } else if (
    number.length == 2 &&
    convertedValue(number[0]) != convertedValue(card2.getAttribute("card"))
  ) {
    card2.setAttribute("suit", suit[Math.floor(Math.random() * 4)]);
    card2.setAttribute("card", convertedValue(number[0]));
    const a = Math.random() * 20 - 10;
    card2.style.transform = "rotate(" + a + "deg)";
  } else if (
    number.length == 3 &&
    convertedValue(number[1]) != convertedValue(card2.getAttribute("card"))
  ) {
    card2.setAttribute("suit", suit[Math.floor(Math.random() * 4)]);
    card2.setAttribute("card", convertedValue(number[1]));
    const a = Math.random() * 20 - 10;
    card2.style.transform = "rotate(" + a + "deg)";
    card2.setAttribute("rotation", a);
  }

  // Card 1 (unit digit)
  card1.setAttribute("suit", suit[Math.floor(Math.random() * 4)]);
  card1.setAttribute("card", convertedValue(number[number.length - 1]));
  const a = Math.random() * 20 - 10;
  card1.style.transform = "rotate(" + a + "deg)";
  // nudge card 2 when card 1 lands
  const b = Number(card2.getAttribute("rotation")) + Math.random() * 4 - 2;
  card2.style.transform = "rotate(" + a / 2 + "deg)";
}

function convertedValue(value) {
  if (value == "0") {
    return "10";
  }
  if (value == "1") {
    return "A";
  } else return value;
}

// set timer to 2023-11-01, 00:00
countdown(new Date(2023, 11, 1, 0, 0));
