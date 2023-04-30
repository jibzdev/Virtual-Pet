const selectedDuckColor = localStorage.getItem('duckColour');


// Functions used to choose the duck
export function createDuck(colour) {
    let duck;
  
    if (colour === "red") {
      duck = document.createElement("iframe");
      duck.setAttribute("src", "../assets/petStuff/duckSvg/red/defaultRed.svg");
    } else if (colour === "yellow") {
      duck = document.createElement("iframe");
      duck.setAttribute("src", "../assets/petStuff/duckSvg/yellow/defaultYellow.svg");
    } else if (colour === "blue") {
      duck = document.createElement("iframe");
      duck.setAttribute("src", "../assets/petStuff/duckSvg/blue/defaultBlue.svg");
    }
    duck.setAttribute("id", colour);
    duck.style.border = "none";
    return duck;
  }

export function jump(colour) {
    const duck = document.querySelector(`#${colour}`);

    if (colour === "red") {
        duck.setAttribute("src", "../assets/petStuff/duckSvg/red/jump.svg");
    } else if (colour === "yellow") {
        duck.setAttribute("src", "../assets/petStuff/duckSvg/yellow/jump.svg");
    } else if (colour === "blue") {
        duck.setAttribute("src", "../assets/petStuff/duckSvg/blue/jump.svg");
    }
    return duck;
}

export function reset(colour) {
    const duck = document.querySelector(`#${colour}`);
    if (colour === "red") {
        duck.setAttribute("src", "../assets/petStuff/duckSvg/red/defaultRed.svg");
    } else if (colour === "yellow") {
        duck.setAttribute("src", "../assets/petStuff/duckSvg/yellow/defaultYellow.svg");
    } else if (colour === "blue") {
        duck.setAttribute("src", "../assets/petStuff/duckSvg/blue/defaultBlue.svg");
    }
}


// Functions used when playing the game playing Game

export function sleeping(colour) {
    let duck = document.getElementById(colour);
  
    if (colour === "red") {
        duck = "../assets/petStuff/duckSvg/red/sleeping.svg";
    } else if (colour === "yellow") {
        duck = "../assets/petStuff/duckSvg/yellow/sleeping.svg";
    } else if (colour === "blue") {
      duck = "../assets/petStuff/duckSvg/blue/sleeping.svg";
    }
    return duck;
}

export function dirty(colour) {
  let duck = document.getElementById(colour);

  if (colour === "red") {
      duck = "../assets/petStuff/duckSvg/red/dirty.svg";
  } else if (colour === "yellow") {
      duck = "../assets/petStuff/duckSvg/yellow/dirty.svg";
  } else if (colour === "blue") {
    duck = "../assets/petStuff/duckSvg/blue/dirty.svg";
  }
  return duck;
}

export function dirtySleep(colour) {
  let duck = document.getElementById(colour);

  if (colour === "red") {
      duck = "../assets/petStuff/duckSvg/red/sleepingDirty.svg";
  } else if (colour === "yellow") {
      duck = "../assets/petStuff/duckSvg/yellow/sleepingDirty.svg";
  } else if (colour === "blue") {
    duck = "../assets/petStuff/duckSvg/blue/sleepingDirty.svg";
  }
  return duck;
}

export function shower(colour) {
  let duck = document.getElementById(colour);

  if (colour === "red") {
      duck = "../assets/petStuff/duckSvg/red/showering.svg";
  } else if (colour === "yellow") {
      duck = "../assets/petStuff/duckSvg/yellow/showering.svg";
  } else if (colour === "blue") {
    duck = "../assets/petStuff/duckSvg/blue/showering.svg";
  }
  return duck;
}

  export function reset2(colour) {
    let duck = document.getElementById(colour);
  
    if (colour === "red") {
        duck = "../assets/petStuff/duckSvg/red/defaultRed.svg";
    } else if (colour === "yellow") {
        duck = "../assets/petStuff/duckSvg/yellow/defaultYellow.svg";
    } else if (colour === "blue") {
      duck = "../assets/petStuff/duckSvg/blue/defaultBlue.svg";
    }
    return duck;
}

export function changeSvgToSleep(){
    let frame1 = document.querySelector("#duck2");
    let frame = document.createElement("iframe");
    frame.setAttribute("src",sleeping(selectedDuckColor));
    frame.setAttribute("id",selectedDuckColor);
    frame.setAttribute("style","border: none;")
    let firstChild = frame1.firstChild;
    if (firstChild) {
      frame1.removeChild(firstChild);
    }
    frame1.append(frame);
}

export function changeSvgToDefault(){
    let frame1 = document.querySelector("#duck2");
    let frame = document.createElement("iframe");
    frame.setAttribute("src",reset2(selectedDuckColor));
    frame.setAttribute("id",selectedDuckColor);
    frame.setAttribute("style","border: none;")
    let firstChild = frame1.firstChild;
    if (firstChild) {
      frame1.removeChild(firstChild);
    }
    frame1.append(frame);
}

export function changeSvgToDirty(){
  let frame1 = document.querySelector("#duck2");
  let frame = document.createElement("iframe");
  frame.setAttribute("src",dirty(selectedDuckColor));
  frame.setAttribute("id",selectedDuckColor);
  frame.setAttribute("style","border: none;")
  let firstChild = frame1.firstChild;
  if (firstChild) {
    frame1.removeChild(firstChild);
  }
  frame1.append(frame);
}

export function changeSvgToDirtySleep(){
  let frame1 = document.querySelector("#duck2");
  let frame = document.createElement("iframe");
  frame.setAttribute("src",dirtySleep(selectedDuckColor));
  frame.setAttribute("id",selectedDuckColor);
  frame.setAttribute("style","border: none;")
  let firstChild = frame1.firstChild;
  if (firstChild) {
    frame1.removeChild(firstChild);
  }
  frame1.append(frame);
}

export function changeSvgToShower(){
  let frame1 = document.querySelector("#duck2");
  let frame = document.createElement("iframe");
  frame.setAttribute("src",shower(selectedDuckColor));
  frame.setAttribute("id",selectedDuckColor);
  frame.setAttribute("style","border: none;")
  let firstChild = frame1.firstChild;
  if (firstChild) {
    frame1.removeChild(firstChild);
  }
  frame1.append(frame);
}