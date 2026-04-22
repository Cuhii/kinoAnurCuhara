let trenutnaProjekcija = 0;

function validirajPodatke() {
    if (!podaci.projekcije || podaci.projekcije.length === 0) {
        return false;
    }

    const dozvoljeniStatusi = ["slobodno", "zauzeto", "rezervisano"];

    for (let projekcija of podaci.projekcije) {
        for (let sjediste of projekcija.sjedista) {
            if (!dozvoljeniStatusi.includes(sjediste.status)) {
                return false;
            }
        }
    }

    return true;
}

function prikaziPorukuGreske() {
    const salaWrapper = document.querySelector(".sjedista-wrapper");
    salaWrapper.innerHTML = "<p class='greska'>Podaci nisu validni!</p>";
}

function prikaziSalu() {
    const salaWrapper = document.querySelector(".sjedista-wrapper");

    if (!validirajPodatke()) {
        prikaziPorukuGreske();
        return;
    }

    salaWrapper.innerHTML = "";

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

        salaWrapper.appendChild(redDiv);
    }
}

prikaziSalu();

document.getElementById("prethodnaBtn").addEventListener("click", function () {
    if (trenutnaProjekcija > 0) {
        trenutnaProjekcija--;
        prikaziSalu();
    }
});

document.getElementById("sljedecaBtn").addEventListener("click", function () {
    if (trenutnaProjekcija < podaci.projekcije.length - 1) {
        trenutnaProjekcija++;
        prikaziSalu();
    }
});