<template>
  <div class="followTop">
    <div class="followTop-title">
      <h4>跟隨誰</h4>
    </div>
    <div class="followTop-wrap" v-for="top in tops" :key="top.is">
      <div class="followTop-card">
        <router-link
          :to="{ name: 'SelfPage', params: { id: top.id } }"
          class="followTop-avatar"
        >
          <img :src="top.avatar | emptyAvatar" alt="" />
        </router-link>
        <router-link
          :to="{ name: 'SelfPage', params: { id: top.id } }"
          class="followTop-name-wrap"
        >
          <p class="followTop-name">
            <b>{{ top.name }}</b>
          </p>
          <p class="fz14 followTop-account">@{{ top.account }}</p>
        </router-link>

        <div class="followTop-btn-wrap" v-if="top.id == testId">
          <div class="btn active followTop-btn special-you">你很受歡迎</div>
        </div>
        <div class="followTop-btn-wrap" v-else-if="top.isFollowed">
          <div
            class="btn active followTop-btn"
            @click.prevent.stop="unFollow(top.id)"
          >
            正在跟隨
          </div>
        </div>
        <div class="followTop-btn-wrap" v-else>
          <div
            class="btn followTop-btn"
            @click.prevent.stop="addFollow(top.id)"
          >
            跟隨
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "./../apis/user";
import followshipApi from "./../apis/followship";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tops: {},
      testId: -1,
    };
  },
  methods: {
    async featchTop() {
      try {
        // 取得tweets資料
        const Topdata = await userApi.getTop();
        const { data } = Topdata;
        this.tops = data;
        this.testId = this.currentUser.id;
        console.log('this.tops',this.tops)
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得Tops資料，請稍後再試",
        });
      }
    },
    async addFollow(id) {
      try {
        await followshipApi.addFollow({ id });
        this.tops = this.tops.map((top) => {
          if (top.id === id) {
            return {
              ...top,
              isFollowed: true,
            };
          }
          return top;
        });

        // 找到這個物件
        const followObj = this.tops.find(top => top.id === id)
        console.log(followObj)
        this.$emit("addFollow-From-followTop", followObj);

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法follow此人，請稍後再試",
        });
      }
    },
    async unFollow(followingId) {
      try {
        await followshipApi.unFollow({ followingId });

        this.tops = this.tops.map((top) => {
          if (top.id === followingId) {
            return {
              ...top,
              isFollowed: false,
            };
          }
          return top;
        });

        // 找到這個物件
        const followObj = this.tops.find(top => top.id === followingId)
        console.log(followObj)
        this.$emit("unFollow-From-followTop", followObj);

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unFollow此人，請稍後再試",
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.featchTop();
  },
  mixins: [emptyImageFilter],
};
</script>


<style lang="css" src="@/assets/css/followTop.css" scoped></style>

<style scoped>
.special-you {
  background-color: orange;
  color: black;
  border-color: orange;
}
</style>