import IMask from 'imask';
import moment from 'moment';

class MaskManager {
  static config = {
    selector: 'data-mask',
  };

  static normalizePairNumber(str) {
    if (str.length === 1) return Number(str);

    if (str[0] === '0') return Number(str[1]);

    return Number(str);
  }

  static getDateParamsFromString(str, separator = '.') {
    const [d, m, y] = str.split(separator);

    const normalizedDay = MaskManager.normalizePairNumber(d);
    const normalizedMonth = MaskManager.normalizePairNumber(m);
    const normalizedYear = Number(y);

    return [normalizedYear, normalizedMonth - 1, normalizedDay];
  }

  static getParamFromDateString(str, paramName, separator = '.') {
    const [d, m, y] = str.split(separator);

    switch (paramName) {
      case 'd':
        return MaskManager.normalizePairNumber(d);
      case 'm':
        return MaskManager.normalizePairNumber(m);
      case 'y':
        return MaskManager.normalizePairNumber(y);
      default:
        throw new Error(`[MaskManager::getParamFromDateString] unexpected paramName ${paramName}`);
    }
  }

  static generateMaskOptions(field) {
    const fieldMaskPattern = field.dataset.mask;
    const dateMaskPattern = 'DD.MM.YYYY';
    const maskOptions = {};

    switch (fieldMaskPattern) {
      case 'name':
        maskOptions.mask = /([a-zа-я])/ig;

        break;
      case 'name-krl':
        maskOptions.mask = /([а-я])/ig;

        break;
      case 'name-lat':
        maskOptions.mask = /([a-z])/ig;

        break;
      case 'number':
        maskOptions.mask = Number;
        maskOptions.min = Number(field.dataset.maskMin);
        maskOptions.max = Number(field.dataset.maskMax);

        break;

      case 'date':
        maskOptions.mask = Date;
        maskOptions.pattern = dateMaskPattern;

        maskOptions.min = new Date(...MaskManager.getDateParamsFromString(field.dataset.maskMin));
        maskOptions.max = new Date(...MaskManager.getDateParamsFromString(field.dataset.maskMax));

        maskOptions.format = (date) => moment(date).format(dateMaskPattern);
        maskOptions.parse = (str) => moment(str, dateMaskPattern);

        maskOptions.blocks = {
          YYYY: {
            mask: IMask.MaskedRange,
            from: MaskManager.getParamFromDateString(field.dataset.maskMin, 'y'),
            to: MaskManager.getParamFromDateString(field.dataset.maskMax, 'y'),
          },
          MM: {
            mask: IMask.MaskedRange,
            from: MaskManager.getParamFromDateString(field.dataset.maskMin, 'm'),
            to: MaskManager.getParamFromDateString(field.dataset.maskMax, 'm'),
            maxLength: 2,
          },
          DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
        };

        maskOptions.lazy = false;
        maskOptions.autofix = true;

        break;
      default:
        maskOptions.mask = fieldMaskPattern;

        break;
    }

    return maskOptions;
  }

  constructor() {
    this.config = {
      ...MaskManager.config,
      // ...config,
    };

    this.maskedFields = {};

    this.initMaskedFields();
  }

  initMaskedFields() {
    const fields = Array.from(document.querySelectorAll(`[${this.config.selector}]`));

    fields.forEach((field) => {
      const fieldId = field.getAttribute('id');
      const maskOptions = MaskManager.generateMaskOptions(field);
      const maskedField = IMask(field, maskOptions);

      this.maskedFields[fieldId] = {
        field,
        id: fieldId,
        maskOptions,
        mask: maskedField,
      };
    });
  }

  updateMask(...fieldIds) {
    fieldIds.forEach((fieldId) => {
      if (!this.maskedFields[fieldId]) {
        throw new Error(`[MaskManager::updateMask]: unexpected fieldId ${fieldId}`);
      }

      const { id, maskOptions, mask } = this.maskedFields[fieldId];

      const newField = document.querySelector(`#${id}`);
      newField.value = '';
      mask.destroy();

      const newMask = IMask(newField, maskOptions);

      this.maskedFields[fieldId] = {
        id,
        field: newField,
        maskOptions,
        mask: newMask,
      };
    });
  }

  getMaskedField(...fieldIds) {
    return fieldIds.map((fieldId) => {
      if (!this.maskedFields[fieldId]) {
        throw new Error(`[MaskManager::getMaskedField]: unexpected fieldId ${fieldId}`);
      }

      return this.maskedFields[fieldId].mask;
    });
  }
}

export default MaskManager;
