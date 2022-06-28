<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a class="active" href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <p>
        Ovde možete da ažurirate podatke o proizvodu
    </p>
<!-- naziv, kolicina, cena, opis, tip-->
    <!--<form method="post">-->

        <label for="naziv"> Naziv: </label>
        <input v-model="PodaciZaSlanje.naziv" id="naziv" type="text" name="naziv"/>
        <br/>

        <label for="tip"> Tip: </label>
        <input v-model="PodaciZaSlanje.tip" id="tip" type="text" name="tip"/>
        <br/>

        <label for="kolicina"> Količina: </label>
        <input v-model="PodaciZaSlanje.kolicina" id="kolicina" type="text" name="kolicina"/>
        <br/>

        <label for="cena"> Cena: </label>
        <input v-model="PodaciZaSlanje.cena" id="cena" type="text" name="cena"/>
        <br/>

        <label for="opis"> Opis: </label>
        <input v-model="PodaciZaSlanje.opis" id="opis" type="text" name="opis"/>
        <br/>

        <button v-on:click="izvrsiAzuriranje()">
            Potvrda ažuriranja
        </button>

    <!--</form>-->

</template>

<script>

export default {
  name: "MenadzerAzuriranjeArtiklaView",

  data: function () {
    return {
      PodaciZaSlanje: {
        id: "",
        naziv: "",
        tip: "",
        kolicina: "",
        cena: "",
        opis: "",
      },
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/menadzer/pregled_pojedinacnog_artikla/' + this.$route.query.id/*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PodaciZaSlanje = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

 methods: {

    izvrsiAzuriranje : function() {

      fetch("http://localhost:8081/api/menadzer/azuriranje_artikla", {
        method: "PUT",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.PodaciZaSlanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          console.log(JSON.stringify(this.PodaciZaSlanje));

          this.$router.push("/menadzerNjegovRestoran");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

    },

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