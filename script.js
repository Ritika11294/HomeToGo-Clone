let data_div = document.getElementById("s15");
let data;

async function getdata() {
  try {
    let res = await fetch("https://home2gowebapi.herokuapp.com/properties/getData");
    data = await res.json();
    
    localStorage.setItem("sortWala",JSON.stringify(data))


// handlePricesort()

showdata(data);
  } catch (e) {
    console.log("e:", e);
  }
}
getdata();


// console.log(data);

function handlePricesort() {

let anotherdata=JSON.parse(localStorage.getItem("sortWala"))
console.log(anotherdata.price)
  
    var selected = document.getElementById("priceSort").value;
    // console.log(selected);
      
    if (selected == "low") {
    let lowWalasort=anotherdata.sort( (a,b)=>{

     return a.price-b.price;
  } )
   // appendData(detail, Clothing);
  showdata(lowWalasort);
    } else if (selected == "high") {
     
    let highWalasort=anotherdata.sort((a,b)=>{
        return b.price-a.price;
          })
  showdata(highWalasort)
    }
      // showdata(anotherdata);
   
  };
  






function showdata(data) {
  data_div.innerHTML=null;
let divwala=document.createElement("div")
divwala.setAttribute("class","sort");

let selectWala=document.createElement("select");
selectWala.setAttribute("id","priceSort");

selectWala.setAttribute("onchange","handlePricesort()")

let normalsort=document.createElement("option");
normalsort.textContent="sort"

let lowOption=document.createElement("option");
lowOption.setAttribute("value","low");
lowOption.textContent="low to high"

let highOption=document.createElement("option");
highOption.setAttribute("value","high");
highOption.textContent="high to low";

selectWala.append(normalsort,lowOption,highOption);

divwala.append(selectWala);
data_div.append(divwala)

  data.map(function (elem) {
    // console.log(elem);
    var div1 = document.createElement("div");
    div1.setAttribute("class", "ankitSachin mainWalaDiv");

    var div2 = document.createElement("div");
    div2.setAttribute("class", "ankitSachin mainImg");

    var div3 = document.createElement("div");
    div3.setAttribute("class", "ankitSachin besideImg");

    div1.append(div2, div3);
    var img = document.createElement("img");
    img.src = elem.imgUrl;
    img.setAttribute("class", "sa2 ankitSachin");

    var p4 = document.createElement("h");

    p4.setAttribute("id", "s21");
    p4.textContent = elem.location + " " + "(✔️free Cancellation)";
    p4.style.marginLeft = "10px";

    var btn1 = document.createElement("button");
    btn1.setAttribute("id", "s20");
    btn1.style.marginLeft = "10px";
    btn1.textContent = "$" + elem.price;

    var p1 = document.createElement("h");
    p1.setAttribute("id", "sachin");
    p1.textContent = elem.propertyName;
    p1.style.marginLeft = "10px";

    let div4 = document.createElement("div");
    div4.setAttribute("class", "ankitSachin maindiv4");

    var p3 = document.createElement("button");
    p3.setAttribute("id", "s23");
    p3.textContent = "Details";
    p3.style.marginLeft = "10px";
    p3.addEventListener("click", fun);
    function fun() {
      window.location.href = "details.html";
      localStorage.setItem("propertyId", JSON.stringify(elem._id));
      // console.log("here");
    }

    var btn2 = document.createElement("button");
    btn2.setAttribute("id", "s24");
    btn2.textContent = "View deal";
    var name = document.createElement("p");
    name.textContent = elem.feature;
    name.style.marginLeft = "10px";
    name.style.marginTop = "0px";

    div4.append(p3, btn2);
    div2.append(img);
    div3.append(btn1, p1, p4, div4);
    data_div.append(div1);
  });
}

search();

async function search() {

  var city = document.getElementById("s5").value;
  var map1 = document.getElementById("s16");
  map1.innerHTML = "";
  let frame = document.createElement("iframe");
  frame.setAttribute(
    "src",
    `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  );
  frame.setAttribute("id", "frame");
  map1.append(frame);



}

var input = document.getElementById("s5");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});

