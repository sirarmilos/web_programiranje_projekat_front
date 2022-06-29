<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/dostavljacPocetna" >Pregled podataka</a>
        <a href="/dostavljacAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/dostavljacRestorani">Restorani</a>
        <a class="active" href="/dostavljacPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

    <p>Pregled porudzbina</p>

    <table id="listaPorudzbina">

        <tr>
          <th>DatumVreme</th>
          <th>Cena</th>
          <th>Status</th>
          <th>U transportu</th>
          <th>Dostavljen</th>
        </tr>

        <tr v-for="porudzbina in listaPorudzbina" :key="listaPorudzbina.id">
          <td>{{ porudzbina.datumVreme }}</td>
          <td>{{ porudzbina.cena }}</td>
          <td>{{ porudzbina.status }}</td>
          <td>
            <button v-on:click="dugmeTransport(porudzbina.id)">
              U transportu
            </button>
          </td>
          <td>
            <button v-on:click="dugmeDostavljena(porudzbina.id)">
              Dostavljena
            </button>
          </td>
        </tr>

    </table>

        <!-- napraviti tabelu kada se ucita stranica da se ucitaju u nju sve porudzbine od tog kupca koji je ulogovan-->
        <!-- pored svake stavke u tabeli da ima kao dugme pregled porudzbine, gde nas vodi na stranicu KupacPorudzbinaPrikazView, gde mozemo detaljnije da vidimo samo tu porudzbinu-->


    <!-- ispod ima dugme koje je kao kreiraj novu porudzbinu, gde nas vodi na novu stranicu KupacPorudzbinaKreiranjeView, gde moze korisnik da kreira novu porudzbinu, dodaje proizvode u nju ili brise pre samog kreiranja-->

</template>

<script>

export default {
  name: "DostavljacNjegovPrikazPorudzbinaView",

  data: function () {
    return {
      listaPorudzbina:{
        /*datumVreme: "",
        cena: "",
        status: "",*/
      },
    };
  },
  mounted: function () {

      // !!!!!!!!!!!!!
//?????????? mislim da ovde ne treba ovaj, nego novi end point, jer je ovo samo za kupca
      fetch('http://localhost:8081/api/porudzbina/dobaviZaDostavljaca' /*+ localStorage.name*/, {
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
          this.listaPorudzbina = data
          })
        .catch((error) => {
          console.error("Error:", error);
        });
  //}
  },

  methods: {

    dugmeTransport : function(id) {

      fetch("http://localhost:8081/api/porudzbina/izmenaStatusaUTransportu/" + id, {
          method: "PUT",
          credentials: 'include',
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json)
          .then((data) => {
            console.log("Success : " + data);
            window.location.reload();
          })
          .catch((err) => {
            console.log("Error : " + err);
            alert(err);
          });


    },

    dugmeDostavljena : function(id) {

          fetch("http://localhost:8081/api/porudzbina/izmenaStatusaDostavljena/" + id, {
          method: "PUT",
          credentials: 'include',
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json)
          .then((data) => {
            console.log("Success : " + data);
            window.location.reload();
          })
          .catch((err) => {
            console.log("Error : " + err);
            alert(err);
          });

    },


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