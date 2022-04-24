<template>
  <div class="container d-flex align-content-center align-items-center vh-100">
    <div
      class="
        form-box
        w-50
        d-flex
        justify-content-center
        align-items-center
        h-100
      "
    >
      <form class="d-flex flex-column gap-2 w-50" @submit.prevent="SignIn">
        <h1><i class="fa-solid fa-snowflake" style="color: blue"></i></h1>
        <h3>Войдите в свою учетную запис</h3>
        <p>
          Номер телефона
          <input
            type="number"
            class="form-control"
            v-model="user.phone"
            required
          />
        </p>
        <p>
          Парол
          <input
            type="text"
            class="form-control"
            v-model="user.password"
            required
          />
        </p>
        <button type="submit" class="btn btn-primary form-control">
          Войти в систему
        </button>
      </form>
    </div>
    <div class="right-bg w-50 h-100">
      <img
        src="https://archello.s3.eu-central-1.amazonaws.com/images/2018/10/11/Contemporary-Modern-House-Design-6.1539270983.8601.jpg"
        class="h-100"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignIn",

  data() {
    return {
      myToken: "",
      user: {
        phone: "",
        password: "",
      },
    };
  },

  mounted() {
    this.myToken = localStorage.getItem("myToken");
    this.myToken ? this.$router.push("/main") : this.$router.push("/");
  },

  methods: {
    async SignIn() {
      const data = await axios.post(
        "https://frontend-task.depocloud.ml/api/mobile/login",
        {
          phone_number: this.user.phone,
          password: this.user.password,
        }
      );

      if (data.data.status == "OK") {
        localStorage.setItem("myToken", JSON.stringify(data.data));
        this.$router.push("/main");
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>
