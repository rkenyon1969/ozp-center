'use strict';

var React = require('react');
var { /*HELP_URL,*/ HELP_DOCS, HELP_VIDEOS } = require('ozp-react-commons/OzoneConfig');

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

    fetchDocs: (()=>{
      var docArr = [];
      for(var doc in HELP_DOCS){
        docArr.push(HELP_DOCS[doc]);
      }
      return docArr;
    })(),

    fetchVids: (()=>{
      var vidArr = [];
      for(var vid in HELP_VIDEOS){
        vidArr.push(HELP_VIDEOS[vid]);
      }
      return vidArr;
    })(),

    render: function () {
        var docLinks = this.fetchDocs.map(function(link){
          return(
            <li>
              <a target="_blank" href={ link }>{ link }</a>
            </li>
          );
        });
        var vidLinks = this.fetchVids.map(function(link){
          return(
            <li>
              <a target="_blank" href={ link }>{ link }</a>
            </li>
          );
        });
        return (
            <div id="help-modal" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true"><i className="icon-cross-18"></i></span><span className="sr-only">Close</span></button>
                        <h4 className="modal-title">OZONE Help Zone</h4>
                        </div>
                        <div className="modal-body">
                          <div className="container">
                            <div className="col-md-6">
                              <h4>Documents</h4>
                              <ul>
                                {docLinks}
                              </ul>
                            </div>

                            <div className="col-md-6">
                              <h4>Videos</h4>
                              <ul>
                                {vidLinks}
                              </ul>
                            </div>
                          </div>
                            {/*<iframe style={{width:"100%", height:"500px", border: 'none'}} src={HELP_URL} />*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = HelpModal;
