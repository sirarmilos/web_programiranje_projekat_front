<template>

    <h2> Nemate nalog? Napravite ga, brzo i jednostavno!.</h2>

    <!-- ovde kod form treba i kao action sta vraca, ali to mozda ipak dole u fetchu kad odredjujem ko je taj koji se uloguje-->

        <label for="poljeKorisnickoIme"> Korisničko ime: </label>
        <input v-model='registracijaSlanje.korisnickoIme' id="poljeKorisnickoIme" type="text" name="korisnickoIme" required="required"/>

        <br/>

        <label for="poljeLozinka"> Lozinka: </label>
        <input v-model='registracijaSlanje.lozinka' id="poljeLozinka" type="password" name="lozinka" required="required"/>

        <br/>

        <label for="poljeIme"> Ime: </label>
        <input v-model='registracijaSlanje.ime' id="poljeIme" type="text" name="ime" required="required"/>

        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input v-model='registracijaSlanje.prezime' id="poljePrezime" type="text" name="prezime" required="required"/>

        <br/>

        <button v-on:click="izvrsiRegistraciju()">
            Registrujte se
        </button>

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
          //this.uloga = "kupac"
          //console.log(this.registracijaSlanje.korisnickoIme);
          //console.log(this.registracijaSlanje.lozinka);
          console.log(JSON.stringify(res.data.korisnickoIme));
          if(!JSON.stringify(res.data.korisnickoIme))
          {
            // baca nas u catch deo
          }
          else
          {
            this.$router.push("/kupacPocetna");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!");
        });




       /* fetch("http://localhost:8081/api/registracija", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.registracijaSlanje),
      })
        .then((response) => response.json)
        .then((data) => {
          
          console.log(JSON.stringify(this.registracijaSlanje));
          console.log("Success : " + data.registracijaSlanje.korisnickoIme);

          

          this.$router.push("/kupacPocetna");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });*/

    },

    
 
  },













};

</script>

<style>

</style>