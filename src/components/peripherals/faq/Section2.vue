<template>
  <v-expansion-panels elevation="0">
    <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
      <v-expansion-panel-title>
        <v-avatar size="large" class="mr-4">
          <v-img :src="faq.image"/>
        </v-avatar>

        <span class="text-body-2 text-sm-body-1 text-md-h6" style="text-transform: uppercase !important;">{{
            faq.title
          }}</span>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-expansion-panels
          v-for="(sub, index) in faq.subContent"
          :key="index"
          elevation="0"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              <span class="text-body-2">{{ sub.title }}</span>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <span class="text-caption text-sm-body-2">{{ sub.text }}</span>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import information from '@/assets/images/information.png'
import coin from '@/assets/images/coin.png'
import coin2 from '@/assets/images/coin2.png'
import atm from '@/assets/images/atm.png'
import referral from '@/assets/images/referral.png'
import question from '@/assets/images/question-mark.png'

const faqs = [
  {
    title: 'About Us',
    image: information,
    subContent: [
      {
        title: 'WHAT IS Leadway Finance?',
        text: `Leadway Finance - Professional team of cryptocurrency industry developers. The main advantage
                of the company is a unique trading bot that makes a profit at the stage of growth and market
                decline.`
      },
      {
        title: 'IS Leadway Finance the OFFICIALLY REGISTERED COMPANY?',
        text: `Yes, we are legally binding and officially registered in Malta under the company
                            registration number #ut8935ungbiou5ob45oo3`
      },
      {
        title: 'DO YOU HAVE ANY COUNTRY RESTRICTIONS?',
        text: `Our company work and accept deposits from anywhere.`
      },
    ]
  },
  {
    title: 'My Account',
    image: coin,
    subContent: [
      {
        title: 'HOW MANY ACCOUNTS CAN I OPEN?',
        text: `Each user can only open and manage one account. Please follow this rule. In case of
                            violation the company has the right to block all your accounts without a refund.`
      },
      {
        title: 'HOW TO UPLOAD PERSONAL DATA?',
        text: `Please note that we do not require your personal information. To work with our platform,
                            you need to specify your login, your email, come up with a password, and also specify the
                            wallet number to which funds will be withdrawn from the platform.`
      },
      {
        title: 'HOW MUCH DOES IT COST TO OPEN AN ACCOUNT?',
        text: `Opening an account is absolutely free. We do not charge you any hidden fees or service charges.`
      },
      {
        title: 'CAN I REGISTER MY CHILD?',
        text: `Any person who has reached the age of majority in their country of residence can register in Leadway Finance`
      },
      {
        title: 'CAN I LOSE MY FUNDS BY INVESTING IN YOUR COMPANY?',
        text: `Your investment, as well as your loyalty, are our core values. We will work hard to
                            preserve your funds, reduce the risk of loss to zero, and we will do our best to multiply
                            your funds.`
      },
      {
        title: `WHAT DOES THE COMPANY DO WITH USERS' PERSONAL DATA?`,
        text: `We collect your personal information only for internal use. This data will not be passed to
                            third parties under any circumstances.`
      },
      {
        title: `CAN I BE SURE THAT MY DATA IS SECURE?`,
        text: `We guarantee your privacy and secured. The site is protected from complex DDoS attacks by
                            multi-layered protection. Any transmitted data is SSL encrypted. We have high quality SSL
                            certificates.`
      },
      {
        title: `WHAT TO DO IF I CAN NOT REGISTER?`,
        text: `Make sure that the input data is, such as e-mail, password and login, no spaces. If
                            everything is ok, but registration still fails, please contact online support.`
      },
      {
        title: `HOW TO BECOME AN INVESTOR?`,
        text: `
        3 steps to get started with our company\n
        1. REGISTRATION BUTTON\n
        Click the Register button. Enter your details to quickly create a FREE Leadway Finance account.\n
        2. OPEN A DEPOSIT\n
        We offer different investment plans. You need to choose a plan that suits your financial goals. Make a deposit after reading.\n
        3. START EARNING\n
        After depositing, watch your capital grow by accumulating daily profit in real time.
        `
      },
    ]
  },

  {
    title: 'DEPOSIT',
    image: coin2,
    subContent: [
      {
        title: 'WHAT WAYS TO OBTAIN INCOME IN Leadway Finance ARE?',
        text: `Users have the opportunity to earn in two ways: by opening a deposit for the chosen
                            investment plan, as well as by receiving partner rewards for attracting new members.`
      }
    ]
  },

  {
    title: 'WITHDRAWAL OF FUNDS',
    image: atm,
    subContent: [
      {
        title: 'HOW OFTEN WILL I RECEIVE ACCRUALS ON MY DEPOSITS?',
        text: `Interest on deposits is accrued in accordance with the terms of the investment plan. The
                            countdown starts from the moment you activate an investment plan in the system.`
      },
      {
        title: 'HOW LONG DOES IT TAKE TO PROCESS A WITHDRAWAL REQUEST?',
        text: `Withdrawal requests will be processed instantly. For all payment systems. At least 3
                            network confirmations are required and this can take from 20 minutes to several hours.`
      },
      {
        title: 'CAN I CHOOSE ANOTHER PAYMENT SYSTEM FOR WITHDRAWAL?',
        text: `No, payments are made in the same currency that was used to create the deposit.`
      },
      {
        title: 'WHAT IS THE WITHDRAWAL OF FUNDS FROM A PERSONAL WALLET?',
        text: `
        Before withdrawing funds, be sure to check if you have indicated the correct address of
        your payment wallet to which you will be withdrawing. If you have not registered a wallet,
        do it by going to the "Wallets" section of your account. In the same section you can always
        edit your payment details.\n
        After you have made sure that the entered data is correct, you need to go to the
        'Withdrawal' section located in your investor's personal account, select the payment system
        to which you want to withdraw, enter the withdrawal amount and click the withdrawal button
        funds.
        `
      },
      {
        title: `WHAT IS THE MINIMUM WITHDRAWAL AMOUNT? AND IS THERE A LIMITATION ON THE NUMBER OF WITHDRAWALS OR AMOUNTS PER DAY?`,
        text: `
        The minimum withdrawal amount is: $100. There are no restrictions on the maximum withdrawal
                            amount, as well as the number of withdrawal operations per day.
        `
      },
      {
        title: `HOW DO I FIND MY ACCOUNT TRANSACTION HISTORY?`,
        text: `Go to the investor's panel, select 'Transactions history' from the menu and there you will
                            see the history of account deposits, incomes and withdrawals.`
      },
      {
        title: `WHAT TO DO IF I CANNOT WITHDRAW THE FUNDS? THE SYSTEM CONSTANTLY PRODUCES AN ERROR. `,
        text: `If the wallet is registered correctly, the amount is entered correctly and corresponds to
                            the one that is available for withdrawal, but the payment is still rejected by the system,
                            check the correspondence between the currency requested for withdrawal and the payment
                            system selected for payment.`
      },
    ]
  },

  {
    title: 'REFERRAL PROGRAM',
    image: referral,
    subContent: [
      {
        title: 'DO YOU OFFER A REFERRAL PROGRAM?',
        text: `We offer an affiliate program for additional income for our investors. Anyone can take part
                            in the development of the company by inviting new members and receiving a generous reward
                            for this.`
      },
      {
        title: 'HOW DOES THE AFFILIATE PROGRAM WORK?',
        text: `Leadway Finance offers a unique investment and referral program that rewards you not only for
                            partners who came from you to the platform, but also for partners from levels 2,3 and 4.
                            This unique affiliate program brings you passive referral income. First, you earn by
                            inviting friends to Leadway Finance, and then you earn when people in your structure refer new
                            investors to the company. Affiliate system level: 7% - 3% - 2% - 1%`
      },
      {
        title: `DO I NEED TO INVEST IN ORDER TO PARTICIPATE IN THE AFFILIATE PROGRAM?`,
        text: `You do not need to apply for participation, own an industry web resource with a large
                            audience of investors or meet other abstract requirements to participate in the referral
                            program. We assign each user a unique referral link immediately after registration, which
                            you can already use to attract other investors, simply by inviting them to the Leadway Finance website using the referral link.`
      },
      {
        title: `DO YOU PROVIDE ADVERTISING MATERIALS?`,
        text: `Yes, we have prepared a number of effective banners in various formats for partners that
                            fit harmoniously into any site.`
      }
    ]
  },

  {
    title: 'ADDITIONAL QUESTIONS',
    image: question,
    subContent: [
      {
        title: 'ADDITIONAL QUESTIONS',
        text: `You can use monitoring with trusted exchange offices - bestchange. Choose the exchanger
                            with the best rate and follow the instructions.`
      },
      {
        title: 'HOW TO BE IF I DIDN\'T FIND ANSWER TO MY QUESTION?',
        text: `Please contact us through any communication channel. Do not duplicate your message across
                            multiple communication channels. This will not speed up the response, but rather the
                            opposite.`
      },
      {
        title: `WHAT TO DO IF I FORGOT MY PASSWORD?`,
        text: `Click on the reset password link on the main page of the site in the login section. Enter
                            your username and email address and follow the instructions. You will receive information on
                            how to reset your Leadway Finance account password.`
      }
    ]
  },
]
</script>
