<template>
    <!-- <b-row> -->

    <!-- <div v-else-if="!loading && currentUserPermissions && currentUserPermissions.includes('dashboard')"> -->
    <!-- <div class="col-md-12"> -->
    <div class="card mb-30">
        <!-- {{ { tasks } }} -->
        <div class="card-body p-3">
            <h5 class="card-title border-bottom p-3 mb-2">{{ $t('Todo') }}</h5>

            <vue-good-table v-if="!loading" :columns="columns_tasks" styleClass="order-table vgt-table"
                row-style-class="text-left" :rows="tasks">

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
        </div>
    </div>
    <!-- </div> -->
    <!-- </b-row> -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        msg: String,
        data: Array,
    },
    data() {
        return {
            tasks: this.data ?? [],
            loading: false,
            error: null
        }
    },
    created() {
        this.fetchPurchases();
    },
    computed: {
        ...mapGetters(["currentUserPermissions", "currentUser"]),
        total() {
            return this.tasks.reduce((carry, purchase) => {
                return carry + purchase.total;
            }, 0);
        },
        columns_tasks() {
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
                // {
                //     label: this.$t("Action"),
                //     field: "actions",
                //     html: true,
                //     tdClass: "text-right",
                //     thClass: "text-right",
                //     sortable: false
                // }
            ];
        },
    },
    methods: {

        //------------------------------Formetted Numbers -------------------------\\
        formatNumber(number, dec) {
            const value = (typeof number === "string"
                ? number
                : number.toString()
            ).split(".");
            if (dec <= 0) return value[0];
            let formated = value[1] || "";
            if (formated.length > dec)
                return `${value[0]}.${formated.substr(0, dec)}`;
            while (formated.length < dec) formated += "0";
            return `${value[0]}.${formated}`;
        },
        fetchPurchases() {
            this.loading = true;
            axios.get(`/tasks?page=1&limit=10&SortField=expire_at&SortType=asc&search=`)
                .then(response => {
                    this.tasks = response.data?.Tasks ?? response.data?.Task;
                })
                .catch(error => {
                    this.error = error;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>