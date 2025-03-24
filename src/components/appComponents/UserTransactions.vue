<template>
  <v-card flat rounded="lg">
    <v-tabs
      v-model="tab"
    >
      <v-tab value="deposits" class="text-caption text-sm-body-2 text-md-body-1">Deposits</v-tab>
      <v-tab value="withdrawals" class="text-caption text-sm-body-2 text-md-body-1">Withdrawals</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="deposits">
          <v-card-title class="d-flex align-center pe-2">
            <v-spacer/>

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
            :items="deposits"
            :headers="headers"
            show-expand
            item-value="id"
            v-model:search="search"
          >
            <template v-slot:item.paymentID="{ item }">
              <p class="text-caption text--sm-body-2">{{ item?.paymentID }}</p>
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
                        <span class="text-caption text--sm-body-2">{{ item?.convertedRate }} {{
                            item?.address?.code
                          }}</span>
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
                        <p class="text-caption text--sm-body-2">
                          {{ new Date(item?.timestamp.seconds * 1000).toDateString() }}}</p>
                      </div>
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
                @click="toggleExpand(internalItem)"
              ></v-btn>
            </template>
          </v-data-table>
        </v-tabs-window-item>

        <v-tabs-window-item value="withdrawals">
          <v-card-title class="d-flex align-center pe-2">
            <v-spacer/>

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
            :items="withdraws"
            :headers="withdrawHeaders"
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
                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Full Name</span>
                        <span class="text-caption text--sm-body-2">{{ item?.fulName }}</span>
                      </div>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Email</span>
                        <span class="text-caption text--sm-body-2">{{ item?.email }}</span>
                      </div>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Phone</span>
                        <span class="text-caption text--sm-body-2">{{ item?.phone }}</span>
                      </div>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Country</span>
                        <span class="text-caption text--sm-body-2">{{ item?.country }}</span>
                      </div>

                      <v-divider class="mt-5"/>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Amount</span>
                        <span class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</span>
                      </div>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Withdrawal Method</span>
                        <span class="text-caption text--sm-body-2">{{ item?.withdrawalMethod }}</span>
                      </div>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Wallet Address</span>
                        <span class="text-caption text--sm-body-2">{{ item?.walletAddress }}</span>
                      </div>

                      <v-divider class="mt-5"/>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Document Type</span>
                        <span class="text-caption text--sm-body-2">{{ item?.documentType }}</span>
                      </div>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Verification Number</span>
                        <span class="text-caption text--sm-body-2">{{ item?.verificationNumber }}</span>
                      </div>

                      <v-divider class="mt-5"/>

                      <div class="d-flex justify-start align-center ga-5 mt-5">
                        <span class="text-caption text--sm-body-2" style="width: 150px">Request ID</span>
                        <span class="text-caption text--sm-body-2">{{ item?.id }}</span>
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
                        <p class="text-caption text--sm-body-2">
                          {{ new Date(item?.timestamp.seconds * 1000).toDateString() }}}</p>
                      </div>
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
                @click="toggleExpand(internalItem)"
              ></v-btn>
            </template>
          </v-data-table>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>


<script lang="ts">
import {collection, query, orderBy, onSnapshot, updateDoc, doc, getDoc, where} from "firebase/firestore";
import {db, auth} from '@/firebase'

export default {
  data() {
    return {
      deposits: [],
      withdraws: [],
      status: 'Pending',
      search: '',
      tab: null,
      headers: [
        {key: 'paymentID', title: 'Payment ID'},
        {key: 'amount', title: 'Amount'},
        {key: 'convertedRate', title: 'Rate'},
        {key: 'type', title: 'Type'},
        {key: 'status', title: 'Status'},
        {key: 'timestamp', title: 'Date'}
      ],
      withdrawHeaders: [
        {key: 'id', title: 'Payment ID'},
        {key: 'amount', title: 'Amount'},
        {key: 'withdrawalMethod', title: 'Method'},
        {key: 'type', title: 'Type'},
        {key: 'status', title: 'Status'},
        {key: 'timestamp', title: 'Date'}
      ],
    }
  },

  mounted() {
    this.fetchDeposits()
    this.fetchWithdraws()
  },

  methods: {
    async fetchDeposits() {
      const q = query(collection(db, "leadway_payments"), where('payment.type', '==', 'deposit'), where('user', '==', auth.currentUser.uid), orderBy("timestamp", 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.deposits = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data(), ...doc.data().payment}));
      });

      return unsubscribe;
    },

    async fetchWithdraws() {
      const q = query(collection(db, "leadway_payments"), where('request.type', '==', 'withdraw'), where('user', '==', auth.currentUser.uid), orderBy("timestamp", 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.withdraws = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data(), ...doc.data().request}));
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
    }
  }
}
</script>
