'use strict';

import GrossaryList from './GrossaryList.js';

const form = document.querySelector('form');
const alert = document.querySelector('.alert');
const input = document.querySelector('input');
const grossaryListEl = document.querySelector('.grocery-list');
const grossaryContainerEl = document.querySelector('.grocery-container');
const clearBtnEl = document.querySelector('.clear-btn');

const grossaryList = new GrossaryList(
  form,
  alert,
  input,
  grossaryListEl,
  grossaryContainerEl,
  Storage
);

///////////////////
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = input.value.trim();
  const dataStatus = e.target.getAttribute('data-status');

  if (!value) grossaryList.alert('Please fill the value', 'alert-danger');

  if (value && !dataStatus) {
    grossaryList.addData(value);
    grossaryList.clearInput();
  }

  if (value && dataStatus) {
    grossaryList.editArr(value);
  }
});

clearBtnEl.addEventListener(
  'click',
  grossaryList.clearAllData.bind(grossaryList)
);
