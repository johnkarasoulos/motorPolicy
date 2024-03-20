define([], () => {
  'use strict';

  class PageModule {

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    calculateAge(arg1) {
      var formattedDate = arg1.split("-");
      var birthdateTimeStamp = new Date(formattedDate[0], formattedDate[1], formattedDate[2]);
      var currentDate = new Date().getTime();
      var difference = currentDate - birthdateTimeStamp;
      var currentAge = Math.floor(difference / 31557600000);
      // dividing by 1000*60*60*24*365.25
      return currentAge;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    estimatePremium(passengeres, risk, basepremium) {
      console.log("basepremium: "+basepremium);
      console.log("passengeres: "+passengeres);
      console.log("risk: "+risk);
      var finalpremium = basepremium + (passengeres * 10) + (risk * 500);
      console.log("finalpremium: "+finalpremium);
      return finalpremium;
    }
  }

  return PageModule;
});
