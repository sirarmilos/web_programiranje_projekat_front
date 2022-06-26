<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
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

        <label for="pojePrezime"> Datum rođenja: </label>
        <input v-model="korisnik.datumRodjenja" id="poljeDatumRodjenja" type="text" name="datumRodjenja" required="required" readonly/>

        <!--<p> {{korisnik.datumRodjenja}} </p>
-->
        <br/>

    <!--</form>-->

</template>

<script>

export default {
  name: "MenadzerPocetnaView",

  data: function () {
    return {
      korisnik: {},
      tekstDugmeta: "Prikaži lozinku",
    };
  },
  mounted: function () {

    //if(localStorage.name === "kkkk")
    //{
    //primer axios poziva
    /*axios
      .get("http://localhost:8081/api/korisnik/pregled_podataka")
      .then((res) => {
        
        this.korisnik = res.data;

      })
      .catch((err) =>{
        //console.log(err)
      })*/

      fetch('http://localhost:8081/api/korisnik/pregled_podataka/' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.korisnik = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  //}
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

  /*methods: {
    addEmployee: function() {
      this.$router.push("/add-employee");
    },
    seeMore: function (employee) {
      this.$router.push("/employee?id=" + employee.id);
    },
    deleteEmployee: function (id) {
      fetch("http://localhost:8081/api/employees/" + id, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      });
    },
  },*/












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