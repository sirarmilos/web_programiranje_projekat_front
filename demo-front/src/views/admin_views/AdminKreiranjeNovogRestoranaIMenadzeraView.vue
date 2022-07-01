<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a href="/adminRestorani">Restorani</a>
        <a class="active" href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>   
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <h2 class="page-header text-left pt-5 pb-5"> Unesite podatke o menadzeru: </h2>

        <div class="mb-2 row">
          <label for="korisnickoIme" class="col-sm-2 col-form-label"> Korisnicko ime: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.korisnickoIme" id="korisnickoIme" type="text" class="form-control" name="korisnickoIme" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="lozinka" class="col-sm-2 col-form-label"> Lozinka: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.lozinka" id="lozinka" type="text" class="form-control" name="lozinka" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="ime" class="col-sm-2 col-form-label"> Ime: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.ime" id="ime" type="text" class="form-control" name="ime" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="prezime" class="col-sm-2 col-form-label"> Prezime: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.prezime" id="prezime" type="text" class="form-control" name="prezime" required="required"/>
          </div>
        </div>
        <br/>

        <h2 class="page-header text-left pt-5 pb-5"> Unesite podatke o restoranu: </h2>

        <div class="mb-2 row">
          <label for="nazivRestorana" class="col-sm-2 col-form-label"> Naziv restorana: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.naziv" id="nazivRestorana" type="text" class="form-control" name="nazivRestorana" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="tipRestorana" class="col-sm-2 col-form-label"> Tip restorana: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.tip" id="tipRestorana" type="text" class="form-control" name="tipRestorana" required="required"/>
          </div>
        </div>
        <br/>

        <h2 class="page-header text-left pt-5 pb-5"> Unesite podatke o lokaciji restorana: </h2>

        <div class="mb-2 row">
          <label for="gDuzina" class="col-sm-2 col-form-label"> Adresa restorana - geografskaDuzina: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.geografskaDuzina" id="gDuzina" type="text" class="form-control" name="gDuzina" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="gSirina" class="col-sm-2 col-form-label"> Adresa restorana - geografskaSirina: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.geografskaSirina" id="gSirina" type="text" class="form-control" name="gSirina" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="adresa" class="col-sm-2 col-form-label"> Adresa: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.adresa" id="adresa" type="text" class="form-control" name="adresa" required="required"/>
          </div>
        </div>
        <br/>

        <div class="pb-5">
        <button class="btn btn-outline-secondary col-sm-4" v-on:click="dodajNoviRestoranINjegovogMenadzera()" style="max-width:165px;">
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
  name: "AdminKreiranjeNovogRestoranaIMenadzeraView",

   data: function () {
    return {
      PodaciZaSlanje: {
          korisnickoIme: "",
          lozinka: "",
          ime: "",
          prezime: "",
          naziv: "",
          tip: "",
          adresa: "",
          geografskaDuzina: "",
          geografskaSirina: "",
      },
    };
  },

  methods: {

    dodajNoviRestoranINjegovogMenadzera : function(){

      fetch("http://localhost:8081/api/admin/kreiraj_restoran", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.PodaciZaSlanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log(this.PodaciZaSlanje);
          console.log("Success : " + data);
          console.log(JSON.stringify(this.PodaciZaSlanje));
          console.log(JSON.stringify(data));
          this.$router.push("/adminRestorani");
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