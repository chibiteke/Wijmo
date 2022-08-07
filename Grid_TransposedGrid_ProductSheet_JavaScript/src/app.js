import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { TransposedGrid } from '@grapecity/wijmo.grid.transposed';
import { ObservableArray } from '@grapecity/wijmo';
import { getData, getDataColumns } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // data source shared by both grids
    let data = new ObservableArray(getData());
    // default grid
    new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        showSelectedHeaders: 'Row',
        headersVisibility: 'Row',
        isReadOnly: true,
        copyHeaders: 'Row',
        selectionMode: 'CellRange',
        formatItem: formatItem,
        autoGenerateColumns: false,
        columns: getDataColumns(),
        itemsSource: data
    });
    // transposed grid
    new TransposedGrid('#theTransposedGrid', {
        alternatingRowStep: 0,
        showSelectedHeaders: 'Row',
        headersVisibility: 'Row',
        isReadOnly: true,
        copyHeaders: 'Row',
        selectionMode: 'CellRange',
        formatItem: formatItem,
        // customize transposed product grid row/column sizes
        loadedRows: (s) => {
            s.columns.defaultSize = 200;
            setTimeout(() => {
                s.autoSizeColumn(0, true, 10); // auto-size row headers
                s.autoSizeRows(); // auto-size data rows
                s.rows[0].height = 180; // make product images large
            });
        },
        autoGenerateRows: false,
        rows: getDataColumns(),
        itemsSource: data
    });
    function formatItem(s, e) {
        if (e.panel == s.cells) {
            // get binding from row if possible, then from column
            let binding = s.rows[e.row].binding || s.columns[e.col].binding;
            switch (binding) {
                // product image
                case 'img':
                    e.cell.innerHTML = '<img src="{img}" draggable="false"/>'.replace('{img}', e.cell.textContent);
                    break;
                // stars for rating
                case 'rating':
                    let rating = s.getCellData(e.row, e.col, false), html = new Array(Math.floor(rating) + 1).join('&#x2605;');
                    if (rating > Math.floor(rating)) {
                        html += '&#9734;'; // white star (half star doesn't work...)
                    }
                    e.cell.innerHTML = '<span class="rating">' + html + '</span>';
                    break;
            }
        }
    }
}
