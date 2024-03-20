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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.estimatePremium($page.variables.postPmsPolicy.noofpass, $page.variables.hasHighRisk, $page.variables.basePremium);

      $page.variables.postPmsPolicy.premium = callFunctionResult;
    }
  }

  return ButtonActionChain;
});
