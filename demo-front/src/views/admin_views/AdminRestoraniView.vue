<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a class="active"  href="/adminRestorani">Restorani</a>
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
          <label for="poljeNazivRestorana" class="col-sm-2 col-form-label"> Naziv restorana: </label>
          <div class="col-sm-4">
            <input v-model="slanje.naziv" v-on:input="pretraga()" id="poljeNazivRestorana" type="text" class="form-control" name="poljeNazivRestorana" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="poljeTipRestorana" class="col-sm-2 col-form-label"> Tip restorana: </label>
          <div class="col-sm-4">
            <input v-model="slanje.tip" v-on:input="pretraga()" id="poljeTipRestorana" type="text" class="form-control" name="poljeTipRestorana" required="required"/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="poljeAdresaRestorana" class="col-sm-2 col-form-label"> Adresa restorana: </label>
          <div class="col-sm-4">
            <input v-model="slanje.adresa" v-on:input="pretraga()" id="poljeAdresaRestorana" type="text" class="form-control" name="poljeAdresaRestorana" required="required"/>
          </div>
        </div>
        <br/>

      </div>

      <div class="table-responsive caption-top">
        <table class="table table-striped table-hover table-bordered border-secondary"> <!-- vidi da li treba border-secondary ili je bolje bez toga table-borderless-->

          <caption style="caption-side: top;"><b>Spisak svih restorana</b></caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Naziv restorana</th>
              <th>Tip restorana</th>
              <th>Adresa restorana</th>
              <th>Više informacija</th>
              <th>Obriši restoran</th>
            </tr>
          </thead>

          <tbody>
          <tr v-for="restoran in restorani" :key="restoran.id">
            <td>{{ restoran.basicBrojac}}</td>
            <td>{{ restoran.naziv }}</td>
            <td>{{ restoran.tip }}</td>
            <td>{{ restoran.adresa }}</td>    
            <td>
              <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="viseInformacija(restoran)" style="max-width:150px;">
                Vise informacija
              </button>
            </td>
            <td>
              <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="obrisiRestoran(restoran)" style="max-width:150px;">
                Obriši restoran
              </button>
            </td>
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
  name: "AdminRestoraniView",

  data: function () {
    return {
      restorani: [],
      slanje:{
        id: "",
        naziv: "",
        tip: "",
        adresa: "",
      }
    };
  },

  mounted: function () {

      fetch('http://localhost:8081/api/restoran/prikaz_restorana' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.restorani = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    obrisiRestoran: function(restoran) {
        // vodi racuna ono dto brisanje tri odjednom, da se obrisu i lokacija, i restoran i menadzer zaduzen za taj restoran
        console.log(restoran.id);
        fetch("http://localhost:8081/api/admin/obrisi_restoran/" + restoran.id, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      }).catch((error) => {
          console.error("Error:", error);
        });
    },

    viseInformacija : function(restoran) {
      this.$router.push("/adminDetaljanPrikazRestorana?id=" + restoran.id);
    },

    pretraga : function() {

      fetch("http://localhost:8081/api/restoran/pretraga" /*+ this.slanje*/, {
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
          console.log(JSON.stringify(data));

          this.restorani = data;
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
        //body: JSON.stringify(this.korisnik),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
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