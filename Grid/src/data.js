export function generateSlipData(count) {
    let slipData = {}, items = [];
    for (let i = 0; i < count; i++) {
        let debtorAcc = 0;
        let debtorType = Math.floor(3 * Math.random());
        let debtorAmt = Math.round(10000 * Math.random());
        let creditorAcc = 0;
        let creditorType = Math.floor(3 * Math.random());
        let creditorAmt = Math.round(10000 * Math.random());
        items.push({
            debtorAcc: debtorAcc,
            debtorType: debtorType,
            debtorAmt: debtorAmt,
            debtorTax: debtorAmt * 0.09,
            creditorAcc: creditorAcc,
            creditorType: creditorType,
            creditorAmt: creditorAmt,
            creditorTax: creditorAmt * 0.09,
            brief: `${i % 12 + 1}月支給分`,
            note: '',
            debtorTaxCategrory: '対象外',
            creditorTaxCategory: ''
        });
    }
    slipData.items = items;
    slipData.date = new Date();
    slipData.slipNo = '128';
    slipData.settlement = '通常';
    return slipData;
}
