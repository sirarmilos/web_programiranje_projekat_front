<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/menadzerNjegovRestoran">Moj restoran</a>
        <a class="active" href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <p>
        Ovde možete da ažurirate podatke o proizvodu
    </p>
<!-- naziv, kolicina, cena, opis, tip-->
    <!--<form method="post">-->

        <label for="naziv"> Naziv: </label>
        <input v-model="PodaciZaSlanje.naziv" id="naziv" type="text" name="naziv"/>
        <br/>

        <!--<label for="tip"> Tip: </label>
        <input v-model="PodaciZaSlanje.tip" id="tip" type="text" name="tip"/>
        <br/>-->

        <label>Tip:</label>
        <br/>
        <input type="radio" id="jelo" value="Jelo" v-model="PodaciZaSlanje.tip" checked="checked"/>
        <label for="jelo">Jelo</label>
        <br/>
        <input type="radio" id="pice" value="Pice" v-model="PodaciZaSlanje.tip" />
        <label for="pice">Piće</label>
        <br/>

        <!--<label for="kolicina"> Količina: </label>
        <input v-model="PodaciZaSlanje.kolicina" id="kolicina" type="text" name="kolicina"/>
        <br/>-->

        <label>Količina:</label>
        <br/>
        <input type="radio" id="g" value="g" v-model="PodaciZaSlanje.kolicina" checked="checked"/>
        <label for="g">g</label>
        <br/>
        <input type="radio" id="ml" value="ml" v-model="PodaciZaSlanje.kolicina" />
        <label for="ml">ml</label>
        <br/>

        <label for="cena"> Cena: </label>
        <input v-model="PodaciZaSlanje.cena" id="cena" type="text" name="cena"/>
        <br/>
        
        <label for="opis"> Opis: </label>
        <input v-model="PodaciZaSlanje.opis" id="opis" type="text" name="opis"/>
        <br/>

        <button v-on:click="izvrsiDodavanje()">
            Dodaj novi artikal
        </button>

    <!--</form>-->

</template>

<script>

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
    };
  },

 methods: {

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
        //body: JSON.stringify(this.korisnik),
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