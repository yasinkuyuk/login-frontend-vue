<template>
  <b-container>
    <b-modal id="deleteModal" :title="$t('deleteUser')">
        <p>{{$t('deleteUserSentence')}}{{username}}?</p>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="warning" @click="cancel(ok)">
          {{$t('cancel')}}
        </b-button>
        <b-button size="sm" variant="danger" @click="deleteUser(ok)"
          >{{$t('deleteUser')}}</b-button
        >
      </template>
    </b-modal>
  </b-container>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  name: "DeleteModal",
  computed:{
      ...mapGetters(["username"])
  },
  methods: {
    async deleteUser(ok) {
      await this.$store.dispatch("deleteUser");
      this.$router.push({name:"index"});
      ok();
    },
    cancel(ok) {
      ok();
    },
  },
};
</script>
