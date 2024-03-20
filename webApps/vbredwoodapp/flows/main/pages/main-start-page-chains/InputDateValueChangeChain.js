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

  class InputDateValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.calculateAge(value);

      if (callFunctionResult > 18) {
        if (callFunctionResult < 75) {
          $page.variables.postPmsPolicy.age = callFunctionResult;
        } else {
          await Actions.fireNotificationEvent(context, {
            displayMode: 'persist',
            type: 'error',
            message: 'Over 75 years old',
            summary: callFunctionResult,
          }, { id: 'over75' });
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: callFunctionResult,
          message: 'under 18',
          displayMode: 'persist',
          type: 'error',
        }, { id: 'under18' });
      }
    }
  }

  return InputDateValueChangeChain;
});
