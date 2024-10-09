<script>
import { createCharacter } from '../../utils/api';

export default {
  // ... existing code ...

  methods: {
    // ... other methods ...

    async saveCharacter() {
      try {
        const characterData = {
          description: this.characterDescription,
          skinColor: this.skinColors[this.skinColorIndex],
          hairstyle: this.hairstyles[this.hairstyleIndex],
          outfit: this.outfits[this.outfitIndex],
          personalityTraits: this.personalityTraits,
          referenceImage: this.referenceImage
        };
        await createCharacter(characterData);
        uni.showToast({
          title: 'Character saved',
          icon: 'success'
        });
      } catch (error) {
        console.error('Save character error:', error);
        uni.showToast({
          title: 'Failed to save character',
          icon: 'none'
        });
      }
    }
  }
}
</script>