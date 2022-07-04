<template>

  <div class="container boja" style="margin-top: 4%; width: 30%; min-width: 400px; max-width: 700px; border: 3px solid black; border-radius: 5%;">

  <div class="col-md-12 pt-4" v-on:click="oNamaPrikazi()">
    <img alt="Dostava za čas" class="img-fluid img-thumbnail" src="../assets/logo.png" style="max-height:200px; margin: auto; display: block;">
  </div>

  <div class="col-md-12 text-center" style="margin-top: 10%;">
    <label for="poljeKorisnickoIme" class="form-label"><b>Korisničko ime</b></label>
    <input v-model='logovanjeSlanje.korisnickoIme' type="text" class="form-control w-50 centriranje" id="poljeKorisnickoIme" required>
  </div>
  <div class="col-md-12 text-center pt-3 pb-5">
    <label for="poljeLozinka" class="form-label"><b>Lozinka</b></label>
    <input v-model='logovanjeSlanje.lozinka' type="password" class="form-control w-50 centriranje" id="poljeLozinka" required>
  </div>

  <button class="btn w-50 centriranje mb-4 " v-on:click="ulogujSe()" style="max-width: 140px; background-color: #35495e; color:white; border: 1px solid white; margin: 0 auto; display:block;">
     <b>Ulogujte se</b>
  </button>

  <p class="text-center pt-3 pb-2">
    <b>Ukoliko nemate nalog, posetite registraciju.</b>
  </p>

  <button class="btn w-50 centriranje mb-4 " v-on:click="registrujSe()" style="max-width: 140px; background-color: #35495e; color:white; border: 1px solid white; margin: 0 auto; display:block;">
     <b>Registracija</b>
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
axios.defaults.withCredentials = true;
export default {
    name: "LogovanjeView",
    
  data: function () {
    return {
      logovanjeSlanje: {
        korisnickoIme: "",
        lozinka: "",
      },
      porukaGreskeZaKorisnickoIme : "",
      porukaGreske : "",
    };
  },
  methods: {

    oNamaPrikazi : function() {
      this.$router.push("/dostavaZaCasNeReg");
    },

    registrujSe: function() {
      this.$router.push("/registracija");
    },

    ulogujSe: function () {
      
      axios
        .post("http://localhost:8081/api/logovanje", this.logovanjeSlanje,
        {
          withCredentials: true
        })
        .then((res) => {
          var uloga_pomocna = JSON.stringify(res.data.uloga);
          var uloga_pomocna1 = uloga_pomocna.replace('"', '');
          var uloga_pomocna2 = uloga_pomocna1.replace('"', '');
          
          if(uloga_pomocna2 === "kupac")
          {
            localStorage.name = this.logovanjeSlanje.korisnickoIme;
            localStorage.cuvanje = null;
            this.$router.push("kupacRestorani");
          }
          else if(uloga_pomocna2 === "admin")
          {
            this.$router.push("/adminPrikazSvihKorisnika");
          }
          else if(uloga_pomocna2 === "dostavljac")
          {
            this.$router.push("/dostavljacPorudzbine");
          }
          else if(uloga_pomocna2 === "menadzer")
          {
            fetch('http://localhost:8081/api/menadzer/dobavi_id_restorana', {
            method: "GET",
            credentials: 'include',
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
            .then(response => response.json())
            .then(data => {
              localStorage.name = data;
              })
            .catch((error) => {
              console.error("Error:", error);
            });

            this.$router.push("/menadzerPorudzbine");
          }
        })
        .catch((err) => {
          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;

          setTimeout(() => {
            document.getElementById("prozorGreski").hidden = true;
          }, 1500);

        });
    },

  },

};

</script>

<style>

.centriranje{
  display: block;
  margin: 0 auto;
}

.margin1{
  margin-top: 5%;
}

.boja{
  background-color: #42b883;
}
</style>