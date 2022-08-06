import * as wjcCore from '@grapecity/wijmo';
export class RequiredValidator {
    validate(name, value) {
        const message = name + 'は入力必須です';
        if (wjcCore.isUndefined(value)) {
            return message;
        }
        const str = wjcCore.changeType(value, wjcCore.DataType.String);
        if (wjcCore.isNullOrWhiteSpace(str)) {
            return message;
        }
        return '';
    }
}
export class MinValueValidator {
    constructor(minValue, message = '{0}は{1}より小さくすることはできません', format = null) {
        this.minValue = minValue;
        this.message = message;
        this.format = format;
    }
    validate(name, value) {
        if (value < this.minValue) {
            return wjcCore.format(this.message, {
                0: name,
                1: this._formatValue(this.minValue)
            });
        }
        return '';
    }
}
export class MaxValueValidator {
    constructor(maxValue, message = '{0}は{1}より大きくすることはできません', format = null) {
        this.maxValue = maxValue;
        this.message = message;
        this.format = format;
    }
    validate(name, value) {
        if (value > this.maxValue) {
            return wjcCore.format(this.message, {
                0: name,
                1: this._formatValue(this.maxValue)
            });
        }
        return '';
    }
}
export class MinNumberValidator extends MinValueValidator {
    constructor(minValue, message = '{0}は{1}より小さくすることはできません', format = 'n') {
        super(minValue, message, format);
    }
    _formatValue(value) {
        return wjcCore.Globalize.formatNumber(value, this.format);
    }
}
export class MaxNumberValidator extends MaxValueValidator {
    constructor(maxValue, message = '{0}は{1}より大きくすることはできません', format = 'n') {
        super(maxValue, message, format);
    }
    _formatValue(value) {
        return wjcCore.Globalize.formatNumber(value, this.format);
    }
}
export class MinDateValidator extends MinValueValidator {
    constructor(minValue, message = '{0}は{1}より小さくすることはできません', format = 'd') {
        super(minValue, message, format);
    }
    _formatValue(value) {
        return wjcCore.Globalize.formatDate(value, this.format);
    }
}
export class MaxDateValidator extends MaxValueValidator {
    constructor(maxValue, message = '{0}は{1}より大きくすることはできません', format = 'd') {
        super(maxValue, message, format);
    }
    _formatValue(value) {
        return wjcCore.Globalize.formatDate(value, this.format);
    }
}
