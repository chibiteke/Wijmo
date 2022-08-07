export function getData() {
    return [
        {
            name: 'SAMSUNG 65-INCH Q9FN QLED TV',
            rating: 4,
            price: 253999,
            size: 65,
            type: '量子ドットLED',
            refresh: 120,
            hdmi: 4.5,
            img: 'https://cdn.grapecity.com/wijmo/images/1.png'
        },
        {
            name: 'TCL 6 SERIES 65-INCH ROKU TV',
            rating: 4,
            price: 99999,
            size: 65,
            type: '液晶',
            refresh: 60,
            hdmi: 3,
            img: 'https://cdn.grapecity.com/wijmo/images/2.png'
        },
        {
            name: 'LG 55-INCH C7 OLED (OLED55C7P)',
            rating: 4.5,
            price: 67999,
            size: 55,
            type: '有機EL',
            refresh: 120,
            hdmi: 4,
            img: 'https://cdn.grapecity.com/wijmo/images/3.png'
        },
        {
            name: 'VIZIO P-SERIES 65-INCH P65-F1',
            rating: 4,
            price: 112467,
            size: 65,
            type: '液晶',
            refresh: 120,
            hdmi: 5,
            img: 'https://cdn.grapecity.com/wijmo/images/4.png'
        },
        {
            name: 'TCL 43S517 ROKU SMART 4K TV',
            rating: 3.5,
            price: 31999,
            size: 43,
            type: '液晶',
            refresh: 60,
            hdmi: 3,
            img: 'https://cdn.grapecity.com/wijmo/images/1.png'
        },
        {
            name: 'SAMSUNG 65-INCH Q6F QLED TV',
            rating: 3,
            price: 159799,
            size: 65,
            type: '量子ドットLED',
            refresh: 120,
            hdmi: 4,
            img: 'https://cdn.grapecity.com/wijmo/images/2.png'
        }
    ];
}
export function getDataColumns() {
    return [
        { binding: 'img', header: ' ', align: 'center' },
        { binding: 'name', header: '製品名', align: 'center', wordWrap: true },
        { binding: 'rating', header: '評価', align: 'center', format: 'n1' },
        { binding: 'price', header: '価格', format: 'c', align: 'center' },
        { binding: 'size', header: '画面サイズ', align: 'center' },
        { binding: 'type', header: 'パネル種別', align: 'center' },
        { binding: 'refresh', header: 'リフレッシュレート', align: 'center' },
        { binding: 'hdmi', header: 'HDMIポート数', format: 'n0', align: 'center' }
    ];
}
