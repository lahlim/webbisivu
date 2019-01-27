"use strict";
var tblBody;

window.onload = function () {
    //console.log(data);
    generate_table(data);
    let op = laskeOpMaara(); // op maara
    let ka = laskeKa(); // ka per kurssi
    let kaOp = laskeKaperOp(); // ka per opintopiste
    paivitaTilastot(op, ka, kaOp, data.length);
    grafiikkaa(op);

}
function grafiikkaa(op) {
    var ctx = document.getElementById('myChart').getContext('2d');
    let maisteri = op / 300 * 100;
    let kandi = op / 180 * 100;
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [
                "Maisteri", "Kandi", "Tietotekniikan perusopinnot", "Tietjärjestelmätieteen perusopinnot",
                "Liiketoimintaosaamisen perusopinnot",],
            datasets: [{
                label: "Opintokokonaisuuksien vaiheet prosentteina",
                backgroundColor: 'rgb(255, 255, 255,0.8)',
                borderColor: 'rgb(255, 255, 255)',
                data: [maisteri, kandi, 100, 16/25*100, 20/25*100,0],
            }]
        },

        // Configuration options go here
        options: {}
    });
    Chart.defaults.global.defaultFontColor = 'white';
}


function paivitaTilastot(op, ka, kaOp, kurssimaara) {
    let tilasto = document.getElementById("tilasto");
    let p = document.createElement("p");
    let br = document.createElement("br");
    let br2 = document.createElement("br");

    // Opinto piste maara
    let maara = document.createTextNode("Opintopisteitä: "+op);
    p.appendChild(maara);
    p.appendChild(br);
    tilasto.appendChild(p);

    // kurssi maara
    let kmaara = document.createTextNode("Kursseja suoritettu: " + kurssimaara);
    p.appendChild(kmaara);
    p.appendChild(br2);
    tilasto.appendChild(p);


    let keskiarvo = document.createTextNode("Keskiarvo: " + kaOp);
    p.appendChild(keskiarvo);
    tilasto.appendChild(p);
}

/**
 * Lasketaan keskiarvo per opintopiste
 */
function laskeKaperOp() {
    let opka = 0;
    let eiH = 0;
    for (let i in data) {
        if (!isNaN(data[i].arvosana)) {
            opka = opka + data[i].laajuus * data[i].arvosana;
            eiH = eiH + data[i].laajuus;
        }
    }
    return Math.round(opka / eiH * 100) / 100;
}

/**
 * Lasketaan opintopisteiden maara
 */
function laskeOpMaara() {
    let maara = 0;
    for (let i in data) {
          maara = maara + data[i].laajuus;
    }
    return maara;
}

/**
 * Lasketaan keskiarvo kurssien arvosanoilla
 */
function laskeKa() {
    let laskuri = 0;
    let eiH = 0; // numeroilla arvostellut
    for (let i in data) {
        if (!isNaN(data[i].arvosana)) {
            laskuri = laskuri + data[i].arvosana;
            eiH++;
        } 
    }
    return Math.round(laskuri / eiH * 100) / 100;
}

/**
 * Tehdään table johon tulee joukkueiden sarjat nimet jäsenet pisteet aika matka.
 * Nimet on linkkejä ja ylä rivin mukaan voi sortata tablen.
 * @param {any} kurssit Taulukkoon tulevat joukkueet
 */
