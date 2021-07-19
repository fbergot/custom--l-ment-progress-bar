const prog = document.getElementById("p");

// écouter l'évent émis au click
prog.addEventListener("progress-click", (e) => console.log(e));

// récupérer la valeur d'un attribut
console.log(prog.getAttribute("progress-width"));
console.log(prog.getAttribute("progress-color"));
console.log(prog.getAttribute("progress-value"));

// ou aussi
console.log(prog.value);

let i = 1;

setInterval(() => {
    prog.value = i;
    i++;
}, 1000);
