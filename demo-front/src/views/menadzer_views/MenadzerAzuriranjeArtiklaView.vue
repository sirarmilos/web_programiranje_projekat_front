<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
    </div>


    <div class="container-fluid w-100 p-3 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <h1 class="page-header text-center pt-5 pb-5"> Ovde možete da ažurirate podatke o proizvodu </h1>

        <div class="mb-3 row">
          <label for="poljeNaziv" class="col-sm-2 col-form-label"> Naziv: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.naziv" id="poljeNaziv" type="text" class="form-control" name="poljeNaziv" required="required"/>
          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljeTip" class="col-sm-2 col-form-label"> Tip: </label>
          <div class="col-sm-4">

            <div class="form-check">
              <input class="form-check-input" type="radio" id="jelo" value="Jelo" v-model="PodaciZaSlanje.tip" />
              <label class="form-check-label" for="jelo">Jelo</label>
              <br/>
              <input class="form-check-input" type="radio" id="pice" value="Pice" v-model="PodaciZaSlanje.tip" />
              <label class="form-check-label" for="pice">Piće</label>
              <br/>
            </div>

          </div>
        </div>

        <br/>

        <div class="mb-2 row">
          <label for="poljeKolicina" class="col-sm-2 col-form-label"> Količina: </label>
          <div class="col-sm-4">

            <div class="form-check">
              <input class="form-check-input" type="radio" id="g" value="g" v-model="PodaciZaSlanje.kolicina" />
              <label class="form-check-label" for="g">g</label>
              <br/>
              <input class="form-check-input" type="radio" id="ml" value="ml" v-model="PodaciZaSlanje.kolicina" />
              <label class="form-check-label" for="ml">ml</label>
              <br/>
            </div>

          </div>
        </div>

        <div class="mb-3 row">
          <label for="poljeCena" class="col-sm-2 col-form-label"> Cena: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.cena" id="poljeCena" type="text" class="form-control" name="poljeCena" required="required"/>
          </div>
        </div>

        <div class="mb-5 row">
          <label for="poljeOpis" class="col-sm-2 col-form-label"> Opis: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.opis" id="poljeOpis" type="text" class="form-control" name="poljeOpis" required="required"/>
          </div>
        </div>

        <div class="pb-5">
        <button class="btn btn-outline-secondary col-sm-4" v-on:click="izvrsiAzuriranje()" style="max-width:165px;">
            <b>Potvrda ažuriranja</b>
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
  name: "MenadzerAzuriranjeArtiklaView",

  data: function () {
    return {
      PodaciZaSlanje: {
        id: "",
        naziv: "",
        tip: "",
        kolicina: "",
        cena: "",
        opis: "",
      },
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/menadzer/pregled_pojedinacnog_artikla/' + this.$route.query.id, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PodaciZaSlanje = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

 methods: {

    izvrsiAzuriranje : function() {

      fetch("http://localhost:8081/api/menadzer/azuriranje_artikla", {
        method: "PUT",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.PodaciZaSlanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          console.log(JSON.stringify(this.PodaciZaSlanje));

          this.$router.push("/menadzerNjegovRestoran");
        })
        .catch((err) => {
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

      }

  },
  
};

</script>

<style>

</style>