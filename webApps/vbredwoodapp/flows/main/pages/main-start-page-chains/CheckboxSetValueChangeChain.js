define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class CheckboxSetValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (value[0]) {
        $page.variables.postPmsPolicy.highrisk = 'Y';

        $page.variables.hasHighRisk = 1;
      } else {
        $page.variables.postPmsPolicy.highrisk = 'N';

        $page.variables.hasHighRisk = 0;
      }
    }
  }

  return CheckboxSetValueChangeChain;
});
