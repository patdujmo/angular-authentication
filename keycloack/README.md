# Install Keycloak

# Documentation: `https://www.keycloak.org/getting-started/getting-started-docker`

# Run keycloak
```
docker run -p 8081:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.0 start-dev
```

# Create a realm
A realm is similar to a tenant.
1. Click on burger menu
2. Manage realms
3. Create realm
4. Write your realm name, e.g. `myapp`
5. Click create

# Create a user
The realm has initially no users. Create a user
1. Click users
2. Create new user
3. Fill the forn following values:
  - Username: myuser
  - First name: Joe
  - Last name: Doe
4. Create
5. Click credentials
  - set a password
  - set temporary to off
  - save password


# Secure Application
Register the application
1. Click admin console
2. Click clients
3. Create clients
4. Fill in:
  - Client type: OpenID Connect
  - Client ID: myclient
5. Click next
6. Enable Standard Flow
7. Set `valid redirect URIs`: http://localhost:4200/home
8. Set Web origins: http://localhost:4200
9. Click save

For running in production please read the documentation and set up a PostgreSQL.