<template>
  <div class="wrap">
    <popupTweet
      v-if="isClickPopupTweet"
      @close-PopupTweet="closePopupTweet"
      @after-create-tweet="afterCreateTweet"
      :user="user"
    />
    <popupReplyList
      v-if="isClickPopupReplyList"
      @close-PopupReplyList="closePopupReplyList"
      :tweet="tweet"
      :user="user"
      @after-create-reply-list="afterCreateReplyList"
    />
    <!-- <popupReplyList /> -->
    <!-- <popupReplyList />
    <popupReply /> -->
    <navigation @after-open-tweet="afterOpenTweet" :userId="currentUser.id" />
    <div class="reply-wrap">
      <div class="reply-title" @click="$router.back()">
        <div class="reply-forward">
          <img src="../assets/images/forward.png" alt="" />
        </div>
        <h4>推文</h4>
      </div>
      <div class="reply">
        <div class="reply-inner">
          <router-link
            class="reply-user"
            :to="{ name: 'SelfPage', params: { id: tweet.User.id } }"
          >
            <div class="reply-avatar">
              <img :src="tweet.User.avatar | emptyAvatar" alt="" />
            </div>
            <div class="reply-name-group">
              <p class="reply-name">
                <b>{{ tweet.User.name }}</b>
              </p>
              <p class="reply-account fz14">@{{ tweet.User.account }}</p>
            </div>
          </router-link>

          <div class="reply-text">
            {{ tweet.description }}
          </div>
          <p class="fz14 reply-time">{{ tweet.createdAt | ampm }}</p>
          <!-- <p class="fz14 reply-time">上午 10:05・2021年11月10日</p> -->
        </div>
        <div class="reply-count">
          <div class="reply-num">
            <span>{{ tweet.totalReplies }}</span> 回覆
          </div>
          <div class="like-num">
            <span> {{ tweet.totalLikes }}</span> 喜歡次數
          </div>
        </div>
        <div class="reply-count-btn">
          <div class="reply-btn" @click.prevent.stop="openPopupReplyList">
            <img src="../assets/images/tweet-reply.png" alt="" />
          </div>

          <div
            class="like-btn"
            v-if="tweet.isLiked"
            @click.prevent.stop="unLike(tweet.id)"
          >
            <img src="../assets/images/tweet-like-active.png" alt="" />
          </div>

          <div
            class="like-btn"
            v-if="!tweet.isLiked"
            @click.prevent.stop="addLike(tweet.id)"
          >
            <img src="../assets/images/tweet-like.png" alt="" />
          </div>
        </div>
      </div>
      <div class="reply-tweet-wrap">
        <div class="reply-tweet-card" v-for="reply in replies" :key="reply.id">
          <div class="reply-tweet-avatar">
            <img :src="reply.User.avatar | emptyAvatar" alt="" />
          </div>
          <div class="reply-tweet-content">
            <div class="reply-tweet-name-group">
              <p class="reply-tweet-name">
                <b>{{ reply.User.name }}</b>
                <span
                  >@{{ reply.User.account }}・{{
                    reply.createdAt | fromNow
                  }}</span
                >
              </p>
              <p class="reply-to fz14">
                <span>回覆</span> @{{ tweet.User.account }}
              </p>
            </div>
            <div class="reply-tweet-text">
              <p>
                {{ reply.comment }}
              </p>
            </div>
            <div class="reply-tweet-count">
              <div class="reply-tweet-reply">
                <div class="reply-tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>0</b></p>
              </div>
              <div class="reply-tweet-like">
                <div class="reply-tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ reply.LikedUsers.length }}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <followTop :initialUser="currentUser" :otherUser="user" />
    <!-- <followTop :userId="currentUser.id" /> -->
  </div>
</template>
<script>
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import navigation from "./../components/nav";
import followTop from "./../components/followTop";
import popupTweet from "./../components/popupTweet";
import popupReplyList from "./../components/popupReplyList";
import tweetsApi from "./../apis/tweets";
import userApi from "./../apis/user";
import { mapState } from "vuex";

