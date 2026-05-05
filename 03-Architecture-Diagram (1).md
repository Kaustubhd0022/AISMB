# Architecture Document – AI Marketing Co-pilot for Home-Based D2C Sellers

---

## Document Information

| Field | Value |
|-------|-------|
| Document Version | 1.0 |
| Date | 2026-04-25 |
| Status | Approved for Development |
| Architectural Style | Serverless, Microservices-Ready |
| Target Platform | Flutter (iOS, Android, Web) + GCP Backend |

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Technology Stack](#2-technology-stack)
3. [System Components](#3-system-components)
4. [Data Model](#4-data-model)
5. [API Design](#5-api-design)
6. [AI/LLM Integration](#6-aillm-integration)
7. [Third-Party Integrations](#7-third-party-integrations)
8. [Security Architecture](#8-security-architecture)
9. [Scalability Strategy](#9-scalability-strategy)
10. [Deployment Architecture](#10-deployment-architecture)
11. [Monitoring & Observability](#11-monitoring--observability)

---

## 1. High-Level Architecture

### 1.1 System Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM ARCHITECTURE                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐                 │
│   │   Flutter   │       │   Flutter   │       │   Flutter   │                 │
│   │   iOS App   │       │  Android    │       │     Web     │                 │
│   └──────┬──────┘       └──────┬──────┘       └──────┬──────┘                 │
│          │                     │                     │                          │
│          └─────────────────────┴─────────────────────┘                          │
│                            │                                                    │
└────────────────────────────┼────────────────────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   HTTPS / WSS   │
                    │   (Firebase)    │
                    └────────┬────────┘
                             │
┌────────────────────────────┼────────────────────────────────────────────────────┐
│                           GCP BACKEND LAYER                                     │
├────────────────────────────┼────────────────────────────────────────────────────┤
│                            │                                                    │
│                    ┌───────▼────────┐                                          │
│                    │  API Gateway   │                                          │
│                    │  (Cloud Run)   │                                          │
│                    └───────┬────────┘                                          │
│                            │                                                    │
│      ┌─────────────────────┼─────────────────────┐                            │
│      │                     │                     │                            │
│ ┌────▼────┐         ┌────▼────┐         ┌────▼────┐                         │
│ │ Chat    │         │ Content │         │Analytics│                         │
│ │ Service │         │ Service │         │ Service │                         │
│ │(Cloud   │         │(Cloud   │         │(Cloud   │                         │
│ │  Run)   │         │  Run)   │         │  Run)   │                         │
│ └────┬────┘         └────┬────┘         └────┬────┘                         │
│      │                   │                   │                              │
│      └───────────────────┼───────────────────┘                              │
│                          │                                                  │
│                    ┌─────▼─────────┐                                       │
│                    │  Shared Utils  │                                       │
│                    │  (Auth, Logs)  │                                       │
│                    └─────┬─────────┘                                       │
│                          │                                                  │
└──────────────────────────┼──────────────────────────────────────────────────┘
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
┌─────▼────┐       ┌──────▼──────┐       ┌────▼────┐
│ Firebase │       │  Cloud     │       │ Vertex  │
│  Auth   │       │ Firestore   │       │   AI    │
│         │       │ (Database)  │       │(Gemini) │
└─────────┘       └─────────────┘       └─────────┘
                                                │
                              ┌─────────────────┴─────────────────┐
                              │                                 │
                        ┌─────▼──────┐                   ┌─────▼──────┐
                        │  WhatsApp  │                   │ Instagram  │
                        │  Business  │                   │  Graph API │
                        │    API     │                   │(Post-MVP) │
                        └────────────┘                   └────────────┘


┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW                                            │
└─────────────────────────────────────────────────────────────────────────────────┘

User Request (Chat)
    │
    ▼
Flutter App (Client)
    │
    ▼
Firebase Auth (Authentication)
    │
    ▼
Cloud Run Backend (API Gateway)
    │
    ├─► Chat Service (Conversation Logic)
    │       │
    │       ├─► Vertex AI (Content Generation)
    │       │       │
    │       │       └─► AI Response
    │       │
    │       ├─► Firestore (Save/Retrieve Data)
    │       │
    │       └─► WhatsApp Business API (Send Message)
    │
    └─► Response to Client
            │
            ▼
    Flutter App (Display to User)
```

### 1.2 Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **Flutter Client** | UI, local caching, offline support, push notifications |
| **Firebase Auth** | User authentication, session management |
| **Cloud Run Backend** | API gateway, business logic, request routing |
| **Chat Service** | Conversation management, context handling |
| **Content Service** | Content generation, scheduling, publishing |
| **Analytics Service** | Metrics calculation, insights generation |
| **Firestore** | Real-time database, user data, content history |
| **Vertex AI** | LLM integration, content generation, personalization |
| **WhatsApp API** | Message delivery, status tracking |
| **Cloud Storage** | Image/media storage |

---

## 2. Technology Stack

### 2.1 Frontend (Flutter)

| Technology | Purpose |
|------------|---------|
| **Flutter 3.x** | Cross-platform framework |
| **Dart** | Programming language |
| **Provider/Riverpod** | State management |
| **http/dio** | HTTP client |
| **firebase_core** | Firebase initialization |
| **firebase_auth** | Authentication |
| **cloud_firestore** | Database |
| **shared_preferences** | Local storage |
| **flutter_local_notifications** | Push notifications |

### 2.2 Backend (Google Cloud Platform)

| Technology | Purpose | Reason |
|------------|---------|--------|
| **Cloud Run** | Containerized services | Serverless, auto-scaling, pay-per-use |
| **Cloud Firestore** | NoSQL database | Real-time, scales automatically |
| **Cloud Storage** | Object storage | Images, media files |
| **Vertex AI** | LLM platform | Gemini API, vernacular support |
| **Firebase Auth** | Authentication | Phone-based auth, easy integration |
| **Cloud Logging** | Logging | Centralized logs, queryable |
| **Cloud Monitoring** | Monitoring | Metrics, alerts, dashboards |
| **Cloud Build** | CI/CD | Automated builds and deployments |

### 2.3 Third-Party APIs

| Service | Purpose |
|---------|---------|
| **WhatsApp Business API** | Send/receive messages |
| **Instagram Graph API** | Post management (Post-MVP) |

### 2.4 Development Tools

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub/GitLab** | Code hosting |
| **VS Code** | IDE with Flutter extensions |
| **Android Studio** | Android development |
| **Xcode** | iOS development |
| **Postman** | API testing |

---

## 3. System Components

### 3.1 Flutter Client Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUTTER APP STRUCTURE                     │
└─────────────────────────────────────────────────────────────┘

lib/
├── main.dart                          # App entry point
├── app.dart                           # Root widget
│
├── core/
│   ├── constants/
│   │   ├── api_constants.dart
│   │   ├── app_constants.dart
│   │   └── design_constants.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   ├── colors.dart
│   │   └── typography.dart
│   ├── utils/
│   │   ├── date_utils.dart
│   │   ├── validators.dart
│   │   └── formatters.dart
│   └── network/
│       ├── api_client.dart
│       ├── api_exception.dart
│       └── dio_interceptor.dart
│
├── data/
│   ├── models/
│   │   ├── user.dart
│   │   ├── business.dart
│   │   ├── content_suggestion.dart
│   │   ├── message.dart
│   │   └── analytics.dart
│   ├── repositories/
│   │   ├── auth_repository.dart
│   │   ├── chat_repository.dart
│   │   ├── content_repository.dart
│   │   └── analytics_repository.dart
│   └── datasources/
│       ├── auth_remote_datasource.dart
│       ├── chat_remote_datasource.dart
│       └── analytics_remote_datasource.dart
│
├── domain/
│   ├── entities/
│   │   ├── user.dart
│   │   ├── business.dart
│   │   └── content.dart
│   ├── repositories/
│   │   ├── auth_repository.dart
│   │   ├── chat_repository.dart
│   │   └── content_repository.dart
│   └── usecases/
│       ├── signup_usecase.dart
│       ├── login_usecase.dart
│       ├── get_daily_suggestion_usecase.dart
│       └── schedule_content_usecase.dart
│
└── presentation/
    ├── pages/
    │   ├── welcome_page.dart
    │   ├── onboarding_page.dart
    │   ├── chat_page.dart
    │   ├── dashboard_page.dart
    │   └── settings_page.dart
    ├── widgets/
    │   ├── chat_bubble.dart
    │   ├── content_card.dart
    │   ├── suggestion_preview.dart
    │   └── metric_card.dart
    ├── providers/
    │   ├── auth_provider.dart
    │   ├── chat_provider.dart
    │   └── analytics_provider.dart
    └── routes/
        └── app_routes.dart
```

### 3.2 Backend Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND SERVICE STRUCTURE                    │
└─────────────────────────────────────────────────────────────┘

backend/
├── main.go                           # Entry point (Go example)
│
├── api/
│   ├── router.go                     # Route definitions
│   ├── middleware/
│   │   ├── auth.go                   # Authentication
│   │   ├── cors.go                   # CORS handling
│   │   ├── logging.go                # Request logging
│   │   └── rate_limit.go             # Rate limiting
│   └── handlers/
│       ├── auth_handler.go
│       ├── chat_handler.go
│       ├── content_handler.go
│       └── analytics_handler.go
│
├── services/
│   ├── auth_service.go               # Auth logic
│   ├── chat_service.go               # Chat/conversation logic
│   ├── content_service.go            # Content generation & management
│   ├── analytics_service.go          # Analytics & insights
│   └── ai_service.go                 # Vertex AI integration
│
├── repositories/
│   ├── user_repository.go            # User data access
│   ├── content_repository.go         # Content data access
│   └── analytics_repository.go       # Analytics data access
│
├── models/
│   ├── user.go
│   ├── business.go
│   ├── content.go
│   ├── message.go
│   └── analytics.go
│
├── integrations/
│   ├── whatsapp/
│   │   ├── client.go
│   │   └── message_builder.go
│   ├── vertex_ai/
│   │   ├── client.go
│   │   └── prompt_builder.go
│   └── firestore/
│       ├── client.go
│       └── queries.go
│
└── config/
    ├── config.go                     # Configuration
    └── secrets.go                    # Secrets management
```

---

## 4. Data Model

### 4.1 Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────┐
│    User      │         │  Business    │
├──────────────┤         ├──────────────┤
│ id           │◄────────│ id           │
│ phone        │  1      │ user_id      │
│ name         │         │ name         │
│ email        │         │ type         │
│ created_at   │         │ category     │
│ last_active  │         │ location     │
│ tone_pref    │         │ avg_order    │
│              │         │ description  │
└──────────────┘         └──────┬───────┘
         │                       │
         │                       │
         │ N                     │ 1
         │                       │
         │               ┌───────▼────────┐
         │               │ Content       │
         │               ├───────────────┤
         │               │ id            │
         │               │ business_id   │
         │               │ type          │
         │               │ content       │
         │               │ hashtags      │
         │               │ status        │
         │               │ scheduled_at  │
         │               │ sent_at       │
         │               │ created_at    │
         │               └───────┬───────┘
         │                       │
         │                       │ 1
         │                       │
         │ N                     │
         │                       │
         │               ┌───────▼────────┐
         │               │ Message       │
         │               ├───────────────┤
         │               │ id            │
         │               │ content_id    │
         │               │ platform      │
         │               │ recipient     │
         │               │ status        │
         │               │ sent_at       │
         │               │ read_at       │
         │               └───────────────┘
         │
         │ N
         │
┌────────▼────────┐
│  Analytics     │
├─────────────────┤
│ id             │
│ user_id        │
│ period         │
│ posts_count    │
│ orders_count   │
│ revenue        │
│ top_content    │
│ insights       │
│ created_at     │
└────────────────┘
```

### 4.2 Database Schema (Firestore)

#### Collection: users

```json
{
  "id": "user_123",
  "phone": "+919876543210",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "created_at": "2026-04-25T10:00:00Z",
  "last_active": "2026-04-25T15:30:00Z",
  "tone_preference": "friendly_casual",
  "fcm_token": "device_token_here",
  "platform": "ios"
}
```

#### Collection: businesses

```json
{
  "id": "biz_456",
  "user_id": "user_123",
  "name": "Priya's Home Bakery",
  "type": "food_bakery",
  "category": "baker",
  "location": {
    "city": "Pune",
    "state": "Maharashtra",
    "pincode": "411045"
  },
  "avg_order_value": "500_1000",
  "description": "Custom cakes and brownies",
  "created_at": "2026-04-25T10:05:00Z"
}
```

#### Collection: content_suggestions

```json
{
  "id": "content_789",
  "business_id": "biz_456",
  "type": "post",
  "platform": "whatsapp",
  "caption": "Fresh chocolate cake just ready! 🍫",
  "hashtags": ["#chocolatecake", "#homemade", "#freshbaking"],
  "suggested_time": "2026-04-25T18:00:00Z",
  "status": "scheduled",
  "scheduled_at": "2026-04-25T18:00:00Z",
  "sent_at": null,
  "created_at": "2026-04-25T10:30:00Z",
  "ai_generated": true,
  "user_edited": true
}
```

#### Collection: messages

```json
{
  "id": "msg_101",
  "content_id": "content_789",
  "platform": "whatsapp",
  "recipient": "+919876543211",
  "status": "delivered",
  "sent_at": "2026-04-25T18:00:00Z",
  "delivered_at": "2026-04-25T18:00:05Z",
  "read_at": "2026-04-25T18:15:00Z"
}
```

#### Collection: analytics

```json
{
  "id": "analytics_202",
  "user_id": "user_123",
  "period": "week",
  "start_date": "2026-04-19",
  "end_date": "2026-04-25",
  "posts_suggested": 12,
  "posts_approved": 10,
  "orders_count": 47,
  "revenue": 23500,
  "top_performing_content": {
    "type": "chocolate_cake",
    "orders": 15,
    "revenue": 7500
  },
  "insights": [
    "Chocolate cake posts get the most orders",
    "Evening posts (6-8 PM) perform 40% better",
    "WhatsApp Status brings 2x more orders than Instagram"
  ],
  "created_at": "2026-04-25T23:59:00Z"
}
```

#### Collection: conversations

```json
{
  "id": "conv_303",
  "user_id": "user_123",
  "messages": [
    {
      "role": "user",
      "content": "I want to run a Diwali sale",
      "timestamp": "2026-04-25T14:00:00Z"
    },
    {
      "role": "assistant",
      "content": "Exciting! 🪔 For your Diwali sale, I can help you...",
      "timestamp": "2026-04-25T14:00:02Z"
    }
  ],
  "context": {
    "business_type": "food_bakery",
    "location": "Pune",
    "avg_order": "500_1000"
  },
  "created_at": "2026-04-25T14:00:00Z",
  "updated_at": "2026-04-25T14:05:00Z"
}
```

---

## 5. API Design

### 5.1 API Base URL

```
Production: https://api.ordersfirst.ai/v1
Staging: https://api-staging.ordersfirst.ai/v1
Development: http://localhost:8080/v1
```

### 5.2 Authentication

All API calls require authentication via Firebase Auth token in the Authorization header:

```
Authorization: Bearer <firebase_token>
```

### 5.3 API Endpoints

#### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/signup | Sign up with phone number |
| POST | /auth/verify | Verify OTP |
| POST | /auth/refresh | Refresh auth token |
| POST | /auth/logout | Logout user |

#### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /user/profile | Get user profile |
| PUT | /user/profile | Update user profile |
| GET | /user/business | Get business profile |
| POST | /user/business | Create/update business profile |

#### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /chat/message | Send message to AI |
| GET | /chat/history | Get conversation history |
| POST | /chat/feedback | Provide feedback on AI response |

#### Content Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /content/suggestion | Get daily content suggestion |
| POST | /content/generate | Generate new content |
| POST | /content/approve | Approve and schedule content |
| GET | /content/scheduled | Get scheduled content |
| DELETE | /content/:id | Cancel/delete content |
| POST | /content/:id/send | Send content immediately |

#### Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /analytics/summary | Get weekly summary |
| GET | /analytics/insights | Get insights |
| GET | /analytics/performance | Get content performance |

#### WhatsApp Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /whatsapp/connect | Connect WhatsApp Business |
| GET | /whatsapp/status | Get connection status |
| POST | /whatsapp/send | Send WhatsApp message |
| GET | /whatsapp/webhook | Webhook endpoint for incoming |

#### Quick Replies Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /quick-replies | Get quick replies |
| POST | /quick-replies | Create quick reply |
| PUT | /quick-replies/:id | Update quick reply |
| DELETE | /quick-replies/:id | Delete quick reply |

### 5.4 API Response Format

#### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Success message",
  "timestamp": "2026-04-25T10:00:00Z"
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  },
  "timestamp": "2026-04-25T10:00:00Z"
}
```

### 5.5 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_INVALID | 401 | Invalid authentication token |
| AUTH_EXPIRED | 401 | Authentication token expired |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| VALIDATION_ERROR | 400 | Invalid input data |
| NOT_FOUND | 404 | Resource not found |
| INTERNAL_ERROR | 500 | Internal server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |

---

## 6. AI/LLM Integration

### 6.1 Vertex AI Integration

**Model:** Google Gemini Pro (for content generation and conversation)

**Reason:** Native GCP integration, vernacular support, cost-effective

### 6.2 Prompt Engineering

#### System Prompt

```
You are a friendly, helpful AI marketing assistant for home-based D2C sellers in India.
Your goal is to help sellers create content, run campaigns, and grow their business through
simple conversation.

Guidelines:
- Be friendly and casual, use Hinglish where natural
- Keep messages under 100 words
- Use 1-2 emojis per message, not more
- Explain "why" before asking
- Give specific examples
- Celebrate successes
- Never use marketing jargon (CTR, ROAS, etc.)
- Always suggest, never decide without user approval
- Learn from user feedback and adapt your tone

Context about the seller:
- Business type: {business_type}
- Location: {location}
- Average order value: {avg_order_value}
- Communication style: {tone_preference}

Always maintain the seller's personal touch. They value authenticity over salesy marketing.
```

#### Content Generation Prompt

```
Generate a social media post for a {business_type} in {location}.

Product: {product_name}
Key Features: {features}
Target Audience: {target_audience}
Tone: {tone}

Requirements:
- Caption under 100 words
- 5-10 relevant hashtags
- Include 1-2 emojis
- Feel authentic and personal, not salesy
- Include a clear call-to-action

Format your response as JSON:
{
  "caption": "...",
  "hashtags": ["#", "#", ...],
  "suggested_time": "HH:MM AM/PM",
  "reasoning": "Why this will work..."
}
```

#### Campaign Message Prompt

```
Generate a promotional message for {campaign_type}.

Business: {business_name}
Offer: {offer_details}
Target: {target_customers}
Tone: {tone}

Requirements:
- Under 80 words
- Personal feel, mention customer's name where possible
- Clear call-to-action
- Include festival/occasion relevance if applicable

Format as plain text.
```

### 6.3 Response Processing

```go
// Example response processing
type AIResponse struct {
    Caption       string   `json:"caption"`
    Hashtags      []string `json:"hashtags"`
    SuggestedTime string   `json:"suggested_time"`
    Reasoning     string   `json:"reasoning"`
}

func ProcessAIResponse(raw string) (*AIResponse, error) {
    // Parse JSON from LLM response
    var response AIResponse
    err := json.Unmarshal([]byte(raw), &response)
    if err != nil {
        return nil, err
    }

    // Validate response
    if len(response.Caption) > 150 {
        response.Caption = response.Caption[:150] + "..."
    }

    if len(response.Hashtags) > 10 {
        response.Hashtags = response.Hashtags[:10]
    }

    return &response, nil
}
```

### 6.4 Context Management

```go
type ConversationContext struct {
    UserID         string
    BusinessType   string
    Location       string
    TonePreference string
    RecentPosts    []string
    UserPreferences map[string]interface{}
}

func BuildPrompt(userPrompt string, context ConversationContext) string {
    return fmt.Sprintf(`
        %s

        User says: %s

        Context:
        - Business: %s
        - Location: %s
        - Recent posts: %v
    `, systemPrompt, userPrompt, context.BusinessType, context.Location, context.RecentPosts)
}
```

---

## 7. Third-Party Integrations

### 7.1 WhatsApp Business API

#### Integration Points

| Function | Endpoint | Description |
|----------|----------|-------------|
| Send Message | POST /messages | Send text/media message |
| Get Status | GET /messages/{id} | Get message delivery status |
| Webhook | POST /webhook | Receive incoming messages |
| Get Templates | GET /message_templates | Get approved templates |

#### Message Sending Flow

```
1. User approves content in app
2. App calls POST /content/approve
3. Backend creates scheduled content record
4. Scheduler triggers at scheduled time
5. Backend calls WhatsApp API to send message
6. WhatsApp API returns message ID
7. Backend updates message status
8. Webhook receives delivery/read status
9. Backend updates message status
10. App displays updated status to user
```

#### Rate Limits

- WhatsApp Business API: 1,000 conversations per day (free tier)
- Implement queue system for high-volume sending
- Prioritize time-sensitive messages

### 7.2 Instagram Graph API (Post-MVP)

#### Integration Points

| Function | Endpoint | Description |
|----------|----------|-------------|
| Create Media | POST /{ig-user-id}/media | Create media container |
| Publish Media | POST /{ig-user-id}/media_publish | Publish media post |
| Get Insights | GET /{ig-media-id}/insights | Get post performance |

#### Implementation Notes

- Requires Instagram Business account
- Requires app review and permissions
- Implement media upload to Cloud Storage first
- Use Cloud Storage URL for Instagram media upload

---

## 8. Security Architecture

### 8.1 Authentication Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Enter phone number
     ▼
┌─────────┐
│ Flutter │
│  App    │
└────┬────┘
     │
     │ 2. Request OTP
     ▼
┌─────────────┐
│ Firebase    │
│   Auth      │
└──────┬──────┘
       │
       │ 3. Send OTP via SMS
       ▼
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 4. Enter OTP
     ▼
┌─────────┐
│ Flutter │
│  App    │
└────┬────┘
     │
     │ 5. Verify OTP
     ▼
┌─────────────┐
│ Firebase    │
│   Auth      │
└──────┬──────┘
       │
       │ 6. Return auth token
       ▼
┌─────────┐
│ Flutter │
│  App    │
└────┬────┘
     │
     │ 7. Store token, make API calls
     ▼
┌─────────────┐
│ Cloud Run   │
│  Backend    │
└─────────────┘
```

### 8.2 Authorization

| Role | Permissions |
|------|-------------|
| **User** | Create content, view own analytics, manage profile |
| **Admin** | View all users, manage content moderation, access analytics |
| **System** | Background tasks, webhooks, scheduled jobs |

### 8.3 Data Encryption

| Data Type | At Rest | In Transit |
|-----------|---------|------------|
| User data | Firestore encryption | TLS 1.3 |
| Messages | Firestore encryption | TLS 1.3 |
| Media | Cloud Storage encryption | TLS 1.3 |
| API keys | Secret Manager | TLS 1.3 |
| Logs | Cloud Logging encryption | TLS 1.3 |

### 8.4 API Security

- Rate limiting per user (100 requests/minute)
- Request signing for sensitive operations
- IP whitelisting for webhooks
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention (output encoding)

### 8.5 Privacy & Compliance

- GDPR-compliant data handling
- User data export capability
- Right to deletion
- Clear privacy policy
- Data retention policies (30 days for logs, 1 year for analytics)

---

## 9. Scalability Strategy

### 9.1 Horizontal Scaling

| Component | Scaling Strategy |
|-----------|------------------|
| **Cloud Run Services** | Auto-scaling based on request volume (0 to N instances) |
| **Firestore** | Automatic scaling, no manual intervention needed |
| **Cloud Storage** | Virtually unlimited, auto-scaling |
| **Vertex AI** | Pay-per-token, scales with usage |

### 9.2 Caching Strategy

| Cache Layer | Purpose | TTL |
|-------------|---------|-----|
| **In-memory (Redis)** | Frequently accessed user data | 1 hour |
| **CDN (Cloud CDN)** | Static assets, images | 24 hours |
| **Firestore Query Cache** | Repeated queries | 5 minutes |

### 9.3 Database Optimization

- Use composite indexes for frequent queries
- Implement pagination for large result sets
- Denormalize where read performance is critical
- Use sub-collections for related data
- Implement soft deletes instead of hard deletes

### 9.4 Cost Optimization

| Area | Strategy |
|------|----------|
| **Cloud Run** | Set appropriate min/max instances, use CPU allocation |
| **Firestore** | Optimize reads/writes, use caching |
| **Vertex AI** | Cache common prompts, use smaller model where possible |
| **Cloud Storage** | Use lifecycle policies for old media |
| **WhatsApp API** | Implement smart batching, avoid duplicate sends |

---

## 10. Deployment Architecture

### 10.1 Environment Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      ENVIRONMENTS                          │
└─────────────────────────────────────────────────────────────┘

Development (dev)
  ├── Firebase Project: ordersfirst-dev
  ├── GCP Project: ordersfirst-dev
  └── Branch: develop

Staging (staging)
  ├── Firebase Project: ordersfirst-staging
  ├── GCP Project: ordersfirst-staging
  └── Branch: staging

Production (prod)
  ├── Firebase Project: ordersfirst-prod
  ├── GCP Project: ordersfirst-prod
  └── Branch: main
```

### 10.2 CI/CD Pipeline

```
┌─────────┐
│  Push   │
│ to Git  │
└────┬────┘
     │
     ▼
┌─────────────────┐
│ Cloud Build     │
│ (Triggered)     │
└────────┬────────┘
         │
         ├─► Run Tests
         │
         ├─► Build Docker Image
         │
         ├─► Push to Artifact Registry
         │
         └─► Deploy to Cloud Run
                 │
                 ▼
         ┌─────────────────┐
         │  Auto-scaling   │
         │  Instances      │
         └─────────────────┘
```

### 10.3 Infrastructure as Code

```yaml
# cloudbuild.yaml
steps:
  # Install dependencies
  - name: 'gcr.io/cloud-builders/go'
    args: ['mod', 'download']

  # Run tests
  - name: 'gcr.io/cloud-builders/go'
    args: ['test', './...']

  # Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/ordersfirst-api:$COMMIT_SHA', '.']

  # Push to Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/ordersfirst-api:$COMMIT_SHA']

  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'ordersfirst-api'
      - '--image'
      - 'gcr.io/$PROJECT_ID/ordersfirst-api:$COMMIT_SHA'
      - '--platform'
      - 'managed'
      - '--region'
      - 'asia-south1'
      - '--allow-unauthenticated'
```

---

## 11. Monitoring & Observability

### 11.1 Metrics to Track

| Category | Metric | Target |
|----------|--------|--------|
| **Performance** | API response time (p95) | < 500ms |
| **Performance** | API response time (p99) | < 1s |
| **Performance** | App load time | < 3s |
| **Reliability** | Uptime | > 99.5% |
| **Reliability** | Error rate | < 0.1% |
| **Business** | Daily active users | Track growth |
| **Business** | Content suggestions accepted | > 70% |
| **Business** | Average orders per user | Track growth |

### 11.2 Logging Strategy

- Structured logging (JSON format)
- Log levels: DEBUG, INFO, WARNING, ERROR
- Include correlation IDs for request tracing
- Log sensitive data only in hashed form
- Retention: 30 days in Cloud Logging

### 11.3 Alerting

| Alert | Condition | Severity |
|-------|-----------|----------|
| High Error Rate | Error rate > 1% for 5 min | Critical |
| High Latency | p95 latency > 2s for 5 min | Warning |
| Service Down | Health check fails | Critical |
| Low Disk Space | Disk usage > 80% | Warning |
| High Cost | Daily cost > threshold | Info |

### 11.4 Dashboards

**Key Dashboards:**
1. **System Health** - Uptime, latency, error rates
2. **API Performance** - Request rate, response times, error breakdown
3. **Business Metrics** - Active users, content generation, orders
4. **Cost Tracking** - Cloud Run, Firestore, Vertex AI costs

---

## End of Architecture Document

**Version:** 1.0
**Date:** 2026-04-25
**Status:** Approved for Development
