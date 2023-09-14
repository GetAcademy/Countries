"use strict";

function setSort(sortField, sortDirection) {
    model.sort.field = sortField;
    model.sort.direction = sortDirection;
    updateView();
}