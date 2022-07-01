<template>

    <!--<h2> Nemate nalog? Napravite ga, brzo i jednostavno!.</h2>

    ovde kod form treba i kao action sta vraca, ali to mozda ipak dole u fetchu kad odredjujem ko je taj koji se uloguje

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
        </button>-->

  <div class="container boja" style=" margin-top: 8%; width: 30%; min-width: 400px; max-width: 700px; border: 3px solid black;">

    <h1 class="page-header text-center"> Nemate nalog? Napravite ga, brzo i jednostavno. </h1>

  <div class="text-center" style="margin-top: 10%;">
    <label for="poljeKorisnickoIme" class="form-label">Korisnicko ime</label>
    <input v-model='registracijaSlanje.korisnickoIme' type="text" class="form-control w-50 centriranje" id="poljeKorisnickoIme" required>
    <div class="valid-feedback">
      Looks good!
    </div>
    <p>
    </p>
  </div>
  <div class="col-md-12 text-center mt-3">
    <label for="poljeLozinka" class="form-label">Lozinka</label>
    <input v-model='registracijaSlanje.lozinka' type="password" class="form-control w-50 centriranje" id="poljeLozinka" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-12 text-center mt-3">
    <label for="poljeIme" class="form-label">Ime</label>
    <input v-model='registracijaSlanje.ime' type="text" class="form-control w-50 centriranje" id="poljeIme" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-12 text-center mt-3">
    <label for="poljePrezime" class="form-label">Prezime</label>
    <input v-model='registracijaSlanje.prezime' type="text" class="form-control w-50 centriranje" id="poljePrezime" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>

  <button v-on:click="izvrsiRegistraciju()" class="w-25 centriranje boja2 mt-4 mb-4">
    Registrujte se
  </button>

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
          /*if(!JSON.stringify(res.data.korisnickoIme))
          {
            // baca nas u catch deo
          }
          else
          {*/
            this.$router.push("/kupacPocetna");
          //}
        })
        .catch((err) => {
          console.log(err);
          alert(err.request.response);
        });

    },

  },

};

</script>

<style>

</style>