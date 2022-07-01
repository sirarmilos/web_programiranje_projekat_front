<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/kupacRestorani">Restorani</a>
        <a class="active" href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupackreiranjePorudzbine">Korpa</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">
    
      <div>

        <div class="mb-2 row">
            <label for="datumVreme" class="col-sm-2 col-form-label"> Datum vreme: </label>
            <div class="col-sm-4">
              <input v-model="datumVreme" id="datumVreme" type="text" class="form-control" name="datumVreme" required="required" readonly/>
            </div>
        </div>
        <br/>

        <div class="mb-2 row">
            <label for="cena" class="col-sm-2 col-form-label"> Cena: </label>
            <div class="col-sm-4">
              <input v-model="ukupnaCena" id="cena" type="text" class="form-control" name="cena" required="required" readonly/>
            </div>
        </div>
        <br/>

        <div class="mb-2 row">
            <label for="status" class="col-sm-2 col-form-label"> Status: </label>
            <div class="col-sm-4">
              <input v-model="status" id="status" type="text" class="form-control" name="status" required="required" readonly/>
            </div>
        </div>
        <br/>
    
      </div>
    
      <div class="table-responsive caption-top">
        <table class="table table-striped table-hover table-bordered border-secondary">
          
          <thead>
          <tr>
            <th>Naziv</th>
            <th>Cena</th>
            <th>Opis</th>
            <th>Kolicina</th>
          </tr>
          </thead>
          
          <tbody>
          <tr v-for="noviArtikal in listaNovihArtikala" :key="listaNovihArtikala.id"><!--noviArtikal.id-->
            <td>{{ noviArtikal.naziv }}</td>
            <td>{{ noviArtikal.cena }}</td>
            <td>{{ noviArtikal.opis }}</td>
            <td>{{ noviArtikal.kolicina }}</td>
          </tr>
          </tbody>

        </table>
      </div>

      
      <button class="btn btn-outline-secondary col-sm-5 mt-2 mb-3" v-on:click="postaniVidljiv(status)" style="max-width:300px;"><b>{{ tekstDugmeta }}</b></button>

      <div class="mt-4" v-if="vidljivo">

        <div class="col-sm-6">
          <label for="komentar" class="form-label">Mesto za Vas komentar</label>
          <textarea v-model="pom1" class="form-control" id="komentar" rows="4"></textarea>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljeOcena" class="col-sm-2 col-form-label"> Ocena: </label>
          <br/>
          <div class="col-sm-4">

            <div class="form-check">
              <input class="form-check-input" type="radio" id="jakoLose" value="JakoLose" v-model="izabran" />
              <label class="form-check-label" for="jakoLose">Jako loše</label>

              <br/>

              <input class="form-check-input" type="radio" id="lose" value="Lose" v-model="izabran" />
              <label class="form-check-label" for="lose">Loše</label>

              <br/>

              <input class="form-check-input" type="radio" id="dobro" value="Dobro" v-model="izabran" />
              <label class="form-check-label" for="dobro">Dobro</label>

              <br/>

              <input class="form-check-input" type="radio" id="veomaDobro" value="VeomaDobro" v-model="izabran" />
              <label class="form-check-label" for="veomaDobro">Veoma dobro</label>

              <br/>

              <input class="form-check-input" type="radio" id="odlicno" value="Odlicno" v-model="izabran" />
              <label class="form-check-label" for="odlicno">Odlično</label>

              <br/>
            </div>

          </div>
        </div>
        
        <div class="pb-5">
        <button class="btn btn-outline-secondary col-sm-5" v-on:click="proba(status, pom1, izabran)" style="max-width:300px;">
          <b>Posaljite komentar</b>
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
  name: "KupacPregledPojedinacnePorudzbineView",

  data: function () {
    return {
      listaNovihArtikala: {
        naziv: "",
        cena: "",
        opis: "",
        kolicina: "",
      },
      datumVreme: "",
      ukupnaCena: "",
      status: "",
      slanje: {
        ocena: "",
        tekstKomentara: "",
        korisnickoIme: "",
        restoran_id: "",
      },
      pom1: "",
      vidljivo: false,
      tekstDugmeta: "Kliknite za dodavanje komentara",
      izabran: "",
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobavi_porudzbinu/' + this.$route.query.id/*+ localStorage.name*/, {
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
          this.listaNovihArtikala = data;
          this.datumVreme = data[0].datumVreme;
          this.ukupnaCena= data[0].ukupnaCena;
          this.status = data[0].status;
          })
        .catch((error) => {
          console.error("Error:", error);
        });

  },

  methods: {

      postaniVidljiv : function(status) {

        if(status === "Dostavljena")
        {

        fetch('http://localhost:8081/api/nadji_restoran_po_id_porudzbini/' + this.$route.query.id , {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          //console.log("Success:", data);
          this.slanje.restoran_id = data;
          console.log(this.slanje.restoran_id);
          })
        .catch((error) => {
          console.error("Error:", error);
        });


        if(this.tekstDugmeta === "Kliknite za dodavanje komentara")
        {
          this.tekstDugmeta = "Kliknite za uklanjanje komentara";
          this.vidljivo = true;
          console.log(this.vidljivo);
        }
        else
        {
          this.tekstDugmeta = "Kliknite za dodavanje komentara";
          this.vidljivo = false;
          console.log(this.vidljivo);
        }
        }
        else
        {
          alert("Vasa porudzbina nije dostavljena. Kada se porudzbina dostavi, onda cete moci dodati komentar.")
        } 
      },

    proba : function(status, pom1, izabran)
    {

       if(status == "Dostavljena")
      {
        //this.slanje.restoran_id = 2;//;//porudzbina.restoranId;
        this.slanje.korisnickoIme = localStorage.name//"deki1976";//porudzbina.kupacKorisnickoIme;
        this.slanje.ocena = izabran;//"Lose";
        this.slanje.tekstKomentara = pom1;//"SUPER";
        //console.log(this.slanje.restoran_id);

        fetch("http://localhost:8081/api/dodavanje_komentara", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.slanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          //console.log(this.slanje);
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

      }
      else
      {
        alert("Ne mozete da posaljete komentar zato sto vasa porudzbina nije dostavljena.");
      }

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