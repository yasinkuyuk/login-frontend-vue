<template>
  <b-container>
    <b-modal id="modal-scoped" :title="modalContent.title">
        <p>{{modalContent.content}}</p>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="warning" @click="cancel(ok)">
          Cancel
        </b-button>
        <b-button size="sm" variant="danger" @click="sustainProcess(ok)"
          >{{modalContent.okButton}}</b-button
        >
      </template>
    </b-modal>
  </b-container>
</template>
<script>
import {eventBus} from "../event"

export default {
  name: "AlertModal",
  methods: {
    sustainProcess(ok) {
      console.log("change içi", this.modalContent.functionality)
      eventBus.$emit("sendSignal",this.modalContent.functionality);
      ok();
    },
    cancel(ok) {
      ok();
    },
  },
  props:{
    modalContent:{
      type: Object,
      default(){
        return {
          functionality:"",
          title:"",
          content:"",
          okButton:""        }
      }
    }
  }
};
</script>
