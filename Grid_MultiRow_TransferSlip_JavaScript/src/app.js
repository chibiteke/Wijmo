import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFilter from '@grapecity/wijmo.grid.filter';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjPdf from '@grapecity/wijmo.pdf';
import { generateSlipData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = generateSlipData(50);
    let debtorSum;
    let creditorSum;
    let balance;
    let items = new wjCore.CollectionView(data.items);
    items.pageSize = 5;
    document.querySelector('#slipNo').value = data.slipNo;
    document.querySelector('#settlement').value = data.settlement;
    let inputDate = new wjInput.InputDate('#inputDate');
    inputDate.format = 'd';
    inputDate.value = data.date;
    inputDate.min = new Date(data.date.getFullYear(), 0, 1);
    inputDate.max = new Date(data.date.getFullYear(), 11, 31);
    let transferSlip = new wjMultiRow.MultiRow('#transferSlip', {
        itemsSource: items,
        layoutDefinition: generateLayoutDef()
    });
    let filter = new wjFilter.FlexGridFilter(transferSlip);
    transferSlip.rowHeaders.columns.clear();
    let cv = transferSlip.collectionView;
    currentPageChanged();
    updateSummary(cv);
    transferSlip.cellEditEnded.addHandler(() => {
        updateSummary(cv);
    });
    cv.pageChanged.addHandler(() => {
        updateSummary(cv);
        currentPageChanged();
    });
    cv.collectionChanged.addHandler((sender, e) => {
        let debtorAmt, creditorAmt;
        if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
            debtorAmt = +e.item.debtorAmt;
            creditorAmt = +e.item.creditorAmt;
            if (!isNaN(debtorAmt)) {
                e.item.debtorTax = e.item.debtorAmt * 0.09;
            }
            if (!isNaN(creditorAmt)) {
                e.item.creditorTax = e.item.creditorAmt * 0.09;
            }
        }
    });
    document.querySelector('#first').addEventListener('click', () => {
        cv.moveToFirstPage();
    });
    document.querySelector('#previous').addEventListener('click', () => {
        cv.moveToPreviousPage();
    });
    document.querySelector('#next').addEventListener('click', () => {
        cv.moveToNextPage();
    });
    document.querySelector('#last').addEventListener('click', () => {
        cv.moveToLastPage();
    });
    // Generate the layout definition for the MultiRow control.
    function generateLayoutDef() {
        let debtorAccDataMap = buildDataMap('給料手当,旅費交通費,接待交際費,消耗品費,支払手数料'.split(',')), debtorTypeDataMap = buildDataMap('(指定なし),現金,当座預金'.split(',')), creditorAccDataMap = buildDataMap('普通預金,売上高,現金'.split(',')), creditorTypeDataMap = buildDataMap('雇用保険,住民税,社会保険'.split(','));
        return [
            {
                cells: [
                    { binding: 'debtorAcc', width: 125, header: '借方勘定', dataMap: debtorAccDataMap, align: 'center' },
                    { binding: 'debtorType', width: 125, header: '借方補助', dataMap: debtorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorAmt', width: 125, format: 'c', header: '借方金額', align: 'center' },
                    { binding: 'debtorTax', width: 125, format: 'c', header: '借方消費税', align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAcc', width: 125, header: '貸方勘定', dataMap: creditorAccDataMap, align: 'center' },
                    { binding: 'creditorType', width: 125, header: '貸方補助', dataMap: creditorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAmt', width: 125, format: 'c', header: '貸方金額', align: 'center' },
                    { binding: 'creditorTax', width: 125, format: 'c', header: '貸方消費税', align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'brief', width: 150, header: '摘要', align: 'center' },
                    { binding: 'note', width: 150, header: '付箋', align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorTaxCategrory', width: 150, header: '借方税区分', align: 'center' },
                    { binding: 'creditorTaxCategory', width: 150, header: '貸方税区分', align: 'center' }
                ]
            }
        ];
    }
    function buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    // Update summary info for the footer of the multirow control.
    function updateSummary(cv) {
        let debtor = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'debtorAmt'), creditor = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'creditorAmt');
        debtorSum = wjCore.Globalize.format(debtor, 'c');
        creditorSum = wjCore.Globalize.format(creditor, 'c');
        balance = wjCore.Globalize.format(debtor - creditor, 'c');
        document.querySelector('#debtorSum').innerHTML = debtorSum;
        document.querySelector('#creditorSum').innerHTML = creditorSum;
        document.querySelector('#balance').innerHTML = balance;
    }
    function currentPageChanged() {
        let cv = transferSlip.collectionView, curr = wjCore.format('{current:n0} / {count:n0}', {
            current: cv.pageIndex + 1,
            count: cv.pageCount
        });
        document.querySelector('#current').innerHTML = curr;
        if (cv.pageIndex === 0) {
            document.querySelector('#first').setAttribute('disabled', 'true');
            document.querySelector('#previous').setAttribute('disabled', 'true');
        }
        else {
            document.querySelector('#first').removeAttribute('disabled');
            document.querySelector('#previous').removeAttribute('disabled');
        }
        if (cv.pageIndex === cv.pageCount - 1) {
            document.querySelector('#last').setAttribute('disabled', 'true');
            document.querySelector('#next').setAttribute('disabled', 'true');
        }
        else {
            document.querySelector('#last').removeAttribute('disabled');
            document.querySelector('#next').removeAttribute('disabled');
        }
    }
    document.querySelector('#exportXlsx').addEventListener('click', () => {
        exportToExcel();
    });
    document.querySelector('#exportPdf').addEventListener('click', () => {
        exportToPDF();
    });
    // Export the records of current page to xlsx file.
    function exportToExcel() {
        let workbook = wjGridXlsx.FlexGridXlsxConverter.save(transferSlip);
        let workbookRow = new wjXlsx.WorkbookRow();
        let workbookFill = new wjXlsx.WorkbookFill();
        workbookFill.color = '#8080FF';
        let workbookFont = new wjXlsx.WorkbookFont();
        workbookFont.bold = true;
        let workbookStyle = new wjXlsx.WorkbookStyle();
        workbookStyle.fill = workbookFill;
        workbookStyle.font = workbookFont;
        workbookStyle.hAlign = wjXlsx.HAlign.Center;
        let workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = '日付';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = data.date;
        let dateCellStyle = new wjXlsx.WorkbookStyle();
        dateCellStyle.format = 'd';
        workbookCell.style = dateCellStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = '伝票No';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = data.slipNo;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = '決算';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = data.settlement;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.splice(0, 0, workbookRow);
        workbook.sheets[0].frozenPane.rows = 3;
        workbookRow = new wjXlsx.WorkbookRow();
        workbookFill = new wjXlsx.WorkbookFill();
        workbookFill.color = '#99B4D1';
        workbookStyle = new wjXlsx.WorkbookStyle();
        workbookStyle.fill = workbookFill;
        workbookStyle.hAlign = wjXlsx.HAlign.Center;
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = '貸方合計';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = debtorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = '借方合計';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = creditorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = '賃借バランス';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = balance;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.push(workbookRow);
        workbook.saveAsync('TransferSlip.xlsx');
    }
    // Save the records of current page to PDF file.
    function exportToPDF() {
        let doc = new wjPdf.PdfDocument({
            header: {
                declarative: {
                    text: '\t&[Page] / &[Pages]'
                }
            },
            footer: {
                declarative: {
                    text: '\t&[Page] / &[Pages]'
                }
            },
            ended: function (sender, args) {
                wjPdf.saveBlob(args.blob, 'TransferSlip.pdf');
            }
        }), settings = {
            styles: {
                cellStyle: {
                    font: { family: 'ipaexg' },
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        }, font, drawTextSetting, thinPen = new wjPdf.PdfPen('#000000', 0.5);
        doc.registerFont({ source: 'https://demo.grapecity.com/wijmo/sample/fonts/ipaexg.ttf', name: 'ipaexg' });
        doc.setFont(new wjPdf.PdfFont('ipaexg'));
        // Draw header of the transfer slip.
        doc.paths
            .rect(0.5, 0.5, 50, 21)
            .fill('#8080FF')
            .moveTo(0, 0).lineTo(334, 0)
            .moveTo(334, 0).lineTo(334, 22)
            .moveTo(0, 22).lineTo(334, 22)
            .moveTo(0, 0).lineTo(0, 22).stroke(thinPen);
        doc.drawText('日付', 3.5, 5.5, drawTextSetting);
        doc.drawText(wjCore.Globalize.format(data.date, 'd'), 53.5, 5.5, drawTextSetting);
        doc.paths
            .rect(130.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText('伝票No', 133.5, 5.5, drawTextSetting);
        doc.drawText(data.slipNo, 183.5, 5.5, drawTextSetting);
        doc.paths
            .rect(230.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText('決算', 233.5, 5.5, drawTextSetting);
        doc.drawText(data.settlement, 283.5, 5.5, drawTextSetting);
        doc.moveDown();
        // Draw the body of the transfer slip.
        wjGridPdf.FlexGridPdfConverter.draw(transferSlip, doc, doc.width, null, settings);
        // Draw the footer of the transfer slip.
        doc.paths
            .rect(0.5, 274.5, 380, 21)
            .fill('#99B4D1')
            .moveTo(0, 274).lineTo(381, 274)
            .moveTo(381, 274).lineTo(381, 296)
            .moveTo(0, 296).lineTo(381, 296)
            .moveTo(0, 274).lineTo(0, 296)
            .moveTo(60, 274).lineTo(60, 296)
            .moveTo(120, 274).lineTo(120, 296)
            .moveTo(180, 274).lineTo(180, 296)
            .moveTo(240, 274).lineTo(240, 296)
            .moveTo(320, 274).lineTo(320, 296).stroke(thinPen);
        doc.drawText('貸方合計', 3.5, 279.5, drawTextSetting);
        doc.drawText(debtorSum, 63.5, 279.5, drawTextSetting);
        doc.drawText('借方合計', 123.5, 279.5, drawTextSetting);
        doc.drawText(creditorSum, 183.5, 279.5, drawTextSetting);
        doc.drawText('賃借バランス', 243.5, 279.5, drawTextSetting);
        doc.drawText(balance, 323.5, 279.5, drawTextSetting);
        doc.end();
    }
}
