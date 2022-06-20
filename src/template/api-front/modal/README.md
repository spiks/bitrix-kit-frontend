## Темплейт

```
<button data-modal-open="modal-1">Открыть модалку</button>
<div id="modal-1" class="modal" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-modal-close="data-spiksmodal-close"></div>
    <div class="modal__container">
        <div class="modal__dialog" role="dialog" aria-modal="true">
            <!-- содержимое -->
            <button aria-label="Close modal" data-modal-close="data-spiksmodal-close">Закрыть</button>
        </div>
    </div>
</div>
```

## Апи для фронтов

```
const config = {
    onShow: modal => console.info(`${modal.id} is shown`),
    onClose: modal => console.info(`${modal.id} is hidden`),
    openTrigger: 'data-custom-open',
    closeTrigger: 'data-custom-close',
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: false,
    awaitOpenAnimation: false,
    awaitCloseAnimation: false,
    debugMode: true
};

const modalDefaultType = initModal();
const modalOtherType = initModal(config);

------------------------------------------------------------------------------
Modal это просто обертка над [micromodal](https://micromodal.vercel.app/)
```

## Апи для битриксов

```
window.SPIKS_MODAL_MANAGER.createNewModalType(${config = {} });
window.SPIKS_MODAL_MANAGER.showModal(${modal-id});
window.SPIKS_MODAL_MANAGER.hideModal(${modal-id});
```

