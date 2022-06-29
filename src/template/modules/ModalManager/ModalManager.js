import MicroModal from 'micromodal';

class ModalManager {
  static config = {
    openTrigger: 'data-modal-open',
    closeTrigger: 'data-modal-close',
    openClass: 'modal_shown',
    disableScroll: true,
    disableFocus: false,
  };

  constructor() {
    this.plugin = MicroModal;
    this.config = {
      ...ModalManager.config,
      // ...config,
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

export default ModalManager;
