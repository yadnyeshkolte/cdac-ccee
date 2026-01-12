---
layout: default
title: Web Architecture
parent: Module 3 - Web Technologies
nav_order: 1
---

# Session 1: Architecture of the Web

## 📚 Brief History of the Internet


| Year | Event |
|------|-------|
| 1969 | ARPANET - First network connecting 4 universities |
| 1983 | TCP/IP protocol adopted |
| 1989 | Tim Berners-Lee invents the World Wide Web at CERN |
| 1991 | First website goes live |
| 1993 | Mosaic browser released |
| 1995 | JavaScript, PHP introduced |
| 2000s | Web 2.0, AJAX, Social Media era |
| 2010s | Mobile-first, HTML5, CSS3, Modern frameworks |

---

## 🌐 How Does the Internet Work?

The Internet is a **global network of interconnected computers** that communicate using standardized protocols.

### Key Components:
1. **Client** - Your browser (Chrome, Firefox, Safari)
2. **Server** - Computer hosting websites
3. **Router** - Directs traffic between networks
4. **ISP** - Internet Service Provider connects you to the Internet
5. **DNS** - Translates domain names to IP addresses

### Data Flow:
```
User Request → Browser → ISP → DNS → Server → Response → Browser → User
```

---

## 📡 Internet Protocol (IP)

**IP Address** - Unique numerical address for every device on the Internet.


| Version | Format | Example |
|---------|--------|---------|
| IPv4 | 32-bit (4 octets) | `192.168.1.1` |
| IPv6 | 128-bit (8 groups) | `2001:0db8:85a3:0000:0000:8a2e:0370:7334` |

### Port Numbers:

| Port | Protocol/Service |
|------|------------------|
| 80 | HTTP |
| 443 | HTTPS |
| 21 | FTP |
| 22 | SSH |
| 25 | SMTP (Email) |
| 3306 | MySQL |

---

## 🔗 Domain Names & DNS

**DNS (Domain Name System)** - The "phonebook" of the Internet that translates human-readable domain names to IP addresses.

### Domain Name Structure:
```
https://www.example.com:443/path/page.html
└─┬─┘   └┬┘ └───┬───┘└─┬┘└──────┬──────┘
Protocol│   Domain  Port    Path
      Subdomain
```

### Domain Hierarchy:
```
.com (TLD - Top Level Domain)
  └── example (Second Level Domain)
        └── www (Subdomain)
```

### Common TLDs:

| TLD | Purpose |
|-----|---------|
| .com | Commercial |
| .org | Organizations |
| .edu | Educational |
| .gov | Government |
| .in | India (Country Code) |
| .io | Tech startups (Originally British Indian Ocean Territory) |

### DNS Resolution Process:
1. Browser checks local cache
2. OS checks hosts file
3. Query to DNS Resolver (ISP)
4. Query to Root DNS Server
5. Query to TLD DNS Server
6. Query to Authoritative DNS Server
7. IP address returned to browser

---

## 📋 HTTP Protocol

**HTTP (HyperText Transfer Protocol)** - Application layer protocol for transmitting hypermedia documents.

### HTTP Versions Comparison:


| Feature | HTTP/1.0 | HTTP/1.1 | HTTP/2.0 |
|---------|----------|----------|----------|
| Connections | New connection per request | Persistent connections (Keep-Alive) | Multiplexing (single connection) |
| Request Pipelining | ❌ No | ✅ Yes (limited) | ✅ Yes (improved) |
| Header Compression | ❌ No | ❌ No | ✅ Yes (HPACK) |
| Server Push | ❌ No | ❌ No | ✅ Yes |
| Binary Protocol | ❌ Text | ❌ Text | ✅ Binary |
| Stream Priority | ❌ No | ❌ No | ✅ Yes |

---

## 📨 HTTP Methods (Verbs)


| Method | Purpose | Idempotent | Safe | Request Body |
|--------|---------|------------|------|--------------|
| **GET** | Retrieve data | ✅ Yes | ✅ Yes | ❌ No |
| **POST** | Submit data (create) | ❌ No | ❌ No | ✅ Yes |
| **PUT** | Update/Replace resource | ✅ Yes | ❌ No | ✅ Yes |
| **PATCH** | Partial update | ❌ No | ❌ No | ✅ Yes |
| **DELETE** | Remove resource | ✅ Yes | ❌ No | Optional |
| **HEAD** | GET without body (headers only) | ✅ Yes | ✅ Yes | ❌ No |
| **OPTIONS** | Get supported methods | ✅ Yes | ✅ Yes | ❌ No |

### GET vs POST:


| Aspect | GET | POST |
|--------|-----|------|
| Data Location | URL query string | Request body |
| Data Visibility | Visible in URL | Hidden in body |
| Data Length | Limited (~2048 chars) | No limit |
| Caching | Can be cached | Not cached |
| Bookmarking | Can be bookmarked | Cannot be bookmarked |
| Security | Less secure | More secure |
| Idempotent | Yes | No |

---

## 📊 HTTP Status Codes

### Categories:


| Range | Category | Meaning |
|-------|----------|---------|
| 1xx | Informational | Request received, continuing |
| 2xx | Success | Request successfully received |
| 3xx | Redirection | Further action needed |
| 4xx | Client Error | Bad request from client |
| 5xx | Server Error | Server failed to fulfill request |

