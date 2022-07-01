<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a href="/adminRestorani">Restorani</a>
        <a href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a class="active" href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>   
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>
        
        <h2 class="page-header text-left pt-5 pb-5"> Unesite podatke o dostavljaču: </h2>

        <div class="mb-2 row">
          <label for="korisnickoIme" class="col-sm-2 col-form-label"> Korisnicko ime: </label>
          <div class="col-sm-4">
            <input v-model="Dostavljac.korisnickoIme" id="korisnickoIme" type="text" class="form-control" name="korisnickoIme" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="lozinka" class="col-sm-2 col-form-label"> Lozinka: </label>
          <div class="col-sm-4">
            <input v-model="Dostavljac.lozinka" id="lozinka" type="text" class="form-control" name="lozinka" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="ime" class="col-sm-2 col-form-label"> Ime: </label>
          <div class="col-sm-4">
            <input v-model="Dostavljac.ime" id="ime" type="text" class="form-control" name="ime" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="prezime" class="col-sm-2 col-form-label"> Prezime: </label>
          <div class="col-sm-4">
            <input v-model="Dostavljac.prezime" id="prezime" type="text" class="form-control" name="prezime" required="required"/>
          </div>
        </div>
        <br/>

        <div class="pb-5">
        <button class="btn btn-outline-secondary col-sm-4" v-on:click="dodajNovogDostavljaca()" style="max-width:165px;">
            <b>Izvrši dodavanje</b>
        </button>
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

export default {
  name: "AdminKreiranjeNovogDostavljacaView",

   data: function () {
    return {
      Dostavljac: {
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
      },
    };
  },

  methods: {

    dodajNovogDostavljaca : function(){

      fetch("http://localhost:8081/api/admin/kreiraj_dostavljaca", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.Dostavljac),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log(this.Dostavljac);
          console.log("Success : " + data);
          console.log(JSON.stringify(this.Dostavljac));
          console.log(JSON.stringify(data));
          this.$router.push("/adminPrikazSvihKorisnika");
        })
        .catch((err) => {
          console.log(response);
          console.log("Error : " + err);
          alert(err);
        });

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

      },

  }

};

</script>

<style>



</style>