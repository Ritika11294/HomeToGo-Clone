function SHOW(){
  //  document.querySelector("#hidden").style.border="1px solid red";
    document.querySelector("#hidden").style.right="-1%";
    document.querySelector("#hidden").style.transition="0.5s ease";
    //document.querySelector("#hidden").style.display="block";
    document.getElementById("left").style.display="none";
    document.querySelector("#button").style.display="none"
   // document.querySelector("#hidden").style.width="600px"

}
function HIDE(){
  document.querySelector("#hidden").style.right="-110%";
  document.querySelector("#hidden").style.transition="0.5s ease";
  document.getElementById("left").style.display="block"
  document.querySelector("#button").style.display="block"

}
var arr=document.getElementsByClassName("block");
var array=document.getElementsByClassName("hide");
//console.log(array)
for(var i=0;i<arr.length;i++){
  var count=0;
  var index=i;
  arr[i].addEventListener("click",function(event,index){
    count++;
  if(count%2==1) event.target.nextElementSibling.style.display="block"
  else event.target.nextElementSibling.style.display="none"
 
  })
}


function hidedates(){
  document.querySelector("#dates").style.right="-100%"
  document.querySelector("#dates").style.transition="0.5s ease";
  document.getElementById("left").style.display="block";


}


const id=JSON.parse(localStorage.getItem("propertyId"))

async function getData(id){
  var det=await fetch(`https://home2gowebapi.herokuapp.com/properties/getData/${id}`)

  var details=await det.json()
  console.log("details:",details)




  
var details={
  images:details.images,
  size:details.feature,
price:details.price,
location:details.location,
title:details.propertyName
}
//var details_arr=details.size.split(".")
var main_image=document.getElementById("main_image");
main_image.src=details.images[0];

var title=document.getElementById("title")
title.textContent=""+details.title

var width=document.getElementById("width")
width.textContent="1460 ft villa"

var left_title=document.getElementById("name")
left_title.textContent=details.title
var left_location=document.getElementById("location")
left_location.textContent=details.location;
var left_details=document.getElementById("details")
left_details.textContent=details.size||"1440 ft² Apartment"
var price=document.getElementById("price")
price.textContent=`from $${details.price}`

 

/* mapping images   */


var images_div=document.getElementById("images");
var arr=details.images
arr.map((elem)=>{
  var div=document.createElement("div")
var img=document.createElement("img");
img.src=elem;
img.addEventListener("click",()=>{
  main_image.src=elem
})
div.append(img)
images_div.append(div)
})
         

}
getData(id)


  
        
async function jankari(id){
  try {
      let res=await fetch(`https://home2gowebapi.herokuapp.com/properties/getBookings/${id}`);
      const data=await res.json()
      console.log("data:",data)
      dates(data)
  } catch (error) {
console.log(error.message)       
  }
}
jankari(id)



var dates_arr=[]

 function dates(arr){
  console.log("data",arr)
   for(var i=0;i<arr.length;i++){
   var checkIn=arr[i].stayDetails.checkIn
   var checkOut=arr[i].stayDetails.checkOut
   dates_arr.push({checkIn,checkOut})
   }

   appendDates(dates_arr)
 }


console.log(dates_arr)













/* mapping images   */


/*   count div    */


var people_count=document.getElementById("people_count")


const limit=4;
var people=0;
var adults=0;
var childs=0;



