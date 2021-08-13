<template>
  <div>
    {{ token }}
    <div>
        <input
          type="password"
          v-model="newPassword"
          placeholder="New Password"
        />
        <input
          type="password"
          v-model="confirmedPassword"
          placeholder="Confirm Password"
        />
        <input
          type="password"
          v-model="oldPassword"
          placeholder="Type Your Old Password"
        />
        <b-button variant="success" type="submit" :disabled="!canUpdate" @click="updatePassword" size="sm">
          Update Password
        </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmedPassword: "",
    };
  },
  computed: {
    ...mapGetters(["token"]),
    canUpdate() {
      return (
        this.newPassword === this.confirmedPassword &&
        this.oldPassword &&
        this.newPassword
      );
    },
  },
  methods: {
    makeJSON(){
        return {
            "oldPassword" : this.oldPassword,
            "newPassword" : this.newPassword
        }
    } ,
    async updatePassword() {
      await this.$store.dispatch("updatePassword",this.makeJSON());
      this.$router.push({
          name:"index"
      })
    },
  },
};
</script>
