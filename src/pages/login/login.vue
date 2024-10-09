<script>
import { login } from '../../utils/api';
import { setToken } from '../../utils/auth';

export default {
  // ... existing code ...

  methods: {
    async login() {
      try {
        const response = await login(this.username, this.password);
        setToken(response.token);
        uni.switchTab({
          url: '/pages/index/index'
        });
      } catch (error) {
        console.error('Login error:', error);
        uni.showToast({
          title: 'Login failed',
          icon: 'none'
        });
      }
    },
    // ... other methods ...
  }
}
</script>