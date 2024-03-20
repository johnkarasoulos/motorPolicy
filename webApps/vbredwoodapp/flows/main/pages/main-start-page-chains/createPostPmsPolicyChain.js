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

  class createPostPmsPolicyChain extends ActionChain {

    /**
     * Saves changes and creates new postPms_policy record.
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      // Sets the progress variable to true
      $page.variables.createPostPmsPolicyChainInProgress = true;

      // Validates postPms_policy form
      const validateFormResult = await Actions.callChain(context, {
        chain: 'flow:validateFormChain',
        params: {
          validationGroupId: 'postPmsPolicy-validation-group--1896815765-1',
        },
      }, { id: 'validatePostPmsPolicy' });

      if (validateFormResult) {
        // Call REST creating new postPms_policy record
        const callRestCreatePostPmsPolicyResult = await Actions.callRest(context, {
          endpoint: 'createpms/postPms_policy',
          body: $page.variables.postPmsPolicy,
        }, { id: 'savePostPmsPolicy' });

        if (callRestCreatePostPmsPolicyResult.ok) {
          // Fires a notification event about successful save
          await Actions.fireNotificationEvent(context, {
            summary: 'postPms_policy saved',
            message: 'postPms_policy record successfully created',
            displayMode: 'transient',
            type: 'confirmation',
          }, { id: 'fireSuccessNotification' });

          // Resets postPmsPolicy variable to the default state
          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.postPmsPolicy',
            ],
          }, { id: 'resetPostPmsPolicy' });

          $page.variables.policyNbr = "NGI/"+callRestCreatePostPmsPolicyResult.body.policyno;
        } else {
          // Create error message
          const errorMessage = callRestCreatePostPmsPolicyResult.body?.['o:errorDetails']?.[0]?.detail ||
                               `Could not create new postPms_policy: status ${callRestCreatePostPmsPolicyResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });
        }
      }

      // Sets the progress variable to false
      $page.variables.createPostPmsPolicyChainInProgress = false;
    }
  }

  return createPostPmsPolicyChain;
});
