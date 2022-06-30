<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/dostavljacPocetna" >Pregled podataka</a>
        <a class="active" href="/dostavljacAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/dostavljacRestorani">Restorani</a>
        <a href="/dostavljacPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <p>
        Ovde možete da ažurirate svoj profil
    </p>

    <!--<form method="post">-->

        <label for="poljeLozinka"> Lozinka: </label>
        <input v-model="korisnik.lozinka" id="poljeLozinka" type="password" name="lozinka"/>

        <button v-on:click="prikaziLozinku()"> {{ tekstDugmeta }} </button>

        <br/>

        <!--<label for="poljeIme"> Ime: </label>
        <input v-model="korisnik.ime" id="poljeIme" type="text" name="ime"/>

        <br/>-->
        <label>Pol:</label>
        <br/>
        <input type="radio" id="muski" value="muski" v-model="korisnik.pol" />
        <label for="muski">Muški</label>
        <br/>
        <input type="radio" id="zebsju" value="zenski" v-model="korisnik.pol" />
        <label for="zenski">Ženski</label>
        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input v-model="korisnik.prezime" id="poljePrezime" type="text" name="prezime"/>

        <br/>

        <label for="poljePol"> Pol: </label>
        <input v-model="korisnik.pol" id="poljePol" type="text" name="pol"/>

        <br/>

        <label for="poljeDatumRodjenja"> Datum rođenja: </label>
        <input v-model="korisnik.datumRodjenja" id="poljeDatumRodjenja" type="date" name="datumRodjenja"/>

        <br/>

        <button v-on:click="izvrsiAzuriranjePodataka()">
            Potvrda ažuriranja
        </button>

    <!--</form>-->

</template>

<script>

export default {
  name: "DostavljacAzuriranjePodatakaView",

  data: function () {
    return {
      korisnik: {},
      tekstDugmeta: "Prikaži lozinku",
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/korisnik/pregled_podataka/' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.korisnik = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

 methods: {

    prikaziLozinku() {
      var vrednost = document.getElementById("poljeLozinka");
      if(vrednost.type === "password")
      {
        //document.getElementById("poljeLozinka").setAttribute("type", "text");
        vrednost.setAttribute("type", "text");
        this.tekstDugmeta = "Sakrij lozinku";
      }
      else
      {
        //document.getElementById("poljeLozinka").setAttribute("type", "password");
        vrednost.setAttribute("type", "password");
        this.tekstDugmeta = "Prikaži lozinku";
      }
    },

    izvrsiAzuriranjePodataka : function() {

      fetch("http://localhost:8081/api/korisnik/azuriranje_podataka", {
        method: "PUT",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.korisnik),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          this.$router.push("/dostavljacPocetna");
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