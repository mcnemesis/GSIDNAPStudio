(function() {
  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function(el) {
      return $(el).bind('input.rivets', this.publish);
    },
    unbind: function(el) {
      return $(el).unbind('input.rivets');
    }
  };

  rivets.configure({
    prefix: "rv",
    adapter: {
      subscribe: function(obj, keypath, callback) {
        callback.wrapped = function(m, v) {
          return callback(v);
        };
        return obj.on('change:' + keypath, callback.wrapped);
      },
      unsubscribe: function(obj, keypath, callback) {
        return obj.off('change:' + keypath, callback.wrapped);
      },
      read: function(obj, keypath) {
        if (keypath === "cid") {
          return obj.cid;
        }
        return obj.get(keypath);
      },
      publish: function(obj, keypath, value) {
        if (obj.cid) {
          return obj.set(keypath, value);
        } else {
          return obj[keypath] = value;
        }
      }
    }
  });

}).call(this);

(function() {
  var BuilderView, EditFieldView, Formbuilder, FormbuilderCollection, FormbuilderModel, ViewFieldView, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FormbuilderModel = (function(_super) {
    __extends(FormbuilderModel, _super);

    function FormbuilderModel() {
      _ref = FormbuilderModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FormbuilderModel.prototype.sync = function() {};

    FormbuilderModel.prototype.indexInDOM = function() {
      var $wrapper,
        _this = this;
      $wrapper = $(".fb-field-wrapper").filter((function(_, el) {
        return $(el).data('cid') === _this.cid;
      }));
      return $(".fb-field-wrapper").index($wrapper);
    };

    FormbuilderModel.prototype.is_input = function() {
      return Formbuilder.inputFields[this.get(Formbuilder.options.mappings.FIELD_TYPE)] != null;
    };

    return FormbuilderModel;

  })(Backbone.DeepModel);

  FormbuilderCollection = (function(_super) {
    __extends(FormbuilderCollection, _super);

    function FormbuilderCollection() {
      _ref1 = FormbuilderCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    FormbuilderCollection.prototype.initialize = function() {
      return this.on('add', this.copyCidToModel);
    };

    FormbuilderCollection.prototype.model = FormbuilderModel;

    FormbuilderCollection.prototype.comparator = function(model) {
      return model.indexInDOM();
    };

    FormbuilderCollection.prototype.copyCidToModel = function(model) {
      return model.attributes.cid = model.cid;
    };

    return FormbuilderCollection;

  })(Backbone.Collection);

  ViewFieldView = (function(_super) {
    __extends(ViewFieldView, _super);

    function ViewFieldView() {
      _ref2 = ViewFieldView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ViewFieldView.prototype.className = "fb-field-wrapper";

    ViewFieldView.prototype.events = {
      'click .subtemplate-wrapper': 'focusEditView',
      'click .js-duplicate': 'duplicate',
      'click .js-clear': 'clear'
    };

    ViewFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.listenTo(this.model, "change", this.render);
      return this.listenTo(this.model, "destroy", this.remove);
    };

    ViewFieldView.prototype.render = function() {
      this.$el.addClass('response-field-' + this.model.get(Formbuilder.options.mappings.FIELD_TYPE)).data('cid', this.model.cid).html(Formbuilder.templates["view/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      return this;
    };

    ViewFieldView.prototype.focusEditView = function() {
      return this.parentView.createAndShowEditView(this.model);
    };

    ViewFieldView.prototype.clear = function(e) {
      var cb, x,
        _this = this;
      e.preventDefault();
      e.stopPropagation();
      cb = function() {
        _this.parentView.handleFormUpdate();
        return _this.model.destroy();
      };
      x = Formbuilder.options.CLEAR_FIELD_CONFIRM;
      switch (typeof x) {
        case 'string':
          if (confirm(x)) {
            return cb();
          }
          break;
        case 'function':
          return x(cb);
        default:
          return cb();
      }
    };

    ViewFieldView.prototype.duplicate = function() {
      var attrs;
      attrs = _.clone(this.model.attributes);
      delete attrs['id'];
      attrs['label'] += ' Copy';
      return this.parentView.createField(attrs, {
        position: this.model.indexInDOM() + 1
      });
    };

    return ViewFieldView;

  })(Backbone.View);

  EditFieldView = (function(_super) {
    __extends(EditFieldView, _super);

    function EditFieldView() {
      _ref3 = EditFieldView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EditFieldView.prototype.className = "edit-response-field";

    EditFieldView.prototype.events = {
      'click .js-add-option': 'addOption',
      'click .js-remove-option': 'removeOption',
      'click .js-default-updated': 'defaultUpdated',
      'input .option-label-input': 'forceRender'
    };

    EditFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      return this.listenTo(this.model, "destroy", this.remove);
    };

    EditFieldView.prototype.render = function() {
      this.$el.html(Formbuilder.templates["edit/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      rivets.bind(this.$el, {
        model: this.model
      });
      return this;
    };

    EditFieldView.prototype.remove = function() {
      this.parentView.editView = void 0;
      this.parentView.$el.find("[data-target=\"#addField\"]").click();
      return EditFieldView.__super__.remove.apply(this, arguments);
    };

    EditFieldView.prototype.addOption = function(e) {
      var $el, i, newOption, options;
      $el = $(e.currentTarget);
      i = this.$el.find('.option').index($el.closest('.option'));
      options = this.model.get(Formbuilder.options.mappings.OPTIONS) || [];
      newOption = {
        label: "",
        checked: false
      };
      if (i > -1) {
        options.splice(i + 1, 0, newOption);
      } else {
        options.push(newOption);
      }
      this.model.set(Formbuilder.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + Formbuilder.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.removeOption = function(e) {
      var $el, index, options;
      $el = $(e.currentTarget);
      index = this.$el.find(".js-remove-option").index($el);
      options = this.model.get(Formbuilder.options.mappings.OPTIONS);
      options.splice(index, 1);
      this.model.set(Formbuilder.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + Formbuilder.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.defaultUpdated = function(e) {
      var $el;
      $el = $(e.currentTarget);
      if (this.model.get(Formbuilder.options.mappings.FIELD_TYPE) !== 'checkboxes') {
        this.$el.find(".js-default-updated").not($el).attr('checked', false).trigger('change');
      }
      return this.forceRender();
    };

    EditFieldView.prototype.forceRender = function() {
      return this.model.trigger('change');
    };

    return EditFieldView;

  })(Backbone.View);

  BuilderView = (function(_super) {
    __extends(BuilderView, _super);

    function BuilderView() {
      _ref4 = BuilderView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    BuilderView.prototype.SUBVIEWS = [];

    BuilderView.prototype.events = {
      'click .js-save-form': 'saveForm',
      'click .fb-tabs a': 'showTab',
      'click .fb-add-field-types a': 'addField',
      'mouseover .fb-add-field-types': 'lockLeftWrapper',
      'mouseout .fb-add-field-types': 'unlockLeftWrapper'
    };

    BuilderView.prototype.initialize = function(options) {
      var selector;
      selector = options.selector, this.formBuilder = options.formBuilder, this.bootstrapData = options.bootstrapData;
      if (selector != null) {
        this.setElement($(selector));
      }
      this.collection = new FormbuilderCollection;
      this.collection.bind('add', this.addOne, this);
      this.collection.bind('reset', this.reset, this);
      this.collection.bind('change', this.handleFormUpdate, this);
      this.collection.bind('destroy add reset', this.hideShowNoResponseFields, this);
      this.collection.bind('destroy', this.ensureEditViewScrolled, this);
      this.render();
      this.collection.reset(this.bootstrapData);
      return this.bindSaveEvent();
    };

    BuilderView.prototype.bindSaveEvent = function() {
      var _this = this;
      this.formSaved = true;
      this.saveFormButton = this.$el.find(".js-save-form");
      this.saveFormButton.attr('disabled', true).text(Formbuilder.options.dict.ALL_CHANGES_SAVED);
      $('#app-name, #app-color, #publish-channel, #theatre-uri, #transport-mode, #app-description, #app-brand-image').change(function() {
        _this.formSaved = false;
        return _this.saveForm.call(_this);
      });
      $('#js-publish-persona').click(function() {
        _this.formSaved = false;
        window.publish_persona = true;
        return _this.saveForm.call(_this);
      });
      $('#js-download-persona').click(function() {
        _this.formSaved = false;
        window.download_persona = true;
        return _this.saveForm.call(_this);
      });
      if (!!Formbuilder.options.AUTOSAVE) {
        setInterval(function() {
          return _this.saveForm.call(_this);
        }, 5000);
      }
      return $(window).bind('beforeunload', function() {
        if (_this.formSaved) {
          return void 0;
        } else {
          return Formbuilder.options.dict.UNSAVED_CHANGES;
        }
      });
    };

    BuilderView.prototype.reset = function() {
      this.$responseFields.html('');
      return this.addAll();
    };

    BuilderView.prototype.render = function() {
      var subview, _i, _len, _ref5;
      this.$el.html(Formbuilder.templates['page']());
      this.$fbLeft = this.$el.find('.fb-left');
      this.$responseFields = this.$el.find('.fb-response-fields');
      this.bindWindowScrollEvent();
      this.hideShowNoResponseFields();
      _ref5 = this.SUBVIEWS;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        subview = _ref5[_i];
        new subview({
          parentView: this
        }).render();
      }
      return this;
    };

    BuilderView.prototype.bindWindowScrollEvent = function() {
      var _this = this;
      return $(window).on('scroll', function() {
        var maxMargin, newMargin;
        if (_this.$fbLeft.data('locked') === true) {
          return;
        }
        newMargin = Math.max(0, $(window).scrollTop() - _this.$el.offset().top);
        maxMargin = _this.$responseFields.height();
        return _this.$fbLeft.css({
          'margin-top': Math.min(maxMargin, newMargin)
        });
      });
    };

    BuilderView.prototype.showTab = function(e) {
      var $el, first_model, target;
      $el = $(e.currentTarget);
      target = $el.data('target');
      $el.closest('li').addClass('active').siblings('li').removeClass('active');
      $(target).addClass('active').siblings('.fb-tab-pane').removeClass('active');
      if (target !== '#editField') {
        this.unlockLeftWrapper();
      }
      if (target === '#editField' && !this.editView && (first_model = this.collection.models[0])) {
        return this.createAndShowEditView(first_model);
      }
    };

    BuilderView.prototype.addOne = function(responseField, _, options) {
      var $replacePosition, view;
      view = new ViewFieldView({
        model: responseField,
        parentView: this
      });
      if (options.$replaceEl != null) {
        return options.$replaceEl.replaceWith(view.render().el);
      } else if ((options.position == null) || options.position === -1) {
        return this.$responseFields.append(view.render().el);
      } else if (options.position === 0) {
        return this.$responseFields.prepend(view.render().el);
      } else if (($replacePosition = this.$responseFields.find(".fb-field-wrapper").eq(options.position))[0]) {
        return $replacePosition.before(view.render().el);
      } else {
        return this.$responseFields.append(view.render().el);
      }
    };

    BuilderView.prototype.setSortable = function() {
      var _this = this;
      if (this.$responseFields.hasClass('ui-sortable')) {
        this.$responseFields.sortable('destroy');
      }
      this.$responseFields.sortable({
        forcePlaceholderSize: true,
        placeholder: 'sortable-placeholder',
        stop: function(e, ui) {
          var rf;
          if (ui.item.data('field-type')) {
            rf = _this.collection.create(Formbuilder.helpers.defaultFieldAttrs(ui.item.data('field-type')), {
              $replaceEl: ui.item
            });
            _this.createAndShowEditView(rf);
          }
          _this.handleFormUpdate();
          return true;
        },
        update: function(e, ui) {
          if (!ui.item.data('field-type')) {
            return _this.ensureEditViewScrolled();
          }
        }
      });
      return this.setDraggable();
    };

    BuilderView.prototype.setDraggable = function() {
      var $addFieldButtons,
        _this = this;
      $addFieldButtons = this.$el.find("[data-field-type]");
      return $addFieldButtons.draggable({
        connectToSortable: this.$responseFields,
        helper: function() {
          var $helper;
          $helper = $("<div class='response-field-draggable-helper' />");
          $helper.css({
            width: _this.$responseFields.width(),
            height: '80px'
          });
          return $helper;
        }
      });
    };

    BuilderView.prototype.addAll = function() {
      this.collection.each(this.addOne, this);
      return this.setSortable();
    };

    BuilderView.prototype.hideShowNoResponseFields = function() {
      return this.$el.find(".fb-no-response-fields")[this.collection.length > 0 ? 'hide' : 'show']();
    };

    BuilderView.prototype.addField = function(e) {
      var field_type;
      field_type = $(e.currentTarget).data('field-type');
      return this.createField(Formbuilder.helpers.defaultFieldAttrs(field_type));
    };

    BuilderView.prototype.createField = function(attrs, options) {
      var rf;
      rf = this.collection.create(attrs, options);
      this.createAndShowEditView(rf);
      return this.handleFormUpdate();
    };

    BuilderView.prototype.createAndShowEditView = function(model) {
      var $newEditEl, $responseFieldEl;
      $responseFieldEl = this.$el.find(".fb-field-wrapper").filter(function() {
        return $(this).data('cid') === model.cid;
      });
      $responseFieldEl.addClass('editing').siblings('.fb-field-wrapper').removeClass('editing');
      if (this.editView) {
        if (this.editView.model.cid === model.cid) {
          this.$el.find(".fb-tabs a[data-target=\"#editField\"]").click();
          this.scrollLeftWrapper($responseFieldEl);
          return;
        }
        this.editView.remove();
      }
      this.editView = new EditFieldView({
        model: model,
        parentView: this
      });
      $newEditEl = this.editView.render().$el;
      this.$el.find(".fb-edit-field-wrapper").html($newEditEl);
      this.$el.find(".fb-tabs a[data-target=\"#editField\"]").click();
      this.scrollLeftWrapper($responseFieldEl);
      return this;
    };

    BuilderView.prototype.ensureEditViewScrolled = function() {
      if (!this.editView) {
        return;
      }
      return this.scrollLeftWrapper($(".fb-field-wrapper.editing"));
    };

    BuilderView.prototype.scrollLeftWrapper = function($responseFieldEl) {
      var _this = this;
      this.unlockLeftWrapper();
      if (!$responseFieldEl[0]) {
        return;
      }
      return $.scrollWindowTo((this.$el.offset().top + $responseFieldEl.offset().top) - this.$responseFields.offset().top, 200, function() {
        return _this.lockLeftWrapper();
      });
    };

    BuilderView.prototype.lockLeftWrapper = function() {
      return this.$fbLeft.data('locked', true);
    };

    BuilderView.prototype.unlockLeftWrapper = function() {
      return this.$fbLeft.data('locked', false);
    };

    BuilderView.prototype.handleFormUpdate = function() {
      if (this.updatingBatch) {
        return;
      }
      this.formSaved = false;
      return this.saveFormButton.removeAttr('disabled').text(Formbuilder.options.dict.SAVE_FORM);
    };

    BuilderView.prototype.saveForm = function(e) {
      var payload;
      if (this.formSaved) {
        return;
      }
      this.formSaved = true;
      this.saveFormButton.attr('disabled', true).text(Formbuilder.options.dict.ALL_CHANGES_SAVED);
      this.collection.sort();
      payload = JSON.stringify({
        app: {
          name: $('#app-name').val(),
          color: $('#app-color').val(),
          theatre_address: $('#theatre-uri').val(),
          channel: $('#publish-channel').val(),
          transport_mode: $('#transport-mode').val(),
          description: $('#app-description').val(),
          brand_image: $('#app-brand-image').val(),
          uuid: window.app_uuid || generateUUID()
        },
        fields: this.collection.toJSON()
      });
      if (Formbuilder.options.HTTP_ENDPOINT) {
        this.doAjaxSave(payload);
      }
      return this.formBuilder.trigger('save', payload);
    };

    BuilderView.prototype.doAjaxSave = function(payload) {
      var _this = this;
      return $.ajax({
        url: Formbuilder.options.HTTP_ENDPOINT,
        type: Formbuilder.options.HTTP_METHOD,
        data: payload,
        contentType: "application/json",
        success: function(data) {
          var datum, _i, _len, _ref5;
          _this.updatingBatch = true;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            datum = data[_i];
            if ((_ref5 = _this.collection.get(datum.cid)) != null) {
              _ref5.set({
                id: datum.id
              });
            }
            _this.collection.trigger('sync');
          }
          return _this.updatingBatch = void 0;
        }
      });
    };

    return BuilderView;

  })(Backbone.View);

  Formbuilder = (function() {
    Formbuilder.helpers = {
      defaultFieldAttrs: function(field_type) {
        var attrs, _base;
        attrs = {};
        attrs[Formbuilder.options.mappings.LABEL] = 'Untitled';
        attrs[Formbuilder.options.mappings.FIELD_TYPE] = field_type;
        attrs[Formbuilder.options.mappings.REQUIRED] = true;
        attrs['field_options'] = {};
        return (typeof (_base = Formbuilder.fields[field_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs) : void 0) || attrs;
      },
      simple_format: function(x) {
        return x != null ? x.replace(/\n/g, '<br />') : void 0;
      }
    };

    Formbuilder.options = {
      BUTTON_CLASS: 'fb-button',
      IMPORT_PERSONA_JSON_CLASS: 'fb-import-persona-json',
      APP_NAME_CLASS: 'fb-app-name',
      APP_DESCRIPTION_CLASS: 'fb-app-description',
      APP_IMAGE_CLASS: 'fb-app-image',
      APP_COLOR_CLASS: 'fb-app-color',
      APP_THEATRE_URI_CLASS: 'fb-theatre-uri',
      APP_TRANSPORT_MODE_CLASS: 'fb-transport-mode',
      APP_TRANSPORT_MODES: ['POST', 'GET', 'SMS', 'EMAIL'],
      APP_PUBLISH_BUTTON_CLASS: 'fb-app-publish',
      PUBLISH_CHANNEL_CLASS: 'fb-publish-channel',
      HTTP_ENDPOINT: '',
      HTTP_METHOD: 'POST',
      AUTOSAVE: true,
      CLEAR_FIELD_CONFIRM: false,
      mappings: {
        SIZE: 'field_options.size',
        UNITS: 'field_options.units',
        MIME_TYPE: 'field_options.mime_type',
        LABEL: 'label',
        FIELD_TYPE: 'field_type',
        REQUIRED: 'required',
        ADMIN_ONLY: 'admin_only',
        OPTIONS: 'field_options.options',
        DESCRIPTION: 'field_options.description',
        INCLUDE_OTHER: 'field_options.include_other_option',
        INCLUDE_BLANK: 'field_options.include_blank_option',
        INTEGER_ONLY: 'field_options.integer_only',
        MIN: 'field_options.min',
        MAX: 'field_options.max',
        MINLENGTH: 'field_options.minlength',
        MAXLENGTH: 'field_options.maxlength',
        LENGTH_UNITS: 'field_options.min_max_length_units'
      },
      dict: {
        ALL_CHANGES_SAVED: 'All changes saved',
        SAVE_FORM: 'Save form',
        UNSAVED_CHANGES: 'You have unsaved changes. If you leave this page, you will lose those changes!',
        SET_IMPORT_PERSONA_FILE: 'Set the Persona file here, to start your design from an existing persona.',
        SET_IMPORT_PERSONA_JSON: 'Paste the Persona JSON here, to start your design from an existing persona.',
        SET_IMPORT_PERSONA_URI: 'Paste the Persona URI here, to start your design from an existing persona.',
        SET_APP_NAME: 'App Name...',
        SET_APP_IMAGE: 'App Brand Image URI...',
        SET_APP_DESCRIPTION: 'Briefly describe the app and its purpose, to the users...',
        SET_APP_COLOR: '#Main App Color',
        SET_PUBLISH_CHANNEL: 'CHANNEL to publish to',
        PUBLISH_PERSONA: 'Publish The Persona',
        IMPORT_PERSONA_JSON: 'Import from JSON',
        IMPORT_PERSONA_URI: 'Import from URI',
        IMPORT_PERSONA_FILE: 'Import from FILE',
        DOWNLOAD_PERSONA: 'Download The Persona',
        SET_THEATRE_URI: 'Theatre Address',
        SET_TRANSPORT_MODE: 'How the Histrion will submit acts',
        EMPTY_FIELDS_MESSAGE: 'The app is currently empty! Start designing, by dragging and dropping fields onto the app canvas below...'
      }
    };

    Formbuilder.fields = {};

    Formbuilder.inputFields = {};

    Formbuilder.nonInputFields = {};

    Formbuilder.registerField = function(name, opts) {
      var x, _i, _len, _ref5;
      _ref5 = ['view', 'edit'];
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        x = _ref5[_i];
        opts[x] = _.template(opts[x]);
      }
      opts.field_type = name;
      Formbuilder.fields[name] = opts;
      if (opts.type === 'non_input') {
        return Formbuilder.nonInputFields[name] = opts;
      } else {
        return Formbuilder.inputFields[name] = opts;
      }
    };

    function Formbuilder(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        formBuilder: this
      });
      this.mainView = new BuilderView(args);
    }

    return Formbuilder;

  })();

  window.Formbuilder = Formbuilder;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Formbuilder;
  } else {
    window.Formbuilder = Formbuilder;
  }

}).call(this);

(function() {
  Formbuilder.registerField('barcode', {
    order: 42,
    view: "<p><img src='img/barcode.png' class='section-image image-control' /></p>",
    edit: "",
    addButton: "<span class='symbol'><span class='fa fa-qrcode'></span></span> Scan Code"
  });

}).call(this);

(function() {
  Formbuilder.registerField('camera', {
    order: 41,
    view: "<p><img src='img/camera.png' class='section-image image-control' /></p>",
    edit: "",
    addButton: "<span class='symbol'><span class='fa fa-camera'></span></span> Take Photo"
  });

}).call(this);

(function() {
  Formbuilder.registerField('checkboxes', {
    order: 10,
    view: "<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(Formbuilder.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='checkbox' />\n      Other\n    </label>\n\n    <input type='text' />\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/options']({ includeOther: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-square-o\"></span></span> Multiple Choice",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "",
          checked: false
        }, {
          label: "",
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('date', {
    order: 20,
    view: "<div class='input-line'>\n  <span class='month'>\n    <input type=\"text\" />\n    <label>MM</label>\n  </span>\n\n  <span class='above-line'>/</span>\n\n  <span class='day'>\n    <input type=\"text\" />\n    <label>DD</label>\n  </span>\n\n  <span class='above-line'>/</span>\n\n  <span class='year'>\n    <input type=\"text\" />\n    <label>YYYY</label>\n  </span>\n</div>",
    edit: "",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-calendar\"></span></span> Date"
  });

}).call(this);

(function() {
  Formbuilder.registerField('devicegps', {
    order: 36,
    type: 'non_input',
    view: " <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>\n <div class=\"stub-device-id\" >\n<img\nstyle=\"width:100px;height:auto;\"\nsrc=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojOTBERkFBOyIgY3g9IjI1MiIgY3k9IjI1MiIgcj0iMjUyIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBwb2ludHM9IjE4My43LDM3NiA3NS40LDMzOC4yIDE0OS43LDE3OS41IDIxMS40LDE5MC43ICIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRTZFOUVFOyIgcG9pbnRzPSIxODMuNywzNzYgMjk4LjEsMzM4IDI3Ni41LDE3OS41IDIxMS40LDE5MC43ICIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRkZGRkZGOyIgcG9pbnRzPSI0MzQuOCwzNzYgMjk4LjEsMzM4IDI3Ni41LDE3OS41IDM0NC45LDE5MC43ICIvPgo8Zz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM4NERCRkY7IiBwb2ludHM9IjMyNiwyMDcuNCAyNzkuMSwxOTguOCAyOTQuMywzMTAuNSAzODIsMzM0ICAiLz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM4NERCRkY7IiBwb2ludHM9IjE1OS45LDIwMS4zIDEwNC45LDMyMS43IDE4Ny4yLDM0Ny4yIDIwOC4yLDIxMCAgIi8+CjwvZz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzU0QzBFQjsiIHBvaW50cz0iMjc5LjEsMTk4LjggMjA4LjIsMjEwIDE4Ny4yLDM0Ny4yIDI5NC4zLDMxMC41ICIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjE1NDNGOyIgZD0iTTMzMS44LDEzOS45YzAsNDUtODEuNSwxNDMuMy04MS41LDE0My4zcy04MS41LTk4LjMtODEuNS0xNDMuM3MzNi41LTgxLjUsODEuNS04MS41ICBTMzMxLjgsOTQuOCwzMzEuOCwxMzkuOXoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZGRkZGOyIgY3g9IjI1MC4yIiBjeT0iMTMzLjIiIHI9IjQxLjMiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==\"\n/>\n <p><small><i>DEV-GPS</i></small></p>\n\n </div>",
    edit: "<div class='fb-edit-section-header'>Field Name</div>\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-compass\"></span></span> Device GPS"
  });

}).call(this);

(function() {
  Formbuilder.registerField('deviceid', {
    order: 36,
    type: 'non_input',
    view: " <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>\n <div class=\"stub-device-id\" >\n<img\nsrc=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KICA8Zz4KICAgIDxnPgogICAgICA8cGF0aCBkPSJtNDY0LjEsNjcuN2gtNDE2LjJjLTE5LjgsMC0zNi40LDE1LjYtMzYuNCwzNi40djMwMy44YzAsMTkuOCAxNS42LDM2LjQgMzYuNCwzNi40aDQxNi4xYzE5LjgsMCAzNi40LTE2LjYgMzYuNC0zNy40di0zMDIuOGMwLjEtMTkuNy0xNS41LTM2LjQtMzYuMy0zNi40em0xNi42LDMzOS4xYzAsOS40LTcuMywxNi42LTE2LjYsMTYuNmgtNDE2LjJjLTkuNCwwLTE2LjYtNy4zLTE2LjYtMTYuNnYtMzAyLjdjMC05LjQgNy4zLTE2LjYgMTYuNi0xNi42aDQxNi4xYzkuNCwwIDE2LjYsNy4zIDE2LjYsMTYuNnYzMDIuN3oiIGZpbGw9IiM5MzNFQzUiLz4KICAgICAgPHBhdGggZD0iTTE3OCwxMzQuM0g2OS44djEwOC4ySDE3OFYxMzQuM3ogTTE1OC4yLDIyMi43SDkwLjZ2LTY3LjZoNjcuNlYyMjIuN3oiIGZpbGw9IiM5MzNFQzUiLz4KICAgICAgPHJlY3Qgd2lkdGg9IjIxNS4zIiB4PSI4MC4yIiB5PSIyOTQuNSIgaGVpZ2h0PSIyMC44IiBmaWxsPSIjOTMzRUM1Ii8+CiAgICAgIDxyZWN0IHdpZHRoPSIyMTUuMyIgeD0iODAuMiIgeT0iMzYwIiBoZWlnaHQ9IjIwLjgiIGZpbGw9IiM5MzNFQzUiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=\"\n/>\n\n <p><small><i>DEV-UUID</i></small></p>\n\n </div>",
    edit: "<div class='fb-edit-section-header'>Field Name</div>\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-id-card-o\"></span></span> Device ID"
  });

}).call(this);

(function() {
  Formbuilder.registerField('email', {
    order: 40,
    view: "<input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />",
    edit: "",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-envelope-o\"></span></span> Email"
  });

}).call(this);

(function() {
  Formbuilder.registerField('file', {
    order: 40,
    view: "<input type='file' placeholder='Pick a file...' />\n<% if (mime_type = rf.get(Formbuilder.options.mappings.MIME_TYPE)) { %>\n  <small><i><%= mime_type %></i></small>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/mime_type']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-file\"></span></span> File"
  });

}).call(this);

(function() {
  Formbuilder.registerField('hidden', {
    order: 37,
    type: 'non_input',
    view: " <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>\n <div class=\"stub-hidden-field\" >\n<img\nsrc=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDIxLjc2NCAyMS43NjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIxLjc2NCAyMS43NjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTAuODgyLDAuMDIzQzQuODcyLDAuMDIzLDAsMi40NiwwLDUuNDY0djIuNjljMS44NzItMi4yNDgsNS45ODQtMy43NzgsMTAuODgyLTMuNzc4YzQuODk3LDAsOS4wMSwxLjUzLDEwLjg4MiwzLjc3OCAgICB2LTIuNjlDMjEuNzY0LDIuNDU5LDE2Ljg5MiwwLjAyMywxMC44ODIsMC4wMjN6IiBmaWxsPSIjOTMzRUM1Ii8+CgkJPHBhdGggZD0iTTQuNTY0LDYuNDhDMS44MDQsNy40NjcsMCw5LjA3OSwwLDEwLjkwNGMwLDUuNzA4LDQuMzk2LDEwLjM4MSw5Ljk4NywxMC44MzdDOC41MjUsMjAuMzgsNC44MiwxNS45ODIsNC41NjQsNi40OHoiIGZpbGw9IiM5MzNFQzUiLz4KCQk8cGF0aCBkPSJNMTcuMjE1LDYuNDg2Yy0wLjEwNyw5LjQ4NC0zLjkwNCwxMy44ODUtNS40MTksMTUuMjU0YzUuNTgxLTAuNDY2LDkuOTY4LTUuMTM1LDkuOTY4LTEwLjgzNiAgICBDMjEuNzY0LDkuMDgzLDE5Ljk2Niw3LjQ3NCwxNy4yMTUsNi40ODZ6IiBmaWxsPSIjOTMzRUM1Ii8+CgkJPHBhdGggZD0iTTEwLjg4Miw1Ljk2NGMxLjY0OSwwLDMuMjgyLDAuMTkzLDQuNzUsMC41NjJjLTAuMTEyLDguNDA3LTMuMzEyLDEyLjQ3Ni00LjczOCwxMy44NzMgICAgYy0xLjM4Ni0xLjQwNi00LjQ5Ny01LjQ4MS00Ljc0Ni0xMy44NzdDNy42MTEsNi4xNTUsOS4yMzgsNS45NjQsMTAuODgyLDUuOTY0IE0xMC44ODIsNS40NjRjLTEuOTAxLDAtMy42ODgsMC4yNDUtNS4yNDMsMC42NzQgICAgYzAuMTgsOS42NTEsNC4xMDUsMTMuOTE1LDUuMjQ5LDE0Ljk0OGMxLjE3My0xLjAyMyw1LjIyOC01LjI4Myw1LjI0Ny0xNC45NDVDMTQuNTc2LDUuNzEsMTIuNzg3LDUuNDY0LDEwLjg4Miw1LjQ2NEwxMC44ODIsNS40NjQgICAgeiIgZmlsbD0iIzkzM0VDNSIvPgoJCTxnPgoJCQk8Zz4KCQkJCTxwYXRoIGQ9Ik0xMC44ODIsNy40MjhjLTIuMDAzLDAtMy42MjcsMS42MjQtMy42MjcsMy42MjZjMCwyLjAwNCwxLjYyNCwzLjYyNywzLjYyNywzLjYyN2MyLjAwNCwwLDMuNjI3LTEuNjIzLDMuNjI3LTMuNjI3ICAgICAgQzE0LjUwOSw5LjA1MiwxMi44ODYsNy40MjgsMTAuODgyLDcuNDI4eiBNMTAuODgyLDEzLjk1OGMtMS42MDMsMC0yLjkwMi0xLjMtMi45MDItMi45MDJjMC0xLjYwNCwxLjI5OS0yLjkwMiwyLjkwMi0yLjkwMiAgICAgIGMxLjYwMywwLDIuOTAxLDEuMjk5LDIuOTAxLDIuOTAyQzEzLjc4MywxMi42NTksMTIuNDg0LDEzLjk1OCwxMC44ODIsMTMuOTU4eiIgZmlsbD0iIzkzM0VDNSIvPgoJCQk8L2c+CgkJCTxnPgoJCQkJPGNpcmNsZSBjeD0iMTAuODgyIiBjeT0iMTEuMDU2IiByPSIxLjQ1MSIgZmlsbD0iIzkzM0VDNSIvPgoJCQk8L2c+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=\"\n\n <br/>\n <p style=\"color:gray\"><%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %></p>\n\n</div>",
    edit: "<div class='fb-edit-section-header'>Field Name</div>\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'\n  placeholder='Set the Hidden Value'></textarea>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-eye-slash\"></span></span> Hidden Field"
  });

}).call(this);

(function() {
  Formbuilder.registerField('show_image', {
    order: 0,
    type: 'non_input',
    view: "<label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>\n<p><img src='<%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %>' class='section-image' /></p>",
    edit: "<div class='fb-edit-section-header'>Label</div>\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'\n  placeholder='Paste URL to Image'></textarea>",
    addButton: "<span class='symbol'><span class='fa fa-picture-o'></span></span> Show Image"
  });

}).call(this);

(function() {
  Formbuilder.registerField('show_info', {
    order: 0,
    type: 'non_input',
    view: "<label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>\n<p><%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %></p>",
    edit: "<div class='fb-edit-section-header'>Label</div>\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />\n<textarea data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'\n  placeholder='Add the actual content to display here'></textarea>",
    addButton: "<span class='symbol'><span class='fa fa-info'></span></span> Show Info"
  });

}).call(this);

(function() {
  Formbuilder.registerField('dropdown', {
    order: 24,
    view: "<select>\n  <% if (rf.get(Formbuilder.options.mappings.INCLUDE_BLANK)) { %>\n    <option value=''></option>\n  <% } %>\n\n  <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n    <option <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'selected' %>>\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </option>\n  <% } %>\n</select>",
    edit: "<%= Formbuilder.templates['edit/options']({ includeBlank: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-caret-down\"></span></span> Menu Selection",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "",
          checked: false
        }, {
          label: "",
          checked: false
        }
      ];
      attrs.field_options.include_blank_option = false;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('number', {
    order: 30,
    view: "<input type='text' />\n<% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>\n  <%= units %>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/min_max']() %>\n<%= Formbuilder.templates['edit/units']() %>\n<%= Formbuilder.templates['edit/integer_only']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-number\">123</span></span> Number"
  });

}).call(this);

(function() {
  Formbuilder.registerField('paragraph', {
    order: 5,
    view: "<textarea class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>'></textarea>",
    edit: "<%= Formbuilder.templates['edit/size']() %>\n<%= Formbuilder.templates['edit/min_max_length']() %>",
    addButton: "<span class=\"symbol\">&#182;</span> Paragraph",
    defaultAttributes: function(attrs) {
      attrs.field_options.size = 'small';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('radio', {
    order: 15,
    view: "<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='radio' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(Formbuilder.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='radio' />\n      Other\n    </label>\n\n    <input type='text' />\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/options']({ includeOther: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-circle-o\"></span></span> Single Choice",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "",
          checked: false
        }, {
          label: "",
          checked: false
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('text', {
    order: 0,
    view: "<input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />",
    edit: "<%= Formbuilder.templates['edit/size']() %>\n<%= Formbuilder.templates['edit/min_max_length']() %>",
    addButton: "<span class='symbol'><span class='fa fa-font'></span></span> Text",
    defaultAttributes: function(attrs) {
      attrs.field_options.size = 'small';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('time', {
    order: 25,
    view: "<div class='input-line'>\n  <span class='hours'>\n    <input type=\"text\" />\n    <label>HH</label>\n  </span>\n\n  <span class='above-line'>:</span>\n\n  <span class='minutes'>\n    <input type=\"text\" />\n    <label>MM</label>\n  </span>\n\n  <span class='above-line'>:</span>\n\n  <span class='seconds'>\n    <input type=\"text\" />\n    <label>SS</label>\n  </span>\n\n  <span class='am_pm'>\n    <select>\n      <option>AM</option>\n      <option>PM</option>\n    </select>\n  </span>\n</div>",
    edit: "",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-clock-o\"></span></span> Time"
  });

}).call(this);

(function() {
  Formbuilder.registerField('website', {
    order: 35,
    view: "<input type='text' placeholder='http://' />",
    edit: "",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-link\"></span></span> URL"
  });

}).call(this);

this["Formbuilder"] = this["Formbuilder"] || {};
this["Formbuilder"]["templates"] = this["Formbuilder"]["templates"] || {};

this["Formbuilder"]["templates"]["edit/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['edit/base_header']() )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.templates['edit/common']() )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base_header"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-field-label\'>\n  <span data-rv-text="model.' +
((__t = ( Formbuilder.options.mappings.LABEL )) == null ? '' : __t) +
'"></span>\n  <code class=\'field-type\' data-rv-text=\'model.' +
((__t = ( Formbuilder.options.mappings.FIELD_TYPE )) == null ? '' : __t) +
'\'></code>\n  <span class=\'fa fa-arrow-right pull-right\'></span>\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['edit/base_header']() )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/checkboxes"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.REQUIRED )) == null ? '' : __t) +
'\' />\n  Required\n</label>\n<!-- label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.ADMIN_ONLY )) == null ? '' : __t) +
'\' />\n  Admin only\n</label -->';

}
return __p
};

this["Formbuilder"]["templates"]["edit/common"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Label</div>\n\n<div class=\'fb-common-wrapper\'>\n  <div class=\'fb-label-description\'>\n    ' +
((__t = ( Formbuilder.templates['edit/label_description']() )) == null ? '' : __t) +
'\n  </div>\n  <div class=\'fb-common-checkboxes\'>\n    ' +
((__t = ( Formbuilder.templates['edit/checkboxes']() )) == null ? '' : __t) +
'\n  </div>\n  <div class=\'fb-clear\'></div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/integer_only"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Integer only</div>\n<label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INTEGER_ONLY )) == null ? '' : __t) +
'\' />\n  Only accept integers\n</label>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/label_description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type=\'text\' data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.LABEL )) == null ? '' : __t) +
'\' />\n<textarea data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.DESCRIPTION )) == null ? '' : __t) +
'\'\n  placeholder=\'Add a longer description to this field\'></textarea>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/mime_type"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Mime Type</div>\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MIME_TYPE )) == null ? '' : __t) +
'" />\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Minimum / Maximum</div>\n\nAbove\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MIN )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\nBelow\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAX )) == null ? '' : __t) +
'" style="width: 30px" />\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max_length"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Length Limit</div>\n\nMin\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MINLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\nMax\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAXLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\n<select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.LENGTH_UNITS )) == null ? '' : __t) +
'" style="width: auto;">\n  <option value="characters">characters</option>\n  <option value="words">words</option>\n</select>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Options</div>\n\n';
 if (typeof includeBlank !== 'undefined'){ ;
__p += '\n  <label>\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_BLANK )) == null ? '' : __t) +
'\' />\n    Include blank\n  </label>\n';
 } ;
__p += '\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked" />\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\n  <a class="js-remove-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Option"><i class=\'fa fa-minus-circle\'></i></a>\n</div>\n\n';
 if (typeof includeOther !== 'undefined'){ ;
__p += '\n  <label>\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_OTHER )) == null ? '' : __t) +
'\' />\n    Include "other"\n  </label>\n';
 } ;
__p += '\n\n<div class=\'fb-bottom-add\'>\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add option</a>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/size"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Size</div>\n<select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.SIZE )) == null ? '' : __t) +
'">\n  <option value="small">Small</option>\n  <option value="medium">Medium</option>\n  <option value="large">Large</option>\n</select>\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/units"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Units</div>\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.UNITS )) == null ? '' : __t) +
'" />\n';

}
return __p
};

this["Formbuilder"]["templates"]["page"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['partials/save_button']() )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.templates['partials/left_side']() )) == null ? '' : __t) +
'\n' +
((__t = ( Formbuilder.templates['partials/right_side']() )) == null ? '' : __t) +
'\n<div class=\'fb-clear\'></div>';

}
return __p
};

this["Formbuilder"]["templates"]["partials/add_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-tab-pane active\' id=\'addField\'>\n  <div class=\'fb-add-field-types\'>\n    <div class=\'section\'>\n      ';
 _.each(_.sortBy(Formbuilder.inputFields, 'order'), function(f){ ;
__p += '\n        <a data-field-type="' +
((__t = ( f.field_type )) == null ? '' : __t) +
'" class="' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\n        </a>\n      ';
 }); ;
__p += '\n    </div>\n\n    <div class=\'section\'>\n      ';
 _.each(_.sortBy(Formbuilder.nonInputFields, 'order'), function(f){ ;
__p += '\n        <a data-field-type="' +
((__t = ( f.field_type )) == null ? '' : __t) +
'" class="' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\n        </a>\n      ';
 }); ;
__p += '\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/edit_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-tab-pane\' id=\'editField\'>\n  <div class=\'fb-edit-field-wrapper\'></div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/import_persona"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-tab-pane\' id=\'importPersona\'>\n<div class=\'fb-import-persona-wrapper\'>\n\n    <input type="file" id="import-persona-file" class=\'' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
' ' +
((__t = ( Formbuilder.options.APP_PUBLISH_BUTTON_CLASS )) == null ? '' : __t) +
'\' title=\'' +
((__t = ( Formbuilder.options.dict.SET_IMPORT_PERSONA_FILE )) == null ? '' : __t) +
'\'></input>\n    <hr/>\n    <textarea id="import-persona-input" class=\'' +
((__t = ( Formbuilder.options.IMPORT_PERSONA_JSON_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_IMPORT_PERSONA_JSON )) == null ? '' : __t) +
'\'></textarea>\n    <button id=\'js-import-persona-json\' class=\'' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
' ' +
((__t = ( Formbuilder.options.APP_PUBLISH_BUTTON_CLASS )) == null ? '' : __t) +
'\'>' +
((__t = ( Formbuilder.options.dict.IMPORT_PERSONA_JSON )) == null ? '' : __t) +
'</button>\n\n    <hr/>\n    <input type="text" id="import-persona-uri" class=\'' +
((__t = ( Formbuilder.options.IMPORT_PERSONA_JSON_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_IMPORT_PERSONA_URI )) == null ? '' : __t) +
'\'></input>\n    <button id=\'js-import-persona-uri\' class=\'' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
' ' +
((__t = ( Formbuilder.options.APP_PUBLISH_BUTTON_CLASS )) == null ? '' : __t) +
'\'>' +
((__t = ( Formbuilder.options.dict.IMPORT_PERSONA_URI )) == null ? '' : __t) +
'</button>\n</div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/left_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-left\'>\n  <ul class=\'fb-tabs\'>\n    <li class=\'active\'><a data-target=\'#addField\'>+Field</a></li>\n    <li><a data-target=\'#editField\'>Edit</a></li>\n    <li><a data-target=\'#importPersona\'>Import</a></li>\n    <li><a data-target=\'#templates\'>Templates</a></li>\n  </ul>\n\n  <div class=\'fb-tab-content\'>\n    ' +
((__t = ( Formbuilder.templates['partials/add_field']() )) == null ? '' : __t) +
'\n    ' +
((__t = ( Formbuilder.templates['partials/edit_field']() )) == null ? '' : __t) +
'\n    ' +
((__t = ( Formbuilder.templates['partials/import_persona']() )) == null ? '' : __t) +
'\n    ' +
((__t = ( Formbuilder.templates['partials/templates']() )) == null ? '' : __t) +
'\n  </div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/publish"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-publish-wrapper\'>\n<input type="text" id=\'app-name\' class=\'' +
((__t = ( Formbuilder.options.APP_NAME_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_APP_NAME )) == null ? '' : __t) +
'\'></input>\n<input type="color" id=\'app-color\' value=\'#490A3D\' class=\'' +
((__t = ( Formbuilder.options.APP_COLOR_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_APP_COLOR )) == null ? '' : __t) +
'\'></input>\n<input type="text" id=\'app-brand-image\' class=\'' +
((__t = ( Formbuilder.options.APP_IMAGE_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_APP_IMAGE )) == null ? '' : __t) +
'\'></input>\n<input type="text" id=\'theatre-uri\' class=\'' +
((__t = ( Formbuilder.options.APP_THEATRE_URI_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_THEATRE_URI )) == null ? '' : __t) +
'\'></input>\n<select id=\'transport-mode\' class=\'' +
((__t = ( Formbuilder.options.APP_TRANSPORT_MODE_CLASS )) == null ? '' : __t) +
'\' title=\'' +
((__t = ( Formbuilder.options.dict.SET_TRANSPORT_MODE )) == null ? '' : __t) +
'\' >\n    ';
 _.each(Formbuilder.options.APP_TRANSPORT_MODES, function(mode){ ;
__p += '\n    <option value="' +
((__t = ( mode )) == null ? '' : __t) +
'">' +
((__t = ( mode )) == null ? '' : __t) +
'</option>\n    ';
 }); ;
__p += '\n</select>\n<hr/>\n<textarea id=\'app-description\' class=\'' +
((__t = ( Formbuilder.options.APP_DESCRIPTION_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_APP_DESCRIPTION )) == null ? '' : __t) +
'\'></textarea>\n<hr/>\n<input type="text" id=\'publish-channel\' class=\'' +
((__t = ( Formbuilder.options.PUBLISH_CHANNEL_CLASS )) == null ? '' : __t) +
'\' placeholder=\'' +
((__t = ( Formbuilder.options.dict.SET_PUBLISH_CHANNEL )) == null ? '' : __t) +
'\'></input>\n<button id=\'js-publish-persona\' class=\'' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
' ' +
((__t = ( Formbuilder.options.APP_PUBLISH_BUTTON_CLASS )) == null ? '' : __t) +
'\'>' +
((__t = ( Formbuilder.options.dict.PUBLISH_PERSONA )) == null ? '' : __t) +
'</button>\n<button id=\'js-download-persona\' class=\'' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
' ' +
((__t = ( Formbuilder.options.APP_PUBLISH_BUTTON_CLASS )) == null ? '' : __t) +
'\'>' +
((__t = ( Formbuilder.options.dict.DOWNLOAD_PERSONA )) == null ? '' : __t) +
'</button>\n<div id="code" class="code"></div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/right_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-right\'>\n<div class=\'fb-no-response-fields\'>' +
((__t = ( Formbuilder.options.dict.EMPTY_FIELDS_MESSAGE )) == null ? '' : __t) +
'</div>\n  <div class=\'fb-response-fields\'></div>\n  ' +
((__t = ( Formbuilder.templates['partials/publish']() )) == null ? '' : __t) +
'\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/save_button"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-save-wrapper\'>\n  <button class=\'js-save-form ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'\'></button>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/templates"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-tab-pane\' id=\'templates\'>\n<div class=\'fb-templates-wrapper\'>\n    <h5>Instead of starting from scratch, you can browse the app templates below, and choose one to kickstart your custom app from</h5>\n    <hr/>\n    <div id="template-entries">\n    </div>\n</div>\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'subtemplate-wrapper\'>\n  <div class=\'cover\'></div>\n  ' +
((__t = ( Formbuilder.templates['view/label']({rf: rf}) )) == null ? '' : __t) +
'\n\n  ' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) +
'\n\n  ' +
((__t = ( Formbuilder.templates['view/description']({rf: rf}) )) == null ? '' : __t) +
'\n  ' +
((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
'\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'subtemplate-wrapper\'>\n  <div class=\'cover\'></div>\n  ' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) +
'\n  ' +
((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
'\n</div>\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'help-block\'>\n  ' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.DESCRIPTION)) )) == null ? '' : __t) +
'\n</span>\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/duplicate_remove"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'actions-wrapper\'>\n  <a class="js-duplicate ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Duplicate Field"><i class=\'fa fa-plus-circle\'></i></a>\n  <a class="js-clear ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Field"><i class=\'fa fa-minus-circle\'></i></a>\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["view/label"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<label>\n  <span>' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.LABEL)) )) == null ? '' : __t) +
'\n  ';
 if (rf.get(Formbuilder.options.mappings.REQUIRED)) { ;
__p += '\n    <abbr title=\'required\'>*</abbr>\n  ';
 } ;
__p += '\n</label>\n';

}
return __p
};