<template>
  <view class="image-generation-container">
    <view class="form-group">
      <text>Prompt</text>
      <textarea v-model="prompt" placeholder="Describe the image you want to generate"></textarea>
    </view>
    <button @click="generateImage">Generate Image</button>
    <image v-if="generatedImage" :src="generatedImage" mode="aspectFit"></image>
  </view>
</template>

<script>
import { generateImage } from '../../utils/api';

export default {
  data() {
    return {
      prompt: '',
      generatedImage: ''
    }
  },
  methods: {
    async generateImage() {
      try {
        uni.showLoading({
          title: 'Generating image...'
        });
        const response = await generateImage(this.prompt);
        this.generatedImage = response.imageUrl;
        uni.hideLoading();
      } catch (error) {
        console.error('Image generation error:', error);
        uni.showToast({
          title: 'Failed to generate image',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style>
.image-generation-container {
  padding: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group text {
  display: block;
  margin-bottom: 5px;
}
.form-group textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}
button {
  margin-top: 20px;
}
image {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
</style>