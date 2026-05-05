export const mockUser = {
  id: "user_123",
  phone: "+919876543210",
  name: "Priya Sharma",
  email: "priya@example.com",
  created_at: "2026-04-25T10:00:00Z",
  last_active: "2026-04-25T15:30:00Z",
  tone_preference: "friendly_casual",
  platform: "ios"
};

export const mockBusiness = {
  id: "biz_456",
  user_id: "user_123",
  name: "Priya's Home Bakery",
  type: "food_bakery",
  category: "baker",
  location: {
    city: "Pune",
    state: "Maharashtra",
    pincode: "411045"
  },
  avg_order_value: "500_1000",
  description: "Custom cakes and brownies",
};

export const mockAnalytics = {
  id: "analytics_202",
  user_id: "user_123",
  period: "week",
  posts_suggested: 12,
  posts_approved: 10,
  orders_count: 47,
  revenue: 23500,
  insights: [
    "Chocolate cake posts get the most orders",
    "Evening posts (6-8 PM) perform 40% better",
    "WhatsApp Status brings 2x more orders than Instagram"
  ],
  next_action: {
    text: "8 customers haven't ordered in the last 30 days.",
    action: "Send Reminder"
  }
};
