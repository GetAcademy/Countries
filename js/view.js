"use strict";

function updateView() {
    let countriesHtml = '';
    for(let country of model.costStats){
        countriesHtml += `<li>${country.country} øl: ${country.beer}kr</li>`;
    }

    document.getElementById('app').innerHTML = /*HTML*/`

        <h1>Pause til 13:05</h1>
        ${countriesHtml}
    `;
}