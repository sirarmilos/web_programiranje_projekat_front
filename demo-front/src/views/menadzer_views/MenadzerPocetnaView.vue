<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a class="active" href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 p-3 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <h1 class="page-header text-center pt-5 pb-5"> Ovo su vasi podaci </h1>

        <div class="mb-2 row">
          <label for="poljeKorisnickoIme" class="col-sm-2 col-form-label"> Korisničko ime: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.korisnickoIme" id="poljeKorisnickoIme" type="text" class="form-control" name="korisnickoIme" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-3 row">
          <label for="poljeLozinka" class="col-sm-2 col-form-label"> Lozinka: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.lozinka" id="poljeLozinka" type="password" class="form-control" name="poljeLozinka" required="required" readonly/>
          </div>
          <button class="btn btn-outline-secondary col-sm-4" v-on:click="prikaziLozinku()" style="max-width:150px;"> <b>{{ tekstDugmeta }}</b> </button>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljeIme" class="col-sm-2 col-form-label"> Ime: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.ime" id="poljeIme" type="text" class="form-control" name="poljeIme" required="required" readonly/>
          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljePrezime" class="col-sm-2 col-form-label"> Prezime: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.prezime" id="poljePrezime" type="text" class="form-control" name="poljePrezime" required="required" readonly/>
          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljePol" class="col-sm-2 col-form-label"> Pol: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.pol" id="poljePol" type="text" class="form-control" name="poljePol" required="required" readonly/>
          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljeDatumRodjenja" class="col-sm-2 col-form-label"> Datum rodjenja: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.datumRodjenja" id="poljeDatumRodjenja" type="text" class="form-control" name="poljeDatumRodjenja" required="required" readonly/>
          </div>
        </div>

        <br/>

      </div>
    
    </div>

    <footer class="page-footer font-small blue pt-4">

      <div class="container-fluid text-center text-md-left">

          <div class="col-md-12 mt-md-0 mt-3">

            <h5 class="text-uppercase">O nama</h5>
            <p>Dostava za cas je za sekund kod Vas. Brza i jeftina dostava hrane na teritoriji celog Novog Sada.</p>

          </div>

      </div>

      <div class="footer-copyright text-center py-3">© 2022 Copyright:
        <a href="/"> DostavaZaCas.com </a>
      </div>

    </footer>

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

      fetch('http://localhost:8081/api/korisnik/pregled_podataka/', {
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

        odlogovanje : function () {
      fetch("http://localhost:8081/api/odlogovanje", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
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

</style>