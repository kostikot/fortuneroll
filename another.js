const prizes = [
    {
      text: "Ваш текст",
      color: "Ваш цвет",
      reaction: "winner", // или любая другая реакция
    },
    // добавьте другие объекты призов здесь
  ];
  
  const wheel = document.querySelector(".deal-wheel");
  const spinner = wheel.querySelector(".spinner");
  const trigger = wheel.querySelector(".btn-spin");
  const ticker = wheel.querySelector(".ticker");
  
  let prizeSlice = prizes.length > 0 ? 360 / prizes.length : 0;
  console.log(prizes.length);
  console.log(prizeSlice);
  let prizeOffset = Math.floor(180 / prizes.length);
  console.log(prizeOffset);
  const spinClass = "is-spinning";
  const selectedClass = "selected";
  const spinnerStyles = window.getComputedStyle(spinner);
  
  let tickerAnim;
  let rotation = 0;
  let currentSlice = 0;
  let prizeNodes;
  
  const createPrizeNodes = () => {
    let prizeElements = spinner.querySelectorAll("li");
  
    prizes.forEach(({ text, color, reaction }, i) => {
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      prizeElements[i].style.setProperty("--rotate", `${rotation}deg`);
      const textElement = document.createElement("div");
      textElement.classList.add("text");
      textElement.textContent = text;
      prizeElements[i].textContent = "";
      prizeElements[i].appendChild(textElement);
    });
  };
  
  const createConicGradient = () => {
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()}
      );`
    );
  };
  
  const setupWheel = () => {
    if (prizes.length > 0) {
      createConicGradient();
      createPrizeNodes();
      prizeNodes = wheel.querySelectorAll(".prize");
    }
  };
  
  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const runTickerAnimation = () => {
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];
  
    let rad = Math.atan2(b, a);
  
    if (rad < 0) rad += 2 * Math.PI;
  
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    if (currentSlice !== slice) {
      ticker.style.animation = "none";
      setTimeout(() => (ticker.style.animation = null), 10);
      currentSlice = slice;
    }
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };
  
  const selectPrize = () => {
    const selected = Math.floor(rotation / prizeSlice);
    prizeNodes[selected].classList.add(selectedClass);
  };
  
  trigger.addEventListener("click", () => {
    trigger.disabled = true;
    rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    wheel.classList.add(spinClass);
    spinner.style.setProperty("--rotate", rotation);
    ticker.style.animation = "none";
    r
  unTickerAnimation();
  });
  
  spinner.addEventListener("transitionend", () => {
    cancelAnimationFrame(tickerAnim);
    rotation %= 360;
    selectPrize();
    wheel.classList.remove(spinClass);
    spinner.style.setProperty("--rotate", rotation);
    trigger.disabled = false;
  });
  
  setupWheel();