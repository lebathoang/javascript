/**
* Viết 1 function có 2 tham số đầu vào: a là mảng bất kỳ, x là 1 số nguyên bất kỳ.
* Check nếu mảng có 3 phần tử liên tiếp có tổng bằng x thì trả ra true, ngược lại trả ra false
*/
var oldArray = [3, 5, 2, 1, 7, 11];
function myFunction(array, x) {
  var a = false;
  for (i = 0; i < array.length; i++) {
    if (typeof array[i + 1] != "undefined" && typeof array[i + 2] != "undefined" && array[i] + array[i + 1] + array[i + 2] == x) {
      var a = true;
      break
    } else {
      a
    }
  }
  console.log(a);
}
myFunction(oldArray, 10)
/**
* Cho 1 mảng có các phần tử là mảng số nguyên, vd: [[1,2],[3,0],[-4]]
* Tính tổng các số nguyên của các mảng phần tử. vd kết quả ở trên sẽ là 2. Vì 1+2+3+0+(-4) = 2
* Yêu cầu: Giải với "reduce" và không dùng "reduce"
*/
var arr = [[1, 2], [3, 0], [-4]]
function sum1(arr1) {
  var sum = 0
  for (var i = 0; i < arr1.length; i++) {
    sum += arr1[i]
  }
  return sum
}
function sum2(arr2) {
  var a = 0;
  for (i = 0; i < arr2.length; i++) {
    var sumI = sum1(arr2[i])
    a += sumI
  }
  return a
}
const s = sum2(arr)

var sum = arr.reduce(function (a, b) {
  var e = a + b.reduce(function (x, y) {
    total = x + y
    return total
  })
  return e
}, 0);
console.log(sum);
/**
* Viết 1 function 2 tham số đầu vào là 2 chuỗi X, Y
* Kiểm tra xem một chuỗi X có phải là một vòng quay của một chuỗi Y hay không. Ví dụ. ABCD là phép quay của BCDA nhưng không phải của ACBD.
*/
var string1 = "ABCD";
var string2 = "ABCD"
function checkString (str1, str2) {

}