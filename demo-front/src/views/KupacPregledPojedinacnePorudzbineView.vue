<template>

    <div class="topnav">
        <a href="/kupacRestorani">Restorani</a>
        <a class="active" href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
        <a href="/kupackreiranjePorudzbine"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a>
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
    
      <div class="table-responsive caption-top col-md-8 pt-5" style="margin: 0 auto; display:block;">
        <table class="table table-striped table-hover table-bordered border-secondary">
          
          <thead>
          <tr class="text-center">
            <th>#</th>
            <th>Naziv</th>
            <th>Cena</th>
            <th>Opis</th>
            <th>Kolicina</th>
          </tr>
          </thead>
          
          <tbody>
          <tr class="text-center" v-for="noviArtikal in listaNovihArtikala" :key="listaNovihArtikala.id"><!--noviArtikal.id-->
            <td>{{ noviArtikal.Basic }}</td>
            <td>{{ noviArtikal.naziv }}</td>
            <td>{{ noviArtikal.cena }}</td>
            <td>{{ noviArtikal.opis }}</td>
            <td>{{ noviArtikal.kolicina }}</td>
          </tr>
          </tbody>

        </table>
      </div>

      <div class="col-md-12 text-center" style="margin: 0 auto; display: block;">
        <button id="dugmePostaniVidljiv" class="btn btn-outline-secondary col-sm-5 mt-5 mb-5" v-on:click="postaniVidljiv(status)" style="max-width:300px;"><b>{{ tekstDugmeta }}</b></button>
      </div>

        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>

        <div id="prozorGreski" class="pb-3" hidden>

          <div class="alert alert-danger d-flex align-items-center w-50 centriranje" role="alert" style="min-width:700px; max-width:700px;">
          <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              {{porukaGreske}}
            </div>
          </div>

        </div>

      <div class="mt-5 mb-5 w-50" v-if="vidljivo" style="margin: 0 auto; display: block; border: 2px solid white;">
        <div class="panel">
          <div class="panel-body p-2" >
            <textarea class="form-control" rows="5" placeholder="Napisite svoje misljenje o ovoj porudzbini" v-model="pom1"></textarea>
            <label for="poljeOcena" class="col-sm-2 col-form-label pt-4" style="margin: 0 auto; display: block;"> <h4>Ocena</h4> </label>
            <br/>
            <div class="col-sm-4" style="margin: 0 auto; display: block;">

              <div class="form-check">
                <input class="form-check-input" type="radio" id="jakoLose" value="JakoLose" v-model="izabran" />
                <label class="form-check-label pb-1" for="jakoLose">Jako loše</label>

                <br/>

                <input class="form-check-input" type="radio" id="lose" value="Lose" v-model="izabran" />
                <label class="form-check-label pb-1" for="lose">Loše</label>

                <br/>

                <input class="form-check-input" type="radio" id="dobro" value="Dobro" v-model="izabran" checked/>
                <label class="form-check-label pb-1" for="dobro">Dobro</label>

                <br/>

                <input class="form-check-input" type="radio" id="veomaDobro" value="VeomaDobro" v-model="izabran" />
                <label class="form-check-label pb-1" for="veomaDobro">Veoma dobro</label>

                <br/>

                <input class="form-check-input" type="radio" id="odlicno" value="Odlicno" v-model="izabran" />
                <label class="form-check-label pb-1" for="odlicno">Odlično</label>

                <br/>
              </div>

          </div>
          
          <div class="mar-top clearfix pt-4 pb-2">
            <button class="btn btn-outline-secondary col-sm-2" v-on:click="posaljiP(status, pom1, izabran)" style="min-width:200px; max-width:200px; margin: 0 auto; display: block;"><i class="fa fa-pencil fa-fw"></i> <b>Posaljite komentar</b> </button>
          </div>

        </div>
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
        <a href="/dostavaZaCas"> DostavaZaCas.com </a>
      </div>

    </footer>

</template>

<script>
import axios from "axios";
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
      porukaGreske : "",
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobavi_porudzbinu/' + this.$route.query.id, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.listaNovihArtikala = data;
          this.datumVreme = data[0].datumVreme;
          this.ukupnaCena= data[0].ukupnaCena;

            if(data[0].status === "Obrada")
            {
              this.status = "Obrada";
            }
            if(data[0].status === "UPripremi")
            {
              thisstatus = "U pripremi";
            }
            if(data[0].status === "CekaDostavljaca")
            {
              this.status= "Ceka dostavljaca";
            }
            if(data[0].status === "UTransportu")
            {
              this.status = "U transportu";
            }
            if(data[0].status === "Dostavljena")
            {
              this.status = "Dostavljena";
            }
          })
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

      postaniVidljiv : function(status) {

        axios
        .get("http://localhost:8081/api/nadji_restoran_po_id_porudzbini/" + this.$route.query.id,
        {
          withCredentials: true
        })
        .then((res) => {
          this.slanje.restoran_id = res.data;
          document.getElementById("prozorGreski").hidden = true;
          document.getElementById("dugmePostaniVidljiv").hidden = true;
          this.vidljivo = true;

        })
        .catch((err) =>{
          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;
          setTimeout(() => {
            document.getElementById("prozorGreski").hidden = true;
          }, 1500);

        })

        /*if(status === "Dostavljena")
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
        }*/ 
      },

    posaljiP : function(status, pom1, izabran)
    {
        this.slanje.korisnickoIme = localStorage.name;
        this.slanje.ocena = izabran;
        this.slanje.tekstKomentara = pom1;
      axios
        .post("http://localhost:8081/api/dodavanje_komentara", this.slanje,
                {
          withCredentials: true
        })
        .then((res) => {
          alert(res.data);
          this.$router.push("/kupacPorudzbine");
        })
        .catch((err) => {
          console.log(err);
        });


/*       if(status == "Dostavljena")
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
      }*/

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