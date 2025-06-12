-- Person Table
CREATE TABLE Person (
    person_id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50)
);

-- Address Table
CREATE TABLE Address (
    address_id SERIAL PRIMARY KEY,
    person_id INT REFERENCES Person(person_id),
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20)
);

-- Producer Table
CREATE TABLE Producer (
    producer_id SERIAL PRIMARY KEY,
    person_id INT REFERENCES Person(person_id),
    license_number VARCHAR(100) UNIQUE NOT NULL
);

-- Consumer Table
CREATE TABLE Consumer (
    consumer_id SERIAL PRIMARY KEY,
    person_id INT REFERENCES Person(person_id)
);

-- MenuItem Table
CREATE TABLE MenuItem (
    item_id SERIAL PRIMARY KEY,
    producer_id INT REFERENCES Producer(producer_id),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description VARCHAR(255),
    max_limit INT DEFAULT 100
);

CREATE TABLE OrderStatus (
    status VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255)
);


-- Order Table
CREATE TABLE Order (
    order_id SERIAL PRIMARY KEY,
    consumer_id INT REFERENCES Consumer(consumer_id),
    total_price NUMERIC(10,2),
    status VARCHAR(50) REFERENCES OrderStatus(status)
);


-- OrderItem Table
CREATE TABLE OrderItem (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Order(order_id),
    item_id INT REFERENCES MenuItem(item_id),
    quantity INT
);
