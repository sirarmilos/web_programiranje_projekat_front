<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/kupacRestorani">Restorani</a>
        <a class="active" href="/kupacPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <!-- kao za tu porudzbinu pregled svih artikala u toj porudzbini i svega toga-->

    <label for="datumVreme"> Datum vreme: </label>
    <input v-model="datumVreme" id="datumVreme" type="text" name="datumVreme" required="required" readonly/>
    <br/>

    <label for="cena"> Cena: </label>
    <input v-model="ukupnaCena" id="cena" type="text" name="cena" required="required" readonly/>
    <br/>

    <label for="status"> Status: </label>
    <input v-model="status" id="status" type="text" name="status" required="required" readonly/>
    
    <br/>

    <table>
      <tr>
        <th>Naziv</th>
        <th>Cena</th>
        <th>Opis</th>
        <th>Kolicina</th>
      </tr>
      
      <tr v-for="noviArtikal in listaNovihArtikala" :key="listaNovihArtikala.id"><!--noviArtikal.id-->
        <td>{{ noviArtikal.naziv }}</td>
        <td>{{ noviArtikal.cena }}</td>
        <td>{{ noviArtikal.opis }}</td>
        <td>{{ noviArtikal.kolicina }}</td>
      </tr>
    </table>
    
    <button v-on:click="postaniVidljiv()">{{ tekstDugmeta }}</button>

<div v-if="vidljivo">
    <label for="komentar"> Mesto za vas komentar </label>
    <input v-model="pom1" id="komentar"/>
    <label for="ocena"> Mesto za vasu ocenu </label>
    <input v-model="pom2" id="ocena"/>

   <!-- <button class="dugmePosaljiKomentar" v-on:click="posaljiKomentar()">
      Pošalji komentar
    </button>-->
    <button v-on:click="proba(status, pom1, pom2)">
      Proba
    </button>
  </div>
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
      pom2: "",
      vidljivo: false,
      tekstDugmeta: "Kliknite za dodavanje komentara",
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
        //body: JSON.stringify(this.logovanjeSlanje),

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

      postaniVidljiv : function() {

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
      },

      /*posaljiKomentar : function() {
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
          })
        .catch((error) => {
          console.error("Error:", error);
        });

    },*/

    proba : function(status, pom1, pom2)
    {

       if(status == "Dostavljena")
      {
        //this.slanje.restoran_id = 2;//;//porudzbina.restoranId;
        this.slanje.korisnickoIme = localStorage.name//"deki1976";//porudzbina.kupacKorisnickoIme;
        this.slanje.ocena = pom2;//"Lose";
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