<template>
    <div class="p-4">
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Duration of Each Booking Slot (minutes)</label>
            <select v-model="slotDuration" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option v-for="duration in [15, 30, 45, 60]" :key="duration" :value="duration">{{ duration }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Number of Booking Slots for Each Time Slot</label>
            <input v-model="bookingSlots" type="number" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
        </div>
        <div class="mt-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="allowVideoTour" class="form-checkbox h-5 w-5 text-indigo-600" />
            <span class="ml-2">Allow Video Tour Call</span>
          </label>
        </div>
        <div class="mt-6">
          <div v-for="(day, index) in days" :key="index" class="mb-4">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="day.checked" @change="toggleDay(index)" class="form-checkbox h-5 w-5 text-indigo-600" />
              <span class="ml-2">{{ day.name }}</span>
            </label>
            <div v-if="day.checked" class="mt-2">
              <div v-for="(slot, slotIndex) in day.slots" :key="slotIndex" class="flex items-center mb-2">
                <input v-model="slot.startTime" type="time" class="block w-1/3 mr-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" @input="setEndTime(index, slotIndex)" required />
                <input v-model="slot.endTime" type="text" class="block w-1/3 mr-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" readonly />
                <button @click="removeSlot(index, slotIndex)" class="text-red-600 hover:text-red-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button @click="addSlot(index)" class="mt-2 text-blue-600 hover:text-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Events</button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    data() {
      return {
        slotDuration: 30,
        bookingSlots: 1,
        allowVideoTour: false,
        days: [
          { name: 'Monday', checked: false, slots: [] },
          { name: 'Tuesday', checked: false, slots: [] },
          { name: 'Wednesday', checked: false, slots: [] },
          { name: 'Thursday', checked: false, slots: [] },
          { name: 'Friday', checked: false, slots: [] },
          { name: 'Saturday', checked: false, slots: [] },
          { name: 'Sunday', checked: false, slots: [] },
        ],
      };
    },
    methods: {
      toggleDay(index: number) {
        if (!this.days[index].checked) {
          this.days[index].slots = [];
        }
      },
      addSlot(dayIndex: number) {
        this.days[dayIndex].slots.push({ startTime: '', endTime: '' });
      },
      removeSlot(dayIndex: number, slotIndex: number) {
        this.days[dayIndex].slots.splice(slotIndex, 1);
        if (this.days[dayIndex].slots.length === 0) {
          this.days[dayIndex].checked = false;
        }
      },
      setEndTime(dayIndex: number, slotIndex: number) {
        const slot = this.days[dayIndex].slots[slotIndex];
        if (slot.startTime) {
          const [hours, minutes] = slot.startTime.split(':').map(Number);
          const endMinutes = minutes + this.slotDuration;
          const endHours = hours + Math.floor(endMinutes / 60);
          slot.endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
        }
      },
      submitForm() {
        const events = [];
        this.days.forEach((day, dayIndex) => {
          if (day.checked) {
            day.slots.forEach((slot) => {
              const date = new Date();
              date.setDate(date.getDate() + ((dayIndex + 1 - date.getDay() + 7) % 7));
              const start = new Date(date);
              start.setHours(...slot.startTime.split(':').map(Number));
              const end = new Date(date);
              end.setHours(...slot.endTime.split(':').map(Number));
              for (let i = 0; i < this.bookingSlots; i++) {
                const slotStart = new Date(start.getTime() + i * this.slotDuration * 60 * 1000);
                const slotEnd = new Date(slotStart.getTime() + this.slotDuration * 60 * 1000);
                events.push({
                  title: `Slot ${i + 1} - ${day.name}`,
                  start: slotStart.toISOString(),
                  end: slotEnd.toISOString(),
                  extendedProps: {
                    allowVideoTour: this.allowVideoTour,
                    bookingSlots: this.bookingSlots,
                  },
                });
              }
            });
          }
        });
        this.$store.dispatch('updateEvents', events);
      },
    },
    setup() {
      const store = useStore();
      return {
        store,
      };
    },
  });
  </script>
  
  <style scoped>
  .form-checkbox {
    height: 1.25rem;
    width: 1.25rem;
  }
  </style>
  