<template>
  <view class="gallery-container">
    <view v-if="images.length === 0" class="empty-gallery">
      <text>You haven't created any images yet.</text>
    </view>
    <view v-else class="image-grid">
      <view v-for="image in images" :key="image.id" class="image-item">
        <image :src="image.url" mode="aspectFill" @click="showImageDetails(image)"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserImages } from '../../utils/api';

export default {
  data() {
    return {
      images: []
    }
  },
  async created() {
    await this.loadImages();
  },
  methods: {
    async loadImages() {
      try {
        this.images = await getUserImages();
      } catch (error) {
        console.error('Failed to load images:', error);
        uni.showToast({
          title: 'Failed to load images',
          icon: 'none'
        });
      }
    },
    showImageDetails(image) {
      uni.navigateTo({
        url: `/pages/image-details/image-details?id=${image.id}`
      });
    }
  }
}
</script>

<style>
.gallery-container {
  padding: 20px;
}
.empty-gallery {
  text-align: center;
  margin-top: 50px;
}
.image-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.image-item {
  width: 48%;
  margin-bottom: 20px;
}
.image-item image {
  width: 100%;
  height: 200px;
  border-radius: 4px;
}
</style>