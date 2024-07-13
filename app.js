const Base_Url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

let drowpdowns = document.querySelectorAll(".container select");
let button = document.querySelector("button");
let fromcurr = document.querySelector(".from-side select");
let tocurr = document.querySelector(".to-side select");
let msg = document.querySelector(".msg");

for(let drowpdown of drowpdowns){
    for(coun in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = coun;
        newoption.value = coun;
        drowpdown.append(newoption);

        if(drowpdown.name === "from" && coun ==="USD"){
            newoption.selected = "selected";
        }
        if(drowpdown.name === "to" && coun ==="BDT"){
            newoption.selected = "selected";
        }
        drowpdown.addEventListener("change", (evt)=>{
            flagupdate(evt.target);
        })
    }
}

const flagupdate = (element)=>{
    let value = element.value;
    let country = countryList[value];
    let src = `https://flagsapi.com/${country}/flat/64.png`;
    console.log(src);
    let img = element.parentElement.querySelector("img");
    img.src = src;
}
button.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".input input");
   if(amount.value === "" || amount.value <1){
    amount.value = 1;
   }
   const url = `${Base_Url}/currencies/${fromcurr.value.toLowerCase()}.json`;
   let response = await fetch(url);
   let data = await response.json();
   let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
   
   let finalamount = amount.value*rate;
   finalamount = finalamount.toFixed(2);
   msg.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;

})

window.addEventListener("load", async ()=>{
    const url = `${Base_Url}/currencies/${fromcurr.value.toLowerCase()}.json`;
   let response = await fetch(url);
   let data = await response.json();
   let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    msg.innerHTML = `1 USD = ${rate.toFixed(2)} BDT`;
})