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
- order request
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
from typing import List, Dict, Optional

class Address:
    def __init__(self, street: str, city: str, state: str, zip_code: str):
        self.street = street
        self.city = city
        self.state = state
        self.zip_code = zip_code

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"
        
class Person:
    def __init__(self, name: str, email: str, phone: str):
        self.name = name
        self.email = email
        self.phone = phone
        self.address = {}
        
    def add_address(self, address: Address):
        self.address = address
        
    def update_address(self, **kwargs):
        for key, value in kwargs.items():
            if key in self.address:
                self.address[key] = value
            else:
                raise KeyError(f"'{key}' is not a valid attribute for address.")

    def __str__(self):
        return f"{self.name} ({self.email}, {self.phone}) - {self.address}"

from enum import Enum
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

class OrderContext:
    def __init__(self, order_id: str, order_type: OrderType, consumer: 'Consumer', producer: 'Producer'):
        self.order_id = order_id
        self.order_type = order_type
        self.consumer = consumer
        self.producer = producer
        self.status = OrderStatus.PENDING  # Initial status of the order
        
    def next(self):
        if self.status == OrderStatus.PENDING:
            self.status = OrderStatus.IN_PROGRESS
        elif self.status == OrderStatus.IN_PROGRESS:
            self.status = OrderStatus.DELIVERED
        elif self.status == OrderStatus.DELIVERED:
            self.status = OrderStatus.CANCELLED

    def __str__(self):
        return f"OrderContext(order_id={self.order_id}, order_type={self.order_type}, consumer={self.consumer.person.name}, producer={self.producer.person.name}, status={self.status})"

class Order:
    def __init__(self, order_id: str, consumer: 'Consumer', items: Dict[str, int], total_price: float):
        self.order_id = order_id
        self.consumer = consumer
        self.items = items  # Dictionary of item_name: quantity
        self.total_price = total_price
        self.status = "Pending"  # Could be Pending, In Progress, Delivered, Cancelled

    def __str__(self):
        return f"Order {self.order_id} by {self.consumer.person.name}: {self.items} - Total: ${self.total_price} ({self.status})"
    
class OrderManager:
    def __init__(self):
        self.orders = {}
        
    def create_order(self, order_id: str, consumer: 'Consumer', items: Dict[str, int], total_price: float) -> Order:
        order = Order(order_id, consumer, items, total_price)
        self.orders[order_id] = order
        return order
    
    def update_order_status(self, order_id: str, status: str):
        if order_id in self.orders:
            self.orders[order_id].status = status
        else:
            raise ValueError(f"Order ID {order_id} does not exist.")
    
    def get_order(self, order_id: str) -> Optional[Order]:
        return self.orders.get(order_id)
 
class MenuItem:
    def __init__(self, name: str, price: float, description: Optional[str] = None, max_limit: int = 100):
        self.name = name
        self.price = price
        self.description = None  
        self.max_limit = max_limit
        
    def __str__(self):
        return f"{self.name}: ${self.price}\n {self.description if self.description is not None else ''}"
            
class Producer:
    def __init__(self, person: Person, license_number: str):
        self.id = hash(person)
        self.person = person
        self.license_number = license_number # need to check about validating license
        self.menu = defaultdict(list)
        
    def add_menu_item(self, menu_item: MenuItem):
        if menu_item.name in self.menu:
            raise ValueError(f"Menu item '{menu_item.name}' already exists.")
        self.menu[menu_item.name] = menu_item
        
    def update_menu_item(self, item_name: str, **kwargs):
        if item_name in self.menu:
            for key, value in kwargs.items():
                if key in self.menu[item_name]:
                    self.menu[item_name].key = value
                else:
                    raise KeyError(f"'{key}' is not a valid attribute for menu item '{item_name}'.")
        else:
            raise ValueError(f"Item '{item_name}' does not exist in the menu.")
            
    def remove_menu_item(self, item_name: str):
        if item_name in self.menu:
            del self.menu[item_name]  
            
    def produce_order(self, order:Order):
        print(f"Producing order {order.order_id} for {order.consumer.person.name} with items {order.items}")
        # Logic to produce the order
        # This could involve checking the menu, preparing the food, etc.
        order.status = "Completed"  # Update order status to completed after production
        return order 
    
