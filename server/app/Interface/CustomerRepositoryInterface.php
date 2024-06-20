<?php

namespace App\Interface;

interface CustomerRepositoryInterface{
    public function getCustomers($request);
    public function createCustomer(array $data);
    public function getCustomerByActive($active);
    public function updateCustomerByActive($active, array $data);
    public function deleteCustomerByActive($active);
}
