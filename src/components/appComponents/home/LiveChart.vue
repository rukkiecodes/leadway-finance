<template>
  <v-card>
    <v-card-title>Live Market Data</v-card-title>
    <v-card-text class="pa-0">
      <div class="tradingview" style="width: 100%"></div>
      <iframe
        src="https://freeserv.dukascopy.com/2.0/?path=chart/index&showUI=true&showTabs=true&showParameterToolbar=true&showOfferSide=true&allowInstrumentChange=true&allowPeriodChange=true&allowOfferSideChange=true&showAdditionalToolbar=true&showDetachButton=true&presentationType=candle&axisX=true&axisY=true&legend=true&timeline=true&showDateSeparators=true&showZoom=true&showScrollButtons=true&showAutoShiftButton=true&crosshair=true&borders=false&uiColor=%23000&candleUpColor=%2300FF00&candleDownColor=%23F60002&wickUpColor=%2300ff00&wickDownColor=%23ff0000&barUpColor=%2300ff00&barDownColor=%23ff0000&availableInstruments=l%3A&instrument=BTC/USD&period=7&offerSide=BID&timezone=0&live=true&panLock=false&width=100%25&height=535&adv=popup"
        border="0"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="600"
        id="liveChardFrame"
      />
    </v-card-text>
  </v-card>
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

  document.querySelector(".tradingview").appendChild(script);
});
</script>

<style scoped>
.tradingview {
  mix-blend-mode: difference;
  background: black;
  border: none;
}

#liveChardFrame {
  filter: invert(1) hue-rotate(180deg);
  width: 100%;
  border: none;
}
</style>
