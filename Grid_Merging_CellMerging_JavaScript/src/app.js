import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'アメリカ,ドイツ,イギリス,日本'.split(',');
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    //
    // default clipboard behavior
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        allowMerging: 'Cells',
        isReadOnly: true,
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'country', header: '国', allowMerging: true },
            { binding: 'sales', header: '売上', format: 'n2' },
            { binding: 'expenses', header: '費用', format: 'n2' },
            { binding: 'active', header: '有効', allowMerging: true },
        ],
        itemsSource: new wjCore.CollectionView(data, {
            sortDescriptions: ['country', 'active']
        })
    });
}
