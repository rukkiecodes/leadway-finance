<template>
  <div class="tradingview-widget-container__widget" style="width: 100%"></div>
</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols: [
      {proName: "BINANCE:BTCUSDT", title: "Bitcoin"},
      {proName: "BINANCE:ETHUSDT", title: "Ethereum"},
      {proName: "BINANCE:XRPUSDT", title: "XRP"},
      {proName: "BINANCE:DOGEUSDT", title: "Dogecoin"},
      {proName: "BINANCE:MATICUSDT", title: "Polygon"},
    ],
    showSymbolLogo: true,
    colorTheme: "dark",
    isTransparent: false,
    displayMode: "adaptive"
  });

  document.querySelector(".tradingview-widget-container__widget").appendChild(script);
});
</script>

<style scoped>
.tradingview-widget-container__widget {
  mix-blend-mode: difference;
  background: black;
  border: none;
}
</style>
