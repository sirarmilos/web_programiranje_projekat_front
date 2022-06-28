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

    <!-- kao za tu porudzbinu pregled svih artikala u toj porudzbini i svega toga-->

    <label for="datumVreme"> Datum vreme: </label>
    <input v-model="datumVreme" id="datumVreme" type="text" name="datumVreme" required="required" readonly/>
    <br/>

    <label for="cena"> Cena: </label>
    <input v-model="ukupnaCena" id="cena" type="text" name="cena" required="required" readonly/>
    <br/>

    <label for="status"> Status: </label>
    <input v-model="status" id="status" type="text" name="status" required="required" readonly/>
    
    <br/>

    <table>
      <tr>
        <th>Naziv</th>
        <th>Cena</th>
        <th>Opis</th>
        <th>Kolicina</th>
      </tr>
      
      <tr v-for="noviArtikal in listaNovihArtikala" :key="listaNovihArtikala.id"><!--noviArtikal.id-->
        <td>{{ noviArtikal.naziv }}</td>
        <td>{{ noviArtikal.cena }}</td>
        <td>{{ noviArtikal.opis }}</td>
        <td>{{ noviArtikal.kolicina }}</td>
      </tr>
    </table>
    
</template>

<script>

export default {
  name: "KupacPregledPojedinacnePorudzbineView",

  data: function () {
    return {
      listaNovihArtikala: {
        naziv: "",
        cena: "",
        opis: "",
        kolicina: "",
      },
      datumVreme: "",
      ukupnaCena: "",
      status: "",
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobavi_porudzbinu/' + this.$route.query.id/*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          this.listaNovihArtikala = data;
          this.datumVreme = data[0].datumVreme;
          this.ukupnaCena= data[0].ukupnaCena;
          this.status = data[0].status;
          })
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

      }

  },

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