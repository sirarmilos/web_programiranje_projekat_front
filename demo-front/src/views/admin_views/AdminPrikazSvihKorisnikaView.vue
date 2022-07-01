<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a href="/adminRestorani">Restorani</a>
        <a href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>   
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 p-3 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>
      <h1 class="page-header text-left pt-5 pb-5"> Parametri za pretragu </h1>

        <div class="mb-2 row">
          <label for="poljeIme" class="col-sm-2 col-form-label"> Ime: </label>
          <div class="col-sm-4">
            <input v-model="slanje.ime" v-on:input="pretraga()" id="poljeIme" type="text" class="form-control" name="poljeIme" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="poljePrezime" class="col-sm-2 col-form-label"> Prezime: </label>
          <div class="col-sm-4">
            <input v-model="slanje.prezime" v-on:input="pretraga()" id="poljePrezime" type="text" class="form-control" name="poljePrezime" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="poljeKorisnickoIme" class="col-sm-2 col-form-label"> Korisnicko ime: </label>
          <div class="col-sm-4">
            <input v-model="slanje.korisnickoIme" v-on:input="pretraga()" id="poljeKorisnickoIme" type="text" class="form-control" name="poljeKorisnickoIme" required="required"/>
          </div>
        </div>
        <br/>

      </div>

      <div class="table-responsive caption-top">
        <table class="table table-striped table-hover table-bordered border-secondary"> <!-- vidi da li treba border-secondary ili je bolje bez toga table-borderless-->
        
          <caption style="caption-side: top;"><b>Spisak svih korisnika</b></caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Korisničko ime</th>
              <th>Ime</th>
              <th>Lozinka</th>
              <th>Prezime</th>
              <th>Pol</th>
              <th>Datum rođenja</th>
              <th>Uloga</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="korisnik in korisnici" :key="korisnik.id">
              <td>{{korisnik.basic}}</td> <!--bilo sta da bi ispisao kao redne brojeve te sto se generisu bezveze-->
              <td>{{ korisnik.korisnickoIme }}</td>
              <td>{{ korisnik.lozinka }}</td>
              <td>{{ korisnik.ime }}</td>
              <td>{{ korisnik.prezime }}</td>
              <td>{{ korisnik.pol }}</td>
              <td>{{ korisnik.datumRodjenja }}</td>
              <td>{{ korisnik.korisnickaUloga }}</td>
            </tr>

          </tbody>

        </table>
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
  name: "AdminPrikazSvihKorisnikaView",

  data: function () {
    return {
      korisnici: [],
      slanje:{
        ime: "",
        prezime: "",
        korisnickoIme: "",
      }
    };
  },

  mounted: function () {

      fetch('http://localhost:8081/api/admin/pregled_svih_korisnika', {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.korisnici = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    pretraga : function() {

      fetch("http://localhost:8081/api/admin/pretraga_korisnika" , {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.slanje),
      }).then(response => response.json())
        .then(data => 
        {
          console.log("Success:", data);

          this.korisnici = data;
          })
        .catch((error) => {
          console.error("Error:", error);
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

      }

  },

};

</script>

<style>


</style>