<template>
  <main role="main" class="blogPage">
    <section class="jumbotron text-center blog_header">
      <div class="container">
        <h1 class="jumbotron-heading">Lazy Perfume</h1>
        <p class="lead text-muted">blog</p>
        <p>
          <a
            @click.prevent="selectCategory(category.id)"
            v-for="category in categories"
            :key="category"
            class="btn btn-secondary my-2"
            >{{ category.name }}</a
          >
        </p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row" v-if="posts">
          <div class="col-md-4" v-for="post in posts" :key="post">
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
                <p class="card-text" v-html=" post.content.substring(0, 100) + '....'">
                </p>
                <div class="d-flex justify-content-between align-items-center">
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
        <div class="row" v-if="posts.length <= 1 && loaded">
          <a
            @click.prevent="resetFilter()"
            class="col-4 remove-btn btn btn-secondary my-2"
            >Bỏ lọc thể loại</a
          >
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" v-if="currentPage > 1">
              <a
                class="page-link button-link"
                href="#"
                @click.prevent="currentPage--"
                tabindex="-1"
                >Trang trước</a
              >
            </li>
            <li
              class="page-item"
              :class="{ active: currentPage == page }"
              v-for="page in totalPage"
              :key="page"
            >
              <a
                v-if="Object.keys(posts).length !== 0"
                class="page-link"
                @click.prevent="currentPage = page"
                href="#"
                >{{ page }}</a
              >
            </li>
            <li class="page-item" v-if="currentPage < totalPage">
              <a
                class="page-link button-link"
                @click.prevent="currentPage++"
                href="#"
                >Trang tiếp</a
              >
            </li>
          </ul>
        </nav>
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
      forProduct: "false",
      categories: {},
      category_id_selected: null,
      posts: [],
      totalPage: 0,
      currentPage: 1,
      loaded: false,
    };
  },
  methods: {
    getCategories() {
      baseRequest.get("getCategories", this.forProduct).then((response) => {
        this.categories = response.data;
      });
    },
    getPosts() {
      this.$isLoading(true);
      this.loaded = false;
      baseRequest
        .get("posts?page=" + this.currentPage, this.category_id_selected)
        .then((response) => {
          this.posts = response.data.data;
          this.totalProducts = response.data.total;
          this.totalPage = response.data.last_page;
        })
        .finally(() => {
          this.$isLoading(false);
          this.loaded = true;
        });
    },
    resetFilter() {
      this.category_id_selected = null;
      this.getPosts();
    },
    selectCategory(id) {
      this.category_id_selected = id;
      this.getPosts();
    },
  },
  watch: {
    currentPage() {
      this.getPosts();
    },
  },
  mounted() {
    this.getCategories();
    this.getPosts();
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
.button-link {
  width: 130px;
  text-align: center;
}
.remove-btn {
  margin: 0px auto;
}
</style>
