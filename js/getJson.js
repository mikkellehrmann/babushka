 //Et tomt array oprettes - når json filen læses ind, skal data herind.
 let retter = [];
 document.addEventListener("DOMContentLoaded", hentJson);

 // Her starter scriptet - når html'en er oprettet

 async function hentJson() {
     let jsonData = await fetch("json/menu.json");
     retter = await jsonData.json();
     visRetter(retter, "Menu");
     lavFiltre();
 }

 function visRetter(retter, overskrift) {
     let menuTemplate = document.querySelector("[data-template]");
     let templateModtager = document.querySelector("[data-container]");

     console.log(retter);

     templateModtager.innerHTML = "";
     document.querySelector("#overskrift").textContent = overskrift;

     //for hver ret vis dem i DOM
     retter.forEach(hverRet => {
         let klon = menuTemplate.cloneNode(true).content;
         klon.querySelector("[data-navn]").textContent = hverRet.navn;
         klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.kortbeskrivelse;
         klon.querySelector("[data-pris]").textContent = hverRet.pris;
         //                klon.querySelector(".billede").setAttribute("src", "imgs/small/" + ret.billede + "-sm.jpg");

         klon.querySelector("[data-billede]").src = "imgs/small/" + hverRet.billede + "-sm.jpg";
         klon.querySelector("[data-billede]").alt = "Billede af " + hverRet.navn;
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
             document.querySelector("#popup").style.visibility = "visible";
             document.querySelector("[data-navn]").textContent = ret.navn;
             document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
             document.querySelector("[data-billede]").src = "../imgs/small/" + ret.billede + "-sm.jpg";

             document.querySelector(".closeModal").addEventListener("click", closeModal => {
                 document.querySelector("#popup").style.visibility = "hidden";
             });
         }
     })
 }

 function lavFiltre() {
     // find events der indeholder de valgte kategorier

     let forretter = retter.filter(ret => ret.kategori == "forretter");
     let hovedretter = retter.filter(ret => ret.kategori == "hovedretter");
     let desserter = retter.filter(ret => ret.kategori == "desserter");
     let drikkevarer = retter.filter(ret => ret.kategori == "drikkevarer");

     //sorter retter efter kategori
     document.querySelector('#filter-alle').addEventListener("click", () => {
         visRetter(retter, "Menu");
     });

     document.querySelector('#filter-forretter').addEventListener("click", () => {
         visRetter(forretter, "Forretter");

     });
     document.querySelector('#filter-hovedretter').addEventListener("click", () => {
         visRetter(hovedretter, "Hovedretter");
     });
     document.querySelector('#filter-desserter').addEventListener("click", () => {
         visRetter(desserter, "Desserter");
     });
     document.querySelector('#filter-drikkevarer').addEventListener("click", () => {
         visRetter(drikkevarer, "Drikkevarer");
     });
 }
