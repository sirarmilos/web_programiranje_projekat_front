<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/kupacRestorani">Restorani</a>
        <a href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupackreiranjePorudzbine">Korpa</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <div class="mb-2 row">
          <label for="restoranNaziv" class="col-sm-2 col-form-label"> Naziv restorana: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.restoran.naziv" id="restoranNaziv" type="text" class="form-control" name="restoranNaziv" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="restoranTip" class="col-sm-2 col-form-label"> Tip restorana: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.restoran.tip" id="restoranTip" type="text" class="form-control" name="restoranTip" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="adresaNaziv" class="col-sm-2 col-form-label"> Adresa restorana: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.lokacija.adresa" id="adresaNaziv" type="text" class="form-control" name="adresaNaziv" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="adresaGDuzina" class="col-sm-2 col-form-label"> Adresa restorana - geografskaDuzina: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.lokacija.geografskaDuzina" id="adresaGDuzina" type="text" class="form-control" name="adresaGDuzina" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="adresaGSirina" class="col-sm-2 col-form-label"> Adresa restorana - geografskaSirina: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.lokacija.geografskaSirina" id="adresaGSirina" type="text" class="form-control" name="adresaGSirina" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="status" class="col-sm-2 col-form-label"> Status: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.status" id="status" type="text" class="form-control" name="status" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row">
          <label for="prosecnaOcena" class="col-sm-2 col-form-label"> Prosecna ocena: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.prosecnaOcena" id="prosecnaOcena" type="text" class="form-control" name="prosecnaOcena" required="required" readonly/>
          </div>
        </div>
        <br/>

        <h1 class="page-header text-left pt-5 pb-5"> Asortiman artikala u ovom restorana: </h1>

        <!-- sada ovde trebaju da idu artikli i slike, ali posto ih nema, za sad ce ici samo tabela -->

        <div class="table-responsive caption-top">
          <table class="table table-striped table-hover table-bordered border-secondary">
            <caption style="caption-side: top;"><b>Spisak svih artikala iz restorana</b></caption>

            <thead>
            <tr>
              <th>Naziv artikla</th>
              <th>Cena artikla</th>
              <th>Kolicina</th>
              <th>Tip</th>
              <th>Opis</th>
              <th>Dodaj artikal u korpu</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="artikal in PrikaziIzabraniRestoranDto.listaArtikala" :key="artikal.id">
              <td>{{ artikal.naziv }}</td>
              <td>{{ artikal.cena }}</td>
              <td>{{ artikal.kolicina }}</td>
              <td>{{ artikal.tip }}</td>
              <td>{{ artikal.opis }}</td>
              <td>
                <button class="btn btn-outline-secondary col-sm-5" v-on:click="dodajArtikalUKorpu(artikal.id,kolicina_artikla)" style="max-width:150px;">
                  <b>Dodaj</b>
                </button>
              </td>
            </tr>
            </tbody>

          </table>

          <input v-model="kolicina_artikla"/>

        </div>

        <div class="table-responsive caption-top">
          <table class="table table-striped table-hover table-bordered border-secondary">

            <thead>
            <tr>
              <th>Komentator</th>
              <th>Ocena</th>
              <th>Tekst komentara</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="komentar in PrikaziIzabraniRestoranDto.listaKomentara" :key="komentar.id">
              <td>{{ komentar.korisnickoIme }}</td>
              <td>{{ komentar.ocena }}</td>
              <td>{{ komentar.tekstKomentara }}</td>
            </tr>
            </tbody>

          </table>
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
  name: "KupacDetaljanPrikazRestoranaView",

   data: function () {
    return {
      PrikaziIzabraniRestoranDto: {
        restoran:{
          naziv: "",
          tip: "",
        },
        lokacija:{
          adresa: "",
          geografskaDuzina: "",
          geografskaSirina: "",
        },
        listaArtikala:{
          id:"",
          naziv: "",
          cena: "",
          kolicina: "",
          tip: "",
          opis: "",
        },
        listaKomentara:{
          korisnickoIme: "",
          ocena: "",
          tekstKomentara: "",
        },
      },
      Slanje:{
        id:"",
        kolicina:"",
      },
      kolicina_artikla:"0",
    };
  },

  mounted: function () {

      fetch('http://localhost:8081/api/korisnik/izbor_restorana/' + this.$route.query.id, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PrikaziIzabraniRestoranDto = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

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

    dodajArtikalUKorpu : function(id,kolicina) {
        this.Slanje.id = id;
        this.Slanje.kolicina = Math.floor(kolicina);
        console.log(this.Slanje);
      fetch("http://localhost:8081/api/porudzbina/dodajArtikal", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.Slanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });
      }
  }

};

</script>

<style>


</style>