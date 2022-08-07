import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    let orders = appData.orders;
    let layoutDefs = appData.layoutDefs;
    let currentLayout = appData.layoutDefs.currentItem;
    let multirow = new wjMultiRow.MultiRow('#multirow', {
        itemsSource: orders,
        layoutDefinition: currentLayout.def
    });
    let ldComboBox = new wjInput.ComboBox('#ldComboBox', {
        itemsSource: layoutDefs,
        displayMemberPath: 'name'
    });
    updateDescription();
    layoutDefs.currentChanged.addHandler(() => {
        currentLayout = appData.layoutDefs.currentItem;
        updateMultirow();
        updateDescription();
    });
    //
    function updateMultirow() {
        multirow.layoutDefinition = currentLayout.def;
    }
    //
    function updateDescription() {
        wjCore.setText(document.querySelector('#desc'), currentLayout.description);
    }
}