### Important Status Codes:


| Code | Message | Description |
|------|---------|-------------|
| **100** | Continue | Server received headers, client should proceed |
| **200** | OK | Request succeeded |
| **201** | Created | Resource created successfully |
| **204** | No Content | Success but no content to return |
| **301** | Moved Permanently | Resource permanently moved (SEO friendly) |
| **302** | Found | Temporary redirect |
| **304** | Not Modified | Use cached version |
| **400** | Bad Request | Invalid request syntax |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Access denied |
| **404** | Not Found | Resource doesn't exist |
| **405** | Method Not Allowed | HTTP method not supported |
| **500** | Internal Server Error | Server error |
| **502** | Bad Gateway | Invalid response from upstream server |
| **503** | Service Unavailable | Server temporarily unavailable |
| **504** | Gateway Timeout | Upstream server timeout |

---

## 🔄 HTTP Session & Stateless Nature

### Stateless Protocol:
- HTTP doesn't remember previous requests
- Each request is independent
- Server doesn't maintain client state

### Why Stateless?
- Scalability - Any server can handle any request
- Simplicity - No need to manage state
- Reliability - Failed requests don't affect others

### Maintaining State:


| Technique | Storage | Duration | Size Limit |
|-----------|---------|----------|------------|
| **Cookies** | Browser | Configurable | 4KB per cookie |
| **Session** | Server | Until logout/timeout | No limit |
| **LocalStorage** | Browser | Permanent | 5-10MB |
| **SessionStorage** | Browser | Tab session | 5-10MB |
| **URL Parameters** | URL | Per request | ~2048 chars |

### Session Management:
```
1. Client sends login request
2. Server creates session ID
3. Server sends session ID in cookie
4. Client sends cookie with every request
5. Server validates session ID
```

---

## 🔒 HTTPS (HTTP Secure)

**HTTPS = HTTP + TLS/SSL encryption**

### How HTTPS Works:
```
1. Client requests HTTPS connection
2. Server sends SSL certificate
3. Client verifies certificate
4. Client/Server negotiate encryption
5. Secure encrypted communication begins
```

### SSL/TLS Handshake:
1. **Client Hello** - Supported cipher suites, random number
2. **Server Hello** - Selected cipher suite, random number, certificate
3. **Key Exchange** - Pre-master secret exchange
4. **Finish** - Both sides confirm secure connection

### HTTPS Benefits:
- **Encryption** - Data cannot be read in transit
- **Integrity** - Data cannot be modified
- **Authentication** - Verify server identity
- **SEO** - Google ranks HTTPS sites higher

---

## 🖥️ Web Servers

A **Web Server** is software that serves web content to clients.

### Popular Web Servers:


| Server | Platform | Key Features |
|--------|----------|--------------|
| **Apache HTTP Server** | Cross-platform | Open source, .htaccess, modules |
| **Nginx** | Cross-platform | High performance, reverse proxy, load balancing |
| **IIS (Internet Information Services)** | Windows | ASP.NET integration, GUI management |
| **LiteSpeed** | Cross-platform | Apache compatible, high performance |
| **Node.js** | Cross-platform | JavaScript runtime, event-driven |

### Apache vs Nginx:


| Feature | Apache | Nginx |
|---------|--------|-------|
| Architecture | Process-based | Event-driven |
| Static Content | Slower | Faster |
| Dynamic Content | Better (mod_php) | Requires proxy |
| Configuration | .htaccess (flexible) | Central config |
| Memory Usage | Higher | Lower |

---

## 🏗️ Web Architecture Patterns

### Client-Server Architecture:
```
┌─────────┐    HTTP Request    ┌─────────┐
│ Client  │ ─────────────────► │ Server  │
│(Browser)│ ◄───────────────── │  (Web)  │
└─────────┘   HTTP Response    └─────────┘
```

### Three-Tier Architecture:
```
┌─────────────┐   ┌──────────────┐   ┌──────────┐
│ Presentation│──►│ Application  │──►│ Database │
│   (UI/UX)   │   │   (Logic)    │   │  (Data)  │
└─────────────┘   └──────────────┘   └──────────┘
```

### MVC (Model-View-Controller):
```
        User
          │
          ▼
    ┌───────────┐
    │   View    │ ◄──────────────┐
    └───────────┘                │
          │                      │
          ▼                      │
    ┌───────────┐          ┌───────────┐
    │ Controller│ ────────►│   Model   │
    └───────────┘          └───────────┘
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **HTTP is stateless** - doesn't remember previous requests
2. **Port 80** = HTTP, **Port 443** = HTTPS
3. **GET** - retrieve data, **POST** - submit data
4. **200** = OK, **404** = Not Found, **500** = Server Error
5. **DNS** translates domain names to IP addresses
6. **HTTP/2** supports multiplexing and header compression
7. **HTTPS** uses TLS/SSL for encryption
8. **Nginx** is event-driven, **Apache** is process-based
9. **Cookie** max size = 4KB, **LocalStorage** = 5-10MB
10. **301** = Permanent redirect, **302** = Temporary redirect
