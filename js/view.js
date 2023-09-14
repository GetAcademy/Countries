"use strict";

// sortering 
// filtrering
// paginering

function updateView() {
    let countries = [...model.costStats];
    countries.sort((countryA, countryB) =>
        countryA.meal == countryB.meal ? 0 :
        countryA.meal > countryB.meal ? 1 : -1
    );

    document.getElementById('app').innerHTML = /*HTML*/`

        <h1>Pause til 13:38</h1>
        
        <table>
            <tr>
                <th>Land</th>
                <th>Pris øl</th>
                <th>Pris vin</th>
                <th>Pris kaffe</th>
                <th>Pris måltid</th>
                <th>Pris leilighet 1mnd</th>
            </tr>
            ${createCountryRowsHtml(countries)}
        </table>
    `;
}

// function compareCountries(countryA, countryB){
//     if(countryA.meal == countryB.meal)return 0;
//     if(countryA.meal > countryB.meal)return 1;
//     return -1;
// }

function createCountryRowsHtml(countries) {
    let countriesHtml = '';
    for (let country of countries) {
        countriesHtml += /*HTML*/ `
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
    return countriesHtml;
}
