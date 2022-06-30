<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/kupacRestorani">Restorani</a>
        <a href="/kupacPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <p>
        Vaš profil
    </p>

    <!-- treba jos logika da se odradi-->

    <!--<form method="get"> --><!-- get jer ovde samo prihvatamo podatke u polja, ne menjamo i šaljemo-->

        <label for="poljeKorisnickoIme"> Korisničko ime: </label>
        <input v-model="korisnik.korisnickoIme" id="poljeKorisnickoIme" type="text" name="korisnickoIme" required="required" readonly/>
        
        <!--<p> {{korisnik.korisnickoIme}} </p>
-->

        <br/>

        <label for="poljeLozinka"> Lozinka: </label>
        <input v-model="korisnik.lozinka" id="poljeLozinka" type="password" name="lozinka" required="required" readonly/>

        <!--<p> {{korisnik.lozinka}} </p>
-->
        <!--<label for="cekPrikaziLozinku"> Prikaži lozinku </label>
        <input id="cekPrikaziLozinku" type="checkbox" v-on:click="prikaziLozinku(this)" />
-->
        <button v-on:click="prikaziLozinku()"> {{ tekstDugmeta }} </button>

        <br/>

        <label for="poljeIme"> Ime: </label>
        <input v-model="korisnik.ime" id="poljeIme" type="text" name="ime" required="required" readonly/>

        <!--<p> {{korisnik.ime}} </p>
-->
        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input v-model="korisnik.prezime" id="poljePrezime" type="text" name="prezime" required="required" readonly/>

        <!--<p> {{korisnik.prezime}} </p>
-->
        <br/>

        <label for="poljePol"> Pol: </label>
        <input v-model="korisnik.pol" id="poljePol" type="text" name="pol" required="required" readonly/>

        <!--<p> {{korisnik.pol}} </p> 
-->
        <br/>

        <label for="poljeDatumRodjenja"> Datum rođenja: </label>
        <input v-model="korisnik.datumRodjenja" id="poljeDatumRodjenja" type="text" name="datumRodjenja" required="required" readonly/>

        <!--<p> {{korisnik.datumRodjenja}} </p>
-->
        <br/>

        <label for="poljeTipKupca"> Tip kupca: </label>
        <input v-model="korisnik.tipKupca" id="poljeTipKupca" type="text" name="tipKupca" required="required" readonly/>

        <br/>

        <label for="poljeBrojSkupljenihPoena"> Broj skupljenih poena: </label>
        <input v-model="korisnik.brojSkupljenihPoena" id="poljeBrojSkupljenihPoena" type="text" name="brojSkupljenihPoena" required="required" readonly/>

        <br/>

    <!--</form>-->

</template>

<script>

export default {
  name: "KupacPocetnaView",

  data: function () {
    return {
      korisnik: {},
      tekstDugmeta: "Prikaži lozinku",
    };
  },
  
  mounted: function () {

      fetch('http://localhost:8081/api/kupac/pregled_podataka' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          this.korisnik = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        
  },

 methods: {

    prikaziLozinku() {
      var vrednost = document.getElementById("poljeLozinka");
      if(vrednost.type === "password")
      {
        vrednost.setAttribute("type", "text");
        this.tekstDugmeta = "Sakrij lozinku";
      }
      else
      {
        vrednost.setAttribute("type", "password");
        this.tekstDugmeta = "Prikaži lozinku";
      }
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