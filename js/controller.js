"use strict";

function setSort(sortField, sortDirection) {
    model.sort.field = sortField;
    model.sort.direction = sortDirection;
    updateView();
}

function init() {
    for (let country of model.costStats) {
        let continent = findContinent(country);
        if (!continent) continue;
        country.continent = continent;
        const continents = model.filter.continents;
        if (!continents.includes(continent)) {
            continents.push(continent);
        }
    }
    updateView();
}

function findContinent(country) {
    for (let country2 of model.countries) {
        if (country.country == country2.name) {
            return country2.continent;
        }
    }
    return null;
}
