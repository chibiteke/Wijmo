// data
export function getData() {
  var data = []
  var products = 'ウィジェット,ガジェット,ツール'.split(',')
  var year = new Date().getFullYear() - 1
  for (let i = 0; i < 100; i++) {
    let item = {
      id: i,
      product: products[i % products.length],
    }
    for (let yr = year; yr <= year + 1; yr++) {
      let total = 0
      for (let q = 1; q <= 4; q++) {
        let key = yr + ' Q' + q
        let value = Math.round(Math.random() * 50)
        item[key] = value
        total += value
      }
      item[yr + ' Total'] = total
    }
    data.push(item)
  }
  console.log(data)
  return data
}
// data layout definition
export function getLayoutDefinition() {
  let yr = new Date().getFullYear()
  return [
    { header: '商品', cells: [{ binding: 'product', header: '商品' }] },
    {
      colspan: 5,
      header: (yr - 1).toString(),
      align: 'center',
      cells: [
        { binding: yr - 1 + ' Q1', header: 'Q1' },
        { binding: yr - 1 + ' Q2', header: 'Q2' },
        { binding: yr - 1 + ' Q3', header: 'Q3' },
        { binding: yr - 1 + ' Q4', header: 'Q4' },
        {
          binding: yr - 1 + ' Total',
          header: '合計',
          cssClass: 'yearly-total',
        },
      ],
    },
    {
      colspan: 5,
      header: yr.toString(),
      align: 'center',
      cells: [
        { binding: yr + ' Q1', header: 'Q1' },
        { binding: yr + ' Q2', header: 'Q2' },
        { binding: yr + ' Q3', header: 'Q3' },
        { binding: yr + ' Q4', header: 'Q4' },
        { binding: yr + ' Total', header: '合計', cssClass: 'yearly-total' },
      ],
    },
  ]
}
// header layout definition
export function getHeaderLayoutDefinition() {
  let yr = new Date().getFullYear()
  return [
    { header: '商品', cells: [{ binding: 'product', header: '商品' }] },
    {
      cells: [
        { header: (yr - 1).toString(), align: 'center', colspan: 5 },
        { binding: yr - 1 + ' Q1', header: 'Q1' },
        { binding: yr - 1 + ' Q2', header: 'Q2' },
        { binding: yr - 1 + ' Q3', header: 'Q3' },
        { binding: yr - 1 + ' Q4', header: 'Q4' },
        { binding: yr - 1 + ' Total', header: '合計' },
      ],
    },
    {
      cells: [
        { header: yr.toString(), align: 'center', colspan: 5 },
        { binding: yr + ' Q1', header: 'Q1' },
        { binding: yr + ' Q2', header: 'Q2' },
        { binding: yr + ' Q3', header: 'Q3' },
        { binding: yr + ' Q4', header: 'Q4' },
        { binding: yr + ' Total', header: '合計' },
      ],
    },
  ]
}

// Trial

// data layout definition
export function getTrialLayoutDefinition() {
  let layout = []

  layout.push({ header: '組', cells: [{ binding: 'product', header: '組' }] })

  const date=7;
  for (let index = 0; index < 3; index++) {
    layout.push({
      colspan: 3,
      header: getDate(index),
      align: 'center',
      cells: [
        { binding: 'number'+(date+index), header: '番号' },
        { binding: 'cd'+(date+index), header: 'CD' },
        { binding: 'count'+(date+index), header: '数' },
      ],
    })
  }

  console.log(layout)
  return layout
}
// header layout definition
export function getTrialHeaderLayoutDefinition() {
  let layout = []

  layout.push({ header: '組', cells: [{ binding: 'product', header: '組' }] })

  const date=7;
  for (let index = 0; index < 3; index++) {
    layout.push({
      cells: [
        { header: getDate(index), align: 'center', colspan: 3 },
        { binding: 'number'+(date+index), header: '番号' },
        { binding: 'cd'+(date+index), header: 'CD' },
        { binding: 'count'+(date+index), header: '数' },
      ],
    })
  }

  return layout
}

function getDate(days) {
  const dateObj = new Date()
  dateObj.setDate(dateObj.getDate() + days)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const date = dateObj.getDate()
  const day = dateObj.getDay()
  const day_arr = ['日', '月', '火', '水', '木', '金', '土']
  return month + '/' + date + '(' + day_arr[day] + ')'
}

// data
export function getTrialData() {
  var data = []
  var products = 'NC1 NC1号機, NC1 NC2号機, NC1 NC3号機, NC1 NC4号機, NC2 NC1号機, NC2 NC2号機, NC2 NC3号機, NC4 NC4号機,'.split(',')
  for (let i = 0; i < 48; i++) {
    let item = {
      id: i,
      product: products[Math.floor(i/6)],
    }
    
    data.push(item)
  }
  console.log(data);
  return data
}