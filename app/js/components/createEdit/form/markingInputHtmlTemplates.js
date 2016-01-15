'use strict';

// Originally from bootstrap-classify/js/bootstrap-classify.js, tailored for OZP

var modalTemplate = `
<div class="modal" tabindex="-1" role="dialog" id="<%= id %>">
  <div class="modal-dialog"><div class="modal-content">
      <% if (title) { %>
      <div class="modal-header">
        <button type="button" class="close"  data-dismiss="modal">
          <span aria-hidden="true">
            <i class="icon-cross-16"></i></span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title"><%= title %></h4></div><% } %>
      <div class="modal-body">
        <div class="bs-classify">
        </div>
      </div>
    </div>
  </div>
</div>
`;

var mainTemplate = `
<div class="label"></div>
<ul class="alert alert-danger" style="display:none;"></ul>
<table class="table table-condensed table-bordered">
  <thead style="display:none;">
    <tr>
      <th class="bsc-colclassif">
        <abbr title="Classification">Clsf</abbr>
      </th>
      <th class="bsc-colfgi" style="display:none;">
        <abbr title="Foreign Government Information
                     Controls">FGI</abbr>
      </th>
      <th class="bsc-colsci">
        <abbr title="Sensitive Compartmented Information
                     Controls">SCI</abbr>
      </th>
      <th class="bsc-coldissem">
        <abbr title="Dissemination Controls">Dissem</abbr>
      </th>
      <th class="bsc-colnonic" style="display:none;">
        <abbr title="Non-IC Markings">Non-IC</abbr>
      </th>
      <th class="bsc-colrelto" style="display:none;">
        <abbr title="Releasable To">Rel To</abbr>
      </th>
    </tr>
  </thead>
  <tr>
    <td class="bsc-colclassif">
      <div class="btn-group-vertical bsc-classification"
           data-control="classification" data-toggle="buttons">
      </div>
    </td>
    <td class="bsc-colfgi" style="display:none;">
      <div class="btn-group-vertical bsc-fgi" data-control="fgi"
           data-toggle="buttons">
      </div>
    </td>
    <td class="bsc-colsci">
      <div class="btn-group-vertical bsc-scicontrols"
           data-control="scicontrols" data-toggle="buttons">
      </div>
    </td>
    <td class="bsc-coldissem">
      <div class="btn-group-vertical bsc-disseminationcontrols"
           data-control="disseminationcontrols" data-toggle="buttons">
      </div>
    </td>
    <td class="bsc-colnonic" style="display:none;">
      <div class="btn-group-vertical bsc-nonicmarkings"
           data-control="nonicmarkings" data-toggle="buttons">
      </div>
    </td>
    <td class="bsc-colrelto" style="display:none;">
      <div class="bsc-relto">
        <div class="btn-group-vertical bsc-trigraphs"
             data-control="trigraphs" data-toggle="buttons">
        </div>
        <div class="btn-group-vertical bsc-tetragraphs"
             data-control="tetragraphs" data-toggle="buttons">
        </div>
      </div>
    </td>
  </tr>
</table>
<div class="form-inline clearfix">
  <button type="button" class="btn btn-primary bsc-save pull-right">Save</button>
  <a role="button" class="btn btn-link pull-right" data-dismiss="modal">Cancel</a>
  <div class="btn-group dropup bsc-typemenu" style="display:none;">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">FGI
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
    </ul>
  </div>
  <div class="input-group bsc-typeahead"></div>
</div>
`;

module.exports = {
    bscModalTemplate: modalTemplate,
    bscMainTemplate: mainTemplate
};
