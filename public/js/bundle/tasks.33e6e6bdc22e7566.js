"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["tasks"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/todo/tasks.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/todo/tasks.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Task"
  },
  data: function data() {
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
    columns: function columns() {
      return [{
        label: this.$t("Title"),
        field: "title",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
        label: this.$t("RemindAt"),
        field: "remind_at",
        tdClass: "text-left",
        thClass: "text-left"
      }, {
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
        this.Get_Tasks(currentPage);
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
        this.Get_Tasks(1);
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
      this.Get_Tasks(this.serverParams.page);
    },
    //---- Event Search
    onSearch: function onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Tasks(this.serverParams.page);
    },
    //---- Validation State Form
    getValidationState: function getValidationState(_ref3) {
      var dirty = _ref3.dirty,
        validated = _ref3.validated,
        _ref3$valid = _ref3.valid,
        valid = _ref3$valid === void 0 ? null : _ref3$valid;
      return dirty || validated ? valid : null;
    },
    //------------- Submit Validation Create & Edit Task
    Submit_Task: function Submit_Task() {
      var _this = this;
      this.$refs.Create_Task.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          if (!_this.editmode) {
            _this.Create_Task();
          } else {
            _this.Update_Task();
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
    //------------------------------ Modal (create Task) -------------------------------\\
    New_Task: function New_Task() {
      this.reset_Form();
      // this.show_status = false;
      // this.editmode = false;
      this.$bvModal.show("New_Task");
    },
    //------------------------------ Modal (Update Task) -------------------------------\\
    Edit_Task: function Edit_Task(task) {
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
    Selected_Base_Task: function Selected_Base_Task(value) {
      if (value == null) {
        // this.show_status = false;
      } else {
        this.show_status = true;
      }
    },
    //----------------------------------------  Get All Tasks -------------------------\\
    Get_Tasks: function Get_Tasks(page) {
      var _this2 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("tasks?page=" + page + "&SortField=" + this.serverParams.sort.field + "&SortType=" + this.serverParams.sort.type + "&search=" + this.search + "&limit=" + this.limit).then(function (response) {
        var _response$data$Tasks;
        _this2.tasks = (_response$data$Tasks = response.data.Tasks) !== null && _response$data$Tasks !== void 0 ? _response$data$Tasks : response.data.Task;
        _this2.totalRows = response.data.totalRows;
        _this2.tasks_base = response.data.Tasks_base;

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
      if (this.task.expire_at === null) {
        this.task.expire_at = "";
      }
    },
    //---------------- Send Request with axios ( Create Task) --------------------\\
    Create_Task: function Create_Task() {
      var _this3 = this;
      this.SubmitProcessing = true;
      this.setToStrings();
      axios.post("tasks", {
        title: this.task.title,
        description: this.task.description,
        expire_at: this.task.expire_at,
        status: this.task.status,
        priority: this.task.priority
      }).then(function (response) {
        _this3.SubmitProcessing = false;
        Fire.$emit("Event_Task");
        _this3.makeToast("success", _this3.$t("Create.TitleTask"), _this3.$t("Success"));
      })["catch"](function (error) {
        _this3.SubmitProcessing = false;
        _this3.makeToast("danger", _this3.$t("InvalidData"), _this3.$t("Failed"));
      });
    },
    //--------------- Send Request with axios ( Update Task) --------------------\\
    Update_Task: function Update_Task() {
      var _this4 = this;
      this.SubmitProcessing = true;
      this.setToStrings();
      axios.put("tasks/" + this.task.id, {
        title: this.task.title,
        description: this.task.description,
        expire_at: this.task.expire_at,
        status: this.task.status,
        priority: this.task.priority
      }).then(function (response) {
        _this4.SubmitProcessing = false;
        Fire.$emit("Event_Task");
        _this4.makeToast("success", _this4.$t("Update.TitleTask"), _this4.$t("Success"));
      })["catch"](function (error) {
        _this4.SubmitProcessing = false;
        _this4.makeToast("danger", _this4.$t("InvalidData"), _this4.$t("Failed"));
      });
    },
    //------------------------------ reset Form ------------------------------\\
    reset_Form: function reset_Form() {
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
    Remove_Task: function Remove_Task(id) {
      var _this5 = this;
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("tasks/" + id).then(function (response) {
            if (response.data.success) {
              _this5.$swal(_this5.$t("Delete.Deleted"), _this5.$t("Delete.TaskDeleted"), "success");
            } else {
              _this5.$swal(_this5.$t("Delete.Failed"), _this5.$t("Task_already_linked_with_sub_task"), "warning");
            }
            Fire.$emit("Delete_Task");
          })["catch"](function () {
            _this5.$swal(_this5.$t("Delete.Failed"), _this5.$t("Delete.Therewassomethingwronge"), "warning");
          });
        }
      });
    }
  },
  //end Method

  //----------------------------- Created function-------------------
  created: function created() {
    var _this6 = this;
    this.Get_Tasks(1);
    Fire.$on("Event_Task", function () {
      setTimeout(function () {
        _this6.Get_Tasks(_this6.serverParams.page);
        _this6.$bvModal.hide("New_Task");
      }, 500);
    });
    Fire.$on("Delete_Task", function () {
      setTimeout(function () {
        _this6.Get_Tasks(_this6.serverParams.page);
      }, 500);
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/todo/tasks.vue?vue&type=template&id=1a5b52bc&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/todo/tasks.vue?vue&type=template&id=1a5b52bc& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
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
      page: _vm.$t("Tasks"),
      folder: _vm.$t("Todo")
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
      rows: _vm.tasks,
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
        return [props.column.field == "actions" ? _c("span", [_c("a", {
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
              return _vm.Edit_Task(props.row);
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
              return _vm.Remove_Task(props.row.id);
            }
          }
        }, [_c("i", {
          staticClass: "i-Close-Window text-25 text-danger"
        })])]) : props.column.field == "BaseTask" ? _c("div", [props.row.remind_at != "" ? _c("span", [_vm._v(_vm._s(props.row.remind_at))]) : _c("span", [_vm._v("N/D")])]) : _vm._e()];
      }
    }], null, false, 1672214816)
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
        return _vm.New_Task();
      }
    }
  }, [_c("i", {
    staticClass: "i-Add"
  }), _vm._v("\n          " + _vm._s(_vm.$t("Add")) + "\n        ")])], 1)])], 1) : _vm._e(), _vm._v(" "), _c("validation-observer", {
    ref: "Create_Task"
  }, [_c("b-modal", {
    attrs: {
      "hide-footer": "",
      size: "lg",
      id: "New_Task",
      title: _vm.editmode ? _vm.$t("Edit") : _vm.$t("Add")
    }
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Task.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "title",
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
            label: _vm.$t("Title") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            placeholder: _vm.$t("Enter_Task_Title"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "title-feedback",
            label: _vm.$t("Title")
          },
          model: {
            value: _vm.task.title,
            callback: function callback($$v) {
              _vm.$set(_vm.task, "title", $$v);
            },
            expression: "task.title"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "title-feedback"
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
      name: "expireAt",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("ExpireAt") + " " + "*"
          }
        }, [_c("b-form-datepicker", {
          attrs: {
            placeholder: _vm.$t("Enter_Task_Expiry_Date"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "expireAt-feedback",
            label: _vm.$t("ExpireAt"),
            type: "datetime"
          },
          model: {
            value: _vm.task.expire_at,
            callback: function callback($$v) {
              _vm.$set(_vm.task, "expire_at", $$v);
            },
            expression: "task.expire_at"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "expireAt-feedback"
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
      name: "remindAt",
      rules: {
        required: false
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("RemindAt")
          }
        }, [_c("b-form-datepicker", {
          attrs: {
            placeholder: _vm.$t("Enter_Task_Remind_Date"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "remindAt-feedback",
            label: _vm.$t("RemindAt"),
            type: "datetime"
          },
          model: {
            value: _vm.task.remind_at,
            callback: function callback($$v) {
              _vm.$set(_vm.task, "remind_at", $$v);
            },
            expression: "task.remind_at"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "remindAt-feedback"
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
            placeholder: _vm.$t("Enter_Task_Description"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Description-feedback",
            label: "Description",
            rows: 8,
            clearable: ""
          },
          model: {
            value: _vm.task.description,
            callback: function callback($$v) {
              _vm.$set(_vm.task, "description", $$v);
            },
            expression: "task.description"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "description-feedback"
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
      placeholder: _vm.$t("Choose_Task_Status"),
      options: [{
        label: "Pending",
        value: "pending"
      }, {
        label: "Fulfilled",
        value: "fulfiled"
      }, {
        label: "Cancelled",
        value: "cancelled"
      }]
    },
    model: {
      value: _vm.task.status,
      callback: function callback($$v) {
        _vm.$set(_vm.task, "status", $$v);
      },
      expression: "task.status"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.show_status,
      expression: "show_status"
    }],
    attrs: {
      md: "6"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Priority",
      rules: {
        required: true,
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Task_Priority") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            placeholder: _vm.$t("Enter_Task_Priority"),
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Priority-feedback",
            label: "Priority",
            type: "number"
          },
          model: {
            value: _vm.task.priority,
            callback: function callback($$v) {
              _vm.$set(_vm.task, "priority", _vm._n($$v));
            },
            expression: "task.priority"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Priority-feedback"
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

/***/ "./resources/src/views/app/pages/todo/tasks.vue":
/*!******************************************************!*\
  !*** ./resources/src/views/app/pages/todo/tasks.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tasks_vue_vue_type_template_id_1a5b52bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.vue?vue&type=template&id=1a5b52bc& */ "./resources/src/views/app/pages/todo/tasks.vue?vue&type=template&id=1a5b52bc&");
/* harmony import */ var _tasks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/todo/tasks.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _tasks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tasks_vue_vue_type_template_id_1a5b52bc___WEBPACK_IMPORTED_MODULE_0__.render,
  _tasks_vue_vue_type_template_id_1a5b52bc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/todo/tasks.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/todo/tasks.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/src/views/app/pages/todo/tasks.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tasks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./tasks.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/todo/tasks.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tasks_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/todo/tasks.vue?vue&type=template&id=1a5b52bc&":
/*!*************************************************************************************!*\
  !*** ./resources/src/views/app/pages/todo/tasks.vue?vue&type=template&id=1a5b52bc& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_tasks_vue_vue_type_template_id_1a5b52bc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_tasks_vue_vue_type_template_id_1a5b52bc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_tasks_vue_vue_type_template_id_1a5b52bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./tasks.vue?vue&type=template&id=1a5b52bc& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/todo/tasks.vue?vue&type=template&id=1a5b52bc&");


/***/ })

}]);