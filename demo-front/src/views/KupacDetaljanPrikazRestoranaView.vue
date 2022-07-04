<template>

    <div class="topnav">
        <a class="active" href="/kupacRestorani">Restorani</a>
        <a href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
        <a href="/kupackreiranjePorudzbine"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <div class="mb-2 row ps-3">
          <label for="restoranNaziv" class="col-sm-2 col-form-label"> Naziv restorana: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.restoran.naziv" id="restoranNaziv" type="text" class="form-control" name="restoranNaziv" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row ps-3">
          <label for="restoranTip" class="col-sm-2 col-form-label"> Tip restorana: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.restoran.tip" id="restoranTip" type="text" class="form-control" name="restoranTip" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row ps-3">
          <label for="adresaNaziv" class="col-sm-2 col-form-label"> Adresa restorana: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.lokacija.adresa" id="adresaNaziv" type="text" class="form-control" name="adresaNaziv" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row ps-3">
          <label for="adresaGDuzina" class="col-sm-2 col-form-label"> Adresa restorana - geografska dužina: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.lokacija.geografskaDuzina" id="adresaGDuzina" type="text" class="form-control" name="adresaGDuzina" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row ps-3">
          <label for="adresaGSirina" class="col-sm-2 col-form-label"> Adresa restorana - geografska širina: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.lokacija.geografskaSirina" id="adresaGSirina" type="text" class="form-control" name="adresaGSirina" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row ps-3">
          <label for="status" class="col-sm-2 col-form-label"> Status: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.status" id="status" type="text" class="form-control" name="status" required="required" readonly/>
          </div>
        </div>
        <br/>

        <div class="mb-2 row ps-3">
          <label for="prosecnaOcena" class="col-sm-2 col-form-label"> Prosečna ocena: </label>
          <div class="col-sm-4">
            <input v-model="PrikaziIzabraniRestoranDto.prosecnaOcena" id="prosecnaOcena" type="text" class="form-control" name="prosecnaOcena" required="required" readonly/>
          </div>
          <div class="ratings col-sm-4">
                    <i id = "z1" class="fa fa-star"></i>
                    <i id = "z2" class="fa fa-star"></i>
                    <i id = "z3" class="fa fa-star"></i>
                    <i id = "z4" class="fa fa-star"></i>
                    <i id = "z5" class="fa fa-star"></i>
          </div>
        </div>
        <br/>

        <div id="ovoJeAkoNije" hidden>
          <h1>{{poruka}}</h1>
        </div>

        <div id="ovoJeRestoran">

        <div class="mb-2 row pt-5 pb-5 ps-3">
          <label class="col-sm-8 col-form-label"><h2> Asortiman artikala u ovom restorana </h2></label>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">

          <div class="col" v-for="artikal in PrikaziIzabraniRestoranDto.listaArtikala" :key="artikal.id">
            <div class="card">
              <img src="../assets/1.png" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ artikal.naziv }}</h5>
                <p class="card-text">{{ artikal.opis }}</p>
              </div>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">Količina: {{ artikal.kolicina }}</li>
                <li class="list-group-item">Tip: {{ artikal.tip }}</li>
                <li class="list-group-item">Cena: {{ artikal.cena }}</li>

                <li class="list-group-item"><input v-bind:id="artikal.id" class="form-control w-50" type="number" placeholder="Unesite kolicinu"/></li>
              </ul>

              <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
              </svg>

                <div v-bind:id="jedinstveno(artikal.id)"  hidden>

                  <div class="alert alert-danger d-flex align-items-center w-75 ms-3 mt-2" role="alert" style="min-width:260px;">
                  <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                      {{porukaGreske}}
                    </div>
                  </div>

                </div>

                <div v-bind:id="jedinstveno2(artikal.id)" hidden>

                  <div class="alert alert-success d-flex align-items-center  w-75 ms-3 mt-2" role="alert" style="min-width:260px;">
                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                      {{porukaPotvrde}}
                    </div>
                  </div>

                </div>

              <div class="card-body">
                <a class="btn btn-outline-secondary col-sm-5" v-on:click="dodajArtikalUKorpu(artikal, artikal.id, kolicina_artikla)" style="max-width:150px;"><b>Dodaj</b></a>
              </div>
            </div>
          </div>

        </div>

        </div>



        <section style="background-color: #f7f6f6;">
          <div class="container my-5 py-5 text-dark">
            <div class="row d-flex justify-content-center">
              <div class="col-md-12 col-lg-10 col-xl-8">

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h4 class="text-dark mb-0">Lista komentara ostalih korisnika</h4>
                </div>

                <!--<div class="card">

                <div class="col-md-12 row" v-for="komentar in PrikaziIzabraniRestoranDto.listaKomentara" :key="komentar.id">

                  <div class="col-md-2 text-center">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                  </div>
                  
                  <div class="col-md-2">
                    {{komentar.korisnickoIme}}
                  </div>

                  <div class="col-md-6">
                    {{ komentar.tekstKomentara }}
                  </div>

                  <div class="col-md-2">
                    {{ komentar.ocena }}
                  </div>

                </div>

                </div>-->

                <div class="card mb-3">
                  <div class="card-body" v-for="komentar in PrikaziIzabraniRestoranDto.listaKomentara" :key="komentar.id">
                    <div class="d-flex flex-start">
                      <img class="rounded-circle shadow-1-strong me-3"
                        src="../assets/logo.png" alt="avatar" width="40"
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
        <a href="/dostavaZaCas"> DostavaZaCas.com </a>
      </div>

    </footer>

