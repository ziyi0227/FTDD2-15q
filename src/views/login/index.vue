<template>
  <div class="login-container">
    <el-form ref="activeForm" :model="activeForm" :rules="activeRules" class="login-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎使用才识雷达平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="activeForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

<!--      登录表单  -->

      <el-form-item v-if="isLoginForm" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="activeForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLoginOrRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <!-- 注册 -->
      <el-form-item v-else prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="activeForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLoginOrRegister"
        />
      </el-form-item>
        <div class="password-confirm-gap" v-if="!isLoginForm"></div>
        <!-- 确认密码 -->
        <el-form-item  v-if="!isLoginForm" prop="confirmPassword">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input
            v-model="activeForm.confirmPassword"
            :type="passwordType"
            placeholder="确认密码"
            name="confirmPassword"
            tabindex="3"
            auto-complete="on"
            @keyup.enter.native="handleLoginOrRegister"
          />

        </el-form-item>


      <!-- 注册类型选择 -->
      <el-form-item label="注册类型：" prop="userType" v-if="!isLoginForm">
        <el-radio-group v-model="activeForm.userType">
          <el-radio label="求职者" border >求职者</el-radio>
          <el-radio label="面试官" border>面试官</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 登录/注册按钮 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLoginOrRegister">{{ activeButton }}
      </el-button>

      <!-- 切换按钮 -->
      <el-button type="text" @click="toggleForm">
        {{ isLoginForm ? '注册新账号' : '返回登录' }}
      </el-button>

    </el-form>
  </div>
</template>

<script>
import {validUsername} from '@/utils/validate'
import ElMessage from 'autoprefixer/lib/utils';

// 登录注册切换时，清空绑定模型中的数据



export default {
  name: 'LoginAndRegister',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.activeForm.password) {
        callback(new Error('两次输入的密码不一致'))
      }else if(value===''){
        callback(new Error('请再次确认密码'))
      } else {
        callback()
      }
    }
    return {
      // radio1: '上海',
      activeForm: {
        userType: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      activeRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        userType: [{required: true, message: '请选择注册类型', trigger: 'change'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      activeButton: '登 录',
      isLoginForm: true,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    toggleForm() {
      this.clearData();
      this.isLoginForm = !this.isLoginForm
      this.activeButton = this.isLoginForm ? '登 录' : '注 册'
      this.$nextTick(() => {
        this.$refs.username.focus()
      })
    },
    clearData(){
      this.activeForm.username=''
      this.activeForm.password=''
      this.activeForm.confirmPassword=''
    },
     handleLoginOrRegister() {
      this.$refs.activeForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            if (this.isLoginForm) {
              await this.$store.dispatch('user/login', this.activeForm)
            } else {
              await this.$store.dispatch('user/register', this.activeForm)
            }
            this.$router.push({path: this.redirect || '/'})
            this.loading = false
          } catch (err) {
            ElMessage.error(err.message || '操作失败，请稍后重试')
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}



</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fdfdfe;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #2c3c50;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fdfdfe;
$dark_gray: #2c3c50;
$light_gray: #6c9bbe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  background-image: url("~@/assets/login-bg.svg");
  background-size: 100%;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .password-confirm-gap {
    margin-top: 16px; /* 根据需要调整合适的间距大小 */
  }
}

</style>
