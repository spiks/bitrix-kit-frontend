## Темплейт

```
<button data-modal-open="modal-1">Открыть модалку</button>

<div
    id="modal-1"
    class="modal"
    aria-hidden="true"
>
    <div
        class="modal__backdrop"
        tabindex="-1"
        data-modal-close
    ></div>

    <div class="modal__container">
        <div
            class="modal__dialog"
            role="dialog"
            aria-modal="true"
        >
            <!-- содержимое -->

            <button
                aria-label="Close modal"
                data-modal-close
            >
                Закрыть
            </button>
        </div>
    </div>
</div>
```

## Апи

```
const id = 'modal-1';
window.spiksModalManager.showModal(id);
window.spiksModalManager.hideModal(id);
```

