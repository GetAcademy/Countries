"use strict";

function updateView() {
    let countries = sort(model.costStats);
    countries = filter(countries);
    countries = doPaging(countries);
    document.getElementById('app').innerHTML = /*HTML*/`       
        <table>
            <tr>
                <th>Land ${getSortButtonsHtml('country')}</th>
                <th>
                    Kontinent ${getSortButtonsHtml('continent')}
                    ${createContinentSelectHtml()}
                </th>
                <th>Pris øl ${getSortButtonsHtml('beer')}</th>
                <th>Pris vin ${getSortButtonsHtml('wine')}</th>
                <th>Pris kaffe ${getSortButtonsHtml('coffee')}</th>
                <th>Pris måltid ${getSortButtonsHtml('meal')}</th>
                <th>Pris leilighet 1mnd ${getSortButtonsHtml('apartment')}</th>
            </tr>
            ${createCountryRowsHtml(countries)}
        </table>
        ${createPagingHtml()}
    `;
}

function createPagingHtml() {
    let html = '';
    let pageCount = Math.ceil(model.costStats.length / model.paging.pageSize);
    for (let pageNo = 1; pageNo <= pageCount; pageNo++) {
        if (pageNo == model.paging.pageIndex + 1) {
            html += `${pageNo} `;
        } else {
            html += `<a href="javascript:goToPage(${pageNo})">${pageNo}</a> `;
        }
    }
    return html + /*HTML*/`
        Vis: 
        <select onchange="setPageSize(this.value)">
            <option ${model.paging.pageSize == 5 ? 'selected' : ''}>5</option>
            <option ${model.paging.pageSize == 10 ? 'selected' : ''}>10</option>
            <option ${model.paging.pageSize == 25 ? 'selected' : ''}>25</option>
            <option ${model.paging.pageSize == 50 ? 'selected' : ''}>50</option>
        </select>
    `;
}

function doPaging(originalCountries) {
    let countries = [];
    const rowCountToSkip = model.paging.pageIndex * model.paging.pageSize;
    const startIndex = rowCountToSkip;
    const endIndex = Math.min(startIndex + model.paging.pageSize,
        originalCountries.length - 1);
    for (let i = startIndex; i < endIndex; i++) {
        const country = originalCountries[i];
        countries.push(country);
    }
    return countries;
}

function filter(allCountries) {
    const selectedContinent = model.filter.continent;
    if (selectedContinent === null) return allCountries;
    let countries = [];
    for (let country of allCountries) {
        if (country.continent == selectedContinent) {
            countries.push(country);
        }
    }
    return countries;
}

function createContinentSelectHtml() {
    const continents = model.filter.continents;
    let optionsHtml = '';
    for (let continent of continents) {
        let selected = continent == model.filter.continent ? 'selected' : '';
        optionsHtml += /*HTML*/`
            <option ${selected}>${continent}</option>
        `;
    }
    return /*HTML*/`
        <select onchange="filterByContinent(this.value)">
            <option value="">Vis alle</option>
            <option value="undefined">Mangler kontinent</option>
            ${optionsHtml}
        </select>
    `;
}

function sort(countries) {
    countries = [...countries];
    const sortField = model.sort.field;
    if (sortField != null) {
        const direction = model.sort.direction;
        countries.sort((countryA, countryB) => countryA[sortField] == countryB[sortField] ? 0 :
            countryA[sortField] > countryB[sortField] ? direction : -direction
        );
    }
    return countries;
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
                <td>${country.continent}</td>
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
