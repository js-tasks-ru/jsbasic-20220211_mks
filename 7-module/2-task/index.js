import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.template();
  }

  setTitle(modalTitle) {
    this.elem.querySelector('.modal__title').innerText = modalTitle;
  }

  setBody(modalBody) {
    const modalBodyText = modalBody;
    console.log(modalBodyText);
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(modalBodyText);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      document.body.classList.remove('is-modal-open');
      this.close();
    });

    const onKey = (event) => {
      if (event.code === 'Escape') {
        document.body.classList.remove('is-modal-open');
        this.close();
      }
    }

    document.body.addEventListener('keydown', onKey);

    document.body.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        document.body.removeEventListener('keydown', onKey);
      }
    });
  }

  template() {
    const modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    return modal;
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }
}
