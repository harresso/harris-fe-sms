<template>
  <div class="p-4">
    <FullCalendar
      :events="events"
      :plugins="[dayGridPlugin]"
      initialView="dayGridWeek"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const store = useStore();
    const events = computed(() => store.state.events);

    return {
      events,
      dayGridPlugin,
    };
  },
});
</script>

<style scoped>
@import "@fullcalendar/daygrid/main.css";
</style>
