import { CustomerRecord, MeterReadingRecord, PaymentRecord, SiteRecord } from '../airtable/interface';
import {
    addCustomer,
    setCurrentCustomerId,
    updateCustomer,
    selectCustomerById,
    saveCustomerData,
    selectAllMeterReadingsArray,
    selectAllCustomersArray,
    selectAllPaymentsArray,
    addPayment,
    addMeterReading,
    removeMeterReading,
} from './customerDataSlice';
import { isBeforeCurrentPeriod } from '../moment/momentUtils';
import { selectCurrentSiteId } from './siteData';
import { RootState, store } from './store';
import { createSelector } from '@reduxjs/toolkit';

export enum CustomerStatus {
  ALL = 'All',
  METER = 'Meter',
  PAYMENT = 'Payment',
  DONE = 'Done',
}

export const refreshCustomerData = (site: SiteRecord): void => {
    if (site) {
        const { customers, payments, meterReadings } = site;
        const siteId = site.id;
        const customerData = {
            siteId,
            customers,
            payments,
            meterReadings
        };
        store.dispatch(saveCustomerData(customerData));
    }
};

export const addCustomerToRedux = (customer: CustomerRecord): void => {
    const siteId = selectCurrentSiteId(store.getState());
    store.dispatch(addCustomer({ siteId, customer }));
};

export const addMeterReadingToRedux = (meterReading: MeterReadingRecord): void => {

    const meterReadingPayload = {
        ...meterReading,
        siteId: selectCurrentSiteId(store.getState())
    };

    store.dispatch(addMeterReading(meterReadingPayload));
}

export const removeMeterReadingFromRedux = (meterReadingId : string) => {
    const meterReadingPayload = {
        id: meterReadingId,
        siteId: selectCurrentSiteId(store.getState())
    }
    store.dispatch(removeMeterReading(meterReadingPayload))
}

export const updateCustomerInRedux = (customer: Partial<CustomerRecord>): void => {
    const customerUpdates = {
        ...customer,
        siteId: selectCurrentSiteId(store.getState())
    }
    store.dispatch(updateCustomer(customerUpdates));
};

export const addPaymentToRedux = (payment: PaymentRecord) => {
    const paymentPayload = {
        ...payment,
        siteId: selectCurrentSiteId(store.getState())
    }
    store.dispatch(addPayment(paymentPayload));
}

export const setCurrentCustomerIdInRedux = (customerId: string): void => {
    store.dispatch(setCurrentCustomerId(customerId))
}

const getCustomerId = (_: RootState, customerId: string) => customerId;

export const selectCurrentCustomerId = (state: RootState) => state.customerData.currentCustomerId;

export const selectCurrentCustomer = createSelector(
    selectCurrentCustomerId,
    store.getState,
    (currentCustomerId, state) => selectCustomerById(state, currentCustomerId));

export const selectMeterReadingsByCustomerId = createSelector(
    selectAllMeterReadingsArray,
    getCustomerId,
    (allMeterReadings, customerId) => allMeterReadings?.filter(meterReading => meterReading.customerId === customerId)
)

export const selectPaymentsByCustomerId = createSelector(
    selectAllPaymentsArray,
    getCustomerId,
    (allPayments, customerId) => allPayments?.filter(payment => payment.billedToId === customerId)
)

// TODO: we might have to change this once we factor in grace periods
export const selectMeterReadingsInCurrentPeriod = createSelector(
    selectAllMeterReadingsArray,
    (allMeterReadings) => allMeterReadings.filter(meterReading => !isBeforeCurrentPeriod(meterReading.date))
)

// TODO: we might have to change this once we factor in grace periods
export const selectPaymentsInCurrentPeriod = createSelector(
    selectAllPaymentsArray,
    (payments) => payments.filter(payment => !isBeforeCurrentPeriod(payment.date))
)

export const selectCustomersActive = createSelector(
    selectAllCustomersArray,
    (allCustomers) => {return allCustomers.filter(customer => customer.isactive === true)}
)

