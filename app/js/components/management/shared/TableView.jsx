'use strict';

var UnpaginatedListingsStore = require('../../../stores/UnpaginatedListingsStore');
var ListingActions = require('../../../actions/ListingActions');

var React = require('react');
var Reflux = require('reflux');
var { PropTypes } = React;

var { Navigation } = require('react-router');
var ActiveState = require('../../../mixins/ActiveStateMixin');

var moment = require('moment');

var TableView = React.createClass({

    mixins: [
        Reflux.listenTo(UnpaginatedListingsStore, 'onStoreChanged'),
        Reflux.listenTo(ListingActions.listingChangeCompleted, 'onListingChangeCompleted'),
        Navigation,
        ActiveState
    ],

    propTypes: {
        filter: PropTypes.object.isRequired,
        onCountsChanged: PropTypes.func.isRequired,
        tableName: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool,
        showOrg: PropTypes.bool,
    },

    render: function () {
        return this.transferPropsTo(
            <div ref="grid"></div>
        );
    },

    componentWillUnmount: function () {
        this.grid.destroy();
    },

    componentDidMount: function () {
        var thisTable = this;
        this.grid = $(this.refs.grid.getDOMNode()).w2grid({
            name: 'grid',
            fixedBody: true,
            multiSelect : false,
            show: {
                toolbar: true,
                toolbarAdd: false,
                toolbarEdit: false,
                toolbarDelete: false,
                toolbarSearch: true,
                toolbarReload: false,
                toolbarColumns: true,
                toolbarSave: true
            },
            buttons: {
                save : {
                    caption: w2utils.lang('Export to csv'),
                    icon: 'icon-save-grayDark'
                }
            },
            columns: this.getColumns(),
            records: [],

            onSubmit: function (event) {
                var records = this.records.map( function (record) {
                    var owners = '';
                    record.owners.forEach( function (owner,index) {
                        if (index) {
                            owners += '; ';
                        }
                        owners += owner.displayName;
                    });
                    var updatedDate = moment(record.updated).format('MM/DD/YY');
                    return {
                        Id: record.recid,
                        Title: record.title,
                        Owners: owners,
                        Organization: record.organization,
                        Status: thisTable.convertStatus(record.status),
                        Updated: updatedDate,
                        Enabled: record.enabled,
                        Featured: record.featured,
                        Comments: record.comments
                    };
                });
                thisTable.JSONToCSVConvertor(records,thisTable.props.tableName, "false");
            },

            onClick: function (event) {
                event.preventDefault();
                event.stopPropagation();
                var target = event.originalEvent.target;
                if (this.columns[event.column].field==="featured") {
                    if (target.type==='checkbox') {
                        if(thisTable.props.isAdmin && thisTable.props.isAdmin===true){
                            var listing = thisTable.getUnpaginatedList().data.filter(
                                function (listing) {
                                    return parseInt(listing.id) === parseInt(event.recid);
                                }
                            )[0];
                            ListingActions.setFeatured(target.checked, listing);
                        }
                    }
                }
            }
        });
        this.fetchAllListingsIfEmpty();
    },

    getColumns: function () {
        var thisTable = this;

        var columns = [];

        columns.push(
            { field: 'securityMarking', caption: 'Security Marking', size: '15%',
              render: function (record) {
                  return record.securityMarking;
              }
            },
            { field: 'title', caption: 'Title', sortable: true, size: '10%',
                render: function (record) {
                    var overview = thisTable.makeHref(thisTable.getActiveRoutePath(), thisTable.getParams(), {
                        listing: record.recid,
                        action: 'view',
                        tab: 'overview'
                    });
                    var title = record.title;
                    return '<a href='+encodeURI(overview)+'>'+title+'</a>';
                }
            },
            { field: 'owners', caption: 'Owners', sortable: true, size: '10%',
                render: function (record) {
                    var owners = '';
                    record.owners.forEach ( function (owner, index) {
                        if (index) {
                            owners += '; ';
                        }
                        owners += owner.displayName;
                    });
                    return owners;
                }
            });

        if (this.props.showOrg===true) {
            columns.push({ field: 'organization', caption: 'Organization', sortable: true, size: '10%' });
        }

        columns.push(
            { field: 'private', caption: 'Private', size: '10%',
              render: function (record) {
                  if (record.private) {
                      return '<i class="icon-lock-blue"></i> Private';
                  } else {
                      return 'Public';
                  }
              }
            },
            { field: 'comments', caption: 'Comments', size: '20%' },
            { field: 'status', caption: 'Status', sortable: true, size: '5%',
                render: function (record) {
                    return thisTable.convertStatus(record.status);
                }
            },
            { field: 'updated', caption: 'Updated', sortable: true, size: '5%',
                render: function (record) {
                    return moment(record.updated).format('MM/DD/YY');
                }
            },
            { field: 'enabled', caption: 'Enabled', sortable: true, size: '5%'},
            { field: 'featured', caption: 'Featured', sortable: true, size: '5%',
                render: function (record) {
                    if (thisTable.props.isAdmin===true) {
                        if (record.featured) {
                            return '<input type="checkbox" checked/>';
                        } else {
                            return '<input type="checkbox" />';
                        }
                    } else {
                        if (record.featured) {
                            return '<input type="checkbox" disabled="true" checked/>';
                        } else {
                            return '<input type="checkbox" disabled="false" />';
                        }
                    }
                }
            },
            { field: 'actions', caption: 'Actions', size: '5%',
                render: function (record) {
                    var activeRoutePath = thisTable.getActiveRoutePath();
                    var editHref = "#/edit/" + record.recid,
                        overviewHref = thisTable.makeHref(activeRoutePath, thisTable.getParams(), {
                            listing: record.recid,
                            action: 'view',
                            tab: 'overview'
                        }),
                        deleteHref = thisTable.makeHref(activeRoutePath, thisTable.getParams(), {
                            listing: record.recid,
                            action: 'delete'
                        }),
                        feedbackHref = thisTable.makeHref(activeRoutePath, thisTable.getParams(), {
                            listing: record.recid,
                            action: 'feedback'
                        });

                    var status = record.status,
                        actions = '<label class="AdminOwnerListingTable__actionMenu">';

                    actions += '<a key="link" href="'+editHref+'" title="Edit"><i class="icon-pencil-12-blueDark"/></a>';

                    if (status === 'APPROVED') {
                        actions += '<a key="view" href="'+overviewHref+'" title="View"><i class="icon-eye-12-blueDark"/></a>';
                    } else {
                        actions += '<a key="prev" href="'+overviewHref+'" title="Preview"><i class="icon-eye-12-blueDark"/></a>';
                    }

                    if (status === 'REJECTED') {
                        actions += '<a key="feedback" href="'+feedbackHref+'" title="Feedback"><i class="icon-feedback-12-blueDark"/></a>';
                    }

                    actions += '<a key="del" href="'+deleteHref+'" title="Delete"><i class="icon-trash-12-blueDark"/></a>';
                    actions += '</label>';
                    return actions;
                }
            }
        );
        return columns;
    },

    convertStatus: function (status) {
        var displayStatus="";
        if (status === "APPROVED") {
            displayStatus = "Published";
        } else if (status === "APPROVED_ORG") {
            displayStatus = "Org Approved";
        } else if (status === "PENDING") {
            displayStatus = "Pending, Org";
        } else if (status === "IN_PROGRESS") {
            displayStatus = "Draft";
        } else if (status === "REJECTED") {
            displayStatus = "Returned";
        }
        return displayStatus;
    },

    getUnpaginatedList: function () {
        return UnpaginatedListingsStore.getListingsByFilter(this.props.filter);
    },

    fetchAllListingsIfEmpty: function () {
        var listings = this.getUnpaginatedList();
        if (!listings || listings==='undefined') {
            ListingActions.fetchAllListingsAtOnce(this.props.filter);
        }
        this.onStoreChanged();
    },

    onStoreChanged: function () {
        var unpaginatedList = this.getUnpaginatedList();

        if (!unpaginatedList) {
            return;
        }

        var {data, counts } = unpaginatedList;

        var records = data.map( function (listing) {
            return {
                recid: listing.id,
                title: listing.title,
                owners: listing.owners,
                organization: listing.agency ? listing.agency : '',
                comments: listing.whatIsNew ? listing.whatIsNew : '',
                status: listing.approvalStatus,
                updated: listing.editedDate,
                enabled: listing.isEnabled ? "Enabled" : "Disabled",
                featured: listing.isFeatured,
                actions: null,
                private: listing.isPrivate,
                securityMarking: listing.securityMarking
            };
        });

        if (this.grid) {
            this.grid.clear();
            this.grid.records = records;
            this.grid.refresh();
        }else{
            "warn";
        }

        this.props.onCountsChanged(counts);
    },

    onListingChangeCompleted: function () {
        ListingActions.fetchAllListingsAtOnce(this.props.filter);
    },

    JSONToCSVConvertor: function (JSONData, ReportTitle, ShowLabel) {

        var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '',
            row = '';
        CSV += ReportTitle + '\r\n\n';

        if (ShowLabel) {
            row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }

        arrData.forEach( function (data, i) {
            row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        });

        if (CSV === '') {
            alert("Invalid data");
            return;
        }

        var fileName = "ListingReport_" + ReportTitle.replace(/ /g,"_");

        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        var link = document.createElement("a");
        link.href = uri;
        link.style.visibility = "hidden";
        link.download = fileName + ".csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

module.exports = TableView;
