<template>
  <div class="main-content">
    <!-- {{ { purchase_shiments } }} -->
    <breadcumb :page="$t('Shipments')" :folder="$t('Purchase')" />

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table mode="remote" :columns="columns" :totalRows="totalRows" :rows="purchase_shiments"
        @on-page-change="onPageChange" @on-per-page-change="onPerPageChange" @on-sort-change="onSortChange"
        @on-search="onSearch" :search-options="{
      enabled: true,
      placeholder: $t('Search_this_table'),
    }" :select-options="{
      enabled: true,
      clearSelectionText: '',
    }" :pagination-options="{
      enabled: true,
      mode: 'records',
      nextLabel: 'next',
      prevLabel: 'prev',
    }" styleClass="table-hover tableOne vgt-table">
        <div slot="table-actions" class="mt-2 mb-3">
          <b-button @click="New_Shipment()" class="btn-rounded" variant="btn btn-primary btn-icon m-1">
            <i class="i-Add"></i>
            {{ $t('Add') }}
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            <template v-if="props.row.tracking_url">
              <a :href="props.row.tracking_url" title="Visit" target="_blanck" v-b-tooltip.hover>
              <i class="i-Right text-25 text-success"></i>
            </a>
          </template>
            <a @click="Edit_Shipment(props.row)" title="Edit" v-b-tooltip.hover>
              <i class="i-Edit text-25 text-success"></i>
            </a>
            <a title="Delete" v-b-tooltip.hover @click="Remove_Shipment(props.row.id)">
              <i class="i-Close-Window text-25 text-danger"></i>
            </a>
          </span>
          <div v-else-if="props.column.field == 'BaseShipment'">
            <span v-if="props.row.date != ''">{{ props.row.date }}</span>
            <span v-else>N/D</span>
          </div>

          <div v-else-if="props.column.field == 'status'">
            <span v-if="props.row.status == 'delivered'" class="badge badge-outline-success">{{
      $t('Delivered') }}</span>
            <span v-else-if="props.row.status == 'intransit'" class="badge badge-outline-info">{{
      $t('In Transit') }}</span>
            <span v-else-if="props.row.status == 'pending'" class="badge badge-outline-secondary">{{
      $t('Pending') }}</span>
            <span v-else class="badge badge-outline-warning">{{ $t(props.row.status) }}</span>
          </div>
        </template>
      </vue-good-table>
    </b-card>

    <validation-observer ref="Create_Shipment">
      <b-modal hide-footer size="lg" id="New_Shipment" :title="editmode ? $t('Edit') : $t('Add')">
        <b-form @submit.prevent="Submit_Shipment">
          <b-row>
            <!-- Order Number -->
            <b-col md="6">
              <validation-provider name="order_number" :rules="{ required: true, max: 68 }" v-slot="validationContext">
                <b-form-group :label="$t('OrderNumber') + ' ' + '*'">
                  <b-form-input :placeholder="$t('Enter_Shipment_OrderNumber')"
                    :state="getValidationState(validationContext)" aria-describedby="order_number-feedback"
                    :label="$t('OrderNumber')" v-model="shipment.order_number"></b-form-input>
                  <b-form-invalid-feedback id="order_number-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider name="tracking_number" :rules="{ required: false, max: 68 }"
                v-slot="validationContext">
                <b-form-group :label="$t('TrackingNumber') + ' ' + '*'">
                  <b-form-input :placeholder="$t('Enter_Shipment_TrackingNumber')"
                    :state="getValidationState(validationContext)" aria-describedby="tracking_number-feedback"
                    :label="$t('TrackingNumber')" v-model="shipment.tracking_number"></b-form-input>
                  <b-form-invalid-feedback id="tracking_number-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>



            <b-col md="6">
              <validation-provider name="date" :rules="{ required: true, }" v-slot="validationContext">
                <b-form-group :label="$t('Date') + ' ' + '*'">
                  <b-form-datepicker :placeholder="$t('Enter_Shipment_Date')"
                    :state="getValidationState(validationContext)" aria-describedby="date-feedback" :label="$t('Date')"
                    type="datetime" v-model="shipment.date"></b-form-datepicker>
                  <b-form-invalid-feedback id="date-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider name="expectedArrivalAt" :rules="{ required: false, }" v-slot="validationContext">
                <b-form-group :label="$t('ExpectedArrival')">
                  <b-form-datepicker :placeholder="$t('Enter_Shipment_Expected_Date')"
                    :state="getValidationState(validationContext)" aria-describedby="expectedArrivalAt-feedback"
                    :label="$t('ExpectedArrival')" type="datetime"
                    v-model="shipment.expected_arrival_at"></b-form-datepicker>
                  <b-form-invalid-feedback id="expectedArrivalAt-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Description -->
            <b-col md="12">
              <validation-provider name="description" :rules="{ required: false, max: 1000 }"
                v-slot="validationContext">
                <b-form-group :label="$t('Description')">
                  <b-form-textarea :placeholder="$t('Enter_Shipment_Description')"
                    :state="getValidationState(validationContext)" aria-describedby="Description-feedback"
                    label="Description" v-model="shipment.description" :rows="6" clearable></b-form-textarea>
                  <b-form-invalid-feedback id="description-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- purchase -->
            <b-col lg="6" md="6" sm="12" class="mb-3">
              <validation-provider name="purchase" :rules="{ required: false }">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('purchase') + ' ' + '*'">
                  <v-select :class="{ 'is-invalid': !!errors.length }"
                    :state="errors[0] ? false : (valid ? true : null)" :disabled="!canSelectPurchase"
                    v-on-r-input="Selected_Purchase" v-model="shipment.purchase_id" :reduce="label => label.value"
                    :placeholder="$t('Choose_Purchase')"
                    :options="purchases.map(purchases => ({ label: purchases.Ref, value: purchases.id }))" />
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider name="tracking_url" :rules="{ required: false, max: 68 }"
                v-slot="validationContext">
                <b-form-group :label="$t('TrackingUrl')">
                  <b-form-input :placeholder="$t('Enter_Shipment_TrackingUrl')"
                    :state="getValidationState(validationContext)" aria-describedby="tracking_url-feedback"
                    :label="$t('TrackingUrl')" v-model="shipment.tracking_url"></b-form-input>
                  <b-form-invalid-feedback id="tracking_url-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Base shipment -->
            <!-- <b-col md="12">
              <b-form-group :label="$t('BaseShipment')">
                <v-select @input="Selected_Base_Shipment" v-model="shipment.expected_arrival_at" :reduce="label => label.value"
                  :placeholder="$t('Choose_Base_Shipment')"
                  :options="purchase_shiments_base.map(purchase_shiments_base => ({ label: purchase_shiments_base.order_number, value: purchase_shiments_base.id }))" />
              </b-form-group>
            </b-col> -->
            <!-- status  -->
            <b-col md="6" v-show="show_status">
              <b-form-group :label="$t('Status')">
                <v-select v-model="shipment.status" :reduce="label => label.value"
                  :placeholder="$t('Choose_Shipment_Status')" :options="[
      { label: 'Pending', value: 'pending' },
      { label: 'In Transit', value: 'intransit' },
      { label: 'Delivered', value: 'delivered' },
      { label: 'Cancelled', value: 'cancelled' },
    ]"></v-select>
              </b-form-group>
            </b-col>

            <!-- shipping_company_name -->
            <b-col md="6">
              <validation-provider name="shipping_company_name" :rules="{ required: true, max: 68 }"
                v-slot="validationContext">
                <b-form-group :label="$t('ShippingCompanyName') + ' ' + '*'">
                  <b-form-input :placeholder="$t('Enter_Shipment_ShippingCompanyName')"
                    :state="getValidationState(validationContext)" aria-describedby="shipping_company_name-feedback"
                    :label="$t('ShippingCompanyName')" v-model="shipment.shipping_company_name"></b-form-input>
                  <b-form-invalid-feedback id="shipping_company_name-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="12" class="mt-3">
              <b-button variant="primary" type="submit" :disabled="SubmitProcessing"><i
                  class="i-Yes me-2 font-weight-bold"></i> {{ $t('submit') }}</b-button>
              <div v-once class="typo__p" v-if="SubmitProcessing">
                <div class="spinner sm spinner-primary mt-3"></div>
              </div>
            </b-col>

          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
  </div>
