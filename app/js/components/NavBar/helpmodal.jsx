'use strict';

var React = require('react');
var { HELP_URL, HELPDESK_ADDRESS, APP_TITLE } = require('ozp-react-commons/OzoneConfig');

var HelpModal = React.createClass({

    propTypes: {
        onShown: React.PropTypes.func,
        onHidden: React.PropTypes.func
    },

    componentDidMount: function() {
        $(this.getDOMNode())
            .one('shown.bs.modal', () => {
                if (this.props.onShown) {
                    this.props.onShown();
                }
            })
            .one('hidden.bs.modal', () => {
                if (this.props.onHidden) {
                    this.props.onHidden();
                }
            })
            .modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
    },

    render: function () {
        var docLinks = this.fetchDocs.map(function(doc, i){
          return(
            <li key={`docLinks.${i}`}>
              <a target="_blank" href={ doc.link }>{ doc.name }</a>
            </li>
          );
        });
        var vidLinks = this.fetchVids.map(function(vid, i){
          return(
            <li key={`vidLinks.${i}`}>
              <a target="_blank" href={ vid.link }>{ vid.name }</a>
            </li>
          );
        });
        return (
            <div id="help-modal" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                          <span aria-hidden="true"><i className="icon-cross-18"></i></span><span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{`${APP_TITLE} Help Zone`}</h4>
                        </div>
                        <div className="modal-body" style={{padding: '0px'}}>
                            <iframe style={{width:"100%", height:"400px", border: 'none'}} src={HELP_URL} />
                        </div>
                        <div className="modal-footer">
                            <h4>Have a question not answered here?&nbsp;&nbsp;</h4>
                            <a href={HELPDESK_ADDRESS} type="button" className="btn btn-primary">Contact the Help Desk</a>
                            <button type="button" className="btn btn-primary" title="Coming Soon" disabled="disabled">Take the Center tour</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = HelpModal;
