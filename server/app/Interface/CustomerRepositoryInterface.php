<?php

namespace App\Interface;

interface CustomerRepositoryInterface{
    public function getCustomers($request);
    public function getAllCustomers();
    public function createCustomer(array $data);
    public function getCustomerById($id);
    public function updateCustomerById($id, array $data);
    public function deleteCustomerById($id);
    public function getCustomerByActive($active);
    public function updateCustomerByActive($active, array $data);
    public function deleteCustomerByActive($active);
}
