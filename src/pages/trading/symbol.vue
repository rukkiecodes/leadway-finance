<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" order="1" order-md="0">
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              variant="outlined"
              density="compact"
              label="Market"
              hide-details
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Price"
              hide-details
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              variant="outlined"
              density="compact"
              label="Diration"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-sheet min-height="100" rounded="lg" class="d-flex align-center justify-center">
              <p class="text-caption text-sm-body-2 text-indigo-lighten-1">NO OPEN TRADES</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <iframe
          :src="frameSRC"
          border="0"
          marginwidth="0"
          marginheight="0"
          frameborder="0"
          scrolling="no"
          width="100%"
          height="600"
        />
      </v-col>

      <v-col cols="12" md="2">
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Amount(USD)"
              prepend-inner-icon="mdi-currency-usd"
              inputmode="numeric"
              type="number"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Amount(USD2000)"
              prepend-inner-icon="mdi-currency-usd"
              inputmode="numeric"
              type="number"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Leverage (250 MAX)"
              prepend-inner-icon="mdi-currency-usd"
              inputmode="numeric"
              type="number"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Time (Minutes)"
              prepend-inner-icon="mdi-currency-usd"
              inputmode="numeric"
              type="number"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-btn flat block color="green-darken-3">BUY</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn flat block color="red-darken-3">SELL</v-btn>
          </v-col>

          <v-col cols="12" class="d-flex align-center justify-space-around">
            <span>$0.00</span>
            <span>$0.00</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    frameSRC: ''
  }),
  created() {
    const symbol = this.$route.params?.symbol || 'BTC'
    this.frameSRC = `https://freeserv.dukascopy.com/2.0/?path=chart/index&showUI=true&showTabs=true&showParameterToolbar=true&showOfferSide=true&allowInstrumentChange=true&allowPeriodChange=true&allowOfferSideChange=true&showAdditionalToolbar=true&showDetachButton=true&presentationType=candle&axisX=true&axisY=true&legend=true&timeline=true&showDateSeparators=true&showZoom=true&showScrollButtons=true&showAutoShiftButton=true&crosshair=true&borders=false&theme=Dark&uiColor=%23000&candleUpColor=%2300FF00&candleDownColor=%23F60002&wickUpColor=%2300ff00&wickDownColor=%23ff0000&barUpColor=%2300ff00&barDownColor=%23ff0000&availableInstruments=l%3A&instrument=${symbol}/USD&period=7&offerSide=BID&timezone=0&live=true&panLock=false&width=100%25&height=535&adv=popup`
  }
}
</script>
