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
      // localStorage. - bice koristan kad tad
      logovanjeSlanje: {
        korisnickoIme: "",
        lozinka: "",
      },
      /*logovanjeDtoSlanje: {
        korisnik: {
          korisnickoIme: "",
          lozinka: "",
        },
        uloga: "", // ??? zasto ulogu nece da ucita
      },*/
      /*korisnik: {
        korisnickoIme: "",
        lozinka: "",
      },
      uloga : "",*/
    };
  },
  methods: {
/*lozinkaKupac1*/

    registrujSe: function() {

      this.$router.push("/registracija");

    },

    ulogujSe: function () {
      
      axios
        .post("http://localhost:8081/api/logovanje", this.logovanjeSlanje,
        {
          withCredentials: true
        }) /// this.korisnik
        .then((res) => {
          console.log(res);
          //this.uloga = "kupac"
          console.log(this.logovanjeSlanje.korisnickoIme);
          console.log(this.logovanjeSlanje.lozinka);
          console.log(JSON.stringify(res.data.uloga));
          console.log(JSON.stringify(res.data.sesija))
          var pomocna = JSON.stringify(res.data.uloga);
          var pomocna1 = pomocna.replace('"', '');
          var pomocna2 = pomocna1.replace('"', '');
          console.log(pomocna2);
          console.log(JSON.stringify(res.data.uloga))
          if(pomocna2 === "kupac")
          {
            //localStorage.setItem(uloga, "kupac");
            //localStorage.name = JSON.stringify(res.data.sesijaId);
            //localStorage.name = 2222;
            //localStorage.name = JSON.stringify(this.logovanjeSlanje.korisnickoIme);
            localStorage.name = JSON.stringify(res.data.sesija);
            this.$router.push("/kupacPocetna");
          }
          else if(pomocna2 === "admin")
          {
            localStorage.name = JSON.stringify(res.data.sesija);
            this.$router.push("/adminPocetna");
          }
          //this.$router.push("/kupacPocetna");
        })
        .catch((err) => {
          console.log(err);
          //console.log(this.logovanjeSlanje.korisnickoIme);
          //console.log(this.logovanjeSlanje.lozinka);
          //console.log(this.logovanjeDtoSlanje.uloga);
          /*console.log(this.korisnik.korisnickoIme);
          console.log(this.korisnik.lozinka);
          console.log(this.uloga);*/
          alert("Something went wrong!");
        });
    },
    /*ulogujSe : function() {

      fetch("http://localhost:8081/api/logovanje", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.logovanjeSlanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          this.$router.push("/kupacPocetna");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });
    },

    /*submit: function () {

      fetch("http://localhost:8081/api/employees", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.employee),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          this.$router.push("/employees");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });
    },*/
  },


};

</script>

<style>

</style>