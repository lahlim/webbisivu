'use strict';
var tblBody;

window.onload = function() {
  //console.log(data);
  generate_table(data);
  let op = laskeOpMaara(); // op maara
  let ka = laskeKa(); // ka per kurssi
  let kaOp = laskeKaperOp(); // ka per opintopiste
  paivitaTilastot(op, ka, kaOp, data.length);
  grafiikkaa(op);
};
function grafiikkaa(op) {
  var ctx = document.getElementById('myChart').getContext('2d');
  let maisteri = Math.round((op / 300) * 100);
  let kandi = Math.round((op / 180) * 100);
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: [
        'Maisteri',
        'Kandi',
        'Tietotekniikan perusopinnot',
        'Tietojärjestelmätieteen perusopinnot',
        'Liiketoimintaosaamisen perusopinnot'
      ],
      datasets: [
        {
          label: 'Opintokokonaisuuksien valmistuminen prosentteina',
          backgroundColor: 'rgb(255, 255, 255,0.8)',
          borderColor: 'rgb(255, 255, 255)',
          data: [maisteri, kandi, 100, 100, (20 / 25) * 100, 0]
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
  Chart.defaults.global.defaultFontColor = 'white';
}

function paivitaTilastot(op, ka, kaOp, kurssimaara) {
  let tilasto = document.getElementById('tilasto');

  tilasto.innerHTML = `<div class="tilasto"> <ul class="list-group mb-5">
  <li class="list-group-item ">Opintopisteitä:  ${op}  / 300</li>
  <li class="list-group-item list-group-item-dark ">Kursseja suoritettu: ${kurssimaara}</li>
  <li class="list-group-item ">Keskiarvo: ${kaOp}</li>
</ul></div>`;
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
  return Math.round((opka / eiH) * 100) / 100;
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
  return Math.round((laskuri / eiH) * 100) / 100;
}

/**
 * @param {any} kurssit Taulukkoon tulevat joukkueet
 */
function generate_table(kurssit) {
  let body = document.getElementById('taulukko');
  //let tbl = document.createElement("table");

  tblBody = document.createElement('tbody');

  // Luodaan otsikko taulukkoon
  let row = document.createElement('tr');
  row.setAttribute('id', 'otsikkoRivi');
  let solu = document.createElement('th');
  let solu2 = document.createElement('th');
  let solu3 = document.createElement('th');
  let solu4 = document.createElement('th');
  let solu5 = document.createElement('th');

  let koodi = document.createTextNode('Koodi');
  let nimi = document.createTextNode('Nimi');
  let laajuus = document.createTextNode('Laajuus');
  let arvosana = document.createTextNode('Arvosana');
  let pvm = document.createTextNode('Suoritettu');

  solu.appendChild(koodi);
  solu2.append(nimi);
  solu3.append(laajuus);
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
    let row = document.createElement('tr');

    let br = document.createElement('br');
    let cell = document.createElement('td');
    let cell2 = document.createElement('td');
    let cell3 = document.createElement('td');
    let cell4 = document.createElement('td');
    let cell5 = document.createElement('td');

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
    row.appendChild(cell); //koodi
    row.appendChild(cell2); //nimi
    row.appendChild(cell3); //laajuus
    row.appendChild(cell4); //arvosana
    row.appendChild(cell5); //pvm
    tblBody.appendChild(row); // solut riviin
  }
  body.appendChild(tblBody);
}

/**
 * Parsitaan päivämäärä taulukoksi jossa: pv kk ja vuosi
 * @param {any} pvm
 */
function parsiPvm(pvm) {
  let s = pvm.split('.');
  return pvm.split('.');
}
