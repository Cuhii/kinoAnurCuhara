let trenutnaProjekcija = 0;

function prikaziSalu() {

    const salaDiv = document.querySelector(".sala-grid");

    salaDiv.innerHTML = "";

    const projekcija = podaci.projekcije[trenutnaProjekcija];

    document.getElementById("film-naziv").textContent = projekcija.film;
    document.getElementById("film-vrijeme").textContent = projekcija.vrijeme;
    document.getElementById("film-sala").textContent = projekcija.sala;

    const sjedista = projekcija.sjedista;

    const redovi = {};

    sjedista.forEach(s => {
        if (!redovi[s.red]) {
            redovi[s.red] = [];
        }
        redovi[s.red].push(s);
    });

    for (let red in redovi) {
        const redDiv = document.createElement("div");
        redDiv.classList.add("red");

        const oznaka = document.createElement("span");
        oznaka.classList.add("oznaka-reda");
        oznaka.textContent = red;

        redDiv.appendChild(oznaka);
    redovi[red].forEach(sjediste => {
        const sjedisteDiv = document.createElement("div");
        sjedisteDiv.classList.add("sjediste", sjediste.status);

        sjedisteDiv.addEventListener("click", function () {
            if (sjediste.status === "slobodno") {
                sjediste.status = "rezervisano";
                prikaziSalu();
            }
    });

    redDiv.appendChild(sjedisteDiv);
});

        salaDiv.appendChild(redDiv);
    }
}

prikaziSalu();