<template>
  <div class="nav">
    <popupTweet v-if="isClickPopupTweet" @close-PopupTweet="closePopupTweet" />
    <router-link to="/tweets" class="logo">
      <img src="../assets/images/logo.png" alt="" />
    </router-link>
    <div class="nav-btn-group">
      <router-link to="/tweets" class="nav-btn">
        <div class="nav-btn-img nav-btn-home-img"></div>
        <h5>首頁</h5>
      </router-link>
      <router-link
        :to="{ name: 'SelfPage', params: { id: userId } }"
        class="nav-btn"
      >
        <div class="nav-btn-img nav-btn-user-img"></div>
        <h5>個人資料</h5>
      </router-link>
      <router-link to="/setting" class="nav-btn">
        <div class="nav-btn-img nav-btn-setting-img"></div>
        <h5>設定</h5>
      </router-link>
    </div>
    <div class="btn nav-btn-tweet" @click.prevent.stop="openPopupTweet">
      推文
    </div>
    <div class="nav-btn-group-bottom">
      <div class="nav-btn-group btn-bottom" @click="logOut">
        <router-link to="/login" class="nav-btn">
          <div class="nav-btn-img nav-btn-left-img"></div>
          <h5>登出</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import popupTweet from "../components/popupTweet";
import { Toast } from './../utils/helpers'

export default {
  name: "navigation",
  components: {
    popupTweet,
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isClickPopupTweet: false,
    };
  },
  methods: {
    openPopupTweet() {
      console.log("open2");
      this.isClickPopupTweet = true;
    },
    closePopupTweet(payload) {
      const { isClickPopupTweet } = payload;
      this.isClickPopupTweet = isClickPopupTweet;
    },
    logOut() {
      localStorage.removeItem("token");
      Toast.fire({
        icon: 'success',
        title: '成功登出'
      })
    },
  },
};
</script>
<style lang="css" src="@/assets/css/nav.css" scoped></style>