</template>

<script>
import axios from "axios"
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
        prosecnaOcena: "",
      },
      Slanje:{
        id:"",
        kolicina:"",
      },
      kolicina_artikla:"0",
      porukaGreske : "",
      porukaPotvrde: "",
      poruka: "",
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
          this.PrikaziIzabraniRestoranDto = data;

          if(this.PrikaziIzabraniRestoranDto.listaArtikala == "")
          {
            this.poruka = "Ovaj restoran nema artikle";
            document.getElementById("ovoJeRestoran").hidden = true;
            document.getElementById("ovoJeAkoNije").hidden = false;
          }
          
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
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Nema nijedne ocene za ovaj restoran";
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena == "Jako lose")
          {
            document.getElementById("z1").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Jako lose"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena == "Lose")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Lose"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena == "Dobro")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            document.getElementById("z3").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Dobro"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena == "Veoma dobro")
          {
            document.getElementById("z1").classList.add("rating-color");
            document.getElementById("z2").classList.add("rating-color");
            document.getElementById("z3").classList.add("rating-color");
            document.getElementById("z4").classList.add("rating-color");
            this.PrikaziIzabraniRestoranDto.prosecnaOcena = "Veoma dobro"
          }
          if(this.PrikaziIzabraniRestoranDto.prosecnaOcena == "Odlicno")
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
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
        });
      },

    jedinstveno : function(id) {
      return id+1000;
    },

    jedinstveno2 : function(id) {
      return id+10000000;
    },

    dodajArtikalUKorpu : function(artikal, id, kolicina) {
        localStorage.cuvanje = this.$route.query.id;
        this.Slanje.id = id;
        this.Slanje.kolicina = document.getElementById(id).value;
      axios
        .post("http://localhost:8081/api/porudzbina/dodajArtikal", this.Slanje,
        {
          withCredentials: true
        }).then((res) => {
          document.getElementById(this.jedinstveno(id)).hidden = true;
          document.getElementById(id).value = "";
          document.getElementById(this.jedinstveno2(id)).hidden = false;
          this.porukaPotvrde = "Uspesno ste ubacili " + this.Slanje.kolicina + " komada " + artikal.naziv + " u svoju korpu.";
          setTimeout(() => {
            document.getElementById(this.jedinstveno2(id)).hidden = true;
          }, 2500);
          
        })
        .catch((err) => {
          document.getElementById(this.jedinstveno2(id)).hidden = true;
          this.porukaGreske = err.request.response;
          document.getElementById(id).value = "";
          document.getElementById(id).focus();
          document.getElementById(id).porukaGreske = this.porukaGreske;
          document.getElementById(this.jedinstveno(id)).hidden = false;
          setTimeout(() => {
            document.getElementById(this.jedinstveno(id)).hidden = true;
          }, 2500);
        });   
    },
    

  /*  dodajArtikalUKorpu : function(id,kolicina) {
        localStorage.cuvanje = this.$route.query.id;
        this.Slanje.id = id;
        this.Slanje.kolicina = Math.floor(kolicina);
      fetch("http://localhost:8081/api/porudzbina/dodajArtikal", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.Slanje),
      })
        //.then((response) => response.json)
        .then(function(response) {
          if(response.status === 403)
          {
            alert("Greska! Ne mozete uneti broj proizvoda manji od 0!");
          }
          else
          {
            return response;
          }
        })
        .then((data) => {
        })
        .catch((err) => {
          alert(err);
        });
      }*/
  }

};

</script>

<style>

.ratings{
    margin-right:10px;
}
.ratings i{
    
    color:#cecece;
    font-size:32px;
}

.rating-color{
    color:#fbc634 !important;
}

.review-count{
    font-weight:400;
    margin-bottom:2px;
    font-size:24px !important;
}

.link-grey { color: #aaa; } .link-grey:hover { color: #00913b; }

</style>