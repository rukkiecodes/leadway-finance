<template>
  <v-container>
    <v-card color="transparent" dark>
      <v-card-title><v-icon class="mr-2">mdi-newspaper-variant-multiple-outline</v-icon> Top News</v-card-title>
      <v-divider class="mb-5" />

      <v-card-text class="pa-0">
        <iframe
          src="https://freeserv.dukascopy.com/2.0/?path=online_news/index&header=false&borders=false&defaultLanguage=en&availableLanguages=ar%2Cbg%2Ccs%2Cde%2Cen%2Ces%2Cfa%2Cfr%2Che%2Chu%2Cit%2Cja%2Cms%2Cpl%2Cpt%2Cro%2Cru%2Csk%2Csv%2Cth%2Cuk%2Czh&newsCategories=finance%2Cforex%2Cstocks%2Ccompany_news%2Ccommodities&width=100%25&height=500&adv=popup"
          width="100%"
          height="900"
          border="0"
          marginwidth="0"
          marginheight="0"
          frameborder="0"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
</script>


<style scoped>
iframe {
  filter: invert(1) hue-rotate(180deg);
  width: 100%;
  height: 900px;
  border: none;
}
</style>
