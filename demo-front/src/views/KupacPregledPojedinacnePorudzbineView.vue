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
    <input v-model="porudzbina.datumVreme" id="datumVreme" type="text" name="datumVreme" required="required" readonly/>
    <br/>

    <label for="cena"> Cena: </label>
    <input v-model="porudzbina.cena" id="cena" type="text" name="cena" required="required" readonly/>
    <br/>

    <label for="status"> Status: </label>
    <input v-model="porudzbina.status" id="status" type="text" name="status" required="required" readonly/>
    <br/>

    <!--<table id="listaArtikala">

        <tr>
          <th>Naziv</th>
          <th>Cena</th>
          <th>Opis</th>
          <th>Kolicina</th>
        </tr>
        <tr>
          <th> Id</th>
          <th> Kolicina </th>
        </tr>

        <button v-on:click="funkcija(porudzbina.porudzbineArtikli)"> dd </button>

     <tr v-for="artikal in porudzbinaBolje" :key="porudzbina.porudzbineArtikli.id" id="tabela">
         <td> <input v-model="porudzbinaBolje.naziv" id="nesto" type="text" name="nesto" required="required" readonly /> </td>
          <td> <input v-model="porudzbinaBolje.cena" id="nesto" type="text" name="nesto" required="required" readonly /> </td>
          <td> <input v-model="porudzbinaBolje.opis" id="nesto" type="text" name="nesto" required="required" readonly /> </td>
         
          <td id="polje1">{{ artikal.id}}</td>
          <td>{{ artikal.kolicina }}</td>
        </tr> 
        <p v-on:load="dobaviArtikalPoId(1)"></p>
        <button v-on:click="dobaviArtikalPoId(1)">1</button>
        <button v-on:click="dobaviArtikalPoId(2)">2</button>
        
  <label for="nesto"> Nesto: </label>
    <input v-model="nasaPromenljiva.naziv" id="nesto" type="text" name="nesto" required="required" readonly/>
    <br/>
    </table>-->

    <br/>

    <table>
      <tr>
        <th>Id</th>
        <th>Kolicina</th>
      </tr>
      <tr v-for="artikal in porudzbina.porudzbineArtikli" :key="porudzbina.porudzbineArtikliid" id="tabela">
       <!-- <td>{{ artikal.id}}</td>
        <td>{{ artikal.kolicina }}</td>-->
        <input v-on:click="kliknuo(artikal.id, artikal.kolicina)" v-model="artikal.id"/>
        <input v-model="artikal.kolicina"/>
        <button v-on:click="kliknuo(artikal.id)">
          Kliknuo
        </button>
      </tr>
    </table>
    
    <br/> <br/>

    <table>
      <tr>
        <th>Ja</th>
        <th>Naziv</th>
        <th>Cena</th>
        <th>Opis</th>
        <th>Kolicina</th>
      </tr>
      
      <tr v-for="noviArtikal in listaNovihArtikala" :key="listaNovihArtikala.id">
        <input v-model="noviArtikal.naziv" />
        <td>{{ noviArtikal.naziv }}</td>
        <td>{{ noviArtikal.cena }}</td>
        <td>{{ noviArtikal.opis }}</td>
        <td>{{ noviArtikal.kolicina }}</td>
      </tr>
    </table>




</template>

<script>

export default {
  name: "KupacPregledPojedinacnePorudzbineView",

  data: function () {
    return {
      porudzbina:{
        porudzbineArtikli:{
          id: "",
          kolicina: "",
        },
      },
      listaNovihArtikala:[
       { naziv: "",
        cena: "",
        opis: "",
        kolicina: "",}
      ],
      /*nasaPromenljiva: {
        naziv: "",
        cena: "",
        opis: "",
        kolicina: "",
      },
      porudzbineVracene: {
        naziv: "",
        cena: "",
        opis: "",
      }*/
     /* porudzbinaBolje:[
        {naziv: ""},
        {cena: ""},
        {opis: ""},
        ],*//*{
        naziv: "",
        cena: "",
        opis: "",
      }*/
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobaviPorudzbinu/' + this.$route.query.id/*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.porudzbina = data})
        .catch((error) => {
          console.error("Error:", error);
        });

  },

  methods: {

    kliknuo : function(id, kolicina) {
      
      fetch('http://localhost:8081/api/pretraga_artikla_po_id/' + id, {
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
          this.listaNovihArtikala.push(data);
          console.log(kolicina);

          console.log(this.listaNovihArtikala[0]);
          console.log(this.listaNovihArtikala[1]);
          console.log(id);

         })
        .catch((error) => {
          console.error("Error:", error);
        });

    },



















    /*funkcija : function(porudzbineArtikli)
    {

      for(var i = 0; i < 2; i++)
      {
        var pomocnaListaArtikala = new Array();
        pomocnaListaArtikala = porudzbineArtikli;//document.getElementById("polje1");
        /*console.log(pomocnaListaArtikala);
        console.log(pomocnaListaArtikala[i].id);
        console.log(pomocnaListaArtikala[i].kolicina);
        console.log(i);
        

        fetch('http://localhost:8081/api/pretraga_artikla_po_id/' + pomocnaListaArtikala[i].id, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.porudzbinaBolje.push(data);})
        .catch((error) => {
          console.error("Error:", error);
        });




      }

      for(var i = 0; i < 2; i++)
      {
        console.log("Porudzbina bolje: " + this.porudzbinaBolje[1].naziv);

      }
    },*/

    dobaviArtikalPoId : function(artikal){

      fetch('http://localhost:8081/api/pretraga_artikla_po_id/' + artikal/*this.$route.query.id*//*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.nasaPromenljiva = data})
        .catch((error) => {
          console.error("Error:", error);
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