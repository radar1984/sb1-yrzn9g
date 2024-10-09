<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button @click="navigateToCharacterCreation">Create Character</button>
    <button @click="navigateToImageGeneration">Generate Image</button>
    <button @click="navigateToFaceSwap">Face Swap</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'AI Image Generator'
    }
  },
  methods: {
    navigateToCharacterCreation() {
      uni.navigateTo({
        url: '/pages/character-creation/character-creation'
      })
    },
    navigateToImageGeneration() {
      uni.navigateTo({
        url: '/pages/image-generation/image-generation'
      })
    },
    navigateToFaceSwap() {
      uni.navigateTo({
        url: '/pages/face-swap/face-swap'
      })
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>