<template>
    <!-- <b-row> -->

    <!-- <div v-else-if="!loading && currentUserPermissions && currentUserPermissions.includes('dashboard')"> -->
    <div class="col-md-12">
        <!-- {{ { purchases } }} -->
        <div class="card mb-30">
            <div class="card-body p-2">
                <h5 class="card-title border-bottom p-3 mb-2">{{ $t('Incoming_Purchases') }}</h5>

                <vue-good-table v-if="!loading" :columns="columns_purchases" styleClass="order-table vgt-table"
                    row-style-class="text-left" :rows="purchases">
                    <template slot="table-row" slot-scope="props">

                        <div v-if="props.column.field == 'Ref'">
                            <span v-if="props.row.Ref">{{ props.row.Ref }}</span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <div v-if="props.column.field == 'date'">
                            <span v-if="props.row.date">{{ props.row.date }}</span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <div v-if="props.column.field == 'expected_delivery_date'">
                            <span v-if="props.row.expected_delivery_date">{{ props.row.expected_delivery_date }}</span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <div v-if="props.column.field == 'warehouse_name'">
                            <span v-if="props.row.warehouse">{{ props.row.warehouse.name }}</span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <div v-if="props.column.field == 'supplier_name'">
                            <span v-if="props.row.provider">{{ props.row.provider.name }}</span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <div v-if="props.column.field == 'GrandTotal'">
                            <span v-if="props.row.GrandTotal != undefined">
                                {{ currentUser.currency }}&nbsp;
                                {{ formatNumber(props.row.GrandTotal ?? 0, 2) }}
                            </span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <div v-if="props.column.field == 'paid_amount'">
                            <span v-if="props.row.paid_amount != undefined">
                                {{ currentUser.currency }}&nbsp;
                                {{ formatNumber(props.row.paid_amount ?? 0, 2) }}
                            </span>
                            <span v-else>{{ $t('NotSet') }}</span>
                        </div>

                        <!--  -->
                        <div v-if="props.column.field == 'statut'">
                            <span v-if="props.row.statut == 'completed'" class="badge badge-outline-success">{{
                    $t('complete') }}</span>
                            <span v-else-if="props.row.statut == 'pending'" class="badge badge-outline-info">{{
                    $t('Pending') }}</span>
                            <span v-else class="badge badge-outline-warning">{{ $t('Ordered') }}</span>
                        </div>

                        <div v-else-if="props.column.field == 'payment_status'">
                            <span v-if="props.row.payment_status == 'paid'" class="badge badge-outline-success">{{
                    $t('Paid') }}</span>
                            <span v-else-if="props.row.payment_status == 'partial'"
                                class="badge badge-outline-primary">{{ $t('partial') }}</span>
                            <span v-else class="badge badge-outline-warning">{{ $t('Unpaid') }}</span>
                        </div>
                    </template>
                </vue-good-table>
            </div>
        </div>
    </div>
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
            purchases: this.data ?? [],
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
            return this.purchases.reduce((carry, purchase) => {
                return carry + purchase.total;
            }, 0);
        },
        columns_purchases() {
            return [
                {
                    label: this.$t("Reference"),
                    field: "Ref",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("Supplier"),
                    field: "supplier_name",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("warehouse"),
                    field: "warehouse_name",
                    tdClass: "text-left",
                    thClass: "text-left"
                },
                {
                    label: this.$t("Status"),
                    field: "statut",
                    html: true,
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("Total"),
                    field: "GrandTotal",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("Paid"),
                    field: "paid_amount",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("Date"),
                    field: "date",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("ExpectedDeliveryDate"),
                    field: "expected_delivery_date",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false
                },
                {
                    label: this.$t("PaymentStatus"),
                    field: "payment_status",
                    html: true,
                    sortable: false,
                    tdClass: "text-left gull-border-none",
                    thClass: "text-left"
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
            // axios.get('/api/purchases')
            //     .then(response => {
            //         this.purchases = response.data;
            //     })
            //     .catch(error => {
            //         this.error = error;
            //     })
            //     .finally(() => {
            //         this.loading = false;
            //     });
        }
    }
}
</script>