</template>


<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Shipment"
  },
  data() {
    return {
      isLoading: true,
      SubmitProcessing: false,
      purchases: [],
      serverParams: {
        columnFilters: {},
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      totalRows: "",
      search: "",
      limit: "10",
      purchase_shiments: [],
      purchase_shiments_base: [],
      editmode: false,
      // show_status: false,
      show_status: true,
      shipment: {
        id: "",
        order_number: "",
        description: "",
        expected_arrival_at: "",
        date: "",
        status: "pending",
        shipping_company_name: "",
        purchase_id: "",
      }
    };
  },

  computed: {
    canSelectPurchase(){
      return this.shipment.status == 'pending';
    },
    columns() {
      return [
        {
          label: this.$t("OrderNumber"),
          field: "order_number",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("TrackingNumber"),
          field: "tracking_number",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Date"),
          field: "date",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("ExpectedArrival"),
          field: "expected_arrival_at",
          tdClass: "text-left",
          thClass: "text-left"
        },
        // {
        //   label: this.$t("Description"),
        //   field: "description",
        //   tdClass: "text-left",
        //   thClass: "text-left"
        // },
        {
          label: this.$t("ShippingCompanyName"),
          field: "shipping_company_name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Status"),
          field: "status",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Action"),
          field: "actions",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
          sortable: false
        }
      ];
    }
  },

  methods: {
    //---- update Params Table
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    //---- Event Page Change
    onPageChange({ currentPage }) {
      if (this.serverParams.page !== currentPage) {
        this.updateParams({ page: currentPage });
        this.Get_Shipments(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_Shipments(1);
      }
    },

    //---- Event Sort Change
    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_Shipments(this.serverParams.page);
    },

    //---- Event Search
    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Shipments(this.serverParams.page);
    },

    //---- Validation State Form
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------------- Submit Validation Create & Edit Shipment
    Submit_Shipment() {
      this.$refs.Create_Shipment.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          if (!this.editmode) {
            this.Create_Shipment();
          } else {
            this.Update_Shipment();
          }
        }
      });
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //------------------------------ Modal (create Shipment) -------------------------------\\
    New_Shipment() {
      this.reset_Form();
      // this.show_status = false;
      // this.editmode = false;
      this.$bvModal.show("New_Shipment");
    },

    //------------------------------ Modal (Update Shipment) -------------------------------\\
    Edit_Shipment(shipment) {
      this.Get_Shipments(this.serverParams.page);
      this.reset_Form();
      this.shipment = shipment;
      if (this.shipment.expected_arrival_at == "") {
        // this.show_status = false;
      } else {
        this.show_status = true;
      }
      this.editmode = true;
      this.$bvModal.show("New_Shipment");
    },

    Selected_Base_Shipment(value) {
      if (value == null) {
        // this.show_status = false;
      } else {
        this.show_status = true;
      }
    },

    //----------------------------------------  Get All Shipments -------------------------\\
    Get_Shipments(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "purchase_shiments?page=" +
          page +
          "&SortField=" +
          this.serverParams.sort.field +
          "&SortType=" +
          this.serverParams.sort.type +
          "&search=" +
          this.search +
          "&limit=" +
          this.limit
        )
        .then(response => {
          this.purchase_shiments = response.data.Shipments ?? response.data.Shipment;
          this.totalRows = response.data.totalRows;
          this.purchase_shiments_base = response.data.Shipments_base;

          // Complete the animation of theprogress bar.
          NProgress.done();
          this.isLoading = false;
        })
        .catch(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //---------------------------------------- Set To Strings-------------------------\\
    setToStrings() {
      // Simply replaces null values with strings=''
      if (this.shipment.expected_arrival_at === null) {
        this.shipment.expected_arrival_at = "";
      }
    },
    //---------------- Send Request with axios ( Create Shipment) --------------------\\
    Create_Shipment() {
      this.SubmitProcessing = true;
      this.setToStrings();
      axios
        .post("purchase_shiments", {
          order_number: this.shipment.order_number,
          tracking_number: this.shipment.tracking_number,
          tracking_url: this.shipment.tracking_url,
          description: this.shipment.description,
          date: this.shipment.date,
          expected_arrival_at: this.shipment.expected_arrival_at,
          status: this.shipment.status,
          shipping_company_name: this.shipment.shipping_company_name,
          purchase_id: this.shipment.purchase_id,
        })
        .then(response => {
          this.SubmitProcessing = false;
          Fire.$emit("Event_Shipment");

          this.makeToast(
            "success",
            this.$t("Create.OrderNumberShipment"),
            this.$t("Success")
          );
        })
        .catch(error => {
          this.SubmitProcessing = false;
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //--------------- Send Request with axios ( Update Shipment) --------------------\\
    Update_Shipment() {
      this.SubmitProcessing = true;
      this.setToStrings();
      axios
        .put("purchase_shiments/" + this.shipment.id, {
          order_number: this.shipment.order_number,
          tracking_number: this.shipment.tracking_number,
          tracking_url: this.shipment.tracking_url,
          description: this.shipment.description,
          expected_arrival_at: this.shipment.expected_arrival_at,
          date: this.shipment.date,
          status: this.shipment.status,
          shipping_company_name: this.shipment.shipping_company_name,
          purchase_id: this.shipment.purchase_id,
        })
        .then(response => {
          this.SubmitProcessing = false;
          Fire.$emit("Event_Shipment");

          this.makeToast(
            "success",
            this.$t("Update.OrderNumberShipment"),
            this.$t("Success")
          );
        })
        .catch(error => {
          this.SubmitProcessing = false;
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //------------------------------ reset Form ------------------------------\\
    reset_Form() {
      this.shipment = {
        id: "",
        order_number: "",
        description: "",
        expected_arrival_at: "",
        date: "",
        status: "pending",
        shipping_company_name: "",
        purchase_id: "",
      };
    },

    //--------------------------------- Remove Shipment --------------------\\
    Remove_Shipment(id) {
      this.$swal({
        order_number: this.$t("Delete.OrderNumber"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(result => {
        if (result.value) {
          axios
            .delete("purchase_shiments/" + id)
            .then(response => {
              if (response.data.success) {
                this.$swal(
                  this.$t("Delete.Deleted"),
                  this.$t("Delete.ShipmentDeleted"),
                  "success"
                );
              } else {
                this.$swal(
                  this.$t("Delete.Failed"),
                  this.$t("Shipment_already_linked_with_sub_shipment"),
                  "warning"
                );
              }
              Fire.$emit("Delete_Shipment");
            })
            .catch(() => {
              this.$swal(
                this.$t("Delete.Failed"),
                this.$t("Delete.Therewassomethingwronge"),
                "warning"
              );
            });
        }
      });
    },


    fetchPurchases() {
      this.loading = true;
      axios.get('/purchases?status=pending&page=1&SortField=id&SortType=desc&search=&limit=10')
        .then(response => {
          this.purchases = response.data?.purchases ?? [];
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    }

  }, //end Method

  //----------------------------- Created function-------------------
  created: function () {
    this.fetchPurchases();
    this.Get_Shipments(1);

    Fire.$on("Event_Shipment", () => {
      setTimeout(() => {
        this.Get_Shipments(this.serverParams.page);
        this.$bvModal.hide("New_Shipment");
      }, 500);
    });

    Fire.$on("Delete_Shipment", () => {
      setTimeout(() => {
        this.Get_Shipments(this.serverParams.page);
      }, 500);
    });
  }
};
</script>