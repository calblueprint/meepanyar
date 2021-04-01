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
	Products: 'Products',
	Inventory: 'Inventory',
	PurchaseRequests: 'Purchase Requests',
	InventoryUpdates: 'Inventory Updates',
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
		meterReadingAndInvoiceIds: {name:`Meter Readings and Invoices`, type:`foreignKey-many`},
		customerUpdateIds: {name:`Customer Updates`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
		purchaseRequestIds: {name:`Purchase Requests`, type:`foreignKey-many`},
		purchaseRequestsReviewedIds: {name:`Purchase Requests Reviewed`, type:`foreignKey-many`},
		inventoryUpdateIds: {name:`Inventory Updates`, type:`foreignKey-many`},
		organization: {name:`Organization`, type:`text`},
		admin: {name:`Admin`, type:`checkbox`},
	},
	"Sites": {
		// Custom objects added to the top of sites object to reduce
		// likelihood of patch conflicts when new columns are added
		products: {name: `Products`, type: `custom-object`},
		inventory: {name: `SiteInventory`, type: `custom-object`},
		purchaseRequests: {name: `PurchaseRequests`, type: `custom-object`},
		inventoryUpdates: {name: `InventoryUpdates`, type: `custom-object`},
		customers: {name:`CustomerData`, type:`custom-object`},
		financialSummaries: {name: `FinancialSummaries`, type:`custom-object`},
		tariffPlans: {name:`TariffPlans`, type:`custom-object`},
		name: {name:`Name`, type:`text`},
		userIds: {name:`Users`, type:`foreignKey-many`},
		customerIds: {name:`Customers`, type:`foreignKey-many`},
		financialSummaryIds: {name:`Financial Summaries`, type:`foreignKey-many`},
		tariffPlanIds: {name:`Tariff Plans`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
		inventoryIds: {name:`Inventory`, type:`foreignKey-many`},
		gracePeriod: {name:`Grace Period`, type:`number`},
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
		tariffPlanId: {name:`Tariff Plan`, type:`foreignKey-one`},
		siteId: {name:`Site`, type:`foreignKey-one`},
		isactive: {name:`IsActive`, type:`checkbox`},
		hasmeter: {name:`HasMeter`, type:`checkbox`},
		outstandingBalance: {name:`Outstanding Balance`, type:`formula`},
		meterReadingIds: {name:`Meter Readings`, type:`foreignKey-many`},
		totalAmountBilledfromInvoices: {name:`Total Amount Billed (from Invoices)`, type:`rollup`},
		totalAmountPaidfromPayments: {name:`Total Amount Paid (from Payments)`, type:`rollup`},
		paymentIds: {name:`Payments`, type:`foreignKey-many`},
		customerUpdateIds: {name:`Customer Updates`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
		meterType: {name:`Meter Type`, type:`select`},
		customerNumber: {name:`Customer Number`, type:`number`},
	},
	"Customer Updates": {
		dateUpdated: {name:`Date Updated`, type:`date`},
		customerId: {name:`Customer`, type:`foreignKey-one`},
		explanation: {name:`Explanation`, type:`multilineText`},
		userId: {name:`User`, type:`foreignKey-one`},
		id: {name:`ID`, type:`formula`},
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
		id: {name:`ID`, type:`formula`},
	},
	"Products": {
		primaryKey: {name:`Primary Key`, type:`formula`},
		unit: {name:`Unit`, type:`text`},
		name: {name:`Name`, type:`text`},
		id: {name:`ID`, type:`formula`},
		inventoryIds: {name:`Inventory`, type:`foreignKey-many`},
	},
	"Inventory": {
		primaryKey: {name:`Primary Key`, type:`formula`},
		siteId: {name:`Site`, type:`foreignKey-one`},
		currentQuantity: {name:`Current Quantity`, type:`number`},
		productId: {name:`Product`, type:`foreignKey-one`},
		productName: {name:`Product Name`, type:`lookup`},
		siteName: {name:`Site Name`, type:`lookup`},
		purchaseRequestIds: {name:`Purchase Requests`, type:`foreignKey-many`},
		inventoryUpdateIds: {name:`Inventory Updates`, type:`foreignKey-many`},
		id: {name:`ID`, type:`formula`},
		periodStartQuantity: {name:`Period Start Quantity`, type:`number`},
	},
	"Purchase Requests": {
		primaryKey: {name:`Primary Key`, type:`formula`},
		notes: {name:`Notes`, type:`multilineText`},
		status: {name:`Status`, type:`select`},
		requesterId: {name:`Requester`, type:`foreignKey-one`},
		reviewerId: {name:`Reviewer`, type:`foreignKey-one`},
		createdAt: {name:`Created At`, type:`date`},
		reviewedAt: {name:`Reviewed At`, type:`date`},
		amountPurchased: {name:`Amount Purchased`, type:`number`},
		receipt: {name:`Receipt`, type:`multipleAttachment`},
		inventoryId: {name:`Inventory`, type:`foreignKey-one`},
		productName: {name:`Product Name`, type:`lookup`},
		siteName: {name:`Site Name`, type:`lookup`},
		amountSpent: {name:`Amount Spent`, type:`number`},
		id: {name:`ID`, type:`formula`},
	},
	"Inventory Updates": {
		primaryKey: {name:`Primary Key`, type:`formula`},
		userId: {name:`User`, type:`foreignKey-one`},
		previousQuantity: {name:`Previous Quantity`, type:`number`},
		updatedQuantity: {name:`Updated Quantity`, type:`number`},
		createdAt: {name:`Created At`, type:`date`},
		inventoryId: {name:`Inventory`, type:`foreignKey-one`},
		productName: {name:`Product Name`, type:`lookup`},
		siteName: {name:`Site Name`, type:`lookup`},
		id: {name:`ID`, type:`formula`},
		username: {name:`Username`, type:`lookup`},
	},
};
