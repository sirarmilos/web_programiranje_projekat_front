<template>

    <div class="topnav">
        <a class="active" href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a href="/adminRestorani">Restorani</a>
        <a href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>   
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
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


          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
          </svg>

          <div id="prozorGreski" hidden>

            <div class="alert alert-danger d-flex align-items-center w-25 centriranje" role="alert" style="max-width:260px; min-width:260px">
            <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>
                {{porukaGreske}}
              </div>
            </div>

          </div>


      </div>

      <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
        <table id ="tabela1" class="table table-striped table-hover table-bordered border-secondary"> <!-- vidi da li treba border-secondary ili je bolje bez toga table-borderless-->
        
          <caption style="caption-side: top;"><b>Spisak svih korisnika</b></caption>
          <thead>
            <tr class="text-center">
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
            <tr class="text-center" v-for="korisnik in korisnici" :key="korisnik.id">
              <td>{{ korisnik.basic }}</td>
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
        <a href="/dostavaZaCasAdmin"> DostavaZaCas.com </a>
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
      },
      porukaGreske : "",
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
        .then(data => {
          this.korisnici = data;
          })
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
          document.getElementById("prozorGreski").hidden = true;
          document.getElementById("tabela1").hidden = false;
          if(data.Korisnici === "Ne postoji trazeni korisnik.")
          {
            document.getElementById("tabela1").hidden = true;
            this.porukaGreske = "Trazeni korisnik ne postoji";
            document.getElementById("prozorGreski").hidden = false;
          }

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
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
        });

      }

  },

};

</script>

<style>


</style>