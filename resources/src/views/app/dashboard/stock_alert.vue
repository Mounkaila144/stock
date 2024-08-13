<template>
    <div class="card mb-30">
        <div class="card-body p-2 pt-3">
            <h5 class="card-title border-bottom p-3 mb-2">{{ $t('StockAlert') }}</h5>

            <vue-good-table :columns="columns_stock" styleClass="order-table vgt-table mb-3" row-style-class="text-left"
                :rows="stock_alerts">

                <div slot="table-actions" class="mt-2 mb-3">
                    <b-button @click="Stock_AlertPDF()" size="sm" variant="outline-success m-1">
                        <i class="i-File-Copy"></i> PDF
                    </b-button>
                    <vue-excel-xlsx class="btn btn-sm btn-outline-danger ripple m-1" :data="stock_alerts"
                        :columns="columns" :file-name="'products'" :file-type="'xlsx'" :sheet-name="'products'">
                        <i class="i-File-Excel"></i> EXCEL
                    </vue-excel-xlsx>
                </div>

                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field == 'stock_alert'">
                        <span class="badge badge-outline-danger">{{ props.row.stock_alert }}</span>
                    </div>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    props: {
        msg: String,
        data: Array,
    },
    data() {
        return {
            stock_alerts: this.data ?? [],
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
            return this.stock_alerts.reduce((carry, purchase) => {
                return carry + purchase.total;
            }, 0);
        },

        columns() {
            return this.columns_stock;
        },
        columns_stock() {
            return [
                {
                    label: this.$t("ProductCode"),
                    field: "code",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("ProductName"),
                    field: "name",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("warehouse"),
                    field: "warehouse",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("Quantity"),
                    field: "quantity",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("AlertQuantity"),
                    field: "stock_alert",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false
                }
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
            // this.loading = true;
            // axios.get('/api/stock_alerts')
            //     .then(response => {
            //         this.stock_alerts = response.data;
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
            let products_pdf = JSON.parse(JSON.stringify(self.stock_alerts));

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