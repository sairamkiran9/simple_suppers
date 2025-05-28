"""
1. You need a platform to bridge gap between the producer and consumer
2. producer takes care of food
3. consumer purchases food they want
4. producer and consumer are not aware of each other
5. system takes care of logistics like payment, order delivery, etc.


SimpleSuppers()

p1, p2, p3 = Producer()
Producer()
- valid license or verification
- menu of food they make, price, max limit 
- order requested
- order produced

c1, c2, c3 = Consumer()
Consumer()
- payment method
- order food
- order history
- order status
- order delivery
- order cancellation
- order tracking
- subscription # secondary


Admin()

System()
- manage producers
- manage consumers
- manage orders
- manage payments
- manage subscriptions
- manage delivery


key components:
producer
consumer
menu
order
system

"""


from collections import defaultdict
from typing import Dict, Optional
from enum import Enum

# Enums
class PaymentStatus(Enum):
    PENDING = "Pending"
    COMPLETED = "Completed"
    FAILED = "Failed"
    REFUNDED = "Refunded"
    
class OrderStatus(Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    DELIVERED = "Delivered"
    CANCELLED = "Cancelled"
    
class OrderType(Enum):
    DELIVERY = "Delivery"
    # PICKUP = "Pickup" # no pickup for now, only delivery


# Address
class Address:
    def __init__(self, street: str, city: str, state: str, zip_code: str):
        self.street = street
        self.city = city
        self.state = state
        self.zip_code = zip_code

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"

# Person
class Person:
    def __init__(self, name: str, email: str, phone: str):
        self.name = name
        self.email = email
        self.phone = phone
        self.address: Optional[Address] = None

    def add_address(self, address: Address):
        self.address = address

    def __str__(self):
        return f"{self.name} ({self.email}, {self.phone}) - {self.address}"

# MenuItem
class MenuItem:
    def __init__(self, name: str, price: float, description: str = "", max_limit: int = 100):
        self.name = name
        self.price = price
        self.description = description
        self.max_limit = max_limit

    def __str__(self):
        return f"{self.name}: ${self.price} ({self.description})"
    
# Menu (Holds MenuItems for a Producer)
class Menu:
    def __init__(self):
        self.items: Dict[str, MenuItem] = {}

    def add_item(self, item: MenuItem):
        if item.name in self.items:
            raise ValueError(f"{item.name} already exists in menu.")
        self.items[item.name] = item

    def get_items(self):
        return self.items

    def __str__(self):
        return "\n".join(str(item) for item in self.items.values())

# Producer
class Producer:
    def __init__(self, person: Person, license_number: str):
        self.person = person
        self.license_number = license_number
        self.menu = Menu()

    def add_menu_item(self, item: MenuItem):
        self.menu.add_item(item)

    def produce_order(self, order):
        print(f"Producing order {order.order_id} for {order.consumer.person.name}: {order.items}")
        order.status = "Completed"

# Order
class Order:
    def __init__(self, order_id: str, consumer, items: Dict[str, int], total_price: float):
        self.order_id = order_id
        self.consumer = consumer
        self.items = items
        self.total_price = total_price
        self.status = "Pending"

    def __str__(self):
        return f"Order {self.order_id} for {self.consumer.person.name}: {self.items}, Total: ${self.total_price}, Status: {self.status}"

# Consumer
class Consumer:
    def __init__(self, person: Person):
        self.person = person
        self.orders = []

    def order_food(self, producer: Producer, items: Dict[str, int]):
        total_price = 0
        for name, qty in items.items():
            if name not in producer.menu.get_items():
                raise ValueError(f"{name} not in menu.")
            menu_item = producer.menu.get_items()[name]
            if qty > menu_item.max_limit:
                raise ValueError(f"Cannot order more than {menu_item.max_limit} of {name}.")
            total_price += menu_item.price * qty

        order_id = f"ORD{len(self.orders)+1}"
        order = Order(order_id, self, items, total_price)
        self.orders.append(order)
        print(f"Order placed: {order}")
        return order

# System
class System:
    def __init__(self):
        self.producers = {}
        self.consumers = {}

    def add_producer(self, producer: Producer):
        self.producers[producer.license_number] = producer

    def add_consumer(self, consumer: Consumer):
        self.consumers[consumer.person.email] = consumer

# Demo
class SimpleSuppersDemo:
    def __init__(self):
        self.system = System()

    def run_demo(self):
        # Create people and addresses
        p1 = Person("Sri", "sri@gmail.com", "123-456-7890")
        p2 = Person("John", "john@gmail.com", "987-654-3210")
        p1.add_address(Address("W Tharpe St", "Tallahassee", "FL", "32305"))
        p2.add_address(Address("456 Elm St", "Springfield", "IL", "62701"))

        # Producer setup
        producer = Producer(p1, "LIC123")
        producer.add_menu_item(MenuItem("Pizza", 12.99, "Cheese pizza", 50))
        producer.add_menu_item(MenuItem("Burger", 8.99, "Beef burger", 30))
        self.system.add_producer(producer)

        # Print menu
        print(f"\nMenu for {producer.person.name}:\n{producer.menu}")

        # Consumer places order
        consumer = Consumer(p2)
        self.system.add_consumer(consumer)
        order = consumer.order_food(producer, {"Pizza": 2, "Burger": 1})

        # Producer processes order
        producer.produce_order(order)

# Run the demo
SimpleSuppersDemo().run_demo()