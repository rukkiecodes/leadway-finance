<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-spacer />

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        rounded="lg"
      />
    </v-card-title>

    <v-data-table
      :filter-keys="['status', 'paymentID']"
      :items="trades"
      :headers="headers"
      show-expand
      item-value="id"
      v-model:search="search"
    >
      <template v-slot:item.paymentID="{ item }">
        <p class="text-caption text--sm-body-2">{{ item?.paymentID }}</p>
      </template>

      <template v-slot:item.user="{ item }">
        <TradeHistoryUser :user="item?.user"/>
      </template>

      <template v-slot:item.amount="{ item }">
        <p class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</p>
      </template>

      <template v-slot:item.convertedRate="{ item }">
        <p class="text-caption text--sm-body-2">{{ item?.convertedRate }} {{ item?.address?.code }}</p>
      </template>

      <template v-slot:item.type="{ item }">
        <v-chip>
          <v-icon v-if="item?.type == 'deposit'">mdi-arrow-up</v-icon>
          <v-icon v-if="item?.type == 'withdraw'">mdi-arrow-down</v-icon>
          <span class="text-caption text--sm-body-2 text-capitalize ml-2">{{ item?.type }}</span>
        </v-chip>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip
          class="text-caption text--sm-body-2 text-capitalize"
          :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'"
        >
          {{ item?.status }}
        </v-chip>
      </template>

      <template v-slot:item.timestamp="{ item }">
        <p class="text-caption text--sm-body-2">{{ new Date(item?.timestamp.seconds * 1000).toDateString() }}</p>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" class="mx-0 px-0">
            <v-card color="transparent" flat width="500">
              <v-card-text>
                <v-dialog max-width="800">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-avatar :image="item?.POP?.pop" v-bind="activatorProps" size="100"
                              class="cursor-pointer"/>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card rounded="lg">
                      <v-img :src="item?.POP?.pop" cover/>
                    </v-card>
                  </template>
                </v-dialog>

                <div class="d-flex justify-start align-center ga-5 mt-5">
                  <span class="text-caption text--sm-body-2" style="width: 150px">Payment ID</span>
                  <span class="text-caption text--sm-body-2">{{ item?.paymentID }}</span>
                </div>

                <div class="d-flex justify-start align-center ga-5 mt-2">
                  <span class="text-caption text--sm-body-2" style="width: 150px">Amount</span>
                  <span class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</span>
                </div>

                <div class="d-flex justify-start align-center ga-5 mt-2">
                  <span class="text-caption text--sm-body-2" style="width: 150px">Converted amount</span>
                  <span class="text-caption text--sm-body-2">{{ item?.convertedRate }} {{ item?.address?.code }}</span>
                </div>

                <div class="d-flex justify-start align-center ga-5 mt-2">
                  <span class="text-caption text--sm-body-2" style="width: 150px">Transaction Type</span>
                  <span class="text-caption text--sm-body-2">{{ item?.type }}</span>
                </div>

                <div class="d-flex justify-start align-center ga-5 mt-2">
                  <span class="text-caption text--sm-body-2" style="width: 150px">Transaction Status</span>
                  <v-chip
                    class="text-caption text--sm-body-2 text-capitalize"
                    :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'"
                  >
                    {{ item?.status }}
                  </v-chip>
                </div>

                <div class="d-flex justify-start align-center ga-5 mt-2">
                  <span class="text-caption text--sm-body-2" style="width: 150px">Transaction Date</span>
                  <p class="text-caption text--sm-body-2">{{ new Date(item?.timestamp.seconds * 1000).toDateString() }}}</p>
                </div>
              </v-card-text>

              <v-divider class="my-5"/>

              <v-card-text>
                <span class="text-caption text-sm-body-2">
                Upon transaction Completion, the transaction amount will automatically be added to the client's total amount
              </span>

                <v-select
                  density="compact"
                  label="Transaction Status"
                  variant="outlined"
                  v-model="status"
                  rounded="lg"
                  color="indigo-accent-4"
                  :items="['Completed', 'Processing', 'Pending', 'Canceled']"
                  class="mt-5"
                  @update:modelValue="updateStatus(status, item)"
                />
              </v-card-text>
            </v-card>
          </td>
        </tr>
      </template>

      <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand, item }">
        <v-btn
          :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          :text="isExpanded(internalItem) ? 'Collapse' : 'More info'"
          class="text-none"
          color="medium-emphasis"
          size="small"
          variant="text"
          border
          slim
          @click="() => {toggleExpand(internalItem); autoCompleteStatus(item?.status)}"
        ></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>


<script lang="ts">
import {collection, query, orderBy, onSnapshot, updateDoc, doc, getDoc} from "firebase/firestore";
import {db} from '@/firebase'
import TradeHistoryUser from "@/components/admin/TradeHistoryUser.vue";

export default {
  components: {TradeHistoryUser},
  data() {
    return {
      trades: [],
      status: 'Pending',
      search: '',
      headers: [
        {key: 'paymentID', title: 'Payment ID'},
        {key: 'user', title: 'User'},
        {key: 'amount', title: 'Amount'},
        {key: 'convertedRate', title: 'Rate'},
        {key: 'type', title: 'Type'},
        {key: 'status', title: 'Status'},
        {key: 'timestamp', title: 'Date'}
      ],
    }
  },

  setup() {

    return {}
  },

  mounted() {
    this.fetchTrades()
  },

  methods: {
    async fetchTrades() {
      const q = query(collection(db, "leadway_payments"), orderBy("timestamp", 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.trades = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data(), ...doc.data().payment}));
      });

      return unsubscribe;
    },

    formatMoney(amount, currency = 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
    },

    async updateStatus(status, item) {
      await updateDoc(doc(db, "leadway_payments", item.id), {
        'payment.status': status
      });

      await updateDoc(doc(db, "leadway_users", item.user, 'payments', item.id), {
        status: status
      })

      if(status === 'Completed') {
        const clientProfile = (await getDoc(doc(db, 'leadway_users', item.user))).data()
        const totalAmount = parseFloat(clientProfile?.totalBalance) + parseFloat(item?.amount)
        const totalDeposit = parseFloat(clientProfile?.totalDeposit) + parseFloat(item?.amount)
        const totalBalance = parseFloat(clientProfile?.totalBalance) + parseFloat(item?.amount)

        await updateDoc(doc(db, 'leadway_users', item.user), {
          totalAmount,
          totalDeposit,
          totalBalance
        })
      }
    },

    autoCompleteStatus(status) {
      this.status = status;
    }
  }
}
</script>
