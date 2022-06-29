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

    <p>Pregled porudzbina</p>

    <table id="listaPorudzbina">

        <tr>
          <!--<th>Id</th>-->
          <th>DatumVreme</th>
          <th>Cena</th>
          <th>Status</th>
          <th>Vise informacija</th>
         <!-- <th>Mesto za vas komentar</th>
          <th>Mesto za vasu ocenu</th>
          <th>Pošalji komentar</th>-->
        </tr>

        <tr v-for="porudzbina in listaPorudzbina" :key="listaPorudzbina.id">
          <!--<td>{{ porudzbina.id }}</td>-->
          <td>{{ porudzbina.datumVreme }}</td>
          <td>{{ porudzbina.cena }}</td>
          <td>{{ porudzbina.status }}</td>
          <td>
            <button class="dugmeViseInformacija" v-on:click="viseInformacija(porudzbina)">
              Vise informacija
            </button>
          </td>
         <!-- <td>
              <input v-model="pom1"/>
          </td>
          <td>
              <input v-model="pom2"/>
          </td>
          <td>
            <button class="dugmePosaljiKomentar" v-on:click="posaljiKomentar(porudzbina)">
              Pošalji komentar
            </button>
            <button v-on:click="proba(porudzbina, pom1, pom2)">
              Proba
            </button>
          </td>-->
        </tr>

    </table>
        <!-- napraviti tabelu kada se ucita stranica da se ucitaju u nju sve porudzbine od tog kupca koji je ulogovan-->
        <!-- pored svake stavke u tabeli da ima kao dugme pregled porudzbine, gde nas vodi na stranicu KupacPorudzbinaPrikazView, gde mozemo detaljnije da vidimo samo tu porudzbinu-->


    <!-- ispod ima dugme koje je kao kreiraj novu porudzbinu, gde nas vodi na novu stranicu KupacPorudzbinaKreiranjeView, gde moze korisnik da kreira novu porudzbinu, dodaje proizvode u nju ili brise pre samog kreiranja-->

</template>

<script>

export default {
  name: "KupacPorudzbineView",

  data: function () {
    return {
      listaPorudzbina:{
        id: "",
        datumVreme: "",
        cena: "",
        status: "",
        kupacKorisnickoIme: "",
        restoranId: "",
      },
      /*slanje: {
        ocena: "",
        tekstKomentara: "",
        korisnickoIme: "",
        restoran_id: "",
      },
      pom1: "",
      pom2: "",*/
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobaviSve' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.listaPorudzbina = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    /*posaljiKomentar : function(porudzbina) {

      fetch('http://localhost:8081/api/nadji_restoran_po_id_porudzbini/' + porudzbina.id , {
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

    },

    proba : function(porudzbina, pom1, pom2)
    {

       if(porudzbina.status == "Dostavljena")
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



    },*/

    viseInformacija : function(porudzbina) {
      this.$router.push("/kupacPregledPojedinacnePorudzbine/?id=" + porudzbina.id);
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