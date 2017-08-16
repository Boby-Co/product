import Mock from 'mockjs';

var Random = Mock.Random

Random.extend ({
  locationList: function (date) {
    let list = ['All', 'Auckland', 'Chirstchurch', 'Wellington', 'Northland', 'Hamilton', 'Central Northisland', 'Tauranga', 'South Island', 'CBD', 'Suburb2', 'Suburb3', 'Suburb4', 'Suburb5']
    return this.pick (list)
  }
})

Random.extend ({
  preferenceList: function (date) {
    let list = ['All', 'Love Grils', 'Love Guys', 'Love Transexuals', 'Couples', 'Bondage & Discipline', 'Dominatrix & Mistress']
    return this.pick (list)
  }
})

Random.extend ({
  nationalityList: function (date) {
    let list = ['All', 'European', 'Chinese', 'Japanese', 'Thai', 'Korean', 'Maori', 'Pacific', 'Islander', 'Country 1', 'Country 2', 'Country 3', 'Country 4', 'Country 5', 'Country 6', 'Country 7', 'Country 8', 'Country 9', 'Country 10']
    return this.pick (list)
  }
})

Random.extend ({
  working: function (date) {
    let list = ['10am to 12pm', 'OFF']
    return this.pick (list)
  }
})

Random.extend ({
  BustSize: function (date) {
    let list = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    return this.pick (list)
  }
})


Random.extend ({
  call: function (date) {
    let list = ['YES', 'NO']
    return this.pick (list)
  }
})

let women = Mock.mock ('http://cardList.cn', {
  'datas|16': [{
    cover: Random.image('240x320'),
    pearsonShow: Random.image('900x300'),
    summary: '@title',
    attention: Random.integer(0,100),
    isAttention: '@boolean',
    self_introduction_title: '@title',
    'self_introduction_content|100': '@word',
    contact: {
      name: '@name',
      age: Random.integer(20,50),
      nationality: '@nationalityList',
      location: '@locationList',
      contect: /^1[3458][0-9]\d{8}$/
    },
    work: {
      Monday: '@working',
      Tuesday: '@working',
      Wednesday: '@working',
      Thursday: '@working',
      Friday: '@working',
      Saturday: '@working',
      Sunday: '@working'
    },
    about: {
      Gender: '@preferenceList',
      Bust_size: '@BustSize',
      Height: Random.integer(155, 190) + 'cm',
      Weight: Random.integer(40, 70) + 'kg',
      Eye_color: '@color',
      Hair_color: '@color',
      incall: '@call',
      outcall: '@call',
    },
    fees: {
      thirty: '$100 sensual massage',
      fourty: '$120 Full service',
      one: '$160 Full service',
      night: '$1000 Full service'
    },
    'images|1-5': [{
      url: Random.image('790x300')
    }]
  }]
})


export {women}