function generate_table(kurssit) {

    let body = document.getElementById("taulukko");
    let tbl = document.createElement("table");


    tblBody = document.createElement("tbody");

    // Luodaan otsikko taulukkoon
    let row = document.createElement("tr");
    row.setAttribute("id", "otsikkoRivi");
    let solu = document.createElement("th");
    let solu2 = document.createElement("th");
    let solu3 = document.createElement("th");
    let solu4 = document.createElement("th");
    let solu5 = document.createElement("th");

    let koodi = document.createTextNode("Koodi");
    let nimi = document.createTextNode("Nimi");
    let laajuus = document.createTextNode("Laajuus");
    let arvosana = document.createTextNode("Arvosana");
    let pvm = document.createTextNode("Suoritettu");

    solu.appendChild(koodi);
    solu2.append(nimi);
    solu3.append(laajuus)
    solu4.append(arvosana);
    solu5.append(pvm);
    row.appendChild(solu);
    row.appendChild(solu2);
    row.appendChild(solu3);
    row.appendChild(solu4);
    row.appendChild(solu5);
    tblBody.appendChild(row);

    for (let i in kurssit) {
        // rivi tableen
        let row = document.createElement("tr");

        let br = document.createElement("br");
        let cell = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let cell5 = document.createElement("td");

        // Haetaan kurssien tiedot text nodeihin
        let koodi = document.createTextNode(kurssit[i].koodi);
        let nimi = document.createTextNode(kurssit[i].nimi);
        let laajuus = document.createTextNode(kurssit[i].laajuus);
        let arvosana = document.createTextNode(kurssit[i].arvosana);
        let pvm = document.createTextNode(kurssit[i].pvm);

        cell.appendChild(koodi);
        cell2.appendChild(nimi);
        cell2.appendChild(br);

        cell3.appendChild(laajuus);
        cell4.appendChild(arvosana);
        cell5.appendChild(pvm);
        row.appendChild(cell);//koodi
        row.appendChild(cell2);//nimi
        row.appendChild(cell3);//laajuus
        row.appendChild(cell4);//arvosana
        row.appendChild(cell5);//pvm
        tblBody.appendChild(row);// solut riviin
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    // reunat

    // Saadaan kilakattava teksti parametriksi otsikko riviltä
    row.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            text = target.textContent || target.innerText;
        jarjesta(text);
    }, false);
}

/**
 * Järjestetään taulukko ylärivin klikkauksen mukaan
 * @param {any} sarake teksti mitä riviltä on klikattu(solu)
 */
function jarjesta(sarake) {
    let kurssit = data;
    let table = document.getElementsByTagName("table");
    let taul = table[0];
    if (sarake == "Koodi") {
        kurssit.sort(compare);
    }
    if (sarake == "Nimi") {
        kurssit.sort(compare2);
    }
    if (sarake == "Laajuus") {
        kurssit.sort(compare3);
    }
    if (sarake == "Arvosana") {
        kurssit.sort(compare4);
    }
    if (sarake == "Suoritettu") {
        kurssit.sort(compare5);
    }
    
    taul.remove();
    generate_table(kurssit);
}

function compare(a, b) {
    if (a.koodi > b.koodi)
        return 1;
    if (a.koodi < b.koodi)
        return -1;
    return 0;
}

function compare2(a, b) {
    if (a.nimi > b.nimi)
        return 1;
    if (a.nimi < b.nimi)
        return -1;
    return 0;
}

function compare3(a, b) {
    if (a.laajuus < b.laajuus)
        return 1;
    if (a.laajuus > b.laajuus)
        return -1;
    return 0;
}

function compare4(a, b) {
    if (a.arvosana < b.arvosana)
        return 1;
    if (a.arvosana > b.arvosana)
        return -1;
    if (isNaN(a.arvosana))
        return 1;
    return 0;
}

function compare5(a, b) {
    // pvm Date oliolle kelpaavaan muotoon
    let eka = parsiPvm(a.pvm);
    let toka = parsiPvm(b.pvm);
    try {
        var ekaDate = new Date(eka[2] + ","+ eka[1] + ","+eka[0]);
        var tokaDate = new Date(toka[2] + "," + toka[1] + "," + toka[0]);
    }
    catch (e) {console.log("Päivämäärän käsittelyssä virhe:" + e)
    }
    if (ekaDate > tokaDate)
        return 1;
    if (ekaDate < tokaDate)
        return -1;
    return 0;
}

/**
 * Parsitaan päivämäärä taulukoksi jossa: pv kk ja vuosi
 * @param {any} pvm
 */
function parsiPvm(pvm) {
    let s = pvm.split(".");
    return pvm.split(".");
}

