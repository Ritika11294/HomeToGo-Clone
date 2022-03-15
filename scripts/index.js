import footer from "../components/footer.js";

document.querySelector("#footer").innerHTML = footer();

document.querySelector("#search_button").addEventListener("click", submitSearch);

function submitSearch() {
    let startDate = document.querySelector("#start_date").value;
    let endDate = document.querySelector("#end_date").value;
    let area = document.querySelector("#area").value;
    let guests = document.querySelector("#guests").value;

    if(startDate == "")
        return;

    if(endDate == "")
        return;

    if(area == "")
        return;
    
    if(guests == "")
        return;
    
    let search = {
        startDate: startDate,
        endDate: endDate,
        area: area,
        guests: guests
    }
    document.querySelector("#end_date_value").textContent = endDate;
    localStorage.setItem("search_value", JSON.stringify(search));
    window.location.href = "./search.html";
}

document.querySelector("#start_date").addEventListener("change", () => {
    document.querySelector("#start_date_value").textContent = document.querySelector("#start_date").value;
});

document.querySelector("#end_date").addEventListener("change", () => {
    document.querySelector("#end_date_value").textContent = document.querySelector("#end_date").value;
});


let searchValue = JSON.parse(localStorage.getItem("search_value"));
if(searchValue) {
    document.querySelector("#start_date_value").textContent = searchValue.startDate;
    document.querySelector("#start_date").value = searchValue.startDate;
    document.querySelector("#end_date_value").textContent = searchValue.endDate;
    document.querySelector("#end_date").value = searchValue.endDate;
    document.querySelector("#area").value = searchValue.area;
    document.querySelector("#guests").value = searchValue.guests;
}