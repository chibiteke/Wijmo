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

export function getColumns(count) {
  const columns = [];
  columns.push({ binding: 'product', header: '組', allowMerging: true });

  const date=7;
  for (let index = 0; index < count; index++) {
    columns.push({ binding: 'cd'+(date+index), header: '番号'});
    columns.push({ binding: 'cd'+(date+index), header: 'CD'});
    columns.push({ binding: 'count'+(date+index), header: '数'})
  }
  return columns;
}

export function getTrialData() {
  const date=7;
  const data = []
  const products = ['NC1,NC1号機', 'NC1,NC2号機', 'NC1,NC3号機', 'NC1,NC4号機', 'NC2,NC1号機', 'NC2,NC2号機',' NC2,NC3号機', 'NC4,NC4号機']
  for (let i = 0; i < 6; i++) {
    let item = {
      id: i,
      product: products[Math.floor(i/6)],
    }
    
    data.push(item)
  }
  

  data[0]['number'+date] = "123456";
  data[0]['cd'+date] = "abcdefg";
  data[0]['count'+date] = 1;
  
  console.log(data);
  return data
}

export function getDate(days) {
  const dateObj = new Date()
  dateObj.setDate(dateObj.getDate() + days)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const date = dateObj.getDate()
  const day = dateObj.getDay()
  const day_arr = ['日', '月', '火', '水', '木', '金', '土']
  return month + '/' + date + '(' + day_arr[day] + ')'
}