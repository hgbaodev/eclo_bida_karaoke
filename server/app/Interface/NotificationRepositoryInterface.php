<?php

namespace App\Interface;

use Illuminate\Http\Request;

interface NotificationRepositoryInterface{
    public function getUnreadNotifications();
    public function createNotification(array $data);
    public function getNotificationById($id);
    public function updateNotificationById($id, array $data);
    public function deleteNotificationById($id);
}
