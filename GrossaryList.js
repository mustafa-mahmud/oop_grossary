import Storage from './Storage.js';

class GrossaryList {
  #index = null;

  constructor(form, alertEl, inputEl, grossaryListEl, grossaryContainerEl) {
    this.formEl = form;
    this.alertEl = alertEl;
    this.allData = Storage.getStorage() ? Storage.getStorage() : [];
    this.inputEl = inputEl;
    this.grossaryListEl = grossaryListEl;
    this.grossaryContainerEl = grossaryContainerEl;

    this.displayUI();
  }

  addData(value) {
    const id = this.createId();
    this.allData.push({ id, value });
    this.displayUI();
    this.alert('Data addedd successfully', 'alert-success');
    Storage.setStorage(this.allData);
  }

  alert(val, className) {
    this.alertEl.textContent = val;
    this.alertEl.classList.add(className);

    this.clearAlert();
  }

  clearAlert() {
    setTimeout(() => {
      this.alertEl.textContent = '';
      this.alertEl.className = 'alert';
    }, 1500);
  }

  clearInput() {
    this.inputEl.value = '';
  }

  createId() {
    return Date.now();
  }

  displayUI() {
    this.grossaryListEl.innerHTML = '';

    this.allData.forEach((data) => {
      this.grossaryListEl.innerHTML += `
					<article data-id="${data.id}" class="grocery-item">
						<p class="title">${data.value}</p>
						<div class="btn-container">
							<!-- edit btn -->
							<button type="button" class="edit-btn">
								<i class="fas fa-edit"></i>
							</button>
							<!-- delete btn -->
							<button type="button" class="delete-btn">
								<i class="fas fa-trash"></i>
							</button>
						</div>
					</article>
			`;
    });

    document
      .querySelectorAll('.edit-btn')
      .forEach((editEl) =>
        editEl.addEventListener('click', this.edit.bind(this))
      );
    document
      .querySelectorAll('.delete-btn')
      .forEach((editEl) =>
        editEl.addEventListener('click', this.delete.bind(this))
      );

    this.showContainer();
  }

  showContainer() {
    this.grossaryContainerEl.className = this.allData.length
      ? 'grocery-container show-container'
      : 'grocery-container';
  }

  edit(e) {
    const data = this.allData.find((data) => data.id === this.dataIndex(e).id);
    this.inputEl.value = data.value;

    this.formEl.setAttribute('data-status', 'edit');
    this.#index = this.dataIndex(e).index;
  }

  editArr(value) {
    this.allData = this.allData.map((data, ind) => {
      if (this.#index === ind) {
        return { id: data.id, value: value };
      } else return data;
    });

    this.formEl.removeAttribute('data-status');

    this.clearInput();
    this.displayUI();
    Storage.setStorage(this.allData);
    this.alert('Edit data are deleted successfully', 'alert-success');
  }

  delete(e) {
    this.allData.splice(this.dataIndex(e).index, 1);
    this.displayUI();
    this.alert('Data are deleted successfully', 'alert-success');
    Storage.setStorage(this.allData);
  }

  dataIndex(e) {
    const id = +e.target.closest('.grocery-item').getAttribute('data-id');
    const index = this.allData.findIndex((data) => data.id === id);

    return { id, index };
  }

  clearAllData() {
    this.allData = [];
    this.displayUI();
    this.alert('All data are deleted successfully', 'alert-success');
    Storage.removeStorage();
  }
}

export default GrossaryList;
