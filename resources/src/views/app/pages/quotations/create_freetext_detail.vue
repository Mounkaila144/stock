<template>
    <div>
      <!-- <b-button v-b-modal.modal1>Launch Modal</b-button> -->
      <b-button v-b-modal.modal1 variant="primary" r-click="() => AddUnamed()" class="mt-3">
                    <i class="i-add me-2"></i>
                    {{ $t('Add') }}
                  </b-button>
  
      <b-modal id="modal1" title="Enter Details" @ok="handleOk">
        <form @submit.stop.prevent="handleOk">
          <b-form-group label="Description">
            <b-form-input v-model="description"></b-form-input>
          </b-form-group>
  
          <b-form-group label="Unit Price">
            <b-form-input type="number" v-model="unitPrice"></b-form-input>
          </b-form-group>
  
          <b-form-group label="Quantity">
            <b-form-input type="number" v-model="quantity"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        description: '',
        unitPrice: 0,
        quantity: 0
      }
    },
    methods: {
      handleOk(evt) {
        const data = {
          description: this.description,
          unitPrice: this.unitPrice,
          quantity: this.quantity
        };

        // console.log("SUBMITTING",{data});
        evt.preventDefault();
        // Here you can handle the form submission
        // console.log(this.description, this.unitPrice, this.quantity);

        this.$emit('submit', data);
      }
    }
  }
  </script>