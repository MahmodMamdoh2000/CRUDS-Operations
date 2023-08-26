let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btn = document.getElementById("btn");
let alldatadeletBtn = document.getElementById("deletAll");
let mood = "create";
let fakeVar;
let allData = [];

//!-----------------------------------------------------!//

// get tottal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#010";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a30909";
  }
}
//end get tottal

//!--------------------------------------------------------!//

// save at localStorage

if (localStorage.Data != null) {
  allData = JSON.parse(localStorage.Data);
} else {
  allData = [];
}

// end at localStorage

//!--------------------------------------------------------!//
//get data from user
btn.addEventListener("click", function () {
  let allNewPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
      
  };

  // start count function
  let regex = /^[A-Z a-z]{4,20}$/
  let checkCount =/^[1-9][0-9]{0,2}$/
  if(regex.test(title.value)===true || checkCount.test(count.value===true)){
    let valed = document.getElementById('titleValed')
    let count = document.getElementById('titleValetind')
    valed.style.display = 'none'
    count.style.display = 'none'
  if (mood === "create") {
    if (allNewPro.count > 1) {
      for (let i = 0; i < allNewPro.count; i++) {
        allData.push(allNewPro);
      }
    } else {
      allData.push(allNewPro);
    }
  } else {
    allData[fakeVar] = allNewPro;
    mood = "create";
    btn.innerHTML = "Create";
    count.style.display = "block";
  }
}else{
  let count = document.getElementById('titleValetind')
  let valed = document.getElementById('titleValed')
  valed.style.display = 'block';
  count.style.display='block'
}

  // end count function
  localStorage.setItem("Data", JSON.stringify(allData));
  showData();
}
)

//get data from user
//!--------------------------------------------------------!//
// clear input
btn.addEventListener("click", function () {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  getTotal();
});
// end clear input
//!--------------------------------------------------------!//
//datashow in table


function showData() {
  let dataShow = "";
  for (let i = 0; i < allData.length; i++) {
    dataShow += `
    <tr>
    <td>${[i + 1]}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <td>${allData[i].total}</td>
    <td>${allData[i].category}</td>
    <td><button  onclick =' updateProdact(${i})' id="update">update</button></td>
    <td><button onclick =' deleteProdact(${i})' id="delete">delete</button></td>
    </tr>
    `;
  }
  let alldatadeletBtn = document.getElementById("deletAll");
  if (allData.length > 0) {
    alldatadeletBtn.innerHTML = `<button>Delete All Data (${allData.length})</button>`;
  } else {
    alldatadeletBtn.innerHTML = "";
  }

  document.getElementById("table").innerHTML = dataShow;
}
showData();

//end datashow in table

//!--------------------------------------------------------!//
//delet one iteam in table
function deleteProdact(i) {
  allData.splice(i, 1);
  localStorage.Data = JSON.stringify(allData);
  showData();
}
//end delet one iteam in table
//!--------------------------------------------------------!//

//!--------------------------------------------------------!//
//delet all iteam in table
alldatadeletBtn.addEventListener("click", function (i) {
  allData.splice(i);
  localStorage.clear();
  showData();
});
//end delet all iteam in table
//!--------------------------------------------------------!//
//start updet data
function updateProdact(i) {
  title.value = allData[i].title;
  price.value = allData[i].price;
  taxes.value = allData[i].taxes;
  ads.value = allData[i].ads;
  discount.value = allData[i].discount;
  total.innerHTML = allData[i].total;
  category.value = allData[i].category;
  fakeVar = i;
  mood = "update";
  count.style.display = "none";
  btn.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });

  getTotal();
}
//!--------------------------------------------------------!//
//start search

let searchMood = "Title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id === "searchByTitle") {
    searchMood = "Title";
    search.Placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.Placeholder = "Search By category";
  }
  search.focus();
  search.value = ''
  showData()
}

//search data

function searchData(value){
  let dataShow =''
  if(searchMood ==="Title"){

    for (let i = 0; i < allData.length; i++) {
      if(allData[i].title.includes(value.toLowerCase())){
        dataShow += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${allData[i].title}</td>
        <td>${allData[i].price}</td>
        <td>${allData[i].taxes}</td>
        <td>${allData[i].ads}</td>
        <td>${allData[i].discount}</td>
        <td>${allData[i].total}</td>
        <td>${allData[i].category}</td>
        <td><button  onclick =' updateProdact(${i})' id="update">update</button></td>
        <td><button onclick =' deleteProdact(${i})' id="delete">delete</button></td>
        </tr>
        `;

      }else{

      }
      
    }
  }else{
    for (let i = 0; i < allData.length; i++) {
      if(allData[i].category.includes(value.toLowerCase())){
        dataShow += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${allData[i].title}</td>
        <td>${allData[i].price}</td>
        <td>${allData[i].taxes}</td>
        <td>${allData[i].ads}</td>
        <td>${allData[i].discount}</td>
        <td>${allData[i].total}</td>
        <td>${allData[i].category}</td>
        <td><button  onclick =' updateProdact(${i})' id="update">update</button></td>
        <td><button onclick =' deleteProdact(${i})' id="delete">delete</button></td>
        </tr>
        `;
      
    }
  }
  }
  document.getElementById("table").innerHTML = dataShow;

}



