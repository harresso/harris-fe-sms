import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SettingsForm from './components/SettingsForm.vue';
import SchedulerTable from './components/SchedulerTable.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    components: {
      settings: SettingsForm,
      scheduler: SchedulerTable,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
