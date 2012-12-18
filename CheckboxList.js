/*jslint es5: true, nomen: true, white: true */
/*jshint multistr:true */
;(function($, window, document, undefined) {
    "use strict";
    $.widget("Itst.CheckboxList", {
        _markup: null,
        _checkboxListTemplate: null,
        _selectedItems: null,
        _height: null,
        _width: null,
        _listContainer: null,
        _finalWidth: null,
        _responseDataObject: null,

        options: {
            SourceUrl: null,
            SourceData: null,
            OnAfterDataLoad: null,
            ClickableItems: false,
            ClickFunction: null,
            EmptyListText: null
        },

        destroy: function() {
            // For UI 1.8, destroy must be invoked from the base widget last.
            // For UI 1.9, define _destroy instead and don't worry about calling the base widget.
            this.element.empty();
            $.Widget.prototype.destroy.call(this);
        },

        GetDataObject: function() {
            return this._responseDataObject;
        },

        Clear: function() {
            this._listContainer.text(this.options.EmptyListText);
        },

        GetSelectedItems: function() {
            var _returnVal = [];
            this._listContainer.children().each($.proxy(function(index, element) {
                if ($(':checked', element).length > 0) {
                    _returnVal[index] = { GroupId: $(element).attr('id') };
                    _returnVal[index].Items = [];
                    var _currentIndex = 0;
                    $(element).children('ul').each($.proxy(function(listIndex, listCheckbox) {
                        if ($(listCheckbox).children().first().is(":checked")) {
                            _returnVal[index].Items[_currentIndex] = { OptionId: $(listCheckbox).children().first().attr('id') };
                            _currentIndex++;
                        }
                    }, this));
                }
            }, this));

            return _returnVal;
        },

        _create: function() {
            var _clickable = this.options.ClickableItems;

            if (!jQuery.ui) {
                console.error('The jQuery UI must be loaded before the Itst Checkbox List is used.');
            } else {

                this._listContainer = $('<div id="listContainer_' + this.element.attr('id') + '" />').appendTo(this.element);

                this._markup = '<script type="text/x-jquery-tmpl"><div id="${GroupId}" text="${GroupName}" class="data-group" ><strong>${GroupName}</strong>{{each Items}}<ul class="data-item"><input type="checkbox" ';
                if (_clickable) {
                    this._markup += '{{if Enabled===false}}class="data-item-disabled-clickable"{{else}}class="data-item"{{/if}}';
                }
                this._markup += '{{if Selected===true}}checked{{/if}}{{if Enabled===false}}disabled{{/if}}';
                if (_clickable) {
                    this._markup += ' id="${OptionId}"/>';
                }
                else {
                    this._markup += ' id="${OptionId}">';
                }
                if (_clickable) {
                    this._markup += '<a data-title="${OptionName}" data-id="${OptionId}" for="${OptionId}" class="data-item-clickable">';
                }
                this._markup += '${OptionName}';
                if (_clickable) {
                    this._markup += '</a >';
                }
                else {
                    this._markup += '</input>';
                }
                this._markup += '</ul>{{/each}}</div></'+'script>';


                this._checkboxListTemplate = $(this._markup).template();

                if (this.options.SourceUrl !== null) {
                    this._getListItems();
                }
                else if (this.options.SourceData !== null) {
                    this._responseDataObject = this.options.SourceData;
                    this.PopulateCheckboxList(this.options.SourceData);
                }
                else {
                    this.Clear();
                }
            }
        },

        PopulateCheckboxList: function(dataArray) {
            var _children,
            _itemClickDataMap = { target: $.proxy(this.options.ClickFunction, this) };

            $(this._listContainer).empty();

            $(this._markup).tmpl(dataArray).appendTo(this._listContainer);

            _children = this._listContainer.children();

            _children.each($.proxy(function(index, element) {
                if ($(element).width() > this._finalWidth) {
                    this._finalWidth = $(element).width();
                }
            }, this));

            _children.each($.proxy(function(index, element) {
                $(element).css('width', this._finalWidth);
            }, this));

            if (this.options.OnAfterDataLoad) {
                this.options.OnAfterDataLoad();
            }

            $('a', this._listContainer).bind('click', _itemClickDataMap, function(event) {
                event.data.target($(this).data('id'), $(this).data('title'));
            });
        },

        _getListItems: function() {
            $.ajax({
                url: this.options.SourceUrl,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: $.proxy(function(response) {
                var group,
                    item,
                    results,
                    cluster;
                    this._responseDataObject = response.d;
                    results = response.d;
                    for (group in results) {
                        if (results.hasOwnProperty(group)) {
                            if (results[group].DisableGroup) {
                                cluster = results[group].Items;
                                for (item in cluster) {
                                    if (cluster.hasOwnProperty(item)) {
                                        cluster[item].Enabled = false;
                                    }
                                }
                            }
                        }
                    }
                    this.PopulateCheckboxList(results);
                    return;
                }, this),
                error: $.proxy(function() {
                    this._listContainer.append('<div class="data-error">Cannot access data</div>');
                }, this)
            });
        }
    });
} (jQuery, window, document));