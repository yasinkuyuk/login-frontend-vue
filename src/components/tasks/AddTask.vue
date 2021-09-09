<template>
  <div>
    <form @submit.prevent="register" class="mt-3 mb-3">
      <div class="title">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.title.$error }"
        >
          <input
            type="text"
            :placeholder="$t('title')"
            v-model.trim="$v.title.$model"
          />
        </div>
        <div class="error" v-if="!$v.title.minLength">
          {{ $t("title_length") }}: {{ $v.title.$params.minLength.min }}
          {{ $t("letters") }}
        </div>
      </div>
      <div class="description">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.description.$error }"
        >
          <input
            type="text"
            :placeholder="$t('description')"
            v-model.trim="$v.description.$model"
          />
        </div>
        <div class="error" v-if="!$v.description.minLength">
          {{ $t("descripiton_length") }}
          {{ $v.description.$params.minLength.min }}
          {{ $t("letters") }}
        </div>
      </div>
      <div class="date">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.date.$error }"
        >
          <label class="form__label">{{ $t("dueDate") }}</label>
          <input type="date" v-model.trim="$v.date.$model" />
        </div>
        <div class="error" v-if="submitStatus === 'ERROR'">
          {{ $t("date_required") }}
        </div>
      </div>
      <div class="time">
        <div
          class="form-group"
        >
          <label class="form__label">{{ $t("time") }}</label>
          <input type="time" v-model.trim="$v.time.$model" />
        </div>
      </div>
      <b-button
        @click.prevent="addTask"
        class="mt-2"
        variant="success"
        size="sm"
        :disabled="submitStatus === 'PENDING'"
      >
        {{ $t("addTask") }}
      </b-button>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">
        {{ $t("sending") }}
      </p>
    </form>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Test",
  data() {
    return {
      title: "",
      description: "",
      date: "",
      time: "",
      submitStatus: null,
    };
  },
  computed: {
    dueDate() {
      return this.date + "T" + this.time;
    },
  },
  validations: {
    title: {
      required,
      minLength: minLength(3),
    },
    description: {
      required,
      minLength: minLength(15),
    },
    date: {
      required,
    },
    time:{}
  },
  methods: {
    getDate() {
      var tzoffset = new Date().getTimezoneOffset() * 60000;
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -1);
      const today = localISOTime.substring(0, 16);
      return today;
    },
    makeTaskItem() {
      const task = {
        title: this.title,
        description: this.description,
        dateCreated: this.getDate(),
        status: false,
        dueDate: this.dueDate,
      };
      return task;
    },
    resetComponentData() {
      this.title = "";
      this.description = "";
      this.date = "";
      this.time = "";
    },
    async addTask() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$store.dispatch("createTask", this.makeTaskItem());
        this.resetComponentData();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.error {
  color: red;
  font-size: 12px;
}
</style>
