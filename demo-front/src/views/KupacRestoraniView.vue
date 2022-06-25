<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="#home">Pregled podataka</a>
        <a href="#news">Ažuriranje podataka</a>
        <a class="active" href="#contact">Restorani</a>
        <a href="#about">Porudžbina</a>
        <a href="#about">Izloguj se</a>
    </div>

    <p>
        Parametri za pretragu
    </p>

    <!-- namesti mozda dogadjaj v-on:change = "..." da radi tu pretragu -->
    <!-- https://forum.vuejs.org/t/how-to-trigger-an-onchange-event/11081/4 -->

    <!-- https://v2.vuejs.org/v2/cookbook/form-validation.html?redirect=true -->
    <!-- https://vuejs.org/guide/essentials/forms.html -->
    <form method="post">

        <label for="poljeNazivRestorana"> Naziv restorana: </label>
        <input id="poljeNazivRestorana" type="text" name="nazivRestorana"/>

        <br/>

        <label for="poljeTipRestorana"> Tip restorana: </label>
        <input id="poljeTipRestorana" type="text" name="tipRestorana"/>

        <br/>

        <label for="poljeAdresaRestorana"> Adresa restorana: </label>
        <input id="poljeAdresaRestorana" type="text" name="adresaRestorana"/>

        <br/>

    </form>

    <table id="restorani">

        <tr>
          <th>Naziv restorana</th>
          <th>Tip restorana</th>
          <th>Više informacija</th>
        </tr>

        <tr>
          <td> aaaaaaaa</td>
          <td> bbbbbbbbbbb</td>
          <td>
            ccccccccccc
          </td>
        </tr>

        <tr v-for="restoran in restorani" :key="employee.id">
          <td>{{ restorani.naziv }}</td>
          <td>{{ restorani.tip }}</td>
          <td>
            <button class="dugmeViseInformacija" v-on:click="viseInformacija(restoran)">
              Vise informacija
            </button>
          </td>
        </tr>

    </table>

    <!-- ovde sam stao-->

</template>

<script>

export default {
  name: "KupacRestoraniView",
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