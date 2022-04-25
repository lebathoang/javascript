var data = [];
var totalPage = 0
var page = 1
const limit = 100
var total = 0
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
    })
    .then(dataArray => {
      data = dataArray || []
      total = data.length
      dataProcessing()
    })
    .catch(function (error) {
      console.log(error);
    })
  return
}
fetchData();
function changePage(number) {
  page = number
  var value = document.getElementsByTagName('input')[0].value
  dataProcessing(value)
  return
}
function handlePagination(total) {
  totalPage = total % limit ? Math.floor(total / limit) + 1 : total / limit
  var b = page > 1 ? `<li><span onclick="changePage(${page - 1})"><i class="fa fa-angle-double-left"></i></span></li>` : ""
  if (totalPage < 10) {
    for (let i = 1; i <= totalPage; i++) {
      var className = i == page ? "active" : ""
      b += `<li class = "${className}"><span onclick="changePage(${i})">${i}</span></li>`
    }
  }
  else {
    if (page < 5) {
      for (let i = 1; i <= 5; i++) {
        var className = i == page ? "active" : ""
        b += `<li class = "${className}"><span onclick="changePage(${i})">${i}</span></li>`
      }
      b += '...' + `<li><span onclick="changePage(${totalPage})">${totalPage}</span></li>`
    }
    else if (page >= 5 && totalPage > page + 4) {
      b += `<li><span onclick="changePage(${1})">${1}</span></li>` + '...' +
        `<li><span onclick="changePage(${page - 2})">${page - 2}</span></li>
        <li><span onclick="changePage(${page - 1})">${page - 1}</span></li>
        <li class = "active"><span onclick="changePage(${page})">${page}</span></li>
        <li><span onclick="changePage(${page + 1})">${page + 1}</span></li>
        <li><span onclick="changePage(${page + 2})">${page + 2}</span></li>` + '...' +
        `<li><span onclick="changePage(${totalPage})">${totalPage}</span></li>`
    } else if (totalPage - 4 <= page && page <= totalPage) {
      b += `<li><span onclick="changePage(${1})">${1}</span></li>` + '...' +
        (page == totalPage - 4 ? `<li><span onclick="changePage(${totalPage - 5})">${totalPage - 5}</span></li>` : "")
      for (let i = totalPage - 4; i <= totalPage; i++) {
        var className = i == page ? "active" : ""
        b += `<li class = "${className}"><span onclick="changePage(${i})">${i}</span></li>`
      }
    }
  }
  b += page != totalPage && totalPage > 1 ? `<li><span onclick="changePage(${page + 1})"><i class="fa fa-angle-double-right"></i></span></li>` : ""
  var elmPage = document.getElementById("paging")
  elmPage.innerHTML = b
  return
}
function dataProcessing(keyword) {
  let a = ''
  var text = typeof keyword == 'string' ? keyword.trim() : keyword
  var arr = text ? data.filter(function (elm) { return elm.title.indexOf(text) > -1 }) : data
  handlePagination(arr.length)
  var newDataArray = arr.filter(function (_, index) { return (page - 1) * limit <= index && index < page * limit })
  newDataArray.forEach(row => {
    a += `<div class="col-3">
          <img src="${row.url}" />
          <div class="title"> 
            <h3>${row.title}</h3>
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
function search(e) {
  handlingLoading(true);
  page = 1
  dataProcessing(e.value)
  return
}
var elmHidden = document.getElementById('loading')
function handlingLoading(hide) {
  return !hide ? elmHidden.classList.add('hidden') : elmHidden.classList.remove('hidden')
}