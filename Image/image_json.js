var data = []
var page = 1
const limit = 100
var totalPage = 0
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json() || []
      } else {
        return response.json()
      }
    })
    .then(dataArray => {
      data = dataArray
      dataProcessing()
    })
    .catch(function (error) {
      console.log(error);
    })
  return
}
fetchData()
function dataProcessing(keyword) {
  var a = ''
  var text = keyword == "string" ? keyword.trim() : keyword
  var arr = text ? data.filter(function (elm) { return elm.title.indexOf(text) > -1 }) : data
  handlePagination(arr.length)
  var newDataArray = arr.filter(function (_, index) { return (page - 1) * limit <= index && index < page * limit })
  newDataArray.forEach(row => {
    a += `<div class="col-3">
      <img src="${row.url}" />
      <div class="title">
        <label>${row.title}</label>
        <div class="thumble">
          <img src="${row.thumbnailUrl}" />
        </div>
      </div>
    </div>`
  });
  handlingLoading(false)
  var elmId = document.getElementById('list-image')
  elmId.innerHTML = a
  return
}
var value = document.getElementsByTagName('input')[0].value
function changePage(number) {
  page = number
  handlePagination(page)
}
function handlePagination(total) {
  totalPage = !total % limit ? Math.floor(total % limit) : total / limit
  
  var b = '<li><i class="fa fa-angles-left"></i></li>'
  for (let i = 1; i <= 1; i++) {
    // var className = i == page ? "active" : ""
    // b += `<li class="${className}"><span onclick="changePage(${i})" class="${i}">${i}</span></li>`
    if (totalPage < 10) {
      for (let i = 1; i < 10; i++) {
        var className = i == page ? "active" : ""
        b += `<li class="${className}"><span onclick="changePage()" class="${i}">${i}</span></li>`
      }
    } else {
      if (page <= 5 && totalPage > 5) {
        for (let i = 1; i <= 5; i++) {
          var className = i == page ? "active" : ""
          b += `<li class="${className}"><span class="${i}">${i}</span></li>`
        }
        b += '...' + `<li><span class="${totalPage}">${totalPage}</span></li>`
      } else if (page > 5 && totalPage > page + 4) {
        b += `<li><span class="${1}">${1}</span></li>` + '...' +
          `<li><span class="${page - 2}">${page - 2}</span></li>
        <li><span class="${page - 1}">${page - 1}</span></li>
        <li class="active"><span class="${page}">${page}</span></li>
        <li><span class="${page + 1}">${page + 1}</span></li>
        <li><span class="${page + 2}">${page + 2}</span></li>` + '...' +
          `<li><span class="${totalPage}">${totalPage}</span></li>`
      } else if (page >= totalPage - 4) {
        b += `<li><span class="${1}">${1}</span></li>` + '...'
        for (let i = page; i <= totalPage; i++) {
          var className = i == page ? "active" : ""
          b += `<li class="${className}"><span class="${i}">${i}</span></li>`
        }
      }
    }
  }
  b += `<li><i class="fa fa-angles-right"></i></li>`
  var elmPage = document.getElementById('paging')
  elmPage.innerHTML = b
  return
}
function handlingLoading(run) {
  hidden(run)
}
function search(e) {
  handlingLoading(true)
  page = 1
  fetchData(e.value)
}
var elmHidden = document.getElementById('loading')
function hidden(hide) {
  var hidden = hide = true ? elmHidden.classList.add('hidden') : elmHidden.classList.remove('hidden')
}