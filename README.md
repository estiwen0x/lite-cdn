# LITE-CDN

A simple, zero-dependency image hosting utility for custom domain assets.

### Why this exists
I got tired of configuring Nginx or using heavy third-party services for simple things. Needed a lightweight way to host assets on my own domain with automatic Discord/Twitter embed support.

### How it works
It's a straightforward Node.js + Express setup. Handles file uploads via ShareX and serves them with minimal overhead. It injects the necessary OpenGraph meta tags on the fly so your links look clean in chats.

### Tech stack
- **Node.js**
- **Express**
- **Multer** (for handling binary data)

### Usage
1. `npm install`
2. Configure your `host_url` in `server.js`.
3. `node server.js`

*Note: You'll need to set up a reverse proxy or point your domain to the port if you want it live.*

---

### Project Structure


```text
lite-cdn/
├── src/
│   ├── server.js     
├── package.json     
├── LICENSE
└── README.md
