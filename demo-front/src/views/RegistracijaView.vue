<template>

  <div id="gK" class="container boja" style=" margin-top: 8%; width: 30%; min-width: 400px; max-width: 700px; border: 3px solid black; border-radius: 5%;">

    <h1 class="page-header text-center mt-5"> Registracija </h1>

  
  <div class="col-md-12 text-center pt-1" style="margin-top: 10%;">
    <label for="poljeKorisnickoIme" class="form-label"><b>Korisničko ime</b></label>
    <input v-model='registracijaSlanje.korisnickoIme' type="text" class="form-control w-50 centriranje" id="poljeKorisnickoIme" required>
  </div>
  <div class="col-md-12 text-center pt-3">
    <label for="poljeLozinka" class="form-label"><b>Lozinka</b></label>
    <input v-model='registracijaSlanje.lozinka' type="password" class="form-control w-50 centriranje" id="poljeLozinka" required>
  </div>
  <div class="col-md-12 text-center pt-3">
    <label for="poljeIme" class="form-label"><b>Ime</b></label>
    <input v-model='registracijaSlanje.ime' type="text" class="form-control w-50 centriranje" id="poljeIme" required>
  </div>
  <div class="col-md-12 text-center pt-3 pb-5">
    <label for="poljePrezime" class="form-label"><b>Prezime</b></label>
    <input v-model='registracijaSlanje.prezime' type="text" class="form-control w-50 centriranje" id="poljePrezime" required>
  </div>

  <button v-on:click="izvrsiRegistraciju()" class="btn w-50 centriranje mb-5" style="max-width: 140px; background-color: #35495e; color:white; border: 1px solid white; margin: 0 auto; display:block;">
    <b>Registrujte se</b>
  </button>

   <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>

  <div id="prozorGreski" hidden>

    <div class="alert alert-danger d-flex align-items-center w-75 centriranje" role="alert">
    <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      <div>
        {{porukaGreske}}
      </div>
    </div>

  </div>


  </div>

</template>

<script>
import axios from "axios"
export default {
  name: "RegistracijaView",

   data: function () {
    return {
      registracijaSlanje: {
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
      },
      porukaGreske: "",
    };
  },
  methods: {

    izvrsiRegistraciju: function() {

        axios
        .post("http://localhost:8081/api/registracija", this.registracijaSlanje,
        {
          withCredentials: true
        })
        .then((res) => {
          console.log(res);
          // sam baca na gresku bez uslova
          this.$router.push("/kupacPocetna");
        })
        .catch((err) => {
          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;
          document.getElementById("gK").style.marginTop = "4%";

          setTimeout(() => {
            document.getElementById("prozorGreski").hidden = true;
            document.getElementById("gK").style.marginTop = "8%";
          }, 1500);
        });

    },

  },

};

</script>

<style>

</style>