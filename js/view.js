"use strict";

// sortering 
// filtrering
// paginering

function updateView() {
    let countries = [...model.costStats];
    sort(countries);
    document.getElementById('app').innerHTML = /*HTML*/`       
        <table>
            <tr>
                <th>Land ${getSortButtonsHtml('country')}</th>
                <th>Pris øl ${getSortButtonsHtml('beer')}</th>
                <th>Pris vin ${getSortButtonsHtml('wine')}</th>
                <th>Pris kaffe ${getSortButtonsHtml('coffee')}</th>
                <th>Pris måltid ${getSortButtonsHtml('meal')}</th>
                <th>Pris leilighet 1mnd ${getSortButtonsHtml('apartment')}</th>
            </tr>
            ${createCountryRowsHtml(countries)}
        </table>
    `;
}

function sort(countries) {
    const sortField = model.sort.field;
    if (sortField != null) {
        const direction = model.sort.direction;
        countries.sort((countryA, countryB) => countryA[sortField] == countryB[sortField] ? 0 :
            countryA[sortField] > countryB[sortField] ? direction : -direction
        );
    }    
}

function getSortButtonsHtml(sortField) {
    return /*HTML*/`
        <span onclick="setSort('${sortField}', 1)">▲</span>
        <span onclick="setSort('${sortField}', -1)">▼</span>
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
