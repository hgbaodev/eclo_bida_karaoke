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
      $id = $request->input('id');
      $name = $request->input('name');
      $email = $request->input('email');
      $phone = $request->input('phone');
      $query = $request->input('query');
      $status = $request->input('status');

      $customers = Customer::query();
      if ($query) {
          $customers->where('name', 'LIKE', "%$query%")
              ->orWhere('phone', 'LIKE', "%$query%")
              ->orWhere('email', 'LIKE', "%$query%")
              ->orWhere('status', 'LIKE', "%$query%");
      }
      if($id){
          $customers->where('id', $id);
      }
      if($name){
          $customers->where('name','LIKE', "%$name%");
      }
      if($email){
          $customers->where('email','LIKE', "%$email%");
      }
      if ($phone){
          $customers->where('phone','LIKE', "%$phone%");
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

  function getAllCustomers()
  {
    return Customer::all();
  }

  function getCustomerById($id)
  {
    return Customer::find($id);
  }

    function getCustomerByActive($active)
    {
        return Customer::where('active', $active);
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

    function updateCustomerByActive($active, array $data)
    {
        $customer = Customer::where('active', $active);
        $customer->update($data);
        return $customer;
    }

  function deleteCustomerById($id)
  {
    $customer = Customer::find($id);
    $customer->delete();
    return $customer;
  }

  function getCustomerByActive($active)
  {
      return Customer::where('active', $active)->first();
  }

  public function deleteCustomerByActive($active)
  {
      $customer = Customer::where('active', $active)->first();
      $customer->delete();
      return $customer;
  }

  public function updateCustomerByActive($active, array $data)
  {
      $customer = Customer::where('active', $active)->first();
      $customer->update($data);
      return $customer;
  }
}
