
var hotelarr = JSON.parse(localStorage.getItem("stay_details"));
stay(hotelarr)
//console.log(hotelarr);
async function jankari(id){
    try {
        let res=await fetch(`https://home2gowebapi.herokuapp.com/properties/getData/${id}`);
        let data=await res.json()
        console.log(data)
        hotelDetails(data)
    } catch (error) {
 console.log(error.message)       
    }
}
jankari(hotelarr.propertyId)


function hotelDetails(data){
 var hotel_id = document.getElementById("hotel_details");
 var hotel_s = document.getElementById("hotel_size");
 var locate = document.getElementById("loc");
 var pic = document.getElementById("hotel_pic");
 hotel_id.textContent = data.propertyName;
 hotel_s.textContent = data.features;
 locate.textContent = data.location;
 pic.src = data.images[0];


 var price = document.getElementById("value");
 price.textContent = `Total:  $${data.price}`


}

function stay(e) {
 //console.log(e);
   var check_out = document.getElementById("check-out-details");
   console.log(check_out);
  var people = document.getElementById("no-guests");
  var days = +(e.check_out[3] + e.check_out[4]) - +(e.check_in[3] + e.check_in[4]);

  check_out.textContent = `${e.check_in} to ${e.check_out} (${days} nights)`

 people.textContent = `${e.People} guests (${e.adults} adults, ${e.childs} children) `



}


function usersDetails(e) {
    e.preventDefault();
    var first_name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var emailAddress = document.getElementById("email").value;
    var contact = document.getElementById("mobile").value;
    var add = document.getElementById("address").value;
    var pin = document.getElementById("zip_code").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;



   
       

        
    var dataObj = {
        name:first_name,
        last:last_name,
        email:emailAddress,
        number:contact,
        address:add,
        zip:pin,
        cities:city,
        countries:country
    };

    localStorage.setItem("booking_details",JSON.stringify(dataObj))
    console.log(dataObj);

   
   
    // document.querySelector(".button").addEventListener("click", next);

     
   
    window.location.href="checkout3.html";


}


// carousel
let carouselReviews = ["Capture1.PNG",
"Capture3.PNG",
"capture4.PNG"]

let div = document.querySelector(".slideshow-container");
div.innerHTML = null;
let img = document.createElement("img");
img.src = carouselReviews[0];
img.style.width="90%";
div.append(img);

let i=1; 
setInterval(function(){
if(i===carouselReviews.length)
{
i=0;
}
img.src = carouselReviews[i];
div.append(img);
i++
},3000);









