import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // grid with merged headers
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        allowMerging: 'ColumnHeaders',
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'country', header: '国', allowMerging: true },
            { binding: 'sales', header: '売上', format: 'n2' },
            { binding: 'expenses', header: '費用', format: 'n2' },
            { binding: 'active', header: '有効', allowMerging: true },
        ],
        itemsSource: getData()
    });
    //
    // create extra header row
    var extraRow = new wjGrid.Row();
    extraRow.allowMerging = true;
    //
    // add extra header row to the grid
    var panel = theGrid.columnHeaders;
    panel.rows.splice(0, 0, extraRow);
    //
    // populate the extra header row
    for (let colIndex = 1; colIndex <= 2; colIndex++) {
        panel.setCellData(0, colIndex, '金額');
    }
    //
    // merge "Country" and "Active" headers vertically
    ['country', 'active'].forEach(function (binding) {
        let col = theGrid.getColumn(binding);
        col.allowMerging = true;
        panel.setCellData(0, col.index, col.header);
    });
    //
    // center-align merged header cells
    theGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
            var html = e.cell.innerHTML;
            e.cell.innerHTML = '<div class="v-center">' + html + '</div>';
        }
    });
}
