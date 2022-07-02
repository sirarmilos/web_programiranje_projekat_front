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
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
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

        <!--<div class="mb-2 row">
          <label for="prosecnaOcena" class="col-sm-2 col-form-label"> Prosecna ocena: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.prosecnaOcena" id="prosecnaOcena" type="text" class="form-control" name="prosecnaOcena" required="required" readonly/>
          </div>
        </div>
        <br/>-->

        <div class="mb-2 row ps-3">
        <div class="card p-3">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="review-count">Prosečna ocena:</h5>
                <div class="ratings">
                    <i id = "z1" class="fa fa-star"></i>
                    <i id = "z2" class="fa fa-star"></i>
                    <i id = "z3" class="fa fa-star"></i>
                    <i id = "z4" class="fa fa-star"></i>
                    <i id = "z5" class="fa fa-star"></i>
                </div>
                <div class="col-sm-4">
                  <input v-model="PrikaziIzabraniRestoranDto.prosecnaOcena" id="prosecnaOcena" type="text" class="form-control" name="prosecnaOcena" required="required" readonly/>
                </div>
            </div>
        </div>
        </div>

        <h1 class="page-header text-left pt-5 pb-5"> Asortiman artikala u ovom restorana: </h1>

        <!-- sada ovde trebaju da idu artikli i slike, ali posto ih nema, za sad ce ici samo tabela -->

       <div class="row row-cols-1 row-cols-md-3 g-4">

          <div class="col" v-for="artikal in PrikaziIzabraniRestoranDto.listaArtikala" :key="artikal.id">
            <div class="card">
              <img src="../../assets/1.png" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ artikal.naziv }}</h5>
                <p class="card-text">{{ artikal.opis }}</p>
              </div>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">Količina: {{ artikal.kolicina }}</li>
                <li class="list-group-item">Tip: {{ artikal.tip }}</li>
                <li class="list-group-item">Cena: {{ artikal.cena }}</li>
              </ul>
            </div>
          </div>

        </div>
        


      <!--  <div class="table-responsive caption-top">
          <table class="table table-striped table-hover table-bordered border-secondary">
            <caption style="caption-side: top;"><b>Spisak svih artikala iz restorana</b></caption>

            <thead>
            <tr>
              <th>Naziv artikla</th>
              <th>Cena artikla</th>
              <th>Kolicina</th>
              <th>Tip</th>
              <th>Opis</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="artikal in PrikaziIzabraniRestoranDto.listaArtikala" :key="artikal.id">
              <td>{{ artikal.naziv }}</td>
              <td>{{ artikal.cena }}</td>
              <td>{{ artikal.kolicina }}</td>
              <td>{{ artikal.tip }}</td>
              <td>{{ artikal.opis }}</td>
            </tr>
            </tbody>

          </table>

        </div>-->

        <section style="background-color: #f7f6f6;">
          <div class="container my-5 py-5 text-dark">
            <div class="row d-flex justify-content-center">
              <div class="col-md-12 col-lg-10 col-xl-8">

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h4 class="text-dark mb-0">Lista komentara ostalih korisnika</h4>
                  <div class="card">
                    <div class="card-body p-2 d-flex align-items-center">
                      <h6 class="text-primary fw-bold small mb-0 me-1">Comments "ON"</h6>
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                        <label class="form-check-label" for="flexSwitchCheckChecked"></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-body" v-for="komentar in PrikaziIzabraniRestoranDto.listaKomentara" :key="komentar.id">
                    <div class="d-flex flex-start">
                      <img class="rounded-circle shadow-1-strong me-3"
                        src="../../assets/logo.png" alt="avatar" width="40"
                        height="40" />
                      <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                          <h6 class="text-secondary fw-bold mb-0">
                            {{komentar.korisnickoIme}}
                            <span class="text-dark ms-5">{{ komentar.tekstKomentara }}</span>
                          </h6>
                          <p class="mb-0">{{ komentar.ocena }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <!--<div class="table-responsive caption-top">
          <table class="table table-striped table-hover table-bordered border-secondary">

            <thead>
            <tr>
              <th>#</th>
              <th>Komentator</th>
              <th>Ocena</th>
              <th>Tekst komentara</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="komentar in PrikaziIzabraniRestoranDto.listaKomentara" :key="komentar.id">
              <td>{{ komentar.basic }}</td>
              <td>{{ komentar.korisnickoIme }}</td>
              <td>{{ komentar.ocena }}</td>
              <td>{{ komentar.tekstKomentara }}</td>
            </tr>
            </tbody>

          </table>
        </div>-->

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
  name: "AdminDetaljanPrikazRestoranaView",

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
          naziv: "",
          cena: "",
          kolicina: "",
          tip: "",
          opis: "",
        },
        listaKomentara:{
          ocena: "",
          tekstKomentara: "",
        },
      },
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
        .then(data => {
          console.log("Success:", data);
          this.PrikaziIzabraniRestoranDto = data;

          if(this.PrikaziIzabraniRestoranDto.status === "RADI")
          {
            this.PrikaziIzabraniRestoranDto.status = "Restoran je otvoren"
          }
          if(this.PrikaziIzabraniRestoranDto.status === "NE_RADI")
          {
            this.PrikaziIzabraniRestoranDto.status = "Restoran trenutno ne radi"
          }
          
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena === "Nema nijedne ocene za ovaj restoran")
          {

          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena === "JakoLose")
          {
            document.getElementById("z1").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Jako lose"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena === "Lose")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Lose"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena === "Dobro")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            document.getElementById("z3").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Dobro"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena === "VeomaDobro")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            document.getElementById("z3").classList.add("rating-color");
            document.getElementById("z4").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Veoma dobro"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena === "Odlicno")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            document.getElementById("z3").classList.add("rating-color");
            document.getElementById("z4").classList.add("rating-color");
            document.getElementById("z5").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Odlicno"
          }
          
          })
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

  }

};

</script>

<style>


</style>