function child(event){
  let Event=event.target.textContent;
  if(Event=="-"){
         if(childs>0){
           people--;
           childs--;
           event.target.nextElementSibling.textContent=childs;
           people_count.textContent=`${people} Guests (${adults} adults and ${childs} childs )`
         }
    }

    else{
      if(childs<limit-adults && childs<=people&&people<=limit){
        people++
       childs++;
       event.target.previousElementSibling.textContent=childs
       people_count.textContent=`${people} Guests (${adults} adults and ${childs} childs )`
      }
      else{
        alert("people limit exceeded")
      }
     } 
    }


    function adult(event){
      let Event=event.target.textContent;
      if(Event=="-"){
             if(adults>0){
               people--;
               adults--;
               event.target.nextElementSibling.textContent=adults;
               people_count.textContent=`${people} Guests (${adults} adults and ${childs} childs )`
             }
        }
    
        else{
          if(adults<limit-childs && adults<=people&&people<=limit){
            people++
           adults++;
           event.target.previousElementSibling.textContent=adults
           people_count.textContent=`${people} Guests (${adults} adults and ${childs} childs )`
          }
          else{
            alert("people limit exceeded")
          }
         } 
        }

/*    count div    */



/*        date        */


let date_set=false
let date_count=0;
var date1=null
var date2=null
var time= new Date()
//console.log(time)


var current_date=time.getDate();
var current=(+time.getMonth()+1+"/"+current_date+"/"+"/"+time.getFullYear()).toString()


function date(event,value){
 
  if(event.target.id=="date1")date1=value;
  else date2=value
date_count++
 if(date_count>=2){
var today=new Date(current)


 var Date1=new Date(date1)

 var Date2=new Date(date2)

 if((Date1<Date2)&&Date1>=today&& (includes(Date1,dates_arr)===false&& includes(Date2,dates_arr)===false)){
   
   // fetchData("62189b4014bd3339204238f5")
  //  console.log(Date1,dates_arr,"               ",Date2,dates_arr)
   
   date_set=true
   
   
   alert("dates set")
  
 }
 else{
  alert("invalid dates");
  document.querySelector("#dates").style.right="-10%"
  document.querySelector("#dates").style.transition="0.5s ease";

  document.getElementById("left").style.display="none";

 }




}

}

/*       date        */
document.querySelector("iframe").src=`https://maps.google.com/maps?q=${details.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`

     /*    date validation    */
    
        
     function includes(date,arr){
    //console.log(dates_arr)
    date=new Date(date);
    var count=0;
      arr.forEach((elem)=>{
        var start=new Date(elem.checkIn.split("T")[0])
        var end=new Date(elem.checkOut.split("T")[0])
        // start=new Date(start)
        // end=new Date(end)
        // console.log(elem.checkIn.split("T")[0])
        if(date>start&&date<end){
  count++
        // console.log("out:",date,start,end,"lies")
          return 
        }
       //else 
  
      })
      // return false console.log("out:",false,date,"\n")
    if(count==0)  return false
    else return true
     
        }
        




/*     final function      */


function theGoodPart(){
  alert("fetching the details,please wait")
 setTimeout(function(){
  if(date_set){
    details.check_in=date1;
    details.check_out=date2;
    if(people>0){
      details.People=people;
      details.adults=adults;
      details.childs=childs;
      details.propertyId=id;
      localStorage.setItem("stay_details",JSON.stringify(details))

      console.log(details)
      alert("details fetching successful")
      window.location.href="checkout.html";
    }
    else alert("please set no.of adults & childs")
  }
  else alert("please set the dates")
 },5000)
}



/*      final function         */



 /*  JQUERY   */

$(document).ready(function(){
  $("#date1").datepicker()
  $("#date2").datepicker()


$("#count_div").click(function(){
  $("#display_count_div").toggle()
})


})


 /*  JQUERY   */
 
 





  





 

    
    
    
    
    
    
    
       
    
    
       
    
        function appendDates(arr){
          const datesDiv=document.getElementById("dates")
    
          arr.forEach((elem)=>{
            var p=document.createElement("p")
            p.textContent=`=> ${elem.checkIn.split("T")[0]+" to "+elem.checkOut.split("T")[0]}`
           datesDiv.append(p)
          })
          var div=document.createElement("div")

          var btn=document.createElement("button")
          btn.setAttribute("id","hidedates")
          btn.textContent="OK";
          btn.setAttribute("onclick","hidedates()")
    div.append(btn)
    datesDiv.append(div)
        }

















       
    
    
    
    
    
    