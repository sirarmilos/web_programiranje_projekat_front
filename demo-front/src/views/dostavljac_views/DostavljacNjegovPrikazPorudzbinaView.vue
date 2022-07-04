<template>

    <div class="topnav">
        <a class="active" href="/dostavljacPorudzbine">Porudžbina</a>
        <a href="/dostavljacRestorani">Restorani</a>
        <a href="/dostavljacPocetna" >Pregled podataka</a>
        <a href="/dostavljacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()"  style="color:white;">Izloguj se</a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100 pb-4" style="background-color: #eee; border: 5px solid white;">
        
          <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
              <table id="tabela1" class="table table-striped table-hover table-bordered border-secondary">
                <caption style="caption-side: top;"><b>Spisak svih porudzbina</b></caption>
                <thead>
                <tr class="text-center">
                  <th>#</th>
                  <th>DatumVreme</th>
                  <th>Cena</th>
                  <th>Status</th>
                  <th>U transportu</th>
                  <th>Dostavljen</th>
                </tr>
                </thead>

                <tbody>

                <tr class="text-center" v-for="porudzbina in listaPorudzbina" :key="listaPorudzbina.id">
                  <td>{{ porudzbina.Basic }}</td>
                  <td>{{ porudzbina.datumVreme }}</td>
                  <td>{{ porudzbina.cena }}</td>
                  <td>{{ porudzbina.status }}</td>
                  <td>
                    <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="dugmeTransport(porudzbina.id)" style="min-width:125px; max-width:150px;">
                    <b> U transportu </b>
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="dugmeDostavljena(porudzbina.id)" style="min-width:105px; max-width:150px;">
                    <b> Dostavljen </b>
                    </button>
                  </td>
                </tr>
                </tbody>

              </table>
          </div>

        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>

        <div id="prozorGreski" class="pt-3 pb-3" hidden>

          <div class="alert alert-danger d-flex align-items-center w-50 centriranje" role="alert" style="min-width:200px; max-width:350px;">
          <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              {{porukaGreske}}
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
            <a href="/"> DostavaZaCas.com </a>
          </div>

        </footer>

</template>

<script>
import axios from "axios";
export default {
  name: "DostavljacNjegovPrikazPorudzbinaView",

  data: function () {
    return {
      listaPorudzbina:{
      },
      porukaGreske : "",
    };
  },
  mounted: function () {

      axios
      .get("http://localhost:8081/api/porudzbina/dobaviZaDostavljaca",
      {
        withCredentials: true
      }).then((res) => {
        if(res.data[0] === undefined)
        {
          document.getElementById("prozorGreski").hidden = false;
          document.getElementById("tabela1").hidden = true;
          this.porukaGreske = "Nemate nijednu dostupnu porudzbinu";
        }
        else
        {
          document.getElementById("prozorGreski").hidden = true;
          document.getElementById("tabela1").hidden = false;
          this.listaPorudzbina = res.data;
          for(var i = 0; i < this.listaPorudzbina.length; i++)
          {
            if(this.listaPorudzbina[i].status === "Obrada")
            {
              this.listaPorudzbina[i].status = "Obrada";
            }
            if(this.listaPorudzbina[i].status === "UPripremi")
            {
              this.listaPorudzbina[i].status = "U pripremi";
            }
            if(this.listaPorudzbina[i].status === "CekaDostavljaca")
            {
              this.listaPorudzbina[i].status = "Ceka dostavljaca";
            }
            if(this.listaPorudzbina[i].status === "UTransportu")
            {
              this.listaPorudzbina[i].status = "U transportu";
            }
            if(this.listaPorudzbina[i].status === "Dostavljena")
            {
              this.listaPorudzbina[i].status = "Dostavljena";
            }
            
          }
        }
      })
      .catch((err) =>{
        console.log(err)
      })

      /*fetch('http://localhost:8081/api/porudzbina/dobaviZaDostavljaca', {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          this.listaPorudzbina = data;
          for(var i = 0; i < this.listaPorudzbina.length; i++)
          {
            if(this.listaPorudzbina[i].status === "Obrada")
            {
              this.listaPorudzbina[i].status = "Obrada";
            }
            if(this.listaPorudzbina[i].status === "UPripremi")
            {
              this.listaPorudzbina[i].status = "U pripremi";
            }
            if(this.listaPorudzbina[i].status === "CekaDostavljaca")
            {
              this.listaPorudzbina[i].status = "Ceka dostavljaca";
            }
            if(this.listaPorudzbina[i].status === "UTransportu")
            {
              this.listaPorudzbina[i].status = "U transportu";
            }
            if(this.listaPorudzbina[i].status === "Dostavljena")
            {
              this.listaPorudzbina[i].status = "Dostavljena";
            }
            
          }
          })
        .catch((error) => {
          console.error("Error:", error);
        });*/
  },

  methods: {

    dugmeTransport : function(id) {

        axios
        .put("http://localhost:8081/api/porudzbina/izmenaStatusaUTransportu/" + id,
        {
          withCredentials: true
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;
          setTimeout(() => {
            document.getElementById("prozorGreski").hidden = true;
          }, 1500);
        });


      /*fetch("http://localhost:8081/api/porudzbina/izmenaStatusaUTransportu/" + id, {
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
          });*/

    },

    dugmeDostavljena : function(id) {

        axios
        .put("http://localhost:8081/api/porudzbina/izmenaStatusaDostavljena/" + id,
        {
          withCredentials: true
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;
          setTimeout(() => {
            document.getElementById("prozorGreski").hidden = true;
          }, 1500);
        });


        /*  fetch("http://localhost:8081/api/porudzbina/izmenaStatusaDostavljena/" + id, {
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
          });*/

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
      })
        .then((response) => response.json)
        .then((data) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
        });

      }

  }

};

</script>

<style>

</style>