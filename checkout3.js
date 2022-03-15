
// carousel
let carouselReviews = ["Capture1.PNG",
    "Capture3.PNG",
    "capture4.PNG"]

let div = document.querySelector(".slideshow-container");
div.innerHTML = null;
let img = document.createElement("img");
img.src = carouselReviews[0];
img.style.width = "90%";
div.append(img);

let i = 1;
setInterval(function () {
    if (i === carouselReviews.length) {
        i = 0;
    }
    img.src = carouselReviews[i];
    div.append(img);
    i++
}, 3000);


var user_details = JSON.parse(localStorage.getItem("booking_details"));



var names = document.getElementById("names");
var other = document.getElementById("other_details");



var hotelarr = JSON.parse(localStorage.getItem("stay_details"));
console.log(hotelarr);

stay(hotelarr)
appendDetails(user_details, hotelarr)

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

   var checked = document.getElementById("check-out-details")
   
   function stay(e) {
    console.log(e);
      var check_out = document.getElementById("check-out-details");
     var people = document.getElementById("no-guests");
     var days = +(e.check_out[3] + e.check_out[4]) - +(e.check_in[3] + e.check_in[4]);
   
     check_out.textContent = `${e.check_in} to ${e.check_out} (${days} nights)`
   
    people.textContent = `${e.People} guests (${e.adults} adults, ${e.childs} children) `
   }
   




function appendDetails(user_details, hotelarr) {
    let container = document.querySelector(".details");
    container.innerHTML = "";
    container.innerHTML = ` <div class="personal_details">
    <h4>PERSONAL DETAILS:</h4>
    <h4 id="names">
    ${user_details.name + user_details.last}</h4>
    <p id="other_details">
    ${user_details.email + user_details.address + user_details.number + user_details.zip + user_details.cities + user_details.countries}</p>
</div>
<div class="id_prop">PROPERTY ID:
    <span id="token">HRN4ZJKs</span>
</div>
<div class="det_prop">
    <div>
        <h4 id="hotel_details"></h4>
        <p id="hotel_size"></p>
        <p id="loc"></p>
    </div>
    <img id="hotel_pic" src="" alt="" width="30%" height="100px">
</div>
<div class="guest_Details">
    <p id="check-out-details">
    ${hotelarr.check_in} to ${hotelarr.check_out}
    
    </p>
    <p id="no-guests">
    ${hotelarr.adults} and ${hotelarr.childs}</p>
</div>
`
}




async function paymentDone(e) {
    //console.log("hello");
    
    
    try {
        e.preventDefault()
        var firstName = user_details.name
        var lastName =  user_details.last
        var email = user_details.email
        var address =user_details.address
        var nationality =user_details.countries
        var checkOut = hotelarr.check_out
        var checkIn = hotelarr.check_in
        var noOfAdults=hotelarr.adults
        var noOfChilds = hotelarr.childs
        var propId = hotelarr.propertyId
        var cardNo = document.querySelector("#credit").value
        var cvv = document.querySelector("#cd2" ).value
        var expiryDate = document.querySelector("#cd1").value
        


        var payment_obj = {

            property_id: propId,
            personalDetails:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                address: address,
                nationality: nationality
            },
            paymentDetails:{
                cardNo: cardNo,
                CVV: cvv,
                expiryDate: expiryDate
            },
            stayDetails:{
                checkIn: checkIn,
                checkOut: checkOut,
                noOfAdults:noOfAdults,
                noOfChilds:noOfChilds
            }
          
        }
        console.log(payment_obj);

        payment_obj = JSON.stringify(payment_obj)

    } catch (error) {
        console.log(error)
    }

    let api = `https://home2gowebapi.herokuapp.com/properties/postBookings`

    let response = await fetch(api, {
        method: "POST",
        body: payment_obj,
        headers: {
            "Content-Type": "application/json"
        }
    })

    let paymentData = await response.json()
    console.log("paymentData", paymentData)
    alert("Your Payment is successfull!");
    alert("Thank you for choosing HomeToGo!");

    window.location.href = "index.html"
}




