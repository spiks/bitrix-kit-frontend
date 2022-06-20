import Modal from '@modules/modal/Modal';

const initModal = (config) => {
  window.SPIKS_MODAL_MANAGER = new Modal(config);
};

export default initModal;
