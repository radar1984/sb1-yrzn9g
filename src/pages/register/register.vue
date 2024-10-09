<script>
import { register } from '../../utils/api';
import { setToken } from '../../utils/auth';

export default {
  // ... existing code ...

  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: 'Passwords do not match',
          icon: 'none'
        });
        return;
      }
      try {
        const response = await register(this.username, this.email, this.password, this.phone);
        setToken(response.token);
        uni.switchTab({
          url: '/pages/index/index'
        });
      } catch (error) {
        console.error('Registration error:', error);
        uni.showToast({
          title: 'Registration failed',
          icon: 'none'
        });
      }
    }
  }
}
</script>