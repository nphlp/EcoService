| Tables       | Attributes                                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| User         | **id_user**, name, lastname, email, emailVerified, image, role, phone, stripeId, stripeConnectId, isOnboarded, isSeller                             |
| Order        | **id_order**, orderNumber, orderStatus, paymentStatus, `#id_user`                                                                                   |
| Category     | **id_category**, name, description, slug                                                                                                            |
| Content      | **id_content**, content, image                                                                                                                      |
| Address      | **id_adress**, address, postal, city, country, isDefault, `#id_user`                                                                                |
| Account      | **id_account**, accountId, providerId, accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, scope, idToken, password, `#id_user` |
| Session      | **id_session**, token, expiresAt, ipAddress, userAgent, `#id_user`                                                                                  |
| Verification | **id_verification**, identifier, value                                                                                                              |
| Product      | **id_product**, name, description, image, price, stock, slug, `#id_user`, `#id_category*`                                                           |
| Diy          | **id_diy**, title, slug, `#id_user`, `#id_content*`                                                                                                 |
| Article      | **id_article**, title, slug, `#id_user`, `#id_content*`                                                                                             |
| Quantities   | `#id_product`, `#id_order`, quantity                                                                                                                |
