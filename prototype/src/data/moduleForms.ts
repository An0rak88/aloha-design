import type { FormFieldConfig } from '../components/shared/FormPage'

interface ModuleFormDef {
  label: string
  fields: FormFieldConfig[]
  submitLabel?: string
  successMessage?: string
}

// Placeholder fields — will be replaced with real fields later
const datePh: FormFieldConfig = { type: 'date', label: 'Date', required: true }
const ghSelect: FormFieldConfig = { type: 'select', label: 'Greenhouse', required: true, placeholder: 'Select...', options: ['K0','01','03','04','05','06','07','08','HK'].map(g => ({ value: g, label: g })) }
const notes: FormFieldConfig = { type: 'textarea', label: 'Notes', placeholder: 'Additional notes...', rows: 3 }

function placeholder(label: string, extraFields: FormFieldConfig[] = []): ModuleFormDef {
  return { label, fields: [datePh, ...extraFields, notes], successMessage: `${label} entry saved.` }
}

export const moduleForms: Record<string, Record<string, ModuleFormDef>> = {
  grow: {
    'cuke-calendar': placeholder('Cuke Calendar', [ghSelect]),
    'cuke-seeding': placeholder('Cuke Seeding', [ghSelect, { type: 'number', label: 'Max Seeds', placeholder: '0' }]),
    'cuke-sched': placeholder('Cuke Sched', [ghSelect]),
    'cuke-harvest': placeholder('Cuke Harvest', [ghSelect, { type: 'number', label: 'Total Lbs', placeholder: '0' }, { type: 'number', label: 'Grade 1 Lbs', placeholder: '0' }]),
    'lettuce-seeding': placeholder('Lettuce Seeding', [ghSelect, { type: 'number', label: 'Trays', placeholder: '0' }]),
    'lettuce-yield': placeholder('Lettuce Yield', [ghSelect, { type: 'number', label: 'Total Lbs', placeholder: '0' }]),
    'fertilizer-sched': placeholder('Fertilizer Sched', [ghSelect, { type: 'text', label: 'Recipe', placeholder: 'Recipe name' }]),
    'scouting': placeholder('Scouting', [ghSelect, { type: 'select', label: 'Pest Type', placeholder: 'Select...', options: ['Aphids','Whitefly','Thrips','Mites','Other'].map(p => ({ value: p, label: p })) }]),
    'spraying-sched': placeholder('Spraying Sched', [ghSelect, { type: 'text', label: 'Chemical', placeholder: 'Chemical name' }]),
    'chemistry': placeholder('Chemistry', [{ type: 'select', label: 'Site', required: true, placeholder: 'Select...', options: ['01.A','01.B','03.A','03.B','04.A','07.A'].map(s => ({ value: s, label: s })) }, { type: 'number', label: 'Drain EC', step: '0.01', placeholder: '0.00' }, { type: 'number', label: 'Drain pH', step: '0.01', placeholder: '0.00' }]),
  },
  pack: {
    'cuke-harvest': placeholder('Cuke Harvest', [{ type: 'number', label: 'Total Lbs', placeholder: '0' }, { type: 'number', label: 'Grade 1 %', placeholder: '0' }]),
    'cuke-pack': placeholder('Cuke Pack', [{ type: 'number', label: 'Boxes Packed', placeholder: '0' }, { type: 'number', label: 'Rejects', placeholder: '0' }]),
    'lettuce-ph': placeholder('Lettuce P&H', [{ type: 'number', label: 'Total Lbs', placeholder: '0' }]),
    'lettuce-pack': placeholder('Lettuce Pack', [{ type: 'number', label: 'Boxes Packed', placeholder: '0' }]),
    'shelf-life': placeholder('Shelf Life', [{ type: 'text', label: 'Product', placeholder: 'Product name' }, { type: 'number', label: 'Days', placeholder: '0' }]),
    'moisture': placeholder('Moisture', [{ type: 'number', label: 'Moisture %', step: '0.1', placeholder: '0.0' }]),
  },
  sales: {
    'pos': placeholder("PO's", [{ type: 'text', label: 'PO Number', required: true, placeholder: 'PO-0000' }, { type: 'text', label: 'Customer', placeholder: 'Customer name' }]),
    'palletization': placeholder('Palletization', [{ type: 'text', label: 'Pallet ID', placeholder: 'PLT-0000' }, { type: 'number', label: 'Box Count', placeholder: '0' }]),
    'price-product-spec': placeholder('Price & Product Spec', [{ type: 'text', label: 'Product', placeholder: 'Product name' }, { type: 'number', label: 'Price', step: '0.01', placeholder: '0.00' }]),
    'customers': placeholder('Customers', [{ type: 'text', label: 'Company', required: true }, { type: 'text', label: 'Contact', placeholder: 'Contact name' }]),
    'crm': placeholder('CRM', [{ type: 'text', label: 'Company' }, { type: 'text', label: 'Action', placeholder: 'Follow-up action' }]),
    'markup': placeholder('Markup', [{ type: 'text', label: 'Product' }, { type: 'number', label: 'Markup %', step: '0.1', placeholder: '0' }]),
    'ext-prices': placeholder('Ext Prices', [{ type: 'text', label: 'Product' }, { type: 'number', label: 'Price', step: '0.01', placeholder: '0.00' }]),
    'price-grid': placeholder('Price Grid', [{ type: 'text', label: 'Product' }, { type: 'text', label: 'Customer' }, { type: 'number', label: 'Price', step: '0.01', placeholder: '0.00' }]),
  },
  'food-safety': {
    'fsafe-logs': placeholder('Fsafe Logs', [{ type: 'select', label: 'Log Type', placeholder: 'Select...', options: ['Pre-op','Sanitation','Temperature','Water'].map(t => ({ value: t, label: t })) }]),
    'corrective-actions': placeholder('Corrective Actions', [{ type: 'text', label: 'Issue', required: true }, { type: 'text', label: 'Action Taken', required: true }]),
    'pest-activity': placeholder('Pest Activity', [{ type: 'select', label: 'Location', placeholder: 'Select...', options: ['Packhouse','Cold Storage','Dock','Field'].map(l => ({ value: l, label: l })) }, { type: 'text', label: 'Pest Type' }]),
    'staff-training': placeholder('Staff Training', [{ type: 'text', label: 'Topic', required: true }, { type: 'number', label: 'Attendees', placeholder: '0' }]),
    'visitors-log': placeholder('Visitors Log', [{ type: 'text', label: 'Visitor Name', required: true }, { type: 'text', label: 'Company' }, { type: 'time', label: 'Time In', half: true }, { type: 'time', label: 'Time Out', half: true }]),
    'customer-comms': placeholder('Customer Comms', [{ type: 'text', label: 'Customer', required: true }, { type: 'text', label: 'Subject' }]),
  },
  maintenance: {
    'maint-request': placeholder('Maint Request', [{ type: 'text', label: 'Title', required: true }, { type: 'select', label: 'Priority', options: ['High','Medium','Low'].map(p => ({ value: p, label: p })) }, { type: 'text', label: 'Location' }]),
    'fuel-log': placeholder('Fuel Log', [{ type: 'text', label: 'Vehicle/Equipment', required: true }, { type: 'number', label: 'Gallons', step: '0.1', placeholder: '0.0' }]),
    'maint-inventory': placeholder('Maint Inventory', [{ type: 'text', label: 'Item', required: true }, { type: 'number', label: 'Quantity', placeholder: '0' }, { type: 'text', label: 'Location' }]),
    'house-inspection': placeholder('House Inspection', [ghSelect, { type: 'select', label: 'Condition', options: ['Good','Fair','Needs Repair'].map(c => ({ value: c, label: c })) }]),
  },
  inventory: {
    'wto': placeholder('WTO', [{ type: 'text', label: 'WTO Number', required: true, placeholder: 'WTO-0000' }, { type: 'text', label: 'Description' }]),
    'orders': placeholder('Orders', [{ type: 'text', label: 'Order Number', required: true }, { type: 'text', label: 'Vendor' }, { type: 'number', label: 'Amount', step: '0.01', placeholder: '0.00' }]),
    'budget': placeholder('Budget', [{ type: 'select', label: 'Department', placeholder: 'Select...', options: ['Grow','Pack','Maintenance','Admin'].map(d => ({ value: d, label: d })) }, { type: 'number', label: 'Amount', step: '0.01', placeholder: '0.00' }]),
    'procurement': placeholder('Procurement', [{ type: 'text', label: 'Item', required: true }, { type: 'text', label: 'Vendor' }, { type: 'number', label: 'Quantity', placeholder: '0' }]),
  },
  hr: {
    'register': placeholder('Register', [{ type: 'text', label: 'Full Name', required: true }, { type: 'text', label: 'Position' }, { type: 'select', label: 'Department', placeholder: 'Select...', options: ['Grow','Pack','IPM','Maintenance','Admin'].map(d => ({ value: d, label: d })) }]),
    'scheduler': placeholder('Scheduler', [{ type: 'text', label: 'Employee', required: true }, { type: 'select', label: 'Shift', options: ['AM','PM','Full'].map(s => ({ value: s, label: s })) }, { type: 'date', label: 'Start Date' }, { type: 'date', label: 'End Date' }]),
    'time-off': placeholder('Time Off', [{ type: 'text', label: 'Employee', required: true }, { type: 'date', label: 'Start Date', half: true }, { type: 'date', label: 'End Date', half: true }, { type: 'select', label: 'Type', options: ['Vacation','Sick','Personal'].map(t => ({ value: t, label: t })) }]),
    'hours-comp': placeholder('Hours Comp', [{ type: 'text', label: 'Employee', required: true }, { type: 'number', label: 'Hours', step: '0.5', placeholder: '0' }]),
    'payroll-comp': placeholder('Payroll Comp', [{ type: 'text', label: 'Employee', required: true }, { type: 'number', label: 'Amount', step: '0.01', placeholder: '0.00' }]),
    'payroll-comp-mgr': placeholder('Payroll Comp Manager', [{ type: 'text', label: 'Employee', required: true }, { type: 'number', label: 'Amount', step: '0.01', placeholder: '0.00' }]),
    'payroll-data': placeholder('Payroll Data', [{ type: 'text', label: 'Employee', required: true }, { type: 'text', label: 'Pay Period' }]),
    'housing': placeholder('Housing', [{ type: 'text', label: 'Employee', required: true }, { type: 'text', label: 'Unit', placeholder: 'Unit number' }]),
    'employee-review': placeholder('Employee Review', [{ type: 'text', label: 'Employee', required: true }, { type: 'select', label: 'Rating', options: ['Excellent','Good','Satisfactory','Needs Improvement'].map(r => ({ value: r, label: r })) }]),
  },
}
