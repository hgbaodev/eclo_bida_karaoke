<?php

namespace App\Repositories;

use App\Interface\CustomerRepositoryInterface;
use App\Models\Customer;

class CustomerRepository implements CustomerRepositoryInterface {
  
  function getAllCustomers()
  {
    return Customer::all();
  }

  function getCustomerById($id)
  {
    return Customer::find($id);
  }

  function createCustomer(array $data)
  {
    return Customer::create($data);
  }

  function updateCustomerById($id, array $data)
  {
    $customer = Customer::find($id);
    $customer->update($data);
    return $customer;
  }

  function deleteCustomerById($id)
  {
    $customer = Customer::find($id);
    $customer->delete();
    return $customer;
  }
}
