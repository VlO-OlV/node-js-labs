DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TYPE IF EXISTS order_status;
DROP TABLE IF EXISTS menu_items;

CREATE TABLE menu_items
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(30)  NOT NULL,
    description TEXT         NULL,
    price       INT          NOT NULL DEFAULT 0,
    image       VARCHAR(200) NULL
);

CREATE TYPE order_status AS ENUM ('New', 'Pending', 'In Progress', 'Completed');

CREATE TABLE orders
(
    id           SERIAL PRIMARY KEY,
    customer_name VARCHAR(20)       NOT NULL,
    status       order_status NOT NULL DEFAULT 'New'
);

CREATE TABLE order_items
(
    id         SERIAL PRIMARY KEY,
    order_id    INT NOT NULL,
    menu_item_id INT NOT NULL,
    amount     INT NOT NULL,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items (id),
    FOREIGN KEY (order_id) REFERENCES orders (id)
);
