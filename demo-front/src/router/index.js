import { createRouter, createWebHistory } from 'vue-router'

import LogovanjeView from '../views/LogovanjeView.vue'
import RegistracijaView from '../views/RegistracijaView.vue'
import KupacPocetnaView from '../views/KupacPocetnaView.vue'
import KupacAzuriranjePodatakaView from '../views/KupacAzuriranjePodatakaView.vue'
import KupacRestoraniView from '../views/KupacRestoraniView.vue'
import KupacDetaljanPrikazRestoranaView from '../views/KupacDetaljanPrikazRestoranaView.vue'
import KupacPorudzbineView from '../views/KupacPorudzbineView.vue'
import KupacKreiranjePorudzbineView from '../views/KupacKreiranjePorudzbineView.vue'
import KupacPregledPojedinacnePorudzbineView from '../views/KupacPregledPojedinacnePorudzbineView.vue'

import ONamaView from '../views/ONamaView.vue'
import ONamaMView from '../views/menadzer_views/ONamaMView.vue'
import ONamaDView from '../views/dostavljac_views/ONamaDView.vue'
import ONamaAView from '../views/admin_views/ONamaAView.vue'
import ONamaNeRegView from '../views/ONamaNeRegView.vue'

import AdminPocetnaView from '../views/admin_views/AdminPocetnaView.vue'
import AdminAzuriranjePodatakaView from '../views/admin_views/AdminAzuriranjePodatakaView.vue'
import AdminRestoraniView from '../views/admin_views/AdminRestoraniView.vue'
import AdminDetaljanPrikazRestoranaView from '../views/admin_views/AdminDetaljanPrikazRestoranaView.vue'
import AdminKreiranjeNovogRestoranaIMenadzeraView from '../views/admin_views/AdminKreiranjeNovogRestoranaIMenadzeraView.vue'
import AdminPrikazSvihKorisnikaView from '../views/admin_views/AdminPrikazSvihKorisnikaView.vue'
import AdminKreiranjeNovogDostavljacaView from '../views/admin_views/AdminKreiranjeNovogDostavljacaView.vue'

import DostavljacPocetnaView from '../views/dostavljac_views/DostavljacPocetnaView.vue'
import DostavljacAzuriranjePodatakaView from '../views/dostavljac_views/DostavljacAzuriranjePodatakaView.vue'
import DostavljacRestoraniView from '../views/dostavljac_views/DostavljacRestoraniView.vue'
import DostavljacNjegovPrikazPorudzbinaView from '../views/dostavljac_views/DostavljacNjegovPrikazPorudzbinaView.vue'

import MenadzerPocetnaView from '../views/menadzer_views/MenadzerPocetnaView.vue'
import MenadzerAzuriranjePodatakaView from '../views/menadzer_views/MenadzerAzuriranjePodatakaView.vue'
import MenadzerUvidUSvojRestoranView from '../views/menadzer_views/MenadzerUvidUSvojRestoranView.vue'
import MenadzerAzuriranjeArtiklaView from '../views/menadzer_views/MenadzerAzuriranjeArtiklaView.vue'
import MenadzerDodavanjeNovogArtiklaView from '../views/menadzer_views/MenadzerDodavanjeNovogArtiklaView.vue'
import MenadzerPorudzbineView from '../views/menadzer_views/MenadzerPorudzbineView.vue'

