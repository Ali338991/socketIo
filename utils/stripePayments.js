const { config } = require("firebase-functions");

// live credentials
const stripeLiveSecret = "sk_test_FEdR2oik9fftRtWUocumENqq";

const stripe = require("stripe");

//Subscription Create for player
exports.stripSubscriptionCreate = async (customerId, planId) => {
  return stripe(stripeLiveSecret).subscriptions.create({
    customer: customerId,
    items: [{ plan: planId }],
    //   default_source: cardId,
  });
};

exports.stripeCustomerCreate = async (email, token) => {
  return stripe(stripeLiveSecret).customers.create({
    email,
    source: token,
  });
};

exports.gyftPaymentChargeCustomer = async (
  stripe_customer_id,
  amount,
  description
) => {
  return stripe(stripeApiKey).charges.create({
    amount: amount,
    currency: "usd",
    customer: stripe_customer_id,
    description: description,
  });
};


exports.setNewSubscriptions = (customerId, typeOfSubscription)=> {
  if (typeOfSubscription === "Basic") {
    return stripe(stripeLiveSecret).subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_EVHekt2yBesjPU",
        },
      ],
    });
  } else {
    return stripe(stripeApiKey).subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_EVHekt2yBesjPU",
        },
      ],
    });
  }
}

exports.subscriptionDelete=(subscriptionData)=>
{
return stripe(stripeLiveSecret)
.subscriptions.del(subscriptionData);
}

// let testProduct = "prod_H8BpcxlWyh2vU1";
// let productionProduct = "prod_H8BsQU54g7we3F";

//customer plan create
// exports.stripePlanCreate = async (
//   amount,
//   packageName,
//   editionID,
//   playerName
// ) => {
//     return stripe(stripeLiveSecret).plans.create({
//       amount,
//       metadata: {
//         PackageName: packageName,
//         editionName: editionID,
//         playerName: playerName,
//       },
//       currency: "eur",
//       interval: "month",
//       product: stripeLiveProduct,
//     });

// };

//Subscription delete for player
// exports.stripSubscriptionCancel = async (subscriptionId) => {

//     stripe(stripeTestSecret)
//       .subscriptions.del(subscriptionId)
//       .then((subscriptionDeleted) => {
//         console.log("Stripe subscriptionDeleted: ", subscriptionDeleted);
//         return subscriptionDeleted;
//       })
//       .catch((err) => {
//         console.log("Stripe Error: ", err);
//         return err;
//       });
// };

//Subscription update for player
// exports.stripSubscriptionUpdate = async (subscriptionId, planId) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     stripe(stripeTestSecret)
//       .subscriptions.update(subscriptionId, {
//         items: [{ plan: planId }],
//       })
//       .then((subscriptionUpdated) => {
//         console.log("Stripe subscriptionUpdated: ", subscriptionUpdated);
//         return subscriptionUpdated;
//       })
//       .catch((err) => {
//         console.log("Stripe Error: ", err);
//         return err;
//       });
//   } else {
//     stripe(stripeLiveSecret)
//       .subscriptions.update(subscriptionId, {
//         items: [{ plan: planId }],
//       })
//       .then((subscriptionUpdated) => {
//         console.log("Stripe subscriptionUpdated: ", subscriptionUpdated);
//         return subscriptionUpdated;
//       })
//       .catch((err) => {
//         console.log("Stripe Error: ", err);
//         return err;
//       });
//   }
// };

//stripe customer create

//stripe customer update
// exports.stripeCustomerUpdate = async (customerId, token) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     stripe(stripeTestSecret)
//       .customers.update(customerId, {
//         source: token,
//       })
//       .then((customerUpdated) => {
//         console.log("Stripe customerUpdated: ", customerUpdated);
//         return customerUpdated;
//       })
//       .catch((err) => {
//         console.log("Stripe Error: ", err);
//         return err;
//       });
//   } else {
//     stripe(stripeLiveSecret)
//       .customers.update(customerId, {
//         source: token,
//       })
//       .then((customerUpdated) => {
//         console.log("Stripe customerUpdated: ", customerUpdated);
//         return customerUpdated;
//       })
//       .catch((err) => {
//         console.log("Stripe Error: ", err);
//         return err;
//       });
//   }
// };

// // stripe charge payment

// exports.stripChargePayment = async (amount, stripeId, description, cardId) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     return stripe(stripeTestSecret).charges.create({
//       amount: Number(amount) * 100,
//       currency: "eur",
//       customer: stripeId,
//       description: description,
//       source: cardId,
//     });
//   } else {
//     return stripe(stripeLiveSecret).charges.create({
//       amount: Number(amount) * 100,
//       currency: "eur",
//       customer: stripeId,
//       description: description,
//       source: cardId,
//     });
//   }
// };

// // list all resources
// exports.stripResourceList = async (customerId) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     return stripe(stripeTestSecret).customers.listSources(customerId, {
//       object: "card",
//     });
//   } else {
//     return stripe(stripeLiveSecret).customers.listSources(customerId, {
//       object: "card",
//     });
//   }
// };

// // create addition payment method
// exports.stripeCreateResource = async (customerId, token) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     return stripe(stripeTestSecret).customers.createSource(customerId, {
//       source: token,
//     });
//   } else {
//     return stripe(stripeLiveSecret).customers.createSource(customerId, {
//       source: token,
//     });
//   }
// };

// // pause subscription

// exports.pauseSubscription = async (subscriptionID) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     return stripe(stripeTestSecret).subscriptions.update(subscriptionID, {
//       pause_collection: {
//         behavior: "mark_uncollectible",
//       },
//     });
//   } else {
//     return stripe(stripeLiveSecret).subscriptions.update(subscriptionID, {
//       pause_collection: {
//         behavior: "mark_uncollectible",
//       },
//     });
//   }
// };
// // reactivate subscription

// exports.reactivateSubscriptionStripe = async (subscriptionID) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     return stripe(stripeTestSecret).subscriptions.update(subscriptionID, {
//       pause_collection: "",
//     });
//   } else {
//     return stripe(stripeLiveSecret).subscriptions.update(subscriptionID, {
//       pause_collection: "",
//     });
//   }
// };

// // cancel subscription
// exports.cancelStipeSubscription = async (subscriptionID) => {
//   const appModeSnapShot = await getAppMode();
//   const testMode = appModeSnapShot.data().testMode;
//   if (testMode) {
//     return stripe(stripeTestSecret).subscriptions.del(subscriptionID);
//   } else {
//     return stripe(stripeLiveSecret).subscriptions.del(subscriptionID);
//   }
// };
