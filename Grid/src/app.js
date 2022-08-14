import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { MultiRow } from '@grapecity/wijmo.grid.multirow';
import { getData, getLayoutDefinition, getHeaderLayoutDefinition, getTrialData, getTrialLayoutDefinition, getTrialHeaderLayoutDefinition } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the MultiRow
    let theMultiRow = new MultiRow('#theMultiRow', {
        layoutDefinition: getLayoutDefinition(),
        headerLayoutDefinition: getHeaderLayoutDefinition(),
        itemsSource: getData()
    });
    // toggle custom header layout
    document.getElementById('cbCustomHeaders').addEventListener('click', function (e) {
        theMultiRow.headerLayoutDefinition = e.target.checked
            ? getHeaderLayoutDefinition()
            : null;
    });



    // // お試し
    // let theTrial = new MultiRow('#traial', {
    //     layoutDefinition: getTrialLayoutDefinition(),
    //     headerLayoutDefinition: getTrialHeaderLayoutDefinition(),
    //     itemsSource: getTrialData()
    // });

}
