// data
export function getData() {
    var data = [];
    var products = 'ウィジェット,ガジェット,ツール'.split(',');
    var year = new Date().getFullYear() - 1;
    for (let i = 0; i < 100; i++) {
        let item = {
            id: i,
            product: products[i % products.length]
        };
        for (let yr = year; yr <= year + 1; yr++) {
            let total = 0;
            for (let q = 1; q <= 4; q++) {
                let key = yr + ' Q' + q;
                let value = Math.round(Math.random() * 50);
                item[key] = value;
                total += value;
            }
            item[yr + ' Total'] = total;
        }
        data.push(item);
    }
    return data;
}
// data layout definition
export function getLayoutDefinition() {
    let yr = new Date().getFullYear();
    return [
        { header: '商品', cells: [
                { binding: 'product', header: '商品' }
            ] },
        { colspan: 5, header: (yr - 1).toString(), align: 'center', cells: [
                { binding: (yr - 1) + ' Q1', header: 'Q1' },
                { binding: (yr - 1) + ' Q2', header: 'Q2' },
                { binding: (yr - 1) + ' Q3', header: 'Q3' },
                { binding: (yr - 1) + ' Q4', header: 'Q4' },
                { binding: (yr - 1) + ' Total', header: '合計', cssClass: 'yearly-total' }
            ] },
        { colspan: 5, header: yr.toString(), align: 'center', cells: [
                { binding: yr + ' Q1', header: 'Q1' },
                { binding: yr + ' Q2', header: 'Q2' },
                { binding: yr + ' Q3', header: 'Q3' },
                { binding: yr + ' Q4', header: 'Q4' },
                { binding: yr + ' Total', header: '合計', cssClass: 'yearly-total' }
            ] }
    ];
}
// header layout definition
export function getHeaderLayoutDefinition() {
    let yr = new Date().getFullYear();
    return [
        { header: '商品', cells: [
                { binding: 'product', header: '商品' }
            ] },
        { cells: [
                { header: (yr - 1).toString(), align: 'center', colspan: 5 },
                { binding: (yr - 1) + ' Q1', header: 'Q1' },
                { binding: (yr - 1) + ' Q2', header: 'Q2' },
                { binding: (yr - 1) + ' Q3', header: 'Q3' },
                { binding: (yr - 1) + ' Q4', header: 'Q4' },
                { binding: (yr - 1) + ' Total', header: '合計' }
            ] },
        { cells: [
                { header: yr.toString(), align: 'center', colspan: 5 },
                { binding: yr + ' Q1', header: 'Q1' },
                { binding: yr + ' Q2', header: 'Q2' },
                { binding: yr + ' Q3', header: 'Q3' },
                { binding: yr + ' Q4', header: 'Q4' },
                { binding: yr + ' Total', header: '合計' }
            ] }
    ];
}
