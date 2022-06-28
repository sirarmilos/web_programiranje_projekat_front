<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/kupacRestorani">Restorani</a>
        <a class="active" href="/kupacPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>
    
    <table id="pregled">

          <tr>
            <th>Naziv </th>
            <th>Cena_po_artiklu </th>
            <th>Kolicina</th>
          </tr>

          <tr v-for="artikal in PregledPorudzbine.artikliZaPregledPorudzbineDtos" :key="artikal.id">
            <td>{{artikal.naziv }}</td>
            <td>{{artikal.cena}}</td>
            <td>{{artikal.kolicina}}</td>
          </tr>
  
     </table>
      
    <p>Ukupna cena porudzbine iznosi: {{this.PregledPorudzbine.ukupnaCena}}<br>
    Cena sa popustom iznosi: {{this.PregledPorudzbine.cena_sa_popustom}}
    </p>

    

    <!-- napravi neku kao korpu gde mogu da se dodaju artikli, i brisu i na kraju se napravi porudzbina kad se klikne ovo dugme ispod, kao korpa neka-->

    <!-- ispod ima dugme koje kad se klikne napravi se ta porudzbina-->

</template>

<script>

export default {
  name: "KupacKreiranjePorudzbineView",

  data: function(){
    return{
      PregledPorudzbine:"",
    };
  },
  mounted: function () {

    

      fetch('http://localhost:8081/api/porudzbina/pregledPorudzbine', {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PregledPorudzbine = data})

        .catch((error) => {
          console.error("Error:", error);
        });
  },


  methods: {
      
        odlogovanje : function () {
      fetch("http://localhost:8081/api/odlogovanje", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.korisnik),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          this.$ses;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

      },
  }
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