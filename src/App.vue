<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <settings-form class="col-span-1"></settings-form>
        <scheduler-table class="col-span-2"></scheduler-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingsForm from "./components/SettingsForm.vue";
import SchedulerTable from "./components/SchedulerTable.vue";

export default defineComponent({
  components: {
    SettingsForm,
    SchedulerTable,
  },
});
</script>
