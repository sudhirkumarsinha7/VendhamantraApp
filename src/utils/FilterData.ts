export const enquiriesActions = {
  pending: [
    { label: "Edit", module_id: "enquiries", module_operation_title_id: "enquiries_update_enquiry" },
    { label: "Follow Up", module_id: "enquiries", module_operation_title_id: "enquiries_follow-up_enquiry" },
    { label: "Quotation", module_id: "enquiries", module_operation_title_id: "enquiries_quotation" },
    // { label: "Plan of Action", module_id: "enquiries", module_operation_title_id: "enquiries_enquiry_plan_of_action" },
    { label: "Test Ride Update", module_id: "enquiries", module_operation_title_id: "enquiries_test_ride_updates" },
    { label: "Marked as Walkin", module_id: "enquiries", module_operation_title_id: "enquiries_walkin_create" },
    // { label: "Field Visit", module_id: "enquiries", module_operation_title_id: "enquiries_field_visit" },

    { label: "Assigned Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_assign" },
    { label: "Close Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_close_enquiry" },

  ],
  following_up: [
    { label: "Edit", module_id: "enquiries", module_operation_title_id: "enquiries_update_enquiry" },
    { label: "Follow Up", module_id: "enquiries", module_operation_title_id: "enquiries_follow-up_enquiry" },
    { label: "Quotation", module_id: "enquiries", module_operation_title_id: "enquiries_quotation" },
    // { label: "Plan of Action", module_id: "enquiries", module_operation_title_id: "enquiries_enquiry_plan_of_action" },
    { label: "Test Ride Update", module_id: "enquiries", module_operation_title_id: "enquiries_test_ride_updates" },
    { label: "Marked as Walkin", module_id: "enquiries", module_operation_title_id: "enquiries_walkin_create" },
    { label: "Field Visit", module_id: "enquiries", module_operation_title_id: "enquiries_field_visit" },
    { label: "Convert To Lead", module_id: "enquiries", module_operation_title_id: "enquiries_convert_to_lead" },
    { label: "Close Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_close_enquiry" },
    { label: "Call Recordings", module_id: "enquiries", module_operation_title_id: "call_recordings" },

  ],
  resolved: [
    // { label: "Convert To Lead", module_id: "enquiries", module_operation_title_id: "enquiries_convert_to_lead" },
    { label: "Share Product Info", module_id: "enquiries", module_operation_title_id: "enquiries_share_product_info" },
    { label: "Call Recordings", module_id: "enquiries", module_operation_title_id: "call_recordings" },
  ],
};

