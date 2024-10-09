<template>
  <view class="subscription-container">
    <view v-for="plan in subscriptionPlans" :key="plan.id" class="subscription-plan">
      <text class="plan-name">{{ plan.name }}</text>
      <text class="plan-price">{{ plan.price }} / month</text>
      <text class="plan-description">{{ plan.description }}</text>
      <button @click="selectPlan(plan)">Select Plan</button>
    </view>
    <view v-if="selectedPlan" class="payment-section">
      <text>Selected Plan: {{ selectedPlan.name }}</text>
      <text>Total: {{ selectedPlan.price }}</text>
      <view class="payment-methods">
        <button @click="pay('wechat')">WeChat Pay</button>
        <button @click="pay('alipay')">Alipay</button>
        <button v-if="isIOS" @click="pay('apple')">Apple Pay</button>
        <button v-if="isAndroid" @click="pay('google')">Google Pay</button>
      </view>
    </view>
  </view>
</template>

<script>
import { subscribe, getSubscriptionPlans } from '../../utils/api';

export default {
  data() {
    return {
      subscriptionPlans: [],
      selectedPlan: null,
      isIOS: false,
      isAndroid: false
    }
  },
  async created() {
    this.subscriptionPlans = await getSubscriptionPlans();
    // Determine platform
    // #ifdef APP-PLUS
    const systemInfo = uni.getSystemInfoSync();
    this.isIOS = systemInfo.platform === 'ios';
    this.isAndroid = systemInfo.platform === 'android';
    // #endif
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan;
    },
    async pay(method) {
      if (!this.selectedPlan) {
        uni.showToast({
          title: 'Please select a plan',
          icon: 'none'
        });
        return;
      }
      try {
        uni.showLoading({
          title: 'Processing payment...'
        });
        const response = await subscribe(this.selectedPlan.id, method);
        uni.hideLoading();
        if (response.success) {
          uni.showToast({
            title: 'Subscription successful',
            icon: 'success'
          });
          // Navigate to home page or show success page
          uni.switchTab({
            url: '/pages/index/index'
          });
        } else {
          throw new Error('Subscription failed');
        }
      } catch (error) {
        console.error('Payment error:', error);
        uni.showToast({
          title: 'Payment failed',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style>
.subscription-container {
  padding: 20px;
}
.subscription-plan {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
}
.plan-name {
  font-size: 18px;
  font-weight: bold;
}
.plan-price {
  font-size: 16px;
  color: #007AFF;
}
.plan-description {
  margin-top: 10px;
}
.payment-section {
  margin-top: 20px;
}
.payment-methods {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.payment-methods button {
  margin-bottom: 10px;
}
</style>