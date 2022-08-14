import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    var ng = new wjOlap.PivotEngine({
        autoGenerateFields: false,
        itemsSource: getData(10000),
        fields: [
            { binding: 'buyer', header: '担当者' },
            { binding: 'date', header: '日付' },
            { binding: 'type', header: '分類' },
            { binding: 'type2', header: '分類2' },
            { binding: 'amount', header: '金額' }
        ],
        showRowTotals: 'Subtotals',
        valueFields: ['金額'],
        columnFields:['日付'],
        rowFields: [ '担当者', '分類','分類2'] // by buyer and by type
    });
    ng.fields.getField('金額').format = 'c0'; // customize field
    //
    // show raw data
    var rawData = new wjGrid.FlexGrid('#rawData', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'date', header: '日付' },
            { binding: 'buyer', header: '担当者' },
            { binding: 'type', header: '分類' },
            { binding: 'type2', header: '分類2' },
            { binding: 'amount', header: '金額', width: 80 }
        ],
        itemsSource: ng.collectionView
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
}
