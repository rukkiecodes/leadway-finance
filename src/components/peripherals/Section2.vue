<template>
  <v-img
    cover
    height="100vh"
    src="@/assets/images/robo_hand.jpg"
    gradient="to top right, rgba(34, 49, 34, 0.6), rgba(10, 25, 10, 0.9)"
    class="img-fluid d-flex justify-space-between align-center mt-n2 position-relative"
  >
    <div class="gradient">
      <v-container class="d-flex flex-column align-center pt-sm-16">
        <v-row class="d-none d-sm-flex">
          <v-col cols="12" sm="12" md="6" class="d-flex justify-center align-center">
            <v-sheet :width="800" height="450" rounded="none" color="transparent">
              <iframe
                lang="en"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                title="market overview TradingView widget"
                style="height: 100%; width: 100%;"
                src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%light%22%2C%22dateRange%22%3A%2212m%22%2C%22showChart%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22plotLineColorGrowing%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22OANDA%3ASPX500USD%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22OANDA%3ANAS100USD%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU30%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22OANDA%3AUK100GBP%22%2C%22d%22%3A%22FTSE%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22E-Mini%20S%26P%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22www.mexbitcapital.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22www.mexbitcapital.com%2F%22%7D"
              />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="12" md="6" class="d-flex justify-center align-center">
            <v-sheet :width="800" height="450" rounded="none" color="transparent">
              <iframe
                lang="en"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                title="market overview TradingView widget"
                style="user-select: none; box-sizing: border-box; display: block; height: 100%; width: 100%;"
                src="https://www.tradingview-widget.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A400%2C%22colorTheme%22%3A%22dark%22%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22utm_source%22%3A%22www.mexbitcapital.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%2C%22page-uri%22%3A%22www.mexbitcapital.com%2F%22%7D"
              />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="12" md="6" class="d-flex justify-center align-center">
            <v-sheet :width="800" height="450" rounded="none" color="transparent">
              <iframe
                lang="en"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                title="market overview TradingView widget"
                style="user-select: none; box-sizing: border-box; display: block; height: 100%; width: 100%;"
                src="https://widget.coinlib.io/widget?type=chart&theme=dark&coin_id=859&pref_coin_id=1505"
              />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="12" md="6" class="d-flex justify-center align-center">
            <v-sheet :width="800" height="450" rounded="none" color="transparent">
              <iframe
                lang="en"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                title="market overview TradingView widget"
                style="user-select: none; box-sizing: border-box; display: block; height: 100%; width: 100%;"
                src="https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22NASDAQ%3AAMZN%22%2C%22frameElementId%22%3A%22tradingview_f224f%22%2C%22interval%22%3A%221%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22details%22%3A%221%22%2C%22studies%22%3A%22AwesomeOscillator%40tv-basicstudies%5Cu001fMACD%40tv-basicstudies%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22America%2FLos_Angeles%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22www.mexbitcapital.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22NASDAQ%3AAMZN%22%2C%22page-uri%22%3A%22www.mexbitcapital.com%2Faccount%2Faccount%22%7D"
              />
            </v-sheet>
          </v-col>
        </v-row>


        <v-row class="d-flex d-sm-none">
          <v-col cols="12" sm="12" md="6" class="d-flex justify-center align-center">
            <v-sheet :width="400" height="350" rounded="none" color="transparent">
              <iframe
                lang="en"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                title="market overview TradingView widget"
                style="height: 100%; width: 100%;"
                src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%light%22%2C%22dateRange%22%3A%2212m%22%2C%22showChart%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22plotLineColorGrowing%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22OANDA%3ASPX500USD%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22OANDA%3ANAS100USD%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU30%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22OANDA%3AUK100GBP%22%2C%22d%22%3A%22FTSE%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22E-Mini%20S%26P%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22www.mexbitcapital.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22www.mexbitcapital.com%2F%22%7D"
              />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="12" md="6" class="d-flex justify-center align-center">
            <v-sheet :width="400" height="350" rounded="none" color="transparent">
              <iframe
                lang="en"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                title="market overview TradingView widget"
                style="user-select: none; box-sizing: border-box; display: block; height: 100%; width: 100%;"
                src="https://www.tradingview-widget.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A400%2C%22colorTheme%22%3A%22dark%22%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22utm_source%22%3A%22www.mexbitcapital.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%2C%22page-uri%22%3A%22www.mexbitcapital.com%2F%22%7D"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-img>
</template>

<style scoped>
.gradient {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  background: linear-gradient(#111C1810, #182A26);
}
</style>
