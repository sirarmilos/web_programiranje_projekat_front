<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/menadzerNjegovRestoran">Moj restoran</a>
        <a class="active" href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 p-3 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <h1 class="page-header text-center pt-5 pb-5"> Ovde možete da dodate novi artikal </h1>


        <div>
          <div class="container">
              <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                  <div class="form-group">
                      <input type="file" @change="onFileUpload($event)">
                  </div>
                  <br/>
                  <div class="form-group">
                      <input type="text" v-model="PodaciZaSlanje.naziv" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                      <input type="text" v-model="PodaciZaSlanje.tip" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                      <input type="text" v-model="PodaciZaSlanje.cena" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                      <input type="text" v-model="PodaciZaSlanje.kolicina" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                      <input type="text" v-model="PodaciZaSlanje.opis" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                      <button class="btn btn-primary btn-block btn-lg" type="submit">Upload File</button>
                  </div>
                  <br/>
              </form>
          </div>    
        </div>



     <!--   <form th:action="@{/api/menadzer/dodavanje_novog_artikla}"
          th:object="${PodaciZaSlanje}" method="post"
          enctype="multipart/form-data"
          >
          <div>
          
          <label>Photos: </label>
          <input type="image" name="image" accept="image/png, image/jpeg" />
          
          </div>

          <input type="submit" value="Submit">

        </form>
-->
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
              <input class="form-check-input" type="radio" id="jelo" value="Jelo" v-model="PodaciZaSlanje.tip" checked="checked" />
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
              <input class="form-check-input" type="radio" id="g" value="g" v-model="PodaciZaSlanje.kolicina" checked="checked" />
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

        <div class="mb-3 row">
          <label for="poljeOpis" class="col-sm-2 col-form-label"> Opis: </label>
          <div class="col-sm-4">
            <input v-model="PodaciZaSlanje.opis" id="poljeOpis" type="text" class="form-control" name="poljeOpis" required="required"/>
          </div>
        </div>

        <div class="pt-5 pb-5">
        <button class="btn btn-outline-secondary col-sm-4" v-on:click="izvrsiDodavanje()" style="max-width:165px;">
            <b>Dodaj novi artikal</b>
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
import axios from "axios"
export default {
  name: "MenadzerDodavanjeNovogArtiklaView",

  data: function () {
    return {
      PodaciZaSlanje: {
        naziv: "",
        tip: "",
        kolicina: "",
        cena: "",
        opis: "",
      },
      FILE: null,
    };
  },

 methods: {

    onFileUpload (event) {
          this.FILE = event.target.files[0] // 
          console.log(this.FILE)
        },
        onSubmit() {
          // upload file
          const formData = new FormData()
          formData.set('image', this.FILE, this.FILE.name)
          formData.set("json", JSON.stringify(this.PodaciZaSlanje))

         /* formData.append('naziv', this.PodaciZaSlanje.naziv)
          formData.append('tip', this.PodaciZaSlanje.tip)
          formData.append('kolicina', this.PodaciZaSlanje.kolicina)
          formData.append('cena', this.PodaciZaSlanje.cena)
          formData.append('opis', this.PodaciZaSlanje.opis)*/
          console.log(formData);
          axios.post('http://localhost:8081/api/menadzer/dodavanje_novog_artikla', formData, {
            headers: {
            "Content-Type": "multipart/form-data",
          },
            withCredentials: true
          }).then((res) => {
            console.log(res)
          })
        }, 


    izvrsiDodavanje : function() {

      if(this.PodaciZaSlanje.naziv == "" || this.PodaciZaSlanje.cena == "" || this.PodaciZaSlanje.tip == "")
      {
        console.log("greska");
      }
      else if(isNaN(this.PodaciZaSlanje.cena) == true)
      {
        console.log("nije broj");
      }
      else
      {

      fetch("http://localhost:8081/api/menadzer/dodavanje_novog_artikla", {
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
          console.log("Success : " + data);
          console.log(data.response);
          this.$router.push("/menadzerNjegovRestoran");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

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