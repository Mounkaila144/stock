<template>
  <div class="main-content">
    <!-- {{ { tasks } }} -->
    <breadcumb :page="$t('Tasks')" :folder="$t('Todo')" />

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table mode="remote" :columns="columns" :totalRows="totalRows" :rows="tasks"
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
          <b-button @click="New_Task()" class="btn-rounded" variant="btn btn-primary btn-icon m-1">
            <i class="i-Add"></i>
            {{ $t('Add') }}
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            <a @click="Edit_Task(props.row)" title="Edit" v-b-tooltip.hover>
              <i class="i-Edit text-25 text-success"></i>
            </a>
            <a title="Delete" v-b-tooltip.hover @click="Remove_Task(props.row.id)">
              <i class="i-Close-Window text-25 text-danger"></i>
            </a>
          </span>
          <div v-else-if="props.column.field == 'BaseTask'">
            <span v-if="props.row.remind_at != ''">{{ props.row.remind_at }}</span>
            <span v-else>N/D</span>
          </div>
        </template>
      </vue-good-table>
    </b-card>

    <validation-observer ref="Create_Task">
      <b-modal hide-footer size="lg" id="New_Task" :title="editmode ? $t('Edit') : $t('Add')">
        <b-form @submit.prevent="Submit_Task">
          <b-row>
            <!-- Title -->
            <b-col md="12">
              <validation-provider name="title" :rules="{ required: true, max: 68 }" v-slot="validationContext">
                <b-form-group :label="$t('Title') + ' ' + '*'">
                  <b-form-input :placeholder="$t('Enter_Task_Title')" :state="getValidationState(validationContext)"
                    aria-describedby="title-feedback" :label="$t('Title')" v-model="task.title"></b-form-input>
                  <b-form-invalid-feedback id="title-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider name="expireAt" :rules="{ required: true, }" v-slot="validationContext">
                <b-form-group :label="$t('ExpireAt') + ' ' + '*'">
                  <b-form-datepicker :placeholder="$t('Enter_Task_Expiry_Date')"
                    :state="getValidationState(validationContext)" aria-describedby="expireAt-feedback"
                    :label="$t('ExpireAt')" type="datetime" v-model="task.expire_at"></b-form-datepicker>
                  <b-form-invalid-feedback id="expireAt-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider name="remindAt" :rules="{ required: false, }" v-slot="validationContext">
                <b-form-group :label="$t('RemindAt')">
                  <b-form-datepicker :placeholder="$t('Enter_Task_Remind_Date')"
                    :state="getValidationState(validationContext)" aria-describedby="remindAt-feedback"
                    :label="$t('RemindAt')" type="datetime" v-model="task.remind_at"></b-form-datepicker>
                  <b-form-invalid-feedback id="remindAt-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Description -->
            <b-col md="12">
              <validation-provider name="description" :rules="{ required: false, max: 1000 }"
                v-slot="validationContext">
                <b-form-group :label="$t('Description')">
                  <b-form-textarea :placeholder="$t('Enter_Task_Description')"
                    :state="getValidationState(validationContext)" aria-describedby="Description-feedback"
                    label="Description" v-model="task.description" :rows="8" clearable></b-form-textarea>
                  <b-form-invalid-feedback id="description-feedback">{{ validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Base task -->
            <!-- <b-col md="12">
              <b-form-group :label="$t('BaseTask')">
                <v-select @input="Selected_Base_Task" v-model="task.expire_at" :reduce="label => label.value"
                  :placeholder="$t('Choose_Base_Task')"
                  :options="tasks_base.map(tasks_base => ({ label: tasks_base.title, value: tasks_base.id }))" />
              </b-form-group>
            </b-col> -->
            <!-- status  -->
            <b-col md="6" v-show="show_status">
              <b-form-group :label="$t('Status')">
                <v-select v-model="task.status" :reduce="label => label.value" :placeholder="$t('Choose_Task_Status')"
                  :options="[
      { label: 'Pending', value: 'pending' },
      { label: 'Fulfilled', value: 'fulfiled' },
      { label: 'Cancelled', value: 'cancelled' },
    ]"></v-select>
              </b-form-group>
            </b-col>

            <!-- Priority -->
            <b-col md="6" v-show="show_status">
              <validation-provider name="Priority" :rules="{ required: true, regex: /^\d*\.?\d*$/ }"
                v-slot="validationContext">
                <b-form-group :label="$t('Task_Priority') + ' ' + '*'">
                  <b-form-input :placeholder="$t('Enter_Task_Priority')" :state="getValidationState(validationContext)"
                    aria-describedby="Priority-feedback" label="Priority" type="number"
                    v-model.number="task.priority"></b-form-input>
                  <b-form-invalid-feedback id="Priority-feedback">{{ validationContext.errors[0]
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
    title: "Task"
  },
  data() {
    return {
      isLoading: true,
      SubmitProcessing: false,
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
      tasks: [],
      tasks_base: [],
      editmode: false,
      // show_status: false,
      show_status: true,
      task: {
        id: "",
        title: "",
        description: "",
        expire_at: "",
        remind_at: "",
        status: "pending",
        priority: 1
      }
    };
  },

  computed: {
    columns() {
      return [
        {
          label: this.$t("Title"),
          field: "title",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("RemindAt"),
          field: "remind_at",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("ExpireAt"),
          field: "expire_at",
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
          label: this.$t("Priority"),
          field: "priority",
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
        this.Get_Tasks(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_Tasks(1);
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
      this.Get_Tasks(this.serverParams.page);
    },

    //---- Event Search
    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Tasks(this.serverParams.page);
    },

    //---- Validation State Form
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------------- Submit Validation Create & Edit Task
    Submit_Task() {
      this.$refs.Create_Task.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          if (!this.editmode) {
            this.Create_Task();
          } else {
            this.Update_Task();
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

    //------------------------------ Modal (create Task) -------------------------------\\
    New_Task() {
      this.reset_Form();
      // this.show_status = false;
      // this.editmode = false;
      this.$bvModal.show("New_Task");
    },

    //------------------------------ Modal (Update Task) -------------------------------\\
    Edit_Task(task) {
      this.Get_Tasks(this.serverParams.page);
      this.reset_Form();
      this.task = task;
      if (this.task.expire_at == "") {
        // this.show_status = false;
      } else {
        this.show_status = true;
      }
      this.editmode = true;
      this.$bvModal.show("New_Task");
    },

    Selected_Base_Task(value) {
      if (value == null) {
        // this.show_status = false;
      } else {
        this.show_status = true;
      }
    },

    //----------------------------------------  Get All Tasks -------------------------\\
    Get_Tasks(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "tasks?page=" +
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
          this.tasks = response.data.Tasks?? response.data.Task;
          this.totalRows = response.data.totalRows;
          this.tasks_base = response.data.Tasks_base;

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
      if (this.task.expire_at === null) {
        this.task.expire_at = "";
      }
    },
    //---------------- Send Request with axios ( Create Task) --------------------\\
    Create_Task() {
      this.SubmitProcessing = true;
      this.setToStrings();
      axios
        .post("tasks", {
          title: this.task.title,
          description: this.task.description,
          expire_at: this.task.expire_at,
          status: this.task.status,
          priority: this.task.priority
        })
        .then(response => {
          this.SubmitProcessing = false;
          Fire.$emit("Event_Task");

          this.makeToast(
            "success",
            this.$t("Create.TitleTask"),
            this.$t("Success")
          );
        })
        .catch(error => {
          this.SubmitProcessing = false;
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //--------------- Send Request with axios ( Update Task) --------------------\\
    Update_Task() {
      this.SubmitProcessing = true;
      this.setToStrings();
      axios
        .put("tasks/" + this.task.id, {
          title: this.task.title,
          description: this.task.description,
          expire_at: this.task.expire_at,
          status: this.task.status,
          priority: this.task.priority
        })
        .then(response => {
          this.SubmitProcessing = false;
          Fire.$emit("Event_Task");

          this.makeToast(
            "success",
            this.$t("Update.TitleTask"),
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
      this.task = {
        id: "",
        title: "",
        description: "",
        expire_at: "",
        remind_at: "",
        status: "pending",
        priority: 1
      };
    },

    //--------------------------------- Remove Task --------------------\\
    Remove_Task(id) {
      this.$swal({
        title: this.$t("Delete.Title"),
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
            .delete("tasks/" + id)
            .then(response => {
              if (response.data.success) {
                this.$swal(
                  this.$t("Delete.Deleted"),
                  this.$t("Delete.TaskDeleted"),
                  "success"
                );
              } else {
                this.$swal(
                  this.$t("Delete.Failed"),
                  this.$t("Task_already_linked_with_sub_task"),
                  "warning"
                );
              }
              Fire.$emit("Delete_Task");
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

  }, //end Method

  //----------------------------- Created function-------------------
  created: function () {
    this.Get_Tasks(1);

    Fire.$on("Event_Task", () => {
      setTimeout(() => {
        this.Get_Tasks(this.serverParams.page);
        this.$bvModal.hide("New_Task");
      }, 500);
    });

    Fire.$on("Delete_Task", () => {
      setTimeout(() => {
        this.Get_Tasks(this.serverParams.page);
      }, 500);
    });
  }
};
</script>