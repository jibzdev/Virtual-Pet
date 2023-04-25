export function createDuck(colour,fill){
    const duck = document.createElement("div");
    duck.setAttribute("id", colour);
    
    const duckSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    duckSvg.setAttribute("width", "200");
    duckSvg.setAttribute("height", "250");
    duckSvg.setAttribute("id", "theDuck");
    
    const duckCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    duckCircle1.setAttribute("cx", "100");
    duckCircle1.setAttribute("cy", "125");
    duckCircle1.setAttribute("r", "50");
    duckCircle1.setAttribute("fill", fill);
    
    const duckCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    duckCircle2.setAttribute("cx", "110");
    duckCircle2.setAttribute("cy", "80");
    duckCircle2.setAttribute("r", "40");
    duckCircle2.setAttribute("fill", fill);
    
    const duckEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    duckEye.setAttribute("id", "theDuckEye");
    duckEye.setAttribute("cx", "130");
    duckEye.setAttribute("cy", "70");
    duckEye.setAttribute("r", "10");
    duckEye.setAttribute("fill", "white");

    const duckEyeLid = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    duckEyeLid.setAttribute("id", "theDuckEyeLid");
    duckEyeLid.setAttribute("cx", "130");
    duckEyeLid.setAttribute("cy", "70");
    duckEyeLid.setAttribute("r", "13");
    // duckEyeLid.setAttribute("style", "fill: orange; order: -1;");
    duckEyeLid.setAttribute("fill", "black");
    
    const duckIris = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    duckIris.setAttribute("id", "theDuckIris");
    duckIris.setAttribute("cx", "130");
    duckIris.setAttribute("cy", "70");
    duckIris.setAttribute("r", "3");
    duckIris.setAttribute("fill", "black");
    duckIris.setAttribute("stroke", "black");
    duckIris.setAttribute("stroke-width", "3");
    
    const duckLine1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    duckLine1.setAttribute("x1", "100");
    duckLine1.setAttribute("y1", "175");
    duckLine1.setAttribute("x2", "100");
    duckLine1.setAttribute("y2", "200");
    duckLine1.setAttribute("stroke", "black");
    duckLine1.setAttribute("stroke-width", "4");
    
    const duckLine2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    duckLine2.setAttribute("x1", "100");
    duckLine2.setAttribute("y1", "200");
    duckLine2.setAttribute("x2", "125");
    duckLine2.setAttribute("y2", "200");
    duckLine2.setAttribute("stroke", "black");
    duckLine2.setAttribute("stroke-width", "4");

    const duckTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    duckTriangle.setAttribute("points", "15 5, 25 25, 5 25");
    duckTriangle.setAttribute("style", "fill: orange; order: -1;");
    duckTriangle.setAttribute("transform", "translate(170,55) rotate(90)");

    duckSvg.appendChild(duckCircle1);
    duckSvg.appendChild(duckCircle2);
    duckSvg.appendChild(duckEyeLid);
    duckSvg.appendChild(duckEye);
    duckSvg.appendChild(duckIris);
    duckSvg.appendChild(duckLine1);
    duckSvg.appendChild(duckLine2);
    duckSvg.appendChild(duckTriangle);
    
    duck.appendChild(duckSvg);

    return duck;
}