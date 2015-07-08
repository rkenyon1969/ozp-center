'use strict';

var React = require('react');

var DetailedQuery = React.createClass({

    getInitialState: function(){
      return {
        categories: []
      };
    },

    removeQueryString: function(){
        this.props.reset();
    },

    getQueryString: function(){
      if(this.props.data.queryString){
        var prettyQuery = this.props.data.queryString.split(' ').map((string)=>{
          return (
            <span className="label label-default">
              {string}
            </span>
          );
        });
        return (
          <span>
            for listings matching &nbsp;
            { this.props.data.queryString &&
               <span>
                 {prettyQuery}
               </span>
            }
          </span>
        );
      }
    },

    getTypes: function(){
      if(this.props.data.type.length){
        var prettyTypes = this.props.data.type.map((type)=>{
          /*
          <i className="icon-cross-14-white" onClick={()=>{
            var types = this.props.data.type;
            types.splice(types.indexOf(type), 1);
            this.props.onTypeChange(types);
          }}></i>*/
          return (
            <span className="label label-default">
              {type}
            </span>
          );
        });
        return (
          <span>
            &nbsp;with the {(this.props.data.type.length > 1) ? 'types' : 'type'} {prettyTypes}
          </span>
        );
      }else{
        return false;
      }
    },
    getOrgs: function(){
      if(this.props.data.agency.length){
        var prettyOrgs = this.props.data.agency.map((agent)=>{
          /*
          <i className="icon-cross-14-white" onClick={()=>{
            var orgs = this.props.data.agency;
            orgs.splice(orgs.indexOf(agent), 1);
            this.props.onOrganizationChange(orgs);
          }}></i>*/
          return (
            <span className="label label-default">
              {agent}
            </span>
          );
        });
        return (
          <span>
            &nbsp;in the {(this.props.data.agency.length > 1) ? 'orginizations' : 'orginization'} {prettyOrgs}
          </span>
        );
      }else{
        return false;
      }
    },

    getCategories: function(){
      if(this.props.data.categories.length){
        var prettyCats;
        if(this.props.data.categories.length > 1){
          prettyCats = this.props.data.categories.map((cat, i)=>{
            /*
            <i className="icon-cross-14-white" onClick={()=>{
              var cats = this.props.data.categories;
              cats.splice(cats.indexOf(cat), 1);

              this.props.onCategoryChange(cats);
            }}></i>*/
            return (
              <span>
                <span  className="label label-default">
                  {cat}
                </span>
                {(i !== this.props.data.categories.length -1) &&
                  <span>&nbsp;and&nbsp;</span>
                }
              </span>
            );
          });
        }else{
          prettyCats = this.props.data.categories.map((cat)=>{
            /*
            <i className="icon-cross-14-white" onClick={()=>{
              var cats = this.props.data.categories;
              cats.splice(cats.indexOf(cat), 1);
              this.props.onCategoryChange(cats);
            }}></i>*/
            return (
              <span  className="label label-default">
                {cat}
              </span>
            );
          });
        }
        return (
          <span>
            &nbsp;with the {(this.props.data.categories.length > 1) ? 'categories' : 'category'} {prettyCats}
          </span>
        );
      }else{
        return false;
      }
    },

    render() {

        return (
          <div>
            {this.getQueryString()}
            {this.getTypes()}
            {this.getOrgs()}
            {this.getCategories()}
          </div>
        );
    }

});

module.exports = DetailedQuery;
