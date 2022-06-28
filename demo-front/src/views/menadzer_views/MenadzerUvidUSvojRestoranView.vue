<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a class="active" href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a href="/menadzerPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

        <p> Ovo je moj restoran </p>

        <label for="restoranNaziv"> Naziv restorana: </label>
        <input v-model="PrikaziIzabraniRestoranDto.restoran.naziv" id="restoranNaziv" type="text" name="restoranNaziv" required="required" readonly/>
        <br/>

        <label for="restoranTip"> Tip restorana: </label>
        <input v-model="PrikaziIzabraniRestoranDto.restoran.tip" id="restoranTip" type="text" name="restoranTip" required="required" readonly/>
        <br/>

        <label for="adresaNaziv"> Adresa restorana: </label>
        <input v-model="PrikaziIzabraniRestoranDto.lokacija.adresa" id="adresaNaziv" type="text" name="adresaNaziv" required="required" readonly/>

        <br/>
        
        <label for="adresaGDuzina"> Adresa restorana - geografskaDuzina: </label>
        <input v-model="PrikaziIzabraniRestoranDto.lokacija.geografskaDuzina" id="adresaGDuzina" type="text" name="adresaGDuzina" required="required" readonly/>

        <br/>
        
        <label for="adresaGSirina"> Adresa restorana - geografskaSirina: </label>
        <input v-model="PrikaziIzabraniRestoranDto.lokacija.geografskaSirina" id="adresaGSirina" type="text" name="adresaGSirina" required="required" readonly/>

        <br/>
        
        <label for="status"> Status: </label>
        <input v-model="PrikaziIzabraniRestoranDto.status" id="status" type="text" name="status" required="required" readonly/>

        <br/>

        <label for="prosecnaOcena"> Prosecna ocena: </label>
        <input v-model="PrikaziIzabraniRestoranDto.prosecnaOcena" id="prosecnaOcena" type="text" name="prosecnaOcena" required="required" readonly/>

        <br/>

        <table id="listaArtikala">

          <tr>
            <th>Naziv artikla</th>
            <th>Cena artikla</th>
            <th>Kolicina</th>
            <th>Tip</th>
            <th>Opis</th>
            <th>Obriši artikal</th>
            <th>Ažuriraj artikal</th>
          </tr>

          <tr v-for="artikal in PrikaziIzabraniRestoranDto.listaArtikala" :key="artikal.id">
            <td>{{ artikal.naziv }}</td>
            <td>{{ artikal.cena }}</td>
            <td>{{ artikal.kolicina }}</td>
            <td>{{ artikal.tip }}</td>
            <td>{{ artikal.opis }}</td>
            <td><button v-on:click="obrisiArtikal(artikal.id)"> Obriši artikal</button></td>
            <td><button v-on:click="azurirajArtikal(artikal.id)"> Ažuriraj artikal</button></td>
          </tr>

        </table>

        <table id="komentari">

          <tr>
            <th>Ocena</th>
            <th>Tekst komentara</th>
          </tr>

          <tr v-for="komentar in PrikaziIzabraniRestoranDto.listaKomentara" :key="komentar.id">
            <td>{{ komentar.ocena }}</td>
            <td>{{ komentar.tekstKomentara }}</td>
          </tr>

        </table>

    <!-- sve podatke prikazi o jednom restoranu, vidi preko Postman-a sve podatke koji dolaze-->

</template>

<script>

export default {
  name: "MenadzerUvidUSvojRestoran",

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

    /// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /// UMESTO this.$route.query.id TREBA STAVITI ID OD RESTORANA U KOME RADI TAJ MENADZER
      fetch('http://localhost:8081/api/korisnik/izbor_restorana/' + localStorage.name, {
        ///fetch('http://localhost:8081/api/menadzer/pregled_restorana', {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PrikaziIzabraniRestoranDto = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    obrisiArtikal : function(id) {
        // ne treba nova stranica, samo ga ovde obrises iz baze, tj pozoves odgovarajuci end point da to uradi i refresujes stranicu da se izbrise i iz tabele u kojoj se ovde prikazuju artikli

      fetch("http://localhost:8081/api/menadzer/obrisi_artikal/" + id, {
        method: "DELETE",
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      });


    },

    azurirajArtikal : function(id) {
      
      this.$router.push("/menadzerAzuriranjeArtikla?id=" + id);
        //this.$router.push("asdasd"); // posalji ga na stranicu za azuriranje artikla, vidi da prosledis id artikla da se zna o kom je rec i da prilikom ucitavanja stranice azuriranje artikla, budu ucitani pocetni podaci
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

      },

  }

};

</script>

<style>

.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

</style>