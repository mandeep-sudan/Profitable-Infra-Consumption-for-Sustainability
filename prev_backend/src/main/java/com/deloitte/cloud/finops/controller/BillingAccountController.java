package com.deloitte.cloud.finops.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.billing.v1.BillingAccount;
import com.google.cloud.billing.v1.CloudBillingClient;
import com.google.cloud.billing.v1.ListBillingAccountsRequest;
import com.google.cloud.billing.v1.ListBillingAccountsResponse;
import com.google.cloud.billing.v1.CloudBillingClient.ListBillingAccountsPage;
import com.google.cloud.billing.v1.CloudBillingClient.ListBillingAccountsPagedResponse;

@RestController
public class BillingAccountController {

  @GetMapping("/check")
  public static List<BillingAccount> syncGetBillingAccount() throws Exception {
    // This snippet has been automatically generated and should be regarded as a
    // code template only.
    // It will require modifications to work:
    // - It may require correct/in-range values for request initialization.
    // - It may require specifying regional endpoints when creating the service
    // client as shown in
    // https://cloud.google.com/java/docs/setup#configure_endpoints_for_the_client_library
    try (CloudBillingClient cloudBillingClient = CloudBillingClient.create()) {

      ListBillingAccountsRequest request = ListBillingAccountsRequest.newBuilder().build();
      ListBillingAccountsPagedResponse response = cloudBillingClient.listBillingAccounts(request);

      return response.getPage().getResponse().getBillingAccountsList();
    }
  }
}