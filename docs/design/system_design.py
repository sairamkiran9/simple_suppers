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

# Updated version of your food delivery system using a layered architecture

from enum import Enum
from typing import Dict, Optional
import uuid


# --- Enums ---
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


# --- Models ---
class Address:
    def __init__(self, street: str, city: str, state: str, zip_code: str):
        self.street = street
        self.city = city
        self.state = state
        self.zip_code = zip_code

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"


class Person:
    def __init__(self, firstname: str, lastname: str, email: str, phone: str):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.phone = phone
        self.address: Optional[Address] = None

    def add_address(self, address: Address):
        self.address = address


class MenuItem:
    def __init__(self, name: str, price: float, description: str = "", max_limit: int = 100):
        self.name = name
        self.price = price
        self.description = description
        self.max_limit = max_limit


class Menu:
    def __init__(self):
        self.items: Dict[str, MenuItem] = {}

    def add_item(self, item: MenuItem):
        if item.name in self.items:
            raise ValueError(f"{item.name} already exists in menu.")
        self.items[item.name] = item

    def get_item(self, name: str) -> MenuItem:
        return self.items.get(name)

    def get_all_items(self):
        return self.items


class Producer:
    def __init__(self, person: Person, license_number: str):
        self.person = person
        self.license_number = license_number
        self.menu = Menu()


class Consumer:
    def __init__(self, person: Person):
        self.person = person


class Order:
    def __init__(self, order_id: str, consumer: Consumer, items: Dict[str, int], total_price: float):
        self.order_id = order_id
        self.consumer = consumer
        self.items = items
        self.total_price = total_price
        self.status = OrderStatus.PENDING


# --- Repositories ---
class OrderRepository:
    def __init__(self):
        self.orders: Dict[str, Order] = {}

    def save(self, order: Order):
        self.orders[order.order_id] = order
        return order

    def get(self, order_id: str) -> Optional[Order]:
        return self.orders.get(order_id)


# --- Services ---
class OrderService:
    def __init__(self, order_repo: OrderRepository):
        self.order_repo = order_repo

    def place_order(self, consumer: Consumer, producer: Producer, items: Dict[str, int]) -> Order:
        total_price = 0
        for name, qty in items.items():
            menu_item = producer.menu.get_item(name)
            if not menu_item:
                raise ValueError(f"Item '{name}' not found in producer's menu.")
            if qty > menu_item.max_limit:
                raise ValueError(f"Cannot order more than {menu_item.max_limit} of {name}.")
            total_price += menu_item.price * qty

        order_id = str(uuid.uuid4())
        order = Order(order_id, consumer, items, total_price)
        return self.order_repo.save(order)

    def complete_order(self, order_id: str):
        order = self.order_repo.get(order_id)
        if not order:
            raise ValueError("Order not found.")
        order.status = OrderStatus.DELIVERED
        return order


# --- System Coordinator ---
class System:
    def __init__(self):
        self.producers: Dict[str, Producer] = {}
        self.consumers: Dict[str, Consumer] = {}
        self.order_repo = OrderRepository()
        self.order_service = OrderService(self.order_repo)

    def add_producer(self, producer: Producer):
        self.producers[producer.license_number] = producer

    def add_consumer(self, consumer: Consumer):
        self.consumers[consumer.person.email] = consumer

    def place_order(self, consumer_email: str, license_number: str, items: Dict[str, int]) -> Order:
        consumer = self.consumers.get(consumer_email)
        producer = self.producers.get(license_number)
        if not consumer or not producer:
            raise ValueError("Invalid consumer or producer.")
        return self.order_service.place_order(consumer, producer, items)

    def complete_order(self, order_id: str) -> Order:
        return self.order_service.complete_order(order_id)


# --- Demo App ---
class SimpleSuppersDemo:
    def __init__(self):
        self.system = System()

    def run_demo(self):
        # Create people and address
        p1 = Person("Sri", "sri@gmail.com", "123-456-7890")
        p2 = Person("John", "john@gmail.com", "987-654-3210")
        p1.add_address(Address("W Tharpe St", "Tallahassee", "FL", "32305"))
        p2.add_address(Address("456 Elm St", "Springfield", "IL", "62701"))

        # Set up producer
        producer = Producer(p1, "LIC123")
        producer.menu.add_item(MenuItem("Pizza", 12.99, "Cheese pizza", 50))
        producer.menu.add_item(MenuItem("Burger", 8.99, "Beef burger", 30))
        self.system.add_producer(producer)

        # Set up consumer
        consumer = Consumer(p2)
        self.system.add_consumer(consumer)

        # Place order
        order = self.system.place_order("john@gmail.com", "LIC123", {"Pizza": 2, "Burger": 1})
        print(f"Order placed: {order.order_id}, Total: ${order.total_price}, Status: {order.status.name}")

        # Complete order
        updated_order = self.system.complete_order(order.order_id)
        print(f"Order completed: {updated_order.order_id}, Status: {updated_order.status.name}")


# Run the updated demo
SimpleSuppersDemo().run_demo()
