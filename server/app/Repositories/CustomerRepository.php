<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\CustomerRepositoryInterface;
use App\Models\Customer;

class CustomerRepository implements CustomerRepositoryInterface {

  function getCustomers($request)
  {
      $all = $request->input('all');
      $perPage = $request->input('perPage');
      $first_name = $request->input('first_name');
      $last_name = $request->input('last_name');
      $email = $request->input('email');
      $phone = $request->input('phone');
      $query = $request->input('query');
      $status = $request->input('status');

      $customers = Customer::query();
      $customers->latest();
      if ($query) {
          $customers->whereRaw("CONCAT(first_name, ' ', last_name, ' ', email, ' ', phone) LIKE '%$query%'");
      }
      if ($status) {
          $customers->where('status', $status);
      }
      if($all){
          $customers = $customers->get();
      } else {
          $customers = $customers->paginate($perPage);
      }
      return new CollectionCustom($customers);
  }


    function getCustomerByActive($active)
    {
        return Customer::where('active', $active)->firstOrFail();
    }

  function createCustomer(array $data)
  {
    return Customer::create($data);
  }

    function updateCustomerByActive($active, array $data)
    {
        $customer = Customer::where('active', $active)->firstOrFail();
        $customer->update($data);
        return $customer;
    }


  public function deleteCustomerByActive($active)
  {
      $customer = Customer::where('active', $active)->firstOrFail();
      $customer->delete();
      return $customer;
  }
}