class Consumer:
    def __init__(self, person: Person):
        self.id = hash(person)
        self.person = person
        self.orders = []
        self.total_price = 0
        
    def add_order(self, order: Order):
        for idx, existing_order in enumerate(self.orders):
            if existing_order.order_id == order.order_id:
                self.orders[idx] = order  # Update existing order
            return
        self.orders.append(order)  # Add new order if not found     

    def order_food(self, producer: Producer, items: Dict[str, int], order_manager: OrderManager):
        # Logic to order food
        # 1. Show menu (assume producer is known for simplicity)
        # 2. Select items and quantity (parameters)
        # 3. Calculate total price
        # 4. Do payment (simulate payment)
        # 5. Place order and add to consumer's orders
        # Calculate total price
        for item_name, qty in items.items():
            if item_name not in producer.menu:
                raise ValueError(f"Menu item '{item_name}' not found in producer's menu.")
            menu_item = producer.menu[item_name]
            if qty > menu_item.max_limit:
                raise ValueError(f"Cannot order more than {menu_item.max_limit} of '{item_name}'.")
            self.total_price += menu_item.price * qty

        # Simulate payment
        payment_status = PaymentStatus.COMPLETED  # Assume payment always succeeds for demo

        if payment_status == PaymentStatus.COMPLETED:
            # Place order
            order_id = f"ORD{len(self.orders)+1:03d}"
            order = order_manager.create_order(order_id, self, items, self.total_price)
            self.add_order(order)
            print(f"Order placed: {order}")
            return order
        else:
            print("Payment failed.")
        return None
    
    def cancel_order(self, order_id: str):
        # Logic to cancel order
        pass
    
    def track_order(self, order_id: str):
        # Logic to track order
        pass
    
    def checkout_orders(self) -> float:
        if not self.orders:
            raise ValueError("No orders to checkout.")
        total_price = sum(order.total_price for order in self.orders)  # add promos in future
        return total_price
    
class Admin:    
    def __init__(self, person: Person):
        self.id = hash(person)
        self.person = person
        
    def manage_producers(self, producer: Producer):
        # Logic to manage producers
        pass
    
    def manage_consumers(self, consumer: Consumer):
        # Logic to manage consumers
        pass
    
    def manage_orders(self, order_id: str):
        # Logic to manage orders
        pass
    
    def manage_payments(self, payment_id: str):
        # Logic to manage payments
        pass
    
    def manage_subscriptions(self, subscription_id: str):
        # Logic to manage subscriptions
        pass
    
    def manage_delivery(self, delivery_id: str):
        # Logic to manage delivery
        pass
    
class System:
    def __init__(self):
        self.producers = {}
        self.consumers = {}
        self.menu = {}
        self.orders = {}
        self.admins = []
        self.order_manager = OrderManager()
        
    def get_menu(self):
        for producer in self.producers:
            producer_menu = producer.menu
            cur_producer_menu = self.menu.get(producer.name, {})
            if cur_producer_menu != producer_menu:
                self.menu[producer.name] = cur_producer_menu
        return self.menu
    
    def add_menu_item(self, producer:Producer, menu_item:MenuItem):
        producer.add_menu_item(menu_item)
        self.menu[producer.name].append(menu_item)
        print(f"Added new menu to {producer.name}, menu item: { menu_item}")
        
    def add_producer(self, producer: Producer):
        if producer.license_number in self.producers:
            raise ValueError(f"Producer with license number {producer.license_number} already exists.")
        self.producers[producer.license_number] = producer
        print(f"")
        
    def add_consumer(self, consumer: Consumer):
        if consumer.person.email in self.consumers:
            raise ValueError(f"Consumer with email {consumer.person.email} already exists.")
        self.consumers[consumer.person.email] = consumer
        
    def add_admin(self, admin: Admin):
        if admin.person.email in [a.person.email for a in self.admins]:
            raise ValueError(f"Admin with email {admin.person.email} already exists.")
        self.admins.append(admin)
        
class Menu:
    def __init__(self):
        self.menu = defaultdict(list)
        
    def get_menu(self):
        return self.menu
        
    def add_item(self, item:MenuItem):
        pass
    
    def update_item(self, **kwargs):
        pass

class SimpleSuppersDemo:
    def __init__(self):
        self.system = System()
        
    def run_demo(self):     
        # Create some people
        admin = Person("Admin", "admin@gmail.com", "555-555-5555",)
        person1 = Person("Sri", "sri@gmail.com", "123-456-7890")
        person2 = Person("John", "jhon@gmail.com", "987-654-3210")
        
        # Create some addresses
        address = Address("1001 Ocala Rd", "Tallahasee", "FL", "32304")
        address1 = Address("W Tharpe St", "Tallahasee", "FL", "32305")
        address2 = Address("456 Elm St", "Springfield", "IL", "62701")
        
        admin.add_address(address)
        person1.add_address(address1)
        person2.add_address(address2)
        
        print(admin)
        print(person1)
        print(person2)
        
        # # admin.update_address(**kwargs)
        
        # Create a producer
        producer1 = Producer(person1, "LIC12345")
        self.system.add_menu_item(producer1, MenuItem("Pizza", 12.99, "Delicious cheese pizza", max_limit=50))
        self.system.add_menu_item(producer1, MenuItem("Burger", 8.99, "Juicy beef burger", max_limit=30))
        
        # Create a consumer
        consumer1 = Consumer(person2)
        menu = self.system.get_menu()
        # producer_menu = self.system.get_menu_by_producer()
        self.system.order_food(consumer1, menu_id=1, quantity=1)        
        total_price = self.system.checkout(consumer1) # throw error if address is empty, check availability and return price
        # total_price = self.system.get_total_price()
        
        #payment
        payment_details = consumer1.get_payment_details()
        order_id = self.system.pay_bill(consumer1, payment_details)
        
        self.system.produce_order(order_id)
        self.system.deliver_order(order_id)
        
        
        
        
ssd = SimpleSuppersDemo()
ssd.run_demo()        
        

        
                         