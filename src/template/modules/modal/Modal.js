import MicroModal from 'micromodal';

class Modal {
  static config = {
    openTrigger: 'data-modal-open',
    closeTrigger: 'data-modal-close',
    openClass: 'modal_shown',
    disableScroll: true,
    disableFocus: false,
  };

  constructor(config = {}) {
    this.plugin = MicroModal;
    this.config = {
      ...Modal.config,
      ...config,
    };

    this.plugin.init(this.config);
  }

  showModal(modalId) {
    this.plugin.show(modalId, this.config);
  }

  hideModal(modalId) {
    this.plugin.close(modalId);
  }
}

export default Modal;