const routes = [

  {
    path: '/',
    name: 'logovanje',
    component: LogovanjeView
  },

  {
    path: '/registracija',
    name: 'registracija',
    component: RegistracijaView
  },

  {
    path: '/kupacPocetna',
    name: 'kupacPocetna',
    component: KupacPocetnaView
  },

  {
    path: '/kupacAzuriranjePodataka',
    name: 'kupacAzuriranjePodataka',
    component: KupacAzuriranjePodatakaView
  },

  {
    path: '/kupacRestorani',
    name: 'kupacRestorani',
    component: KupacRestoraniView
  },

  {
    path: '/kupacDetaljanPrikazRestorana',
    name: 'kupacDetaljanPrikazRestorana',
    component: KupacDetaljanPrikazRestoranaView
  },

  {
    path: '/kupacPorudzbine',
    name: 'kupacPorudzbine',
    component: KupacPorudzbineView
  },

  {
    path: '/kupacKreiranjePorudzbine',
    name: 'kupacKreiranjePorudzbine',
    component: KupacKreiranjePorudzbineView
  },

  {
    path: '/kupacPregledPojedinacnePorudzbine',
    name: 'kupacPregledPojedinacnePorudzbine',
    component: KupacPregledPojedinacnePorudzbineView
  },

  {
    path: '/dostavaZaCas',
    name: 'dostavaZaCas',
    component: ONamaView
  },

  {
    path: '/dostavaZaCasMenadzer',
    name: 'dostavaZaCasMenadzer',
    component: ONamaMView
  },

  {
    path: '/dostavaZaCasDostavljac',
    name: 'dostavaZaCasDostavljac',
    component: ONamaDView
  },

  {
    path: '/dostavaZaCasAdmin',
    name: 'dostavaZaCasAdmin',
    component: ONamaAView
  },

  {
    path: '/dostavaZaCasNeReg',
    name: 'dostavaZaCasNeReg',
    component: ONamaNeRegView
  },

  //

  {
    path: '/adminPocetna',
    name: 'adminPocetna',
    component: AdminPocetnaView
  },

  {
    path: '/adminAzuriranjePodataka',
    name: 'adminAzuriranjePodataka',
    component: AdminAzuriranjePodatakaView
  },
  
  {
    path: '/adminRestorani',
    name: 'adminRestorani',
    component: AdminRestoraniView
  },

  {
    path: '/adminDetaljanPrikazRestorana',
    name: 'adminDetaljanPrikazRestorana',
    component: AdminDetaljanPrikazRestoranaView
  },

  {
    path: '/adminKreiranjeNovogRestoranaIMenadzera',
    name: 'adminKreiranjeNovogRestoranaIMenadzera',
    component: AdminKreiranjeNovogRestoranaIMenadzeraView
  },

  {
    path: '/adminPrikazSvihKorisnika',
    name: 'adminPrikazSvihKorisnika',
    component: AdminPrikazSvihKorisnikaView
  },

  {
    path: '/adminKreiranjeNovogDostavljaca',
    name: 'adminKreiranjeNovogDostavljaca',
    component: AdminKreiranjeNovogDostavljacaView
  },

  //

  {
    path: '/dostavljacPocetna',
    name: 'dostavljacPocetna',
    component: DostavljacPocetnaView
  },

  {
    path: '/dostavljacAzuriranjePodataka',
    name: 'dostavljacAzuriranjePodataka',
    component: DostavljacAzuriranjePodatakaView
  },

  {
    path: '/dostavljacRestorani',
    name: 'dostavljacRestorani',
    component: DostavljacRestoraniView
  },

  {
    path: '/dostavljacPorudzbine',
    name: 'dostavljacPorudzbine',
    component: DostavljacNjegovPrikazPorudzbinaView
  },

  //

  {
    path: '/menadzerPocetna',
    name: 'menadzerPocetna',
    component: MenadzerPocetnaView
  },

  {
    path: '/menadzerAzuriranjePodataka',
    name: 'menadzerAzuriranjePodataka',
    component: MenadzerAzuriranjePodatakaView
  },

  {
    path: '/menadzerNjegovRestoran',
    name: 'menadzerNjegovRestoran',
    component: MenadzerUvidUSvojRestoranView
  },

  {
    path: '/menadzerAzuriranjeArtikla',
    name: 'menadzerAzuriranjeArtikla',
    component: MenadzerAzuriranjeArtiklaView
  },

  {
    path: '/menadzerDodavanjeArtikla',
    name: 'menadzerDodavanjeArtikla',
    component: MenadzerDodavanjeNovogArtiklaView
  },

  {
    path: '/menadzerPorudzbine',
    name: 'menadzerPorudzbine',
    component: MenadzerPorudzbineView
  },

  //

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
