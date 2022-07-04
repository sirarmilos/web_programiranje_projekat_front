<template>

    <div class="topnav">
        <a href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a class="active" href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 p-3 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <h1 class="page-header text-center pt-5 pb-5"> Ovde možete da ažurirate svoj profil </h1>

        <div class="mb-3 row">
          <label for="poljeLozinka" class="col-sm-2 col-form-label"> Lozinka: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.lozinka" id="poljeLozinka" type="password" class="form-control" name="poljeLozinka" required="required"/>
          </div>
          <button class="btn btn-outline-secondary col-sm-4" v-on:click="prikaziLozinku()" style="max-width:150px;"> <b>{{ tekstDugmeta }}</b> </button>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljeIme" class="col-sm-2 col-form-label"> Ime: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.ime" id="poljeIme" type="text" class="form-control" name="poljeIme" required="required"/>
          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljePrezime" class="col-sm-2 col-form-label"> Prezime: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.prezime" id="poljePrezime" type="text" class="form-control" name="poljePrezime" required="required"/>
          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljePol" class="col-sm-2 col-form-label"> Pol: </label>
          <div class="col-sm-4">

            <div class="form-check">
              <input class="form-check-input" type="radio" id="muski" value="muski" v-model="korisnik.pol" />
              <label class="form-check-label" for="muski">Muški</label>
              <br/>
              <input class="form-check-input" type="radio" id="zenski" value="zenski" v-model="korisnik.pol" />
              <label class="form-check-label" for="zenski">Ženski</label>
              <br/>
            </div>

          </div>
        </div>

        <br/>

        <div class="mb-2 row pb-5">
          <label for="poljeDatumRodjenja" class="col-sm-2 col-form-label"> Datum rodjenja: </label>
          <div class="col-sm-4">
            <input v-model="korisnik.datumRodjenja" id="poljeDatumRodjenja" type="date" class="form-control" name="poljeDatumRodjenja" required="required"/>
          </div>
        </div>

        <div class="pb-5">
        <button class="btn btn-outline-secondary col-sm-4" v-on:click="izvrsiAzuriranjePodataka()" style="max-width:165px;">
            <b>Potvrda ažuriranja</b>
        </button>
        </div>

          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
          </svg>

          <div id="prozorGreski" hidden>

            <div class="alert alert-danger d-flex align-items-center w-25 centriranje" role="alert" style="max-width:400px; min-width:400px">
            <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>
                {{porukaGreske}}
              </div>
            </div>

          </div>

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
import axios from "axios"
export default {
  name: "MenadzerAzuriranjePodatakaView",

  data: function () {
    return {
      korisnik: {},
      tekstDugmeta: "Prikaži lozinku",
      porukaGreske: "",
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
        .then(data => {
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

      axios
        .put("http://localhost:8081/api/korisnik/azuriranje_podataka", this.korisnik,
        {
          withCredentials: true
        })
        .then((res) => {
          this.$router.push("/menadzerPocetna");
        })
        .catch((err) => {

          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;
        });

      /*fetch("http://localhost:8081/api/korisnik/azuriranje_podataka", {
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
          this.$router.push("/menadzerPocetna");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });*/
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
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
        });

      }

  },
  
};

</script>

<style>

</style>