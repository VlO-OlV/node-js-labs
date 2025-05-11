DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS "Order";
DROP TYPE IF EXISTS Order_Status_Type;
DROP TABLE IF EXISTS MenuItem;

CREATE TABLE MenuItem
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(30)  NOT NULL,
    description TEXT         NULL,
    price       INT          NOT NULL DEFAULT 0,
    image       VARCHAR(200) NULL
);

CREATE TYPE Order_Status_Type AS ENUM ('New', 'Pending', 'In Progress', 'Completed');

CREATE TABLE "Order"
(
    id           SERIAL PRIMARY KEY,
    customerName VARCHAR(20)       NOT NULL,
    status       Order_Status_Type NOT NULL
);

CREATE TABLE OrderItem
(
    id         SERIAL PRIMARY KEY,
    orderId    INT NOT NULL,
    menuItemId INT NOT NULL,
    amount     INT NOT NULL,
    FOREIGN KEY (menuItemId) REFERENCES MenuItem (id),
    FOREIGN KEY (orderId) REFERENCES "Order" (id)
);
