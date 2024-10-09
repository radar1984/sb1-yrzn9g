<template>
  <view class="face-swap-container">
    <view class="image-upload">
      <text>Source Image</text>
      <button @click="chooseImage('source')">Choose Source Image</button>
      <image v-if="sourceImage" :src="sourceImage" mode="aspectFit"></image>
    </view>
    <view class="image-upload">
      <text>Target Image</text>
      <button @click="chooseImage('target')">Choose Target Image</button>
      <image v-if="targetImage" :src="targetImage" mode="aspectFit"></image>
    </view>
    <button @click="performFaceSwap" :disabled="!sourceImage || !targetImage">Perform Face Swap</button>
    <image v-if="resultImage" :src="resultImage" mode="aspectFit"></image>
  </view>
</template>

<script>
import { faceSwap } from '../../utils/api';

export default {
  data() {
    return {
      sourceImage: '',
      targetImage: '',
      resultImage: ''
    }
  },
  methods: {
    chooseImage(type) {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          if (type === 'source') {
            this.sourceImage = res.tempFilePaths[0];
          } else {
            this.targetImage = res.tempFilePaths[0];
          }
        }
      });
    },
    async performFaceSwap() {
      if (!this.sourceImage || !this.targetImage) {
        uni.showToast({
          title: 'Please choose both images',
          icon: 'none'
        });
        return;
      }
      try {
        uni.showLoading({
          title: 'Performing face swap...'
        });
        const response = await faceSwap(this.sourceImage, this.targetImage);
        this.resultImage = response.imageUrl;
        uni.hideLoading();
      } catch (error) {
        console.error('Face swap error:', error);
        uni.showToast({
          title: 'Failed to perform face swap',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style>
.face-swap-container {
  padding: 20px;
}
.image-upload {
  margin-bottom: 20px;
}
.image-upload text {
  display: block;
  margin-bottom: 5px;
}
button {
  margin-top: 10px;
}
image {
  width: 100%;
  height: 200px;
  margin-top: 10px;
}
</style>