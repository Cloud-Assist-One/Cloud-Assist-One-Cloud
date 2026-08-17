# Deploying Cloud Assist One to IIS

## 1. Enable IIS (if not already installed)
- Windows Server: Server Manager → Add Roles and Features → Web Server (IIS)
- Windows 10/11: Control Panel → Programs → Turn Windows features on or off → check "Internet Information Services"

## 2. Copy site files
Copy the entire project folder contents (`index.html`, `css/`, `js/`, `assets/`, `web.config`) into your IIS site folder, e.g.:

```
C:\inetpub\wwwroot\cloudassistone\
```

## 3. Create the site in IIS Manager
1. Open **IIS Manager** (`inetmgr`)
2. Right-click **Sites** → **Add Website**
3. Site name: `Cloud Assist One`
4. Physical path: `C:\inetpub\wwwroot\cloudassistone`
5. Binding: choose port 80 (or 443 with a certificate) and your hostname
6. Click **OK**

## 4. Verify
- Browse to `http://localhost` (or your bound hostname) and confirm the homepage loads
- Confirm the mobile menu, smooth scrolling, and the "Get Started" / footer email & phone links work

## 5. (Optional) HTTPS
Bind a TLS certificate under **Bindings → Add → https** once you have a certificate for your domain.

No app pool changes and no .NET runtime are required — this is a static HTML/CSS/JS site.
