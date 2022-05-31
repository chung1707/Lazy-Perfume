<template>
  <main role="main" class="blogPage">
    <section class="jumbotron text-center blog_header">
      <div class="container" v-if="post">
        <h1 class="jumbotron-heading">Lazy Perfume</h1>
        <p class="lead text-muted">blog</p>
        <p>Tác giả: {{ post.user.name }}</p>
        <p v-if="post.category">Danh mục: {{ post.category.name }}</p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container post" v-if="post">
        <h2 class="post-title">{{ post.title }}</h2>
        <div v-html="post.content" class="content" style="color: grey"></div>
        <div class="post-related">
          <h4 class="post-title">Bài viết liên quan</h4>
          <div class="row" v-if="relatedPosts">
            <div class="col-md-4" v-for="post in relatedPosts" :key="post">
              <div class="card mb-4 box-shadow">
                <router-link
                  :to="{ name: 'ClientPostDetail', params: { id: post.id } }"
                >
                  <img
                    v-if="post"
                    class="card-img-top"
                    data-src="holder.js/200px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                    alt="Thumbnail [100%x500]"
                    style="height: 350px; width: 100%; display: block"
                    :src="imgUrl + post.thumbnail"
                    data-holder-rendered="true"
                  />
                </router-link>

                <div class="card-body">
                  <router-link
                    class="card-text"
                    :to="{ name: 'ClientPostDetail', params: { id: post.id } }"
                    style="padding: 10px 0px; display: block; color: grey"
                    ><p>{{ post.title }}</p>
                  </router-link>
                  <p class="card-text">
                    {{ post.content.substring(0, 100) + ".." }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <router-link
                        :to="{
                          name: 'ClientPostDetail',
                          params: { id: post.id },
                        }"
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Khám phá!
                      </router-link>
                    </div>
                    <small class="text-muted">{{ post.created_at }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import baseRequest from "../../base/baseRequest";

export default {
  computed: {
    ...mapGetters(["imgUrl"]),
  },
  data() {
    return {
      post: {},
      relatedPosts: {},
    };
  },
  methods: {
    getPost() {
      this.$isLoading(true);
      baseRequest.get("post/" + this.$route.params.id).then((response) => {
        this.post = response.data.post;
        this.relatedPosts = response.data.relatedPosts;
        this.$isLoading(false);
      });
    },
  },
  watch: {
    $route() {
      this.$isLoading(true);
      this.getPost();
    },
  },
  beforeMount() {
    this.getPost();
    this.$isLoading(false);
  },
};
</script>

<style scoped lang="scss">
main {
  margin-top: 60px;
}
.jumbotron {
  padding: 100px;
  max-width: 1600px;
  margin: 0px auto;
}
nav {
  padding: 0 40%;
  margin: 30px 0px;
}
.blog_header {
  background-image: url("../../assets/images/blog.jpg");
}
.lead {
  color: white !important;
}
.btn-secondary {
  padding: 5px;
}

.lead,
.btn-secondary {
  font-size: 20px;
}
</style>
