<template>
    <div>

        <div class="card mb-30">
            <!-- {{ { adjustments } }} -->
            <div class="card-body p-2 pt-3">
                <h5 class="card-title border-bottom p-3 mb-2">{{ $t('Recent_Stock_Adjustments') }}</h5>

                <vue-good-table :columns="columns" styleClass="order-table vgt-table mb-3" row-style-class="text-left"
                    :rows="adjustments">

                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'actions'">
                            <a v-b-tooltip.hover title="View" class="cursor-pointer" @click="showDetails(props.row.id)">
                                <i class="i-Eye text-25 text-info"></i>
                            </a>
                            <router-link
                                v-if="currentUserPermissions && currentUserPermissions.includes('adjustment_edit')"
                                v-b-tooltip.hover title="Edit" :to="'/app/adjustments/edit/' + props.row.id">
                                <i class="i-Edit text-25 text-success"></i>
                            </router-link>
                            <!-- <a v-b-tooltip.hover title="Delete" class="cursor-pointer"
                                v-if="currentUserPermissions && currentUserPermissions.includes('adjustment_delete')"
                                @click="Remove_Adjustment(props.row.id)">
                                <i class="i-Close-Window text-25 text-danger"></i>
                            </a> -->
                        </span>
                    </template>

                </vue-good-table>
            </div>
        </div>

        <!-- Show details -->
        <b-modal ok-only size="lg" id="showDetails" :title="$t('AdjustmentDetail')">
            <b-row>
                <b-col lg="5" md="12" sm="12" class="mt-3">
                    <table class="table table-hover table-bordered table-sm">
                        <tbody>
                            <!-- date -->
                            <tr>
                                <td>{{ $t('date') }}</td>
                                <th>{{ adjustment.date }}</th>
                            </tr>
                            <!-- Reference -->
                            <tr>
                                <td>{{ $t('Reference') }}</td>
                                <th>{{ adjustment.Ref }}</th>
                            </tr>
                            <tr>
                                <!-- warehouse -->
                                <td>{{ $t('warehouse') }}</td>
                                <th>{{ adjustment.warehouse }}</th>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
                <b-col lg="7" md="12" sm="12" class="mt-3">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">{{ $t('ProductName') }}</th>
                                    <th scope="col">{{ $t('CodeProduct') }}</th>
                                    <th scope="col">{{ $t('Quantity') }}</th>
                                    <th scope="col">{{ $t('type') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="detail in details">
                                    <td>{{ detail.name }}</td>
                                    <td>{{ detail.code }}</td>
                                    <td>{{ formatNumber(detail.quantity, 2) }} {{ detail.unit }}</td>
                                    <td v-if="detail.type == 'add'">{{ $t('Addition') }}</td>
                                    <td v-else-if="detail.type == 'sub'">{{ $t('Subtraction') }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-col>
            </b-row>
            <hr v-show="adjustment.note">
            <b-row class="mt-4">
                <b-col md="12">
                    <p>{{ adjustment.note }}</p>
                </b-col>
            </b-row>
        </b-modal>

    </div>
</template>


<script>
import { mapGetters } from "vuex";
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    props: {
        msg: String,
        data: Array,
    },
    data() {
        return {
            adjustments: this.data ?? [],
            loading: false,
            error: null,
            details: [],
            adjustment: {}
        }
    },
    created() {
        // this.fetchPurchases();

        // this.Get_Adjustments(1);

        Fire.$on("Get_Details_Adjust", () => {
            // Complete the animation of theprogress bar.
            setTimeout(() => NProgress.done(), 500);
            this.$bvModal.show("showDetails");
        });

        Fire.$on("Delete_Adjustment", () => {
            setTimeout(() => {
                // Complete the animation of theprogress bar.
                NProgress.done();
                this.Get_Adjustments(this.serverParams.page);
            }, 500);
        });

    },
    computed: {
        ...mapGetters(["currentUserPermissions", "currentUser"]),
        total() {
            return this.adjustments.reduce((carry, purchase) => {
                return carry + purchase.total;
            }, 0);
        },
        columns() {
            return [
                {
                    label: this.$t("date"),
                    field: "date",
                    tdClass: "text-left",
                    thClass: "text-left"
                },
                {
                    label: this.$t("Reference"),
                    field: "Ref",
                    tdClass: "text-left",
                    thClass: "text-left"
                },
                {
                    label: this.$t("warehouse"),
                    field: "warehouse_name",
                    tdClass: "text-left",
                    thClass: "text-left"
                },
                {
                    label: this.$t("TotalProducts"),
                    field: "items",
                    type: "decimal",
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
        },
    },
    methods: {

        showDetails(id) {
            // Start the progress bar.
            NProgress.start();
            NProgress.set(0.1);
            axios
                .get("adjustments/detail/" + id)
                .then(response => {
                    this.adjustment = response.data.adjustment;
                    this.details = response.data.details;
                    Fire.$emit("Get_Details_Adjust");
                })
                .catch(response => {
                    Fire.$emit("Get_Details_Adjust");
                });
        },

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
            // this.loading = true;
            // axios.get('/api/adjustments')
            //     .then(response => {
            //         this.adjustments = response.data;
            //     })
            //     .catch(error => {
            //         this.error = error;
            //     })
            //     .finally(() => {
            //         this.loading = false;
            //     });
        },


        //-------------------------------------- Products PDF ------------------------------\\
        Stock_AlertPDF() {
            var self = this;

            let pdf = new jsPDF("p", "pt");
            let columns = [
                // { title: "type", dataKey: "type" },
                { title: "code", dataKey: "code" },
                { title: "name", dataKey: "name" },
                { title: "Warehouse", dataKey: "warehouse" },
                { title: "quantity", dataKey: "quantity" },
                { title: "Alert Quantity", dataKey: "stock_alert" }
                // { title: "category", dataKey: "category" },
                // { title: "cost", dataKey: "cost" },
                // { title: "price", dataKey: "price" },
                // { title: "unit", dataKey: "unit" },
            ];

            // Create a copy of self.reports for PDF generation
            let products_pdf = JSON.parse(JSON.stringify(self.adjustments));

            // Replace <br /> with newline character '\n' in the 'name' property of each item
            products_pdf.forEach(item => {
                item.name = item.name.replace(/<br\s*\/?>/gi, '\n');
                // item.cost = item.cost.replace(/<br\s*\/?>/gi, '\n');
                // item.price = item.price.replace(/<br\s*\/?>/gi, '\n');
            });

            pdf.autoTable(columns, products_pdf);
            pdf.text("Stock Alert List", 40, 25);
            pdf.save("Stock_Alert_List.pdf");
        },
    }
}
</script>