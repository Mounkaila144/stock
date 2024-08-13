"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["purchase_shipment"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Shipment"
  },
  data: function data() {
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
        purchase_id: ""
      }
    };
  },
  computed: {
    canSelectPurchase: function canSelectPurchase() {
      return this.shipment.status == 'pending';
    },
    columns: function columns() {
      return [{
        label: this.$t("OrderNumber"),
        field: "order_number",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("TrackingNumber"),
        field: "tracking_number",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("Date"),
        field: "date",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
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
      }, {
        label: this.$t("Status"),
        field: "status",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("Action"),
        field: "actions",
        html: true,
        tdClass: "text-right",
        thClass: "text-right",
        sortable: false
      }];
    }
  },
  methods: {
    //---- update Params Table
    updateParams: function updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    //---- Event Page Change
    onPageChange: function onPageChange(_ref) {
      var currentPage = _ref.currentPage;
      if (this.serverParams.page !== currentPage) {
        this.updateParams({
          page: currentPage
        });
        this.Get_Shipments(currentPage);
      }
    },
    //---- Event Per Page Change
    onPerPageChange: function onPerPageChange(_ref2) {
      var currentPerPage = _ref2.currentPerPage;
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({
          page: 1,
          perPage: currentPerPage
        });
        this.Get_Shipments(1);
      }
    },
    //---- Event Sort Change
    onSortChange: function onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_Shipments(this.serverParams.page);
    },
    //---- Event Search
    onSearch: function onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Shipments(this.serverParams.page);
    },
    //---- Validation State Form
    getValidationState: function getValidationState(_ref3) {
      var dirty = _ref3.dirty,
        validated = _ref3.validated,
        _ref3$valid = _ref3.valid,
        valid = _ref3$valid === void 0 ? null : _ref3$valid;
      return dirty || validated ? valid : null;
    },
    //------------- Submit Validation Create & Edit Shipment
    Submit_Shipment: function Submit_Shipment() {
      var _this = this;
      this.$refs.Create_Shipment.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          if (!_this.editmode) {
            _this.Create_Shipment();
          } else {
            _this.Update_Shipment();
          }
        }
      });
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //------------------------------ Modal (create Shipment) -------------------------------\\
    New_Shipment: function New_Shipment() {
      this.reset_Form();
      // this.show_status = false;
      // this.editmode = false;
      this.$bvModal.show("New_Shipment");
    },
    //------------------------------ Modal (Update Shipment) -------------------------------\\
    Edit_Shipment: function Edit_Shipment(shipment) {
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
    Selected_Base_Shipment: function Selected_Base_Shipment(value) {
      if (value == null) {
        // this.show_status = false;
      } else {
        this.show_status = true;
      }
    },
    //----------------------------------------  Get All Shipments -------------------------\\
    Get_Shipments: function Get_Shipments(page) {
      var _this2 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("purchase_shiments?page=" + page + "&SortField=" + this.serverParams.sort.field + "&SortType=" + this.serverParams.sort.type + "&search=" + this.search + "&limit=" + this.limit).then(function (response) {
        var _response$data$Shipme;
        _this2.purchase_shiments = (_response$data$Shipme = response.data.Shipments) !== null && _response$data$Shipme !== void 0 ? _response$data$Shipme : response.data.Shipment;
        _this2.totalRows = response.data.totalRows;
        _this2.purchase_shiments_base = response.data.Shipments_base;

        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this2.isLoading = false;
      })["catch"](function (response) {
        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        setTimeout(function () {
          _this2.isLoading = false;
        }, 500);
      });
    },
    //---------------------------------------- Set To Strings-------------------------\\
    setToStrings: function setToStrings() {
      // Simply replaces null values with strings=''
      if (this.shipment.expected_arrival_at === null) {
        this.shipment.expected_arrival_at = "";
      }
    },
    //---------------- Send Request with axios ( Create Shipment) --------------------\\
    Create_Shipment: function Create_Shipment() {
      var _this3 = this;
      this.SubmitProcessing = true;
      this.setToStrings();
      axios.post("purchase_shiments", {
        order_number: this.shipment.order_number,
        tracking_number: this.shipment.tracking_number,
        tracking_url: this.shipment.tracking_url,
        description: this.shipment.description,
        date: this.shipment.date,
        expected_arrival_at: this.shipment.expected_arrival_at,
        status: this.shipment.status,
        shipping_company_name: this.shipment.shipping_company_name,
        purchase_id: this.shipment.purchase_id
      }).then(function (response) {
        _this3.SubmitProcessing = false;
        Fire.$emit("Event_Shipment");
        _this3.makeToast("success", _this3.$t("Create.OrderNumberShipment"), _this3.$t("Success"));
      })["catch"](function (error) {
        _this3.SubmitProcessing = false;
        _this3.makeToast("danger", _this3.$t("InvalidData"), _this3.$t("Failed"));
      });
    },
    //--------------- Send Request with axios ( Update Shipment) --------------------\\
    Update_Shipment: function Update_Shipment() {
      var _this4 = this;
      this.SubmitProcessing = true;
      this.setToStrings();
      axios.put("purchase_shiments/" + this.shipment.id, {
        order_number: this.shipment.order_number,
        tracking_number: this.shipment.tracking_number,
        tracking_url: this.shipment.tracking_url,
        description: this.shipment.description,
        expected_arrival_at: this.shipment.expected_arrival_at,
        date: this.shipment.date,
        status: this.shipment.status,
        shipping_company_name: this.shipment.shipping_company_name,
        purchase_id: this.shipment.purchase_id
      }).then(function (response) {
        _this4.SubmitProcessing = false;
        Fire.$emit("Event_Shipment");
        _this4.makeToast("success", _this4.$t("Update.OrderNumberShipment"), _this4.$t("Success"));
      })["catch"](function (error) {
        _this4.SubmitProcessing = false;
        _this4.makeToast("danger", _this4.$t("InvalidData"), _this4.$t("Failed"));
      });
    },
    //------------------------------ reset Form ------------------------------\\
    reset_Form: function reset_Form() {
      this.shipment = {
        id: "",
        order_number: "",
        description: "",
        expected_arrival_at: "",
        date: "",
        status: "pending",
        shipping_company_name: "",
        purchase_id: ""
      };
    },
    //--------------------------------- Remove Shipment --------------------\\
    Remove_Shipment: function Remove_Shipment(id) {
      var _this5 = this;
      this.$swal({
        order_number: this.$t("Delete.OrderNumber"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("purchase_shiments/" + id).then(function (response) {
            if (response.data.success) {
              _this5.$swal(_this5.$t("Delete.Deleted"), _this5.$t("Delete.ShipmentDeleted"), "success");
            } else {
              _this5.$swal(_this5.$t("Delete.Failed"), _this5.$t("Shipment_already_linked_with_sub_shipment"), "warning");
            }
            Fire.$emit("Delete_Shipment");
          })["catch"](function () {
            _this5.$swal(_this5.$t("Delete.Failed"), _this5.$t("Delete.Therewassomethingwronge"), "warning");
          });
        }
      });
    },
    fetchPurchases: function fetchPurchases() {
      var _this6 = this;
      this.loading = true;
      axios.get('/purchases?status=pending&page=1&SortField=id&SortType=desc&search=&limit=10').then(function (response) {
        var _response$data$purcha, _response$data;
        _this6.purchases = (_response$data$purcha = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.purchases) !== null && _response$data$purcha !== void 0 ? _response$data$purcha : [];
      })["catch"](function (error) {
        _this6.error = error;
      })["finally"](function () {
        _this6.loading = false;
      });
    }
  },
  //end Method

  //----------------------------- Created function-------------------
  created: function created() {
    var _this7 = this;
    this.fetchPurchases();
    this.Get_Shipments(1);
    Fire.$on("Event_Shipment", function () {
      setTimeout(function () {
        _this7.Get_Shipments(_this7.serverParams.page);
        _this7.$bvModal.hide("New_Shipment");
      }, 500);
    });
    Fire.$on("Delete_Shipment", function () {
      setTimeout(function () {
        _this7.Get_Shipments(_this7.serverParams.page);
      }, 500);
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=template&id=2ec404d4&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=template&id=2ec404d4& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "main-content"
  }, [_c("breadcumb", {
    attrs: {
      page: _vm.$t("Shipments"),
      folder: _vm.$t("Purchase")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("b-card", {
    staticClass: "wrapper"
  }, [_c("vue-good-table", {
    attrs: {
      mode: "remote",
      columns: _vm.columns,
      totalRows: _vm.totalRows,
      rows: _vm.purchase_shiments,
      "search-options": {
        enabled: true,
        placeholder: _vm.$t("Search_this_table")
      },
      "select-options": {
        enabled: true,
        clearSelectionText: ""
      },
      "pagination-options": {
        enabled: true,
        mode: "records",
        nextLabel: "next",
        prevLabel: "prev"
      },
      styleClass: "table-hover tableOne vgt-table"
    },
    on: {
      "on-page-change": _vm.onPageChange,
      "on-per-page-change": _vm.onPerPageChange,
      "on-sort-change": _vm.onSortChange,
      "on-search": _vm.onSearch
    },
    scopedSlots: _vm._u([{
      key: "table-row",
      fn: function fn(props) {
        return [props.column.field == "actions" ? _c("span", [props.row.tracking_url ? [_c("a", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          attrs: {
            href: props.row.tracking_url,
            title: "Visit",
            target: "_blanck"
          }
        }, [_c("i", {
          staticClass: "i-Right text-25 text-success"
        })])] : _vm._e(), _vm._v(" "), _c("a", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          attrs: {
            title: "Edit"
          },
          on: {
            click: function click($event) {
              return _vm.Edit_Shipment(props.row);
            }
          }
        }, [_c("i", {
          staticClass: "i-Edit text-25 text-success"
        })]), _vm._v(" "), _c("a", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          attrs: {
            title: "Delete"
          },
          on: {
            click: function click($event) {
              return _vm.Remove_Shipment(props.row.id);
            }
          }
        }, [_c("i", {
          staticClass: "i-Close-Window text-25 text-danger"
        })])], 2) : props.column.field == "BaseShipment" ? _c("div", [props.row.date != "" ? _c("span", [_vm._v(_vm._s(props.row.date))]) : _c("span", [_vm._v("N/D")])]) : props.column.field == "status" ? _c("div", [props.row.status == "delivered" ? _c("span", {
          staticClass: "badge badge-outline-success"
        }, [_vm._v(_vm._s(_vm.$t("Delivered")))]) : props.row.status == "intransit" ? _c("span", {
          staticClass: "badge badge-outline-info"
        }, [_vm._v(_vm._s(_vm.$t("In Transit")))]) : props.row.status == "pending" ? _c("span", {
          staticClass: "badge badge-outline-secondary"
        }, [_vm._v(_vm._s(_vm.$t("Pending")))]) : _c("span", {
          staticClass: "badge badge-outline-warning"
        }, [_vm._v(_vm._s(_vm.$t(props.row.status)))])]) : _vm._e()];
      }
    }], null, false, 3269420125)
  }, [_c("div", {
    staticClass: "mt-2 mb-3",
    attrs: {
      slot: "table-actions"
    },
    slot: "table-actions"
  }, [_c("b-button", {
    staticClass: "btn-rounded",
    attrs: {
      variant: "btn btn-primary btn-icon m-1"
    },
    on: {
      click: function click($event) {
        return _vm.New_Shipment();
      }
    }
  }, [_c("i", {
    staticClass: "i-Add"
  }), _vm._v("\n          " + _vm._s(_vm.$t("Add")) + "\n        ")])], 1)])], 1) : _vm._e(), _vm._v(" "), _c("validation-observer", {
    ref: "Create_Shipment"
  }, [_c("b-modal", {
    attrs: {
      "hide-footer": "",
      size: "lg",
      id: "New_Shipment",
      title: _vm.editmode ? _vm.$t("Edit") : _vm.$t("Add")
    }
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Shipment.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "order_number",
      rules: {
        required: true,
        max: 68
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("OrderNumber") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_OrderNumber"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "order_number-feedback",
            label: _vm.$t("OrderNumber")
          },
          model: {
            value: _vm.shipment.order_number,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "order_number", $$v);
            },
            expression: "shipment.order_number"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "order_number-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "tracking_number",
      rules: {
        required: false,
        max: 68
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("TrackingNumber") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_TrackingNumber"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "tracking_number-feedback",
            label: _vm.$t("TrackingNumber")
          },
          model: {
            value: _vm.shipment.tracking_number,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "tracking_number", $$v);
            },
            expression: "shipment.tracking_number"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "tracking_number-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "date",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Date") + " " + "*"
          }
        }, [_c("b-form-datepicker", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_Date"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "date-feedback",
            label: _vm.$t("Date"),
            type: "datetime"
          },
          model: {
            value: _vm.shipment.date,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "date", $$v);
            },
            expression: "shipment.date"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "date-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "expectedArrivalAt",
      rules: {
        required: false
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("ExpectedArrival")
          }
        }, [_c("b-form-datepicker", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_Expected_Date"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "expectedArrivalAt-feedback",
            label: _vm.$t("ExpectedArrival"),
            type: "datetime"
          },
          model: {
            value: _vm.shipment.expected_arrival_at,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "expected_arrival_at", $$v);
            },
            expression: "shipment.expected_arrival_at"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "expectedArrivalAt-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "description",
      rules: {
        required: false,
        max: 1000
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Description")
          }
        }, [_c("b-form-textarea", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_Description"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Description-feedback",
            label: "Description",
            rows: 6,
            clearable: ""
          },
          model: {
            value: _vm.shipment.description,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "description", $$v);
            },
            expression: "shipment.description"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "description-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "purchase",
      rules: {
        required: false
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref) {
        var valid = _ref.valid,
          errors = _ref.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("purchase") + " " + "*"
          }
        }, [_c("v-select", {
          directives: [{
            name: "on-r-input",
            rawName: "v-on-r-input",
            value: _vm.Selected_Purchase,
            expression: "Selected_Purchase"
          }],
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            disabled: !_vm.canSelectPurchase,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Purchase"),
            options: _vm.purchases.map(function (purchases) {
              return {
                label: purchases.Ref,
                value: purchases.id
              };
            })
          },
          model: {
            value: _vm.shipment.purchase_id,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "purchase_id", $$v);
            },
            expression: "shipment.purchase_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "tracking_url",
      rules: {
        required: false,
        max: 68
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("TrackingUrl")
          }
        }, [_c("b-form-input", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_TrackingUrl"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "tracking_url-feedback",
            label: _vm.$t("TrackingUrl")
          },
          model: {
            value: _vm.shipment.tracking_url,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "tracking_url", $$v);
            },
            expression: "shipment.tracking_url"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "tracking_url-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.show_status,
      expression: "show_status"
    }],
    attrs: {
      md: "6"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Status")
    }
  }, [_c("v-select", {
    attrs: {
      reduce: function reduce(label) {
        return label.value;
      },
      placeholder: _vm.$t("Choose_Shipment_Status"),
      options: [{
        label: "Pending",
        value: "pending"
      }, {
        label: "In Transit",
        value: "intransit"
      }, {
        label: "Delivered",
        value: "delivered"
      }, {
        label: "Cancelled",
        value: "cancelled"
      }]
    },
    model: {
      value: _vm.shipment.status,
      callback: function callback($$v) {
        _vm.$set(_vm.shipment, "status", $$v);
      },
      expression: "shipment.status"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "shipping_company_name",
      rules: {
        required: true,
        max: 68
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("ShippingCompanyName") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            placeholder: _vm.$t("Enter_Shipment_ShippingCompanyName"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "shipping_company_name-feedback",
            label: _vm.$t("ShippingCompanyName")
          },
          model: {
            value: _vm.shipment.shipping_company_name,
            callback: function callback($$v) {
              _vm.$set(_vm.shipment, "shipping_company_name", $$v);
            },
            expression: "shipment.shipping_company_name"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "shipping_company_name-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mt-3",
    attrs: {
      md: "12"
    }
  }, [_c("b-button", {
    attrs: {
      variant: "primary",
      type: "submit",
      disabled: _vm.SubmitProcessing
    }
  }, [_c("i", {
    staticClass: "i-Yes me-2 font-weight-bold"
  }), _vm._v(" " + _vm._s(_vm.$t("submit")))]), _vm._v(" "), _vm.SubmitProcessing ? _vm._m(0) : _vm._e()], 1)], 1)], 1)], 1)], 1)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "typo__p"
  }, [_c("div", {
    staticClass: "spinner sm spinner-primary mt-3"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/src/views/app/pages/shipment/index_shipments.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/shipment/index_shipments.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_shipments_vue_vue_type_template_id_2ec404d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_shipments.vue?vue&type=template&id=2ec404d4& */ "./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=template&id=2ec404d4&");
/* harmony import */ var _index_shipments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index_shipments.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_shipments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_shipments_vue_vue_type_template_id_2ec404d4___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_shipments_vue_vue_type_template_id_2ec404d4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/shipment/index_shipments.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_shipments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index_shipments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_shipments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=template&id=2ec404d4&":
/*!***************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=template&id=2ec404d4& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_shipments_vue_vue_type_template_id_2ec404d4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_shipments_vue_vue_type_template_id_2ec404d4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_shipments_vue_vue_type_template_id_2ec404d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index_shipments.vue?vue&type=template&id=2ec404d4& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/shipment/index_shipments.vue?vue&type=template&id=2ec404d4&");


/***/ })

}]);