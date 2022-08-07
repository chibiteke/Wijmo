// create some random data
export function getData() {
    var countries = 'アメリカ,ドイツ,イギリス,日本'.split(',');
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            id: i,
            country: countries[ Math.floor(i *0.25)],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    console.log(data);
    data[0]['sales'] = '';
    return data;
}
