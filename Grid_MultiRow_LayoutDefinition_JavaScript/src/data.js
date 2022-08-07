import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
//
export function generateAppData() {
    // create some data
    let appData = {}, customers = [], firstNames = '佐藤,鈴木,高橋,田中,伊藤,山本,渡辺,中村,小林,加藤,吉田,山田,佐々木,山口,松本,井上,木村,斎藤,林,清水,山崎,阿部,森,池田,橋本,山下,石川,中島,前田,藤田'.split(','), lastNames = '浩,誠,健一,大輔,達也,翔太,浩一,哲也,剛,大介,健太,拓也,豊,修,和彦,学,直樹,健太郎,浩二,徹,隆,亮,翔,恵子,久美子,由美子,明美,直美,陽子,智子,絵美,恵,裕子,愛,真由美,由美,麻衣,美穂,愛美,彩'.split(','), cities = '東京都,神奈川県,大阪府,愛知県'.split(','), states = '日本'.split(',');
    for (let i = 0; i < 50; i++) {
        let first = randArray(firstNames), last = randArray(lastNames);
        customers.push({
            id: i,
            name: first + ' ' + last,
            address: `${String.fromCharCode(randBetween(65, 90))}市${String.fromCharCode(randBetween(65, 90))}町${randBetween(1, 10)}-${randBetween(1, 10)}-${randBetween(1, 10)}`,
            city: cities[randBetween(0, cities.length - 1)],
            state: states[randBetween(0, states.length - 1)],
            zip: wjCore.format('{p1:d3}-{p2:d4}', {
                p1: randBetween(100, 999),
                p2: randBetween(0, 9999)
            }),
            email: 'cust@x.com',
            phone: wjCore.format('090-{p1:d4}-{p2:d4}', {
                p1: randBetween(1000, 9999),
                p2: randBetween(1000, 9999)
            })
        });
    }
    let cityMap = new wjGrid.DataMap(cities);
    let shippers = [
        { id: 0, name: 'アカネコ', email: 'ship1@x.com', phone: '03-3955-98xx', express: true },
        { id: 1, name: 'トマト', email: 'ship2@x.com', phone: '03-3681-31xx', express: true },
        { id: 2, name: 'ペンギン', email: 'ship3@x.com', phone: '03-3566-99xx', express: false }
    ];
    let orders = [];
    let today = new Date();
    for (let i = 0; i < 20; i++) {
        let shipped = wjCore.DateTime.addDays(today, -randBetween(1, 3000));
        orders.push({
            id: i,
            date: wjCore.DateTime.addDays(shipped, -randBetween(1, 5)),
            shippedDate: shipped,
            amount: randBetween(10000, 500000) / 100,
            customer: clone(randArray(customers)),
            shipper: clone(randArray(shippers))
        });
    }
    //
    function randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    //
    function randArray(arr) {
        return arr[randBetween(0, arr.length - 1)];
    }
    // shallow copy
    function clone(obj) {
        if (wjCore.isFunction(Object.assign)) { // IE does not support it
            return Object.assign({}, obj);
        }
        let clone = {};
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                clone[prop] = obj[prop];
            }
        }
        return clone;
    }
    // expose orders CollectionView to the app
    appData.orders = new wjCore.CollectionView(orders);
    // expose grouped orders CollectionView to the app
    appData.groupedOrders = new wjCore.CollectionView(orders, {
        groupDescriptions: [
            'customer.city'
        ]
    });
    // expose paged orders CollectionView to the app
    appData.pagedOrders = new wjCore.CollectionView(orders, {
        pageSize: 4
    });
    // expose addNew oders CollectionView to the app
    appData.addNewOrders = new wjCore.CollectionView(orders, {
        newItemCreator: function () {
            return {
                customer: {},
                shipper: {}
            };
        },
    });
    appData.addNewOrders.moveCurrentToLast();
    // refresh views when data source changes
    let ordersRefreshing = false;
    appData.orders.collectionChanged.addHandler(function () {
        ordersRefreshing = true;
        if (!pagedOrdersRefreshing) {
            appData.pagedOrders.refresh();
        }
        if (!groupedOrdersRefreshing) {
            appData.groupedOrders.refresh();
        }
        if (!addNewOrdersRefreshing) {
            appData.addNewOrders.refresh();
        }
        ordersRefreshing = false;
    });
    // addNew orders
    let addNewOrdersRefreshing = false;
    appData.addNewOrders.collectionChanged.addHandler(function () {
        addNewOrdersRefreshing = true;
        if (!ordersRefreshing) {
            appData.orders.refresh();
        }
        if (!pagedOrdersRefreshing) {
            appData.pagedOrders.refresh();
        }
        if (!groupedOrdersRefreshing) {
            appData.groupedOrders.refresh();
        }
        addNewOrdersRefreshing = false;
    });
    // grouped orders
    let groupedOrdersRefreshing = false;
    appData.groupedOrders.collectionChanged.addHandler(function () {
        groupedOrdersRefreshing = true;
        if (!ordersRefreshing) {
            appData.orders.refresh();
        }
        if (!pagedOrdersRefreshing) {
            appData.pagedOrders.refresh();
        }
        if (!addNewOrdersRefreshing) {
            appData.addNewOrders.refresh();
        }
        groupedOrdersRefreshing = false;
    });
    // paged orders
    let pagedOrdersRefreshing = false;
    appData.pagedOrders.collectionChanged.addHandler(function () {
        pagedOrdersRefreshing = true;
        if (!ordersRefreshing) {
            appData.orders.refresh();
        }
        if (!addNewOrdersRefreshing) {
            appData.addNewOrders.refresh();
        }
        if (!groupedOrdersRefreshing) {
            appData.groupedOrders.refresh();
        }
        pagedOrdersRefreshing = false;
    });
    // sample layout definitions
    appData.ldOneLine = [
        { cells: [{ binding: 'id', header: 'ID', cssClass: 'id', isReadOnly: true }] },
        { cells: [{ binding: 'date', header: '受注日' }] },
        { cells: [{ binding: 'shippedDate', header: '出荷日' }] },
        { cells: [{ binding: 'amount', header: '金額', format: 'c', cssClass: 'amount' }] },
        { cells: [{ binding: 'customer.name', header: '顧客名' }] },
        { cells: [{ binding: 'customer.address', header: '住所', wordWrap: true }] },
        { cells: [{ binding: 'customer.city', header: '都道府県', dataMap: cityMap }] },
        { cells: [{ binding: 'customer.state', header: '国', width: 45 }] },
        { cells: [{ binding: 'customer.zip', header: '郵便番号' }] },
        { cells: [{ binding: 'customer.email', header: '顧客のメール', cssClass: 'email' }] },
        { cells: [{ binding: 'customer.phone', header: '顧客の電話番号' }] },
        { cells: [{ binding: 'shipper.name', header: '運送業者' }] },
        { cells: [{ binding: 'shipper.email', header: '運送業者のメール', cssClass: 'email' }] },
        { cells: [{ binding: 'shipper.phone', header: '運送業者の電話番号' }] },
        { cells: [{ binding: 'shipper.express', header: '速達' }] }
    ];
    appData.ldTwoLines = [
        {
            header: '受注', colspan: 2, cells: [
                { binding: 'id', header: 'ID', cssClass: 'id', isReadOnly: true },
                { binding: 'date', header: '受注日' },
                { binding: 'amount', header: '金額', format: 'c', cssClass: 'amount' },
                { binding: 'shippedDate', header: '出荷日' }
            ]
        },
        {
            header: '顧客', colspan: 3, cells: [
                { binding: 'customer.name', header: '顧客' },
                { binding: 'customer.email', header: 'メール', colspan: 2, cssClass: 'email' },
                { binding: 'customer.address', header: '住所' },
                { binding: 'customer.city', header: '都道府県', dataMap: cityMap },
                { binding: 'customer.state', header: '国', width: 45 }
            ]
        },
        {
            header: '運送業者', cells: [
                { binding: 'shipper.name', header: '運送業者', colspan: 2 },
                { binding: 'shipper.email', header: 'メール', cssClass: 'email' },
                { binding: 'shipper.express', header: '速達' }
            ]
        }
    ];
    appData.ldThreeLines = [
        {
            header: '受注', colspan: 2, cells: [
                { binding: 'id', header: 'ID', colspan: 2, cssClass: 'id' },
                { binding: 'amount', header: '金額', format: 'c', colspan: 2, cssClass: 'amount' },
                { binding: 'date', header: '受注日' },
                { binding: 'shippedDate', header: '出荷日' }
            ]
        },
        {
            header: '顧客', colspan: 3, cells: [
                { binding: 'customer.name', header: '顧客' },
                { binding: 'customer.email', header: 'メール', colspan: 2, cssClass: 'email' },
                { binding: 'customer.address', header: '住所', colspan: 2 },
                { binding: 'customer.phone', header: '電話番号' },
                { binding: 'customer.city', header: '都道府県', dataMap: cityMap },
                { binding: 'customer.state', header: '国', width: 45 },
                { binding: 'customer.zip', header: '郵便番号' },
            ]
        },
        {
            header: '運送業者', cells: [
                { binding: 'shipper.name', header: '運送業者' },
                { binding: 'shipper.email', header: 'メール', cssClass: 'email' },
                { binding: 'shipper.express', header: '速達' }
            ]
        }
    ];
    appData.layoutDefs = new wjCore.CollectionView([
        {
            name: 'コンパクトなレイアウト',
            description: 'このビューでは、1レコードを2行で表示します。レイアウトは、注文情報、顧客情報、運送業者情報の3つのグループに分かれています。',
            def: appData.ldTwoLines
        },
        {
            name: '詳細なレイアウト',
            description: 'このビューでは、1レコードを3行で表示します。レイアウトは、注文情報、顧客情報、運送業者情報の3つのグループに分かれています。',
            def: appData.ldThreeLines
        },
        {
            name: '従来のレイアウト',
            description: '従来のグリッドのように、1レコードを1行で表示します。ユーザーはレコード全体を見るには水平方向にスクロールする必要があります。',
            def: appData.ldOneLine
        }
    ]);
    return appData;
}
