var data = [];
var page = 1;
const limit = 100;
var totalPage = 0
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => {
      return response.json()
    })
    .then(dataArray => {
      data = dataArray
      dataProcessing()
    })
    .catch(error => {
      console.log(error);
    })
  return
}
fetchData()
function dataProcessing(keyword) {
  var a = ''
  var text = keyword == 'string' ? keyword.trim() : keyword
  var arr = text ? data.filter(function (param) { return param.title.indexOf(text) > -1 }) : data
  handlePagination(arr.length)
  var newDataArray = arr.filter(function (_, index) { return (page - 1) * limit < index && index < limit * page })
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
function handlePagination(total) {
  totalPage = total % limit ? Math.floor(total / limit) + 1 : total / limit
  var b = ''
  for (let i = 0; i < totalPage; i++) {

  }
}
var elmHidden = document.getElementById('loading')
function handlingLoading(hidden) {
  return !hidden ? elmHidden.classList.add('hidden') : elmHidden.classList.remove('hidden')
}
function search() {
  handlingLoading(true)
  page = 1
  return
}