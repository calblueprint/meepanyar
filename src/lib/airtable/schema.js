/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
	Users: 'Users',
	Sites: 'Sites',
	TariffPlans: 'Tariff Plans',
	Customers: 'Customers',
	CustomerUpdates: 'Customer Updates',
	MeterReadingsandInvoices: 'Meter Readings and Invoices',
	Payments: 'Payments',
	FinancialSummaries: 'Financial Summaries',
};

export const Columns = {
	"Users": {
		username: {name:`Username`, type:`text`},
		email: {name:`Email`, type:`text`},
		photo: {name:`Photo`, type:`multipleAttachment`},
		siteIds: {name:`Sites`, type:`foreignKey-many`},
		password: {name:`Password`, type:`text`},
		name: {name:`Name`, type:`text`},
		paymentIds: {name:`Payments`, type:`foreignKey-many`},
		meterReadingsAndInvoiceIds: {name:`Meter Readings and Invoices`, type:`foreignKey-many`},
		customerUpdateIds: {name:`Customer Updates`, type:`foreignKey-many`},
	},
	"Sites": {
		name: {name:`Name`, type:`text`},
		userIds: {name:`Users`, type:`foreignKey-many`},
		customerIds: {name:`Customers`, type:`foreignKey-many`},
		financialSummarieIds: {name:`Financial Summaries`, type:`foreignKey-many`},
		tariffPlanIds: {name:`Tariff Plans`, type:`foreignKey-many`},
	},
	"Tariff Plans": {
		name: {name:`Name`, type:`text`},
		fixedTariff: {name:`Fixed Tariff`, type:`number`},
		tariffByUnit: {name:`Tariff By Unit`, type:`number`},
		minUnits: {name:`Min Units`, type:`number`},
		customerIds: {name:`Customer`, type:`foreignKey-many`},
		siteIds: {name:`Sites`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
	},
	"Customers": {
		name: {name:`Name`, type:`text`},
		meterNumber: {name:`Meter Number`, type:`number`},
		tariffPlansId: {name:`Tariff Plans`, type:`foreignKey-one`},
		sitesId: {name:`Sites`, type:`foreignKey-one`},
		isactive: {name:`IsActive`, type:`checkbox`},
		hasmeter: {name:`HasMeter`, type:`checkbox`},
		outstandingBalance: {name:`Outstanding Balance`, type:`formula`},
		meterReadingIds: {name:`Meter Readings`, type:`foreignKey-many`},
		totalAmountBilledfromInvoices: {name:`Total Amount Billed (from Invoices)`, type:`rollup`},
		totalAmountPaidfromPayments: {name:`Total Amount Paid (from Payments)`, type:`rollup`},
		paymentIds: {name:`Payments`, type:`foreignKey-many`},
		customerUpdateIds: {name:`Customer Updates`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
	},
	"Customer Updates": {
		dateUpdated: {name:`Date Updated`, type:`date`},
		customerIds: {name:`Customer`, type:`foreignKey-many`},
		explanation: {name:`Explanation`, type:`multilineText`},
		userId: {name:`User`, type:`foreignKey-one`},
	},
	"Meter Readings and Invoices": {
		meterReadingName: {name:`Meter Reading Name`, type:`formula`},
		reading: {name:`Reading`, type:`number`},
		customerId: {name:`Customer`, type:`foreignKey-one`},
		amountBilled: {name:`Amount Billed`, type:`number`},
		date: {name:`Date`, type:`date`},
		billedById: {name:`Billed By`, type:`foreignKey-one`},
		meterNumber: {name:`Meter Number`, type:`number`},
		id: {name:`ID`, type:`formula`},
	},
	"Payments": {
		paymentName: {name:`Payment Name`, type:`formula`},
		amount: {name:`Amount`, type:`number`},
		date: {name:`Date`, type:`date`},
		billedToIds: {name:`Billed To`, type:`foreignKey-many`},
		collectedByIds: {name:`Collected By`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
	},
	"Financial Summaries": {
		name: {name:`Name`, type:`formula`},
		siteId: {name:`Site`, type:`foreignKey-one`},
		totalCustomers: {name:`Total Customers`, type:`number`},
		totalCustomersBilled: {name:`Total Customers Billed`, type:`number`},
		totalCustomersPaid: {name:`Total Customers Paid`, type:`number`},
		totalUsage: {name:`Total Usage`, type:`number`},
		totalAmountBilled: {name:`Total Amount Billed`, type:`number`},
		totalAmountCollected: {name:`Total Amount Collected`, type:`number`},
		totalAmountSpent: {name:`Total Amount Spent`, type:`number`},
		totalProfit: {name:`Total Profit`, type:`formula`},
		period: {name:`Period`, type:`text`},
		bankSlip: {name:`Bank Slip`, type:`multipleAttachment`},
		isapproved: {name:`isApproved`, type:`checkbox`},
		lastUpdated: {name:`Last Updated`, type:`date`},
		issubmitted: {name:`isSubmitted`, type:`checkbox`},
	},
};