/* 
Create Sale
*/
export const leadsActions = {
  interested: [
    { label: "Share Product Info", module_id: "leads", module_operation_title_id: "leads_share_product_info" },
    { label: "Call Recordings", module_id: "leads", module_operation_title_id: "call_recordings" },
    { label: "Edit", module_id: "leads", module_operation_title_id: "leads_update_lead" },
    { label: "Follow Up", module_id: "leads", module_operation_title_id: "leads_follow-up_lead" },
    // { label: "Quotation", module_id: "leads", module_operation_title_id: "leads_quotation" },
    { label: "Assign to Agents", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
    // { label: "Plan of Action", module_id: "leads", module_operation_title_id: "leads_lead_plan_of_action" },
    { label: "Test Ride Update", module_id: "leads", module_operation_title_id: "leads_test_ride_updates" },
    { label: "Marked as Walkin", module_id: "leads", module_operation_title_id: "leads_walkin_create" },
    { label: "Close Lead", module_id: "leads", module_operation_title_id: "leads_close_lead" },

    // { label: "Field Visit", module_id: "leads", module_operation_title_id: "leads_field_visit" },
  ],
  following_up: [
    { label: "Share Product Info", module_id: "leads", module_operation_title_id: "leads_share_product_info" },
    { label: "Call Recordings", module_id: "leads", module_operation_title_id: "call_recordings" },
    { label: "Edit", module_id: "leads", module_operation_title_id: "leads_update_lead" },
    { label: "Follow Up", module_id: "leads", module_operation_title_id: "leads_follow-up_lead" },
    // { label: "Quotation", module_id: "leads", module_operation_title_id: "leads_quotation" },
    { label: "Assign to Agents", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
    // { label: "Plan of Action", module_id: "leads", module_operation_title_id: "leads_lead_plan_of_action" },
    { label: "Test Ride Update", module_id: "leads", module_operation_title_id: "leads_test_ride_updates" },
    { label: "Marked as Walkin", module_id: "leads", module_operation_title_id: "leads_walkin_create" },
    // { label: "Field Visit", module_id: "leads", module_operation_title_id: "leads_field_visit" },
    { label: "Close Lead", module_id: "leads", module_operation_title_id: "leads_close_lead" },

  ],
  booked: [
    { label: "Share Product Info", module_id: "leads", module_operation_title_id: "leads_share_product_info" },
    { label: "Call Recordings", module_id: "leads", module_operation_title_id: "call_recordings" },
    { label: "Edit", module_id: "leads", module_operation_title_id: "leads_update_lead" },
    { label: "Booked", module_id: "leads", module_operation_title_id: "leads_booked" },
    // { label: "Quotation", module_id: "leads", module_operation_title_id: "leads_quotation" },
    { label: "Assign to Agents", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
    // { label: "Plan of Action", module_id: "leads", module_operation_title_id: "leads_lead_plan_of_action" },
    { label: "Test Ride Update", module_id: "leads", module_operation_title_id: "leads_test_ride_updates" },
    { label: "Marked as Walkin", module_id: "leads", module_operation_title_id: "leads_walkin_create" },
    // { label: "Field Visit", module_id: "leads", module_operation_title_id: "leads_field_visit" },
    // { label: "Edit Invoice", module_id: "leads", module_operation_title_id: "leads_edit_invoice" },
    // { label: "Create Invoice Details", module_id: "leads", module_operation_title_id: "leads_create_invoice_details" },
    // { label: "Update Invoice Details", module_id: "leads", module_operation_title_id: "leads_update_invoice_details" },
    { label: "Close Lead", module_id: "leads", module_operation_title_id: "leads_close_lead" },

  ],
  purchased: [
    // { label: "Edit Invoice", module_id: "leads", module_operation_title_id: "leads_edit_invoice" },
    // { label: "Create Invoice Details", module_id: "leads", module_operation_title_id: "leads_create_invoice_details" },
    // { label: "Update Invoice Details", module_id: "leads", module_operation_title_id: "leads_update_invoice_details" },
    { label: "Share Product Info", module_id: "leads", module_operation_title_id: "leads_share_product_info" },
    { label: "Call Recordings", module_id: "leads", module_operation_title_id: "call_recordings" },
    { label: "Update Business Info", module_id: "leads", module_operation_title_id: "leads_close_lead_business_value_update" },

  ],

  lost: [
    { label: "Share Product Info", module_id: "leads", module_operation_title_id: "leads_share_product_info" },
    { label: "Call Recordings", module_id: "leads", module_operation_title_id: "call_recordings" },
  ],
};
// export const bulkEnquiryAction=[
//   { label: "Assign Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_assign" },
//   { label: "Close Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_close_enquiry" },

// ]
// export const bulkLeadsAction=[
//     { label: "Assign Leads", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
//     { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
//     { label: "Close Leads", module_id: "leads", module_operation_title_id: "leads_close_lead" },

// ]
export const bulkEnquiryActions = {
  pending: [
    { label: "Assign Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_assign" },
    { label: "Close Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_close_enquiry" },
  ],
  following_up: [
    { label: "Assign Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_assign" },
    { label: "Close Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_close_enquiry" },
  ],
  resolved: [
    { label: "Assign Enquiry", module_id: "enquiries", module_operation_title_id: "enquiries_assign" },
  ]
};
export const bulkLeadActions = {
  interested: [
    { label: "Assign Leads", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
    { label: "Close Leads", module_id: "leads", module_operation_title_id: "leads_close_lead" },
  ],
  following_up: [
    { label: "Assign Leads", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
    { label: "Close Leads", module_id: "leads", module_operation_title_id: "leads_close_lead" },
  ],
  booked: [
    { label: "Assign Leads", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
    { label: "Close Leads", module_id: "leads", module_operation_title_id: "leads_close_lead" },
  ],
  purchased: [
    { label: "Assign Leads", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
  ],
  lost: [
    { label: "Assign Leads", module_id: "leads", module_operation_title_id: "leads_assign_agents" },
    // { label: "Assign to Dealer", module_id: "leads", module_operation_title_id: "leads_assign_dealers" },
  ]
};

export interface ViewDetailsAction {
  [moduleName: string]: {
    [actionName: string]: ActionDetail;
  };
}
// Define the shape of viewDetailsAction
export interface ActionDetail {
  label: string;
  module_id: string;
  module_operation_title_id: string;
}


export const viewDetailsAction: ViewDetailsAction = {
  enquiries: {
    dashboard_testride: {
      label: "Test Ride Update",
      module_id: "enquiries",
      module_operation_title_id: "enquiries_test_ride_updates",
    },
    create: {
      label: "Create Enquiry",
      module_id: "enquiries",
      module_operation_title_id: "enquiries_create",
    },
    read: {
      label: "Read Enquiry",
      module_id: "enquiries",
      module_operation_title_id: "enquiries_read",
    },
    customers_create: {
      label: "Add user",
      module_id: "enquiries",
      module_operation_title_id: "customers_create"
    },
    direct_field_visit_create: {
      label: "direct_field_visit_create",
      module_id: "enquiries",
      module_operation_title_id: "direct_field_visit_create"

    },
    direct_field_visit_update: {
      label: "direct_field_visit_update",
      module_id: "enquiries",
      module_operation_title_id: "direct_field_visit_update"
    },
    direct_field_visit_read: {
      label: "direct_field_visit_read",
      module_id: "enquiries",
      module_operation_title_id: "direct_field_visit_read"

    },
    direct_field_visit_delete: {
      label: "direct_field_visit_delete",
      module_id: "enquiries",
      module_operation_title_id: "direct_field_visit_delete"

    },

    dealers_network_create: {
      label: "Add dealers",
      module_id: "enquiries",
      module_operation_title_id: "dealers_network_create"
    },
    enquiries_filter: {
      label: "Filters",
      module_id: "enquiries",
      module_operation_title_id: "enquiries_filter"
    }
  },
  leads: {
    leads_field_visits_read: {
      label: "Field Visit",
      module_id: "leads",
      module_operation_title_id: "leads_field_visits_read",
    },
    leads_filter: {
      label: "Filters",
      module_id: "leads",
      module_operation_title_id: "leads_filter"
    },
    dashboard_testride: {
      label: "Test Ride Update",
      module_id: "leads",
      module_operation_title_id: "leads_test_ride_updates",
    },
    create: {
      label: "Create Lead",
      module_id: "leads",
      module_operation_title_id: "leads_create",
    },
    read: {
      label: "Read Lead",
      module_id: "leads",
      module_operation_title_id: "leads_read",
    },
    leads_booked: {
      label: "Book Lead",
      module_id: "leads",
      module_operation_title_id: "leads_booked"
    },
    customers_create: {
      label: "Add user",
      module_id: "leads",
      module_operation_title_id: "customers_create"
    },
    dealers_network_create: {
      label: "Add dealers",
      module_id: "leads",
      module_operation_title_id: "dealers_network_create"
    }
  },
  dashboard: {
    overview: {
      label: "dashboard_overview",
      module_id: "dashboard",
      module_operation_title_id: "dashboard_overview",
    },
    staff_punched_in: {
      label: "Punch In",
      module_id: "dashboard",
      module_operation_title_id: "staff_punched_in",
    },
    staff_punched_details: {
      label: "Tracking",
      module_id: "dashboard",
      module_operation_title_id: "staff_punched_details",
    },
    leads_field_visits_read: {
      label: "Field Visit",
      module_id: "dashboard",
      module_operation_title_id: "leads_field_visits_read",
    },
    direct_field_visit_read: {
      label: "direct_field_visit_read",
      module_id: "direct_field_visit",
      module_operation_title_id: "direct_field_visit_read"

    },
    dashboard_users_logged: {
      label: "dashboard_users_logged",
      module_id: "dashboard",
      module_operation_title_id: "dashboard_users_logged"

    },
    dealers_network_read: {
      label: "dealers_network_read",
      module_id: "dashboard",
      module_operation_title_id: "dealers_network_read"

    },
    dealers_network_update: {
      label: "dealers_network_update",
      module_id: "dashboard",
      module_operation_title_id: "dealers_network_update"
    },
    customers_read: {
      label: "customers_read",
      module_id: "dashboard",
      module_operation_title_id: "customers_read"

    },
    dashboard_overview_all: {
      label: "dashboard_overview_all",
      module_id: "dashboard",
      module_operation_title_id: "dashboard_overview_all"
    },
    staff_summary: {
      label: "staff_summary",
      module_id: "dashboard",
      module_operation_title_id: "staff_summary"
    },
    staff_summary_all: {
      label: "staff_summary_all",
      module_id: "dashboard",
      module_operation_title_id: "staff_summary_all"
    },
kpis_grant_all: {
      label: "kpis_grant_all",
      module_id: "dashboard",
      module_operation_title_id: "kpis_grant_all"
    },

    kpis_group_create: {
      label: "kpis_group_create",
      module_id: "dashboard",
      module_operation_title_id: "kpis_group_create"
    },

    kpis_group_read: {
      label: "kpis_group_read",
      module_id: "dashboard",
      module_operation_title_id: "kpis_group_read"
    },

    kpis_group_update: {
      label: "kpis_group_update",
      module_id: "dashboard",
      module_operation_title_id: "kpis_group_update"
    },
    kpis_performance_create: {
      label: "kpis_performance_create",
      module_id: "dashboard",
      module_operation_title_id: "kpis_performance_create"
    },
    kpis_performance_read: {
      label: "kpis_performance_read",
      module_id: "dashboard",
      module_operation_title_id: "kpis_performance_read"
    },
    kpis_performance_update: {
      label: "kpis_performance_update",
      module_id: "dashboard",
      module_operation_title_id: "kpis_performance_update"
    },
 kpis_performance_approval: {
      label: "kpis_performance_approval",
      module_id: "dashboard",
      module_operation_title_id: "kpis_performance_approval"
    },
    kpis_performance_import: {
      label: "kpis_performance_import",
      module_id: "dashboard",
      module_operation_title_id: "kpis_performance_import"
    },
    kpis_performance_delete: {
      label: "kpis_performance_delete",
      module_id: "dashboard",
      module_operation_title_id: "kpis_performance_delete"
    },

  },


};
