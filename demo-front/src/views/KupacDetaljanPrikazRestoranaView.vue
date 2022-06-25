<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="#home" >Pregled podataka</a>
        <a href="#news">Ažuriranje podataka</a>
        <a class="active" href="#contact">Restorani</a>
        <a href="#about">Porudžbina</a>
        <a href="#about">Izloguj se</a>
    </div>

    <p>
        Detaljan prikaz tog i tog restorana
    </p>

    <!-- sve podatke prikazi o jednom restoranu, vidi preko Postman-a sve podatke koji dolaze-->

</template>

<script>

export default {
  name: "KupacDetaljanPrikazRestoranaView",
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