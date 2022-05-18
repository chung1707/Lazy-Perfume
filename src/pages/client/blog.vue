<template>
  <main role="main" class="blogPage">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Album example</h1>
        <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don't simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-4" v-for="post in posts" :key="post">
            <div class="card mb-4 box-shadow">
              <img
                class="card-img-top"
                data-src="holder.js/200px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                alt="Thumbnail [100%x500]"
                style="height: 350px; width: 100%; display: block"
                         :src="imgUrl + 'product'+post+'.jpg'"
                data-holder-rendered="true"
              />
              <div class="card-body">
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>

        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
    ...mapGetters(["imgUrl"]),
  },
  data(){
    return {
      posts: [1,2,3,4,5,6,7,8,9,10,11,12],
    }
  },
  mounted() {
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
  max-width: 1000px;
  margin: 0px auto;
}
nav {
  padding: 0 40%;
  margin: 30px 0px;
}
</style>
