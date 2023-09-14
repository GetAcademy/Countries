"use strict";

function updateView() {
    let countriesHtml = '';
    for(let country of model.costStats) {
        countriesHtml += /*HTML*/`
            <tr>
                <td>${country.country}</td>
                <td>${country.beer}</td>
                <td>${country.wine}</td>
                <td>${country.coffee}</td>
                <td>${country.meal}</td>
                <td>${country.apartment}</td>
            </tr>
        `;
    }

    document.getElementById('app').innerHTML = /*HTML*/`
        <table>
            <tr>
                <th>Land</th>
                <th>Pris øl</th>
                <th>Pris vin</th>
                <th>Pris kaffe</th>
                <th>Pris måltid</th>
                <th>Pris leilighet 1mnd</th>
            </tr>
            ${countriesHtml}
        </table>
    `;
}