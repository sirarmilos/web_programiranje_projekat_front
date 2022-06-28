<template>

    <h1> Dobrodošli u aplikaciju! </h1>
    <h2> Da biste započeli korišćenje aplikacije, ulogujte se.</h2>

    <!-- ovde kod form treba i kao action sta vraca, ali to mozda ipak dole u fetchu kad odredjujem ko je taj koji se uloguje-->

    <!--<form method="post" action="/">-->

        <label for="poljeKorisnickoIme"> Korisnicko ime: </label>
       <!--<input ref="poljeIme" id="poljeIme" type="text" name="ime" required="required"/>
--> 
        <input type="text" v-model='logovanjeSlanje.korisnickoIme'/>

        <br/>

        <label for="poljeLozinka"> Lozinka: </label>
        <!--<input ref="poljeLozinka" id="poljeLozinka" type="password" name="lozinka" required="required"/>
--> 
        <input type="password" v-model='logovanjeSlanje.lozinka'/>

        <br/>

        <button v-on:click="ulogujSe()">
            Ulogujte se
        </button>

    <!-- </form>-->

    <p>
        Ukoliko nemate nalog, posetite registraciju.
    </p>

    <button v-on:click="registrujSe()">
        Registracija
    </button>

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
            this.$router.push("/kupacPocetna");
          }
          else if(uloga_pomocna2 === "admin")
          {
            this.$router.push("/adminPocetna");
          }
          else if(uloga_pomocna2 === "dostavljac")
          {
            this.$router.push("/dostavljacPocetna");
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

            this.$router.push("/menadzerPocetna");
          }
        })
        .catch((err) => {
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

</style>