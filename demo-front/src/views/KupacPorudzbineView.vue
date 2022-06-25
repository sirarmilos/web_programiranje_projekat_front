<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="#home" >Pregled podataka</a>
        <a href="#news">Ažuriranje podataka</a>
        <a href="#contact">Restorani</a>
        <a class="active" href="#about">Porudžbina</a>
        <a href="#about">Izloguj se</a>
    </div>

    <table>

        <!-- napraviti tabelu kada se ucita stranica da se ucitaju u nju sve porudzbine od tog kupca koji je ulogovan-->
        <!-- pored svake stavke u tabeli da ima kao dugme pregled porudzbine, gde nas vodi na stranicu KupacPorudzbinaPrikazView, gde mozemo detaljnije da vidimo samo tu porudzbinu-->
    </table>

    <!-- ispod ima dugme koje je kao kreiraj novu porudzbinu, gde nas vodi na novu stranicu KupacPorudzbinaKreiranjeView, gde moze korisnik da kreira novu porudzbinu, dodaje proizvode u nju ili brise pre samog kreiranja-->

</template>

<script>

export default {
  name: "KupacPorudzbineView",
};

</script>

<style>

.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

</style>