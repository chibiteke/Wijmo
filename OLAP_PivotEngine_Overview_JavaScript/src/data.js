import * as wjCore from '@grapecity/wijmo';
export function getData(cnt) {
    var today = new Date(), buyers = '成宮 真紀,山本 雅治,加藤 泰江,川村 匡'.split(','), types = '音楽,ビデオ,本,家電,パソコン,食品'.split(','), types2 = 'aaa,bbb,ccc,ddd,eee,fff'.split(','),data = [];
    for (var i = 0; i < cnt; i++) {
        data.push({
            date: wjCore.DateTime.addDays(today, -Math.random() * 365),
            buyer: randomItem(buyers),
            type: randomItem(types),
            type2: randomItem(types2),
            amount: 20 + Math.random() * 1000
        });
    }
    return data;
}
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
