import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import AddEmployeeView from '../views/AddEmployeeView.vue'

import LogovanjeView from '../views/LogovanjeView.vue'
import RegistracijaView from '../views/RegistracijaView.vue'
import KupacPocetnaView from '../views/KupacPocetnaView.vue'
import KupacAzuriranjePodatakaView from '../views/KupacAzuriranjePodatakaView.vue'
import KupacRestoraniView from '../views/KupacRestoraniView.vue'
import KupacDetaljanPrikazRestoranaView from '../views/KupacDetaljanPrikazRestoranaView.vue'
import KupacPorudzbineView from '../views/KupacPorudzbineView.vue'
import KupacKreiranjePorudzbineView from '../views/KupacKreiranjePorudzbineView.vue'
import KupacPregledPojedinacnePorudzbineView from '../views/KupacPregledPojedinacnePorudzbineView.vue'

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
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesView
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView
  },
  {
    path: '/add-employee',
    name: 'add-employee',
    component: AddEmployeeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
