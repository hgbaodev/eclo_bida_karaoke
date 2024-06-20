// types.ts
export interface NotificationData {
  orderActive: string;
  requestedProduct: RequestedProduct[];
}

export interface RequestedProduct {
  active: string;
  quantity: string;
}

export interface ProductOrderNotification {
  id: string;
  data: NotificationData;
  created_at: string;
  status: string;
}
