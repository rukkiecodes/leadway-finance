<template>
  <v-navigation-drawer order="1" border="none" location="end" v-model="rightDrawer" width="350">
    <iframe
      src="https://www.tradingview-widget.com/embed-widget/screener/?locale=en#%7B%22width%22%3A%22220%22%2C%22height%22%3A600%2C%22defaultColumn%22%3A%22overview%22%2C%22defaultScreen%22%3A%22general%22%2C%22market%22%3A%22forex%22%2C%22showToolbar%22%3Afalse%2C%22colorTheme%22%3A%22%2C%22isTransparent%22%3Afalse%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22marketstockspro.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forexscreener%22%7D"
      width="100%"
      height="100%"
      allowtransparency="true"
      frameborder="0"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {storeToRefs} from 'pinia';
import {onMounted} from "vue";
import {useDisplay} from "vuetify";

const appStore = useAppStore();
const {rightDrawer} = storeToRefs(appStore);
const {name} = useDisplay()

const validateDrawer = () => {
  rightDrawer.value = ['xs', 'sm', 'md'].includes(name.value) ? false : true;
};

onMounted(() => {
  validateDrawer()
})
</script>

<style scoped>
iframe {
  filter: invert(1) hue-rotate(180deg);
  width: 100%;
  border: none;
}
</style>
