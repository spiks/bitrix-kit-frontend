## Темплейт

```
    <div>
        <label for="phone">Телефон</label>
        <input id="phone" type="tel" name="" data-mask="+{7}(000)000-00-00">
    </div>

    <div>
        <label for="name">Имя</label>
        <input id="name" type="text" name="" data-mask="name">
    </div>

    <div>
        <label for="name-1">Имя англ</label>
        <input id="name-1" type="text" name="" data-mask="name-lat">
    </div>

    <div>
        <label for="name-2">Имя рус</label>
        <input id="name-2" type="text" name="" data-mask="name-krl">
    </div>

    <div>
        <label for="number">Число</label>
        <input id="number" type="text" name="" data-mask="number" data-mask-min="200" data-mask-max="1000">
    </div>

    <div>
        <label for="date">Дата</label>
        <input id="date" type="text" name="" data-mask="date" data-mask-min="29.06.2022" data-mask-max="29.12.2022">
    </div>
```

## Апи

```
const fieldId1 = 'phone';
const fieldId2 = 'number';
const fieldId3 = 'name';

window.spiksMaskManager.updateMask(fieldId1, fieldId2, fieldId3);
window.spiksMaskManager.updateMask(fieldId1);
window.spiksMaskManager.updateMask(fieldId2);
window.spiksMaskManager.updateMask(fieldId3);

const anyMaskedFields = window.spiksMaskManager.getMaskedField(fieldId1, fieldId2); // return array of mask plugin instance
const targetMaskedField = window.spiksMaskManager.getMaskedField(fieldId3);
```

