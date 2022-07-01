<template>

  <div class="container boja" style=" margin-top: 11%; width: 30%; min-width: 400px; max-width: 700px; border: 3px solid black; border-radius: 5%;">

  <h1 class="page-header text-center"> Dobrodošli u aplikaciju! </h1>

  <div class="col-md-12 text-center" style="margin-top: 10%;">
    <label for="poljeKorisnickoIme" class="form-label">Korisnicko ime</label>
    <input v-model='logovanjeSlanje.korisnickoIme' type="text" class="form-control w-50 centriranje" id="poljeKorisnickoIme" required>
    <div class="valid-feedback">
      Looks good!
    </div>
    <p>
      {{porukaGreskeZaKorisnickoIme}}
    </p>
  </div>
  <div class="col-md-12 text-center">
    <label for="poljeLozinka" class="form-label">Lozinka</label>
    <input v-model='logovanjeSlanje.lozinka' type="password" class="form-control w-50 centriranje" id="poljeLozinka" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>

  <button v-on:click="ulogujSe()" class="w-25 centriranje margin1 boja2" style="min-width:120px;">
    Ulogujte se
  </button>

  <p class="text-center margin2">
    Ukoliko nemate nalog, posetite registraciju.
  </p>

  <button v-on:click="registrujSe()" class="w-25 centriranje mb-4 boja2">
    Registracija
  </button>

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
    };
  },
  methods: {

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
          console.log(res);

          var uloga_pomocna = JSON.stringify(res.data.uloga);
          var uloga_pomocna1 = uloga_pomocna.replace('"', '');
          var uloga_pomocna2 = uloga_pomocna1.replace('"', '');
          
          if(uloga_pomocna2 === "kupac")
          {
            localStorage.name = this.logovanjeSlanje.korisnickoIme;
            this.$router.push("kupacRestorani");//("/kupacPocetna");
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
              console.log("Success:", data);
              localStorage.name = data; // vrlo vazno
              })
            .catch((error) => {
              console.error("Error:", error);
            });

            this.$router.push("/menadzerNjegovRestoran");
          }
        })
        .catch((err) => {
         // if()
          console.log(err);
          //console.log(err.response.status);
          //console.log(err.request.response);
          alert(err.request.response);
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

.margin2{
  margin-top: 10%;
}

.boja{
  background-color: #42b883;
}

.boja2{
  background-color: #35495e;
  color: white;
}
</style>