export default {
  name: "tweet",
  components: {
    navigation,
    followTop,
    popupTweet,
    popupReplyList,
  },
  data() {
    return {
      user: {},
      tweets: [],
      tweet: {
        User: {
          id: 0,
        },
        totalLikes: 0,
      },
      replies: {},
      isClickPopupTweet: false,
      isClickPopupReplyList: false,
    };
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetsApi.getTweet(tweetId);
        // console.log("data", data);
        this.tweet = data;
        // console.log("this.tweet", this.tweet);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    async fetchTweetReplies(tweetId) {
      try {
        const { data } = await tweetsApi.getTweetReplies(tweetId);
        this.replies = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    async afterCreateTweet(payload) {
      try {
        const { description } = payload;
        const data = await tweetsApi.postTweets({ description });
        if (data.data.status !== "Success") {
          throw new Error(data.message);
        }
        const tweetId = data.data.data.tweet.id;
        this.tweets.unshift({
          description,
          id: tweetId,
          User: {
            id: this.user.id,
            account: this.user.account,
            name: this.user.name,
            avatar: this.user.avatar,
          },
          createdAt: new Date(),
          totalLikes: 0,
          totalReplies: 0,
        });

        this.$router.push("/tweets");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweet",
        });
      }
    },
    async afterCreateReplyList(payload) {
      try {
        const { comment, TweetId } = payload;
        const data = await tweetsApi.postTweetsReply({
          comment,
          TweetId,
        });
        console.log("data", data);
        // if (data.data.status !== "Success") {
        //   throw new Error(data.message);
        // }
        this.replies.unshift({
          comment,
          TweetId,
          User: {
            id: this.user.id,
            account: this.user.account,
            name: this.user.name,
            avatar: this.user.avatar,
          },
          LikedUsers: [],
          createdAt: new Date(),
        });

        /*關掉PopupTweet*/
        this.isClickPopupReplyList = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweetReply",
        });
      }
    },
    async addLike(TweetId) {
      try {
        await userApi.addLike({ TweetId });
        // if (dataLike.data.status !== "Success") {
        //   throw new Error(dataLike.data.message);
        // }
        this.tweet.isLiked = true;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法like此筆tweet，請稍後再試",
        });
      }
    },
    async unLike(TweetId) {
      try {
        await userApi.unLike({ TweetId });
        // if (dataLike.data.status !== "Success") {
        //   throw new Error(dataLike.data.message);
        // }

        this.tweet.isLiked = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法like此筆tweet，請稍後再試",
        });
      }
    },

    afterOpenTweet(payload) {
      //將彈跳視窗打開
      const { isClickPopupTweet } = payload;
      this.isClickPopupTweet = isClickPopupTweet;
    },
    openPopupTweet() {
      //將彈跳視窗打開

      this.isClickPopupTweet = true;
    },
    closePopupTweet(payloadPopup) {
      //將彈跳視窗關閉
      const { isClickPopupTweet } = payloadPopup;
      this.isClickPopupTweet = isClickPopupTweet;
    },
    openPopupReplyList() {
      this.isClickPopupReplyList = true;
    },
    closePopupReplyList(payload) {
      const { isClickPopupReplyList } = payload;
      this.isClickPopupReplyList = isClickPopupReplyList;
    },
  },
  created() {
    // 用token取得資料，取得後看role，是user或是admin，如果不是use，就跳出提醒，回到登入頁
    const twitterToken = localStorage.getItem("token");
    //console.log(twitterToken)
    if (!twitterToken) {
      Toast.fire({
        icon: "warning",
        title: "請登入",
      });
      this.$router.push("/login");
    }

    const { id: tweetId } = this.$route.params;

    this.fetchTweet(tweetId);
    this.fetchTweetReplies(tweetId);
    this.user = this.currentUser;
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mixins: [fromNowFilter, emptyImageFilter],
};
</script>

<style lang="css" src="@/assets/css/reply.css" scoped></style>
<style scoped>
.reply-text {
  color: black;
}
</style>