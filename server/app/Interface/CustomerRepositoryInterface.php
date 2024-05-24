<?php

namespace App\Interface;

interface CustomerRepositoryInterface{
    public function getCustomers($request);
    public function getAllCustomers();
    public function getCustomerById($id);
    public function createCustomer(array $data);
    public function updateCustomerById($id, array $data);
    public function deleteCustomerById($id);
}
