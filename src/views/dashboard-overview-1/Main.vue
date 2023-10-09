<template>
  <div class="grid gap-6">
    <div class="col-span-12 2xl:col-span-9 text-center mt-20">
      <!-- BEGIN: General Report -->
      <h2 class="font-medium text-2xl">TECHSALE</h2>
      <p>Mạch lạc quy trình, định hình đăng cấp</p>
    </div>
  </div>
</template>

<script setup>
import {ref, provide} from "vue";

const importantNotesRef = ref();

provide("bind[importantNotesRef]", (el) => {
  importantNotesRef.value = el;
});
</script>
