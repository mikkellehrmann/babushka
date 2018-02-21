 //Et tomt array oprettes - når json filen læses ind, skal data herind.
 let retter;
 let visteRetter;
 document.addEventListener("DOMContentLoaded", hentJson);

 // Her starter scriptet - når html'en er oprettet

 async function hentJson() {
     let jsonData = await fetch("json/menu.json");
     retter = await jsonData.json();
     visteRetter = retter;
     // console.log(retter);

     document.querySelector("nav").addEventListener("click", () => {

         //event.target, det element der har udløst dette event, toLowerCase, for at sætte teksten til småt, således scriptet kan læse den.

         let kategori = event.target.textContent.toLowerCase();

         // hvis kateori er forskellig fra "alle" skal overskriften være knappens tekst - ellers skal den være "menu"

         // =! betyder, når kategorien er forskellig fra "alle", så gøres dette:
         if (kategori != "alle") {
             document.querySelector("[data-overskrift]").textContent = event.target.textContent;
             let kat = retter.filter(ret => ret.kategori == kategori);
             visRetter(kat);
             visteRetter = kat;

         } else {
             visRetter(retter);
             document.querySelector("[data-overskrift]").textContent = "Menu";
         }
     })

     visteRetter.sort((a, b) => a.navn.localeCompare(b.navn));
     visRetter(visteRetter);
 }

 function visRetter(retter) {
     let menuTemplate = document.querySelector("[data-template]");
     let templateModtager = document.querySelector("[data-container]");

     //console.log(retter);

     templateModtager.innerHTML = "";
     //document.querySelector("#overskrift").textContent = overskrift;

     //for hver ret vis dem i DOM
     retter.forEach(hverRet => {
         let klon = menuTemplate.cloneNode(true).content;
         klon.querySelector("[data-navn]").textContent = hverRet.navn;
         klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.kortbeskrivelse;

         //                klon.querySelector(".billede").setAttribute("src", "imgs/small/" + ret.billede + "-sm.jpg");

         klon.querySelector("[data-billede]").src = "imgs/medium/" + hverRet.billede + "-md.jpg";
         klon.querySelector("[data-billede]").alt = "Billede af " + hverRet.navn;
         klon.querySelector("[data-pris]").textContent = hverRet.pris;
         klon.querySelector(".ret").setAttribute("data-id", hverRet.id);
         klon.querySelector(".ret").addEventListener("click", openModal);

         templateModtager.appendChild(klon);
     });
 }

 function openModal() {
     let myId = this.getAttribute("data-id");
     let single = retter.find(ret => {
         // hvis myId = ret.id så vis indhold
         if (myId == ret.id) {

             document.querySelector('body').classList.add('stop-scrolling');
             document.querySelector("#popup").style.opacity = "1";
             document.querySelector("[data-navn]").textContent = ret.navn;
             document.querySelector("[data-navn2]").textContent = ret.navn;
             document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
             document.querySelector("[data-pris]").textContent = ret.pris;

             document.querySelector("[data-popbillede]").src = "imgs/large/" + ret.billede + ".jpg";
             document.querySelector("[data-billede]").alt = "Billede af " + ret.navn;

             document.querySelector("#popup").style.pointerEvents = "auto";
             document.querySelector(".closeModal").addEventListener("click", closeModal => {
                 document.querySelector("#popup").style.opacity = "0";
                 document.querySelector("#popup").style.pointerEvents = "none";

                 document.querySelector('body').classList.remove('stop-scrolling');
             });

             document.querySelector("#popup-overlay").addEventListener("click", closeModal => {
                 document.querySelector("#popup").style.opacity = "0";
                 document.querySelector("#popup").style.pointerEvents = "none";
             });
         }
     })
 }


 document.querySelector(".sortering").addEventListener("change", sortering);

 function sortering() {
     if (this.value == "alfa") {
         visteRetter.sort((a, b) => a.navn.localeCompare(b.navn));
     } else if (this.value == "prisop") {
         visteRetter.sort((a, b) => a.pris - b.pris);
     } else if (this.value == "prisned") {
         visteRetter.sort((a, b) => b.pris - a.pris);
     };
     console.log(this.value)
     visRetter(visteRetter);
 }



/*BUUURGER MENU
function toggleMenu() {
    document.querySelector(".burger").classList.toggle("change");
    document.querySelector("nav").classList.toggle("show");
}

document.querySelector(".burger").addEventListener("click", toggleMenu);
document.querySelector("nav").addEventListener("click", toggleMenu);
*/





 /*// Sorterings-valg med button's, js

document.querySelector(".alfa").addEventListener("click", alfasort);

function alfasort() {
    retter.sort((a, b) => a.navn.localeCompare(b.navn));
    visRetter(visteRetter);
    sletmarkering();
    this.classList.add("markeret");
}

document.querySelector(".prisop").addEventListener("click", prisopsort);

function prisopsort() {
    retter.sort((a, b) => a.pris - b.pris);
    visRetter(visteRetter);
    sletmarkering();
    this.classList.add("markeret");
}


document.querySelector(".prisned").addEventListener("click", prisnedsort);

function prisnedsort() {
    console.log("prisnedsort");
    retter.sort((a, b) => b.pris - a.pris);
    visRetter(visteRetter);
    sletmarkering();
    this.classList.add("markeret");
}

function sletmarkering() {
    document.querySelector(".alfa").classList.remove("markeret");
    document.querySelector(".prisop").classList.remove("markeret");
    document.querySelector(".prisned").classList.remove("markeret");
}


//RADIO BUTTONS

document.querySelector(".radioalfa").addEventListener("change", radioalfa);

function radioalfa() {
    retter.sort((a, b) => a.navn.localeCompare(b.navn));
    visRetter(visteRetter);
}

document.querySelector(".radioprisop").addEventListener("change", radioprisop);

function radioprisop() {
    retter.sort((a, b) => a.pris - b.pris);
    visRetter(visteRetter);
}

document.querySelector(".radioprisned").addEventListener("change", radioprisned);

function radioprisned() {
    retter.sort((a, b) => b.pris - a.pris);
    visRetter(visteRetter);
}*/
