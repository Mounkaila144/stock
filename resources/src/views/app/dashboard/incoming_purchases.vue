<template>
    <!-- <b-row> -->

    <!-- <div v-else-if="!loading && currentUserPermissions && currentUserPermissions.includes('dashboard')"> -->
    <div class="col-md-12">
        <!-- {{ { purchases } }} -->
        <div class="card mb-30">
            <div class="card-body p-2">
                <h5 class="card-title border-bottom p-3 mb-2">{{ $t('Incoming_Purchases') }}</h5>

                <vue-good-table mode="remote" :columns="columns" :totalRows="totalRows" :rows="purchases"
                    @on-page-change="onPageChange" @on-per-page-change="onPerPageChange" @on-sort-change="onSortChange"
                    @on-search="onSearch" :search-options="{
                    enabled: true,
                    placeholder: $t('Search_this_table'),
                }" :select-options="{
                    // enabled: true,
                    clearSelectionText: '',
                }" :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    nextLabel: 'next',
                    prevLabel: 'prev',
                }" styleClass="table-hover tableOne vgt-table">
                    <!-- <div slot="table-actions" class="mt-2 mb-3">
                        <b-button @click="New_Shipment()" class="btn-rounded" variant="btn btn-primary btn-icon m-1">
                            <i class="i-Add"></i>
                            {{ $t('Add') }}
                        </b-button>
                    </div> -->

                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'actions'">
                            <template v-if="props.row.tracking_url">
                                <a :href="props.row.tracking_url" title="Visit" target="_blanck" v-b-tooltip.hover>
                                    <i class="i-Right text-25 text-success"></i>
                                </a>
                            </template>
                        </span>
                        <div v-else-if="props.column.field == 'BaseShipment'">
                            <span v-if="props.row.date != ''">{{ props.row.date }}</span>
                            <span v-else>N/D</span>
                        </div>
                        <div v-else-if="props.column.field == 'status'">
                            <span v-if="props.row.status == 'delivered'" class="badge badge-outline-success">{{
                    $t('complete') }}</span>
                            <span v-else-if="props.row.status == 'intransit'" class="badge badge-outline-info">{{
                    $t('Pending') }}</span>
                            <span v-else-if="props.row.status == 'pending'" class="badge badge-outline-secondary">{{
                    $t('Pending') }}</span>
                            <span v-else class="badge badge-outline-warning">{{ $t(props.row.status) }}</span>
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

        columns//_purchases
            () {
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
            axios.get('/purchase_shiments?page=1&SortField=id&SortType=desc&search=&limit=10')
                .then(response => {
                    this.purchases = response.data?.Shipment ?? [];
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