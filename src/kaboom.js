import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

// initialize kaboom context
export const k = kaboom({
    width: 960,
    height: 640,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 0 ],
    global: true,
});
