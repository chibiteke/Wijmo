import * as wjcCore from '@grapecity/wijmo';
import { RequiredValidator, MinNumberValidator, MinDateValidator, MaxNumberValidator, MaxDateValidator } from './validation';
//
export class KeyValue {
}
KeyValue.NotFound = { key: -1, value: '' };
//
export class Country {
}
Country.NotFound = { id: -1, name: '', flag: '' };
//
export class DataService {
    constructor() {
        this._products = ['ウィジェット', 'ガジェット', 'ツール'];
        this._colors = ['黒', '白', '赤', '緑', '青'];
        this._countries = [
            { id: 0, name: 'アメリカ', flag: 'us' },
            { id: 1, name: 'ドイツ', flag: 'de' },
            { id: 2, name: 'イギリス', flag: 'gb' },
            { id: 3, name: '日本', flag: 'jp' },
            { id: 4, name: 'イタリア', flag: 'it' },
            { id: 5, name: 'ギリシャ', flag: 'gr' }
        ];
        this._validationConfig = {
            'date': [
                new RequiredValidator(),
                new MinDateValidator(new Date('2000-01-01T00:00:00')),
                new MaxDateValidator(new Date('2100-01-01T00:00:00'))
            ],
            'time': [
                new RequiredValidator(),
                new MinDateValidator(new Date('2000-01-01T00:00:00')),
                new MaxDateValidator(new Date('2100-01-01T00:00:00'))
            ],
            'productId': [
                new RequiredValidator(),
                new MinNumberValidator(0, `{0}は{1}（${this._products[0]}）より小さくすることはできません`),
                new MaxNumberValidator(this._products.length - 1, `{0}は{1}（${this._products[this._products.length - 1]}）より大きくすることはできません`)
            ],
            'countryId': [
                new RequiredValidator(),
                new MinNumberValidator(0, `{0}は{1}（${this._countries[0].name}）より小さくすることはできません`),
                new MaxNumberValidator(this._countries.length - 1, `{0}は{1}（${this._countries[this._countries.length - 1].name}）より大きくすることはできません`)
            ],
            'colorId': [
                new RequiredValidator(),
                new MinNumberValidator(0, `{0}は{1}（${this._colors[0]}）より小さくすることはできません`),
                new MaxNumberValidator(this._colors.length - 1, `{0}は{1}（${this._colors[this._colors.length - 1]}）より大きくすることはできません`)
            ],
            'price': [
                new RequiredValidator(),
                new MinNumberValidator(0, `金額を負の値にすることはできません`)
            ]
        };
    }
    getCountries() {
        return this._countries;
    }
    getProducts() {
        return this._products;
    }
    getColors() {
        return this._colors;
    }
    getHistoryData() {
        return this._getRandomArray(25, 100);
    }
    getData(count) {
        const data = [];
        const dt = new Date();
        const year = dt.getFullYear();
        const itemsCount = Math.max(count, 5);
        // add items
        for (let i = 0; i < itemsCount; i++) {
            const item = this._getItem(i, year);
            data.push(item);
        }
        // set invalid data to demonstrate errors visualization
        data[1].price = -2000;
        data[2].date = new Date('1970-01-01T00:00:00');
        data[4].time = undefined;
        data[4].price = -1000;
        return data;
    }
    validate(item, prop, displayName) {
        const validators = this._validationConfig[prop];
        if (wjcCore.isUndefined(validators)) {
            return '';
        }
        const value = item[prop];
        for (let i = 0; i < validators.length; i++) {
            const validationError = validators[i].validate(displayName, value);
            if (!wjcCore.isNullOrWhiteSpace(validationError)) {
                return validationError;
            }
        }
    }
    _getItem(i, year) {
        const date = new Date(year, i % 12, 25, i % 24, i % 60, i % 60);
        const countryIndex = this._getRandomIndex(this._countries);
        const productIndex = this._getRandomIndex(this._products);
        const colorIndex = this._getRandomIndex(this._colors);
        const item = {
            id: i,
            date: date,
            time: new Date(date.getTime() + Math.random() * 30 * (24 * 60 * 60 * 1000)),
            countryId: this._countries[countryIndex].id,
            productId: productIndex,
            colorId: colorIndex,
            price: wjcCore.toFixed(Math.random() * 10000 + 5000, 2, true),
            change: wjcCore.toFixed(Math.random() * 1000 - 500, 2, true),
            history: this.getHistoryData(),
            discount: wjcCore.toFixed(Math.random() / 4, 2, true),
            rating: this._getRating(),
            active: i % 4 == 0,
            size: Math.floor(100 + Math.random() * 900),
            weight: Math.floor(100 + Math.random() * 900),
            quantity: Math.floor(Math.random() * 10),
            description: "すべてのソフトウェア製品とサービスにおいて、お客様の目標達成を支援することに重点を置いています。お客様のビジネス目標を完全に理解し、品質に重点を置き、最高の倫理基準を遵守するという私たちの主要な原則は、私たちが行うすべての基礎となります。"
        };
        return item;
    }
    _getRating() {
        return Math.ceil(Math.random() * 5);
    }
    _getRandomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }
    _getRandomArray(len, maxValue) {
        const arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(Math.floor(Math.random() * maxValue));
        }
        return arr;
    }
}