export const selectCustomersToMeter = createSelector(
    selectMeterReadingsInCurrentPeriod,
    selectCustomersActive,
    (allMeterReadingsInCurrentPeriod, allCustomers) => {
        const meteredCustomerIds = new Set(allMeterReadingsInCurrentPeriod.map(meterReading => meterReading.customerId));
        return allCustomers.filter(customer => !meteredCustomerIds.has(customer.id))
    }
)

export const selectAmountOwedInCurrentPeriodByCustomerId = createSelector(
    store.getState,
    getCustomerId,
    (state, customerId) => {
        const currentPeriodMeterReadings =
        selectMeterReadingsByCustomerId(state, customerId)?.filter(meterReading => !isBeforeCurrentPeriod(meterReading.date));
        if (currentPeriodMeterReadings) {
            return currentPeriodMeterReadings.reduce((totalAmountOwed, meterReading: MeterReadingRecord) => totalAmountOwed + meterReading.amountBilled, 0);
        }
    }
)

export const selectAmountPaidInCurrentPeriodByCustomerId = createSelector(
    store.getState,
    getCustomerId,
    (state, customerId) => {
        const currentPeriodPayments = selectPaymentsByCustomerId(state, customerId)?.filter(payment => !isBeforeCurrentPeriod(payment.date));
        if (currentPeriodPayments) {
            return currentPeriodPayments.reduce((totalAmountPaid, payment: PaymentRecord) => totalAmountPaid + payment.amount, 0);
        }
    }
)

// For each customer who has been metered this period,
// we calculate the amount they need to pay
export const selectCustomersToCollect = createSelector(
    selectCustomersToMeter,
    selectAllCustomersArray,
    store.getState,
    (unmeteredCustomers, allCustomers, state) => {
        const unmeteredCustomerIds = new Set(unmeteredCustomers.map((customer: CustomerRecord) => customer.id));
        const customersToCollect: CustomerRecord[] = []

        allCustomers
            .filter((customer: CustomerRecord) => !unmeteredCustomerIds.has(customer.id))
            .forEach((customer: CustomerRecord) => {
                const amountOwedThisPeriod = selectAmountOwedInCurrentPeriodByCustomerId(state, customer.id) || 0;
                const amountPaidThisPeriod = selectAmountPaidInCurrentPeriodByCustomerId(state, customer.id) || 0;

                if (amountOwedThisPeriod > amountPaidThisPeriod) {
                    customersToCollect.push(customer)
                }
            });

        return customersToCollect;
    }
)

export const selectCurrentPeriodTotalAmountBilled = createSelector(
    selectAllCustomersArray,
    store.getState,
    (customers, state) => {
        let totalAmountBilled: number = 0;
        customers.forEach((customer: CustomerRecord) => {
          totalAmountBilled += selectAmountOwedInCurrentPeriodByCustomerId(state, customer.id) || 0;
        });
        return totalAmountBilled;
    }
)

export const selectCurrentPeriodTotalAmountCollected = createSelector(
    selectAllCustomersArray,
    store.getState,
    (customers, state) => {
        let totalAmountCollected: number = 0;
        customers.forEach((customer: CustomerRecord) => {
          totalAmountCollected += selectAmountPaidInCurrentPeriodByCustomerId(state, customer.id) || 0;
        });
        return totalAmountCollected;
    }
)

// TODO: Could break this into smaller pieces
export const selectCustomersDone = createSelector(
    selectCustomersToMeter,
    selectCustomersToCollect,
    selectAllCustomersArray,
    store.getState,
    (unmeteredCustomers, unpaidCustomers, allCustomers, state) => {
        const unmeteredCustomerIds = new Set(unmeteredCustomers.map((customer: CustomerRecord) => customer.id));
        const unpaidCustomerIds = new Set(unpaidCustomers.map((customer: CustomerRecord) => customer.id));
        return allCustomers.filter(customer => !unmeteredCustomerIds.has(customer.id) && !unpaidCustomerIds.has(customer.id));
    }
)
