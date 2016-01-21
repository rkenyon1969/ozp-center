/*!
 * ISM.js NIPRNet Configuration
 *
 * This is used to configure bootstrap-classify, a classification
 * marking jQuery plugin that steps the user through the process of
 * building valid markings. All references to marking components are
 * notional and appear here for demonstration and test purposes only.
 *
 * Useful references:
 * http://www.ncsc.gov/training/WBT/docs/CM_AltText_021312.pdf
 * http://www.ncsc.gov/training/resources/Public_CAPCO%20Manual_v2.1.pdf
 * http://www.ncsc.gov/training/resources/Publically%20Releasable%20Register.pdf
 * https://www.nsa.gov/public_info/_files/nsacss_policies/Policy_Manual_1-52.pdf
 * http://www.dtic.mil/whs/directives/corres/pdf/520001_vol2.pdf
 * https://www.cia.gov/library/publications/the-world-factbook/print/print_AppendixD.pdf
 */

'use strict';

window.ISMConfig = window.ISMConfig || {};

(function ($) {

    window.ISMConfig = Object.assign(true, {}, window.ISMConfig, {

    defaults: {
      classification: ['U'],
      ownerproducer: ['USA']
    },

    lookup: {
        FDR: ['NF', 'REL', 'RELIDO', 'NV'],
        expandable: ['ACGU', 'FVEY']
    },

    classification: {
      U: {
        bl: 'UNCLASSIFIED',
        pm: 'U'
      },
      S: {
        bl: 'SECRET',
        pm: 'S'
      },
      TS: {
        bl: 'TOP SECRET',
        pm: 'TS'
      },
      C: {
        bl: 'CONFIDENTIAL',
        pm: 'C'
      }
    },

    scicontrols: {
        SI: {
            bl: 'SI',
            pm: 'SI',
            clsf: ['C', 'S', 'TS'],
            yes: [],
            no: []
        },
        TK: {
            bl: 'TALENT KEYHOLE',
            pm: 'TK',
            clsf: ['S', 'TS'],
            yes: [],
            no: []
        },
        SR: {
            bl: 'SIERRA',
            pm: 'SR',
            clsf: ['C', 'S', 'TS'],
            yes: [],
            no: []
        },
        TN: {
            bl: 'TANGO',
            pm: 'TN',
            clsf: ['S', 'TS'],
            yes: [],
            no: []
        },
        GF: {
            bl: 'GOLF',
            pm: 'TN',
            clsf: ['S', 'TS'],
            yes: [],
            no: []
        },
        HT: {
            bl: 'HOTEL',
            pm: 'HT',
            clsf: ['S', 'TS'],
            yes: [],
            no: []
        }
    },

    disseminationcontrols: {
      FOUO: {
        bl: 'FOR OFFICIAL USE ONLY',
        pm: 'FOUO',
        clsf: ['U'],
        yes: [],
        no: []
      },
      NF: {
        bl: 'NOFORN',
        pm: 'NF',
        clsf: ['U', 'C', 'S', 'TS'],
        yes: [],
        no: ['REL', 'RELIDO', 'EYES']
      },
      REL: {
        bl: 'RELTO',
        pm: 'REL',
        clsf: ['U', 'C', 'S', 'TS'],
        yes: [],
        no: ['NF']
      },
      RELIDO: {
        bl: 'RELIDO',
        pm: 'RELIDO',
        clsf: ['U', 'C', 'S', 'TS'],
        yes: [],
        no: ['NF']
      },
      NV: {
        bl: 'NOVEMBER',
        pm: 'NV',
        clsf: ['U', 'C', 'S', 'TS'],
        yes: [],
        no: ['REL', 'RELIDO', 'EYES']
      }
    },

    dissemPriority: ['NF', 'RELIDO', 'REL', 'FOUO'],

    nonicmarkings: {
      ABCDE: {
        bl: 'ABCDE',
        pm: 'ABCDE',
        clsf: ['U', 'C', 'S', 'TS'],
        yes: [],
        no: ['NF']
      }
    },

    types: {
      USONLY: {
        label: 'US ONLY',
        clsf: ['U'],
        ownerproducer: ['USA'],
        fgisourceopen: [],
        fgisourceprotected: [],
        yes: [],
        no: []
      }
    },

    trigraphs: {
        USA: {
            name: 'United States of America',
            id: 'USA'
        },
        AUS: {
            name: 'Australia',
            id: 'AUS'
        }
    },

    tetragraphs: {
        FEYE: {
            name: 'FOR EYES',
            id: 'FEYE',
            trigraphs: ['AUS']
        },
        NATO: {
            name: 'North Atlantic Treaty Organiztion',
            id: 'NATO'
        }
    }

  });

  /*!
   * Module export
   */
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = window.ISMConfig;
    }
  }

}(window.jQuery));
