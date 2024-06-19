<?php

namespace App\Repositories;

use App\Interface\currentOrder;
use App\Interface\NotificationRepositoryInterface;
use App\Interface\requestedProduct;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationRepository implements NotificationRepositoryInterface
{

    /**
     * @param $request
     * @return mixed
     */
    public function getUnreadNotifications()
    {
        $unreadNotifications = DatabaseNotification::whereNull('read_at')
            ->orderBy('created_at', 'asc')
            ->get()
            ->toArray();
        return  $unreadNotifications;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createNotification(array $data)
    {
        // TODO: Implement createNotification() method.
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getNotificationById($id)
    {
        // TODO: Implement getNotificationById() method.
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function updateNotificationById($id, array $data)
    {
        // TODO: Implement updateNotificationById() method.
    }

    /**
     * @param $id
     * @return mixed
     */
    public function deleteNotificationById($id)
    {
        // TODO: Implement deleteNotificationById() method.
    